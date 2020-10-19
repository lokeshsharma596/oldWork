import admin from "../database";


const getRoles = async (req: any, res: any) => {


    const addAdminRole = (userId: any) => {
        return new Promise((resolve, reject) => {
            let query: any = admin.firestore().collection('roles').where('userId', '==', userId)
            query = query.where('name', '==', 'admin').get().then((documentSet: any) => {
                if (documentSet.empty) {
                    admin.firestore().collection('roles').add({
                        name: 'admin',
                        description: 'Admin Department',
                        userId: userId,
                        permissions: {
                            viewTicket: true,
                            createTicket: true,
                            changeTicketOwnership: true,
                            closeTicket: true,
                            updateTicketStatus: true,
                            deleteTicket: true,
                            viewArticle: true,
                            createArticle: true,
                            updateArticle: true,
                            publishDraftArticle: true,
                            deleteArticle: true,
                            manageModule: true,
                            addAgent: true,
                            addDepartment: true,
                            managePermission: true,
                            manageGeneralSetting: true,
                            importTicket: true,
                            importArticle: true,
                            linkChannelEmail: true,
                            linkChannelHelpcenter: true,
                        },
                        agents: []
                    }).then((docRef: any) => {
                        resolve({ status: 'Created' })
                    })
                } else {
                    resolve({ status: 'Already Exist' })
                }
            })
        })
    }



    const addAgentRole = (userId: any) => {
        return new Promise((resolve, reject) => {
            let query: any = admin.firestore().collection('roles').where('userId', '==', userId)
            query = query.where('name', '==', 'agent').get().then((documentSet: any) => {
                if (documentSet.empty) {
                    admin.firestore().collection('roles').add({
                        name: 'agent',
                        description: 'Agent Department',
                        userId: userId,
                        permissions: {
                            viewTicket: true,
                            createTicket: true,
                            changeTicketOwnership: true,
                            closeTicket: true,
                            updateTicketStatus: true,
                            deleteTicket: true,
                            viewArticle: true,
                            createArticle: true,
                            updateArticle: true,
                            publishDraftArticle: true,
                            deleteArticle: false,
                            manageModule: false,
                            addAgent: false,
                            addDepartment: false,
                            managePermission: false,
                            manageGeneralSetting: false,
                            importTicket: false,
                            importArticle: false,
                            linkChannelEmail: false,
                            linkChannelHelpcenter: false,
                        },
                        agents: []
                    }).then((docRef: any) => {
                        resolve({ status: 'Created' })
                    })
                } else {
                    resolve({ status: 'Already Exist' })
                }
            })
        })
    }

    const getRolesData = (userId: any) => {
        return new Promise((resolve, reject) => {
            admin.firestore().collection('roles').where("userId", "==", req.query.userId)
                .get().then((documentSet: any) => {
                    const roles: any = [];

                    documentSet.forEach((doc: any) => {
                        roles.push({
                            roleId: doc.id,
                            name: doc.data().name,
                            description: doc.data().description,
                            agents: doc.data().agents.length
                        })
                    })
                    resolve({ roles: roles })

                })
        })
    }


    await addAdminRole(req.query.userId)
    await addAgentRole(req.query.userId)
    const data: any = await getRolesData(req.query.userId)

    const _res = {
        "status": 200,
        "message": "Roles Received",
        "data": { roles: data.roles },
    };
    return res.status(200).json(_res);
}



const getRole = async (req: any, res: any) => {

    admin.firestore().collection('roles').doc(req.query.roleId)
        .get().then((documentSet: any) => {
            const role = [];
            role.push({
                id: documentSet.id,
                name: documentSet.data().name,
                description: documentSet.data().description,
                permissions: documentSet.data().permissions
            })
            const _res = {
                "status": 200,
                "message": "Role Received",
                "data": { role: role[0] }
            };
            return res.status(200).json(_res);
        }).catch((err: any) => {
            console.log(err);
            const _res = {
                "status": 400,
                "message": err,
            };
            return res.status(400).json(_res);
        });
}


const createRole = async (req: any, res: any) => {

    admin.firestore().collection('roles').add({
        name: req.body.name,
        description: req.body.description,
        userId: req.body.userId,
        permissions: req.body.permissions,
        agents: []
    }).then((docRef: any) => {

        const _res = {
            "status": 201,
            "message": `RoleId:${docRef.id}`,
        };
        return res.status(201).json(_res);
    }).catch((err: any) => {
        console.log(err);
        const _res = {
            "status": 400,
            "message": err,
        };
        return res.status(400).json(_res);
    });
}

const deleteRoles = async (req: any, res: any) => {

    const ids = req.body.roleId

    let query: any = admin.firestore().collection('roles').where('userId', "==", req.body.userId)
    query = query.where('name', 'in', ['admin', 'agent']).get().then((documentSet: any) => {
        const data: any = []
        const roleName: any = 'agent'
        let agentRoleId: any = ''

        documentSet.forEach((doc: any) => {
            data.push(doc.id)
            if (doc.data().name == 'agent') {
                agentRoleId = doc.id
            }
        })

        const id: any = ids.filter((item: any) => !data.includes(item));

        if (id.length > 0) {
            for (let i = 0; i < id.length; i++) {
                let agents: any = []


                admin.firestore().collection('roles').doc(id[i]).get().then((documentSet1: any) => {
                    agents = documentSet1.data().agents
                }).then(() => {
                    admin.firestore().collection('roles').doc(id[i]).delete().then(() => {
                        agents.map((agent: any) => {
                            admin.firestore().collection('users').doc(agent.agentId).update({
                                "role": roleName,
                                "roleId": agentRoleId
                            }).then(() => {
                                admin.firestore().collection('users').doc(agent.agentId).get().then((documentSet2: any) => {
                                    admin.firestore().collection('roles').doc(agentRoleId).update({
                                        agents: admin.firestore.FieldValue.arrayUnion({
                                            agentId: agent.agentId,
                                            name: documentSet2.data().firstName + ' ' + documentSet2.data().lastName
                                        })
                                    }).then(() => {
                                        if (i === id.length - 1) {
                                            return res.status(200).json({
                                                "status": 200,
                                                "message": "Roles deleted",
                                            });
                                        }
                                    })
                                })
                            })
                        })

                    })
                })
            }
        } else {
            return res.status(200).json({
                "status": 200,
                "message": "Roles deleted",
            });
        }
    })
}



const updateRole = async (req: any, res: any) => {
    const _req = req.body
    const id = _req.roleId
    delete _req.roleId

    admin.firestore().collection('roles').doc(id).set({
        ..._req
    }, { merge: true }).then(function () {
        const _res = {
            "status": 201,
            "message": `Role Updated`,
        };
        return res.status(201).json(_res);
    }).catch((err: any) => {
        const _res = {
            "status": 400,
            "message": err,
        };
        return res.status(400).json(_res);
    });
}



module.exports = {
    getRoles: getRoles,
    getRole: getRole,
    createRole: createRole,
    deleteRoles: deleteRoles,
    updateRole: updateRole
}