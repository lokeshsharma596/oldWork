const Method = require("../lib/Functions");
import admin from "../database";



const getAgents = async (req: any, res: any) => {

    admin.firestore().collection('users').where("parentId", "==", req.query.userId)
        .get().then((documentSet: any) => {
            const agents: any = [];

            documentSet.forEach((doc: any) => {
                if (doc.id !== req.query.userId) {
                    agents.push({
                        agentId: doc.id,
                        firstName: doc.data().firstName,
                        lastName: doc.data().lastName,
                        alias: doc.data().alias,
                        department: doc.data().department,
                        role: doc.data().role,
                        lastLogin: doc.data().lastLogin,
                        status: doc.data().status,
                        photo: doc.data().photo,
                        email: doc.data().email
                    })
                }
            })

            const _res = {
                "status": 200,
                "message": "Agents Received",
                "data": { agents: agents }
            };
            return res.status(200).json(_res);

        }).catch((err: any) => {
            const _res = {
                "status": 400,
                "message": err,
            };
            return res.status(400).json(_res);
        });
}

const checkEmailExist = async (req: any, res: any) => {

    let query: any = admin.firestore().collection('users').where("parentId", "==", req.query.userId)
    query = query.where("email", "==", req.query.email)
        .get().then((documentSet: any) => {
            if (documentSet.empty) {
                const _res = {
                    "status": 404,
                    "message": `Not Found`,
                    "data": true
                };
                return res.status(404).json(_res);
            } else {
                const _res = {
                    "status": 200,
                    "message": 'Already Exist',
                    "data": false
                };
                return res.status(200).json(_res);
            }
        }).catch((err: any) => {

            const _res = {
                "status": 400,
                "message": err,
            };
            return res.status(400).json(_res);
        });
}

const createAgent = async (req: any, res: any) => {

    const _req = req.body
    const searchSubStrings = await Method.getSubstrings(`${_req.firstName}${_req.lastName}`)

    console.log(_req);


    if (_req.lastName.length > 0) {
        searchSubStrings.push(`${_req.firstName} ${_req.lastName}`)
    }

    const AddAgent = () => {
        return new Promise((resolve, reject) => {
            admin.firestore().collection('users').add({
                ..._req,
                searchName: searchSubStrings
            }).then((docRef: any) => {
                resolve({ 'id': docRef.id })
            })
        })
    }

    const AddAgentinDepartmentCollection = () => {
        return new Promise((resolve, reject) => {
            _req.department.map((dep: any) => {
                console.log(dep.departmentId, "added in dep")
                admin.firestore().collection('departments').doc(dep.departmentId).update({
                    agents: admin.firestore.FieldValue.arrayUnion({
                        agentId: agentId.id,
                        name: searchSubStrings[searchSubStrings.length - 1]
                    })
                })
            })
            resolve({ status: 'Added' })
        })
    }

    const AddAgentinRoleCollection = () => {
        return new Promise((resolve, reject) => {
            if (_req.roleId !== 'custom') {
                console.log(_req.roleId, "aded in role")
                admin.firestore().collection('roles').doc(_req.roleId).update({
                    agents: admin.firestore.FieldValue.arrayUnion({
                        agentId: agentId.id,
                        name: searchSubStrings[searchSubStrings.length - 1]
                    })
                }).then(function () {
                    resolve({ status: 'Added' })
                })
            } else {
                console.log("Custom Role So Not added")
                resolve({ status: 'No action' })
            }
        })
    }

    const agentId: any = await AddAgent()
    await AddAgentinRoleCollection()
    await AddAgentinDepartmentCollection()

    const _res = {
        "status": 201,
        "message": `AgentId:${agentId.id}`
    };
    return res.status(201).json(_res);
}


const getAgentSidebarData = async (req: any, res: any) => {

    admin.firestore().collection('departments').where("userId", "==", req.query.userId)
        .get().then((documentSet: any) => {
            const departments: any = []
            documentSet.forEach((doc: any) => {
                departments.push({
                    departmentId: doc.id,
                    name: doc.data().name
                })
            })

            admin.firestore().collection('roles').where("userId", "==", req.query.userId)
                .get().then((documentSet1: any) => {
                    const roles: any = []
                    documentSet1.forEach((doc1: any) => {
                        roles.push({
                            roleId: doc1.id,
                            name: doc1.data().name
                        })
                    })
                    const _res = {
                        "status": 201,
                        "message": 'Received',
                        "data": { roles: roles, departments: departments }
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
        }).catch((err: any) => {
            console.log(err);
            const _res = {
                "status": 400,
                "message": err,
            };
            return res.status(400).json(_res);
        });
}


const getAgent = async (req: any, res: any) => {

    admin.firestore().collection('users').doc(req.query.agentId)
        .get().then((documentSet: any) => {
            const _res = {
                "status": 200,
                "message": "Agent Received",
                "data": { agent: { ...documentSet.data(), searchName: [] } }
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



const updateAgent = async (req: any, res: any) => {

    const _req = req.body
    const id: any = _req.agentId
    const oldData = _req.oldData
    delete _req.agentId
    delete _req.oldData
    const searchSubStrings = await Method.getSubstrings(`${_req.firstName}${_req.lastName}`)


    if (_req.lastName.length > 0) {
        searchSubStrings.push(`${_req.firstName} ${_req.lastName}`)
    }

    const UpdateAgent = () => {
        return new Promise((resolve, reject) => {
            admin.firestore().collection('users').doc(id).update({
                ..._req,
                searchName: searchSubStrings
            }).then(() => {
                resolve({ status: 'Done' })
            }).catch((err: any) => {
                return res.status(400).json({
                    "status": 400,
                    "message": err,
                });
            });
        })
    }

    const UpdateAgentinRoleCollection = () => {
        return new Promise((resolve, reject) => {

            if (oldData.roleId !== 'custom') {
                admin.firestore().collection("roles").doc(oldData.roleId).update({
                    "agents": admin.firestore.FieldValue.arrayRemove({ "agentId": id, "name": oldData.name })
                }).then(() => {
                    if (_req.roleId !== 'custom') {
                        admin.firestore().collection('roles').doc(_req.roleId).update({
                            agents: admin.firestore.FieldValue.arrayUnion({
                                agentId: id,
                                name: searchSubStrings[searchSubStrings.length - 1]
                            })
                        }).then(() => {
                            resolve({ status: 'Done' })
                        }).catch((err: any) => {
                            return res.status(400).json({
                                "status": 400,
                                "message": err,
                            });
                        });
                    } else {
                        resolve({ status: 'Done' })
                    }
                }).catch((err: any) => {
                    return res.status(400).json({
                        "status": 400,
                        "message": err,
                    });
                });
            } else {
                if (_req.roleId !== 'custom') {
                    admin.firestore().collection('roles').doc(_req.roleId).update({
                        agents: admin.firestore.FieldValue.arrayUnion({
                            agentId: id,
                            name: searchSubStrings[searchSubStrings.length - 1]
                        })
                    }).then(() => {
                        resolve({ status: 'Done' })
                    }).catch((err: any) => {
                        return res.status(400).json({
                            "status": 400,
                            "message": err,
                        });
                    });
                } else {
                    resolve({ status: 'Done' })
                }
            }
        })
    }


    const UpdateAgentinDepartmentCollection = () => {
        return new Promise((resolve, reject) => {

            const oldDataLength = oldData.department.length - 1
            const newDataLength = _req.department.length - 1
            oldData.department.map((dep: any, l: any) => {
                admin.firestore().collection("departments").doc(dep.departmentId).update({
                    "agents": admin.firestore.FieldValue.arrayRemove({ "agentId": id, "name": oldData.name })
                }).then(() => {
                    console.log(l, oldDataLength)
                    if (l === oldDataLength) {
                        _req.department.map((depa: any, m: any) => {
                            admin.firestore().collection('departments').doc(depa.departmentId).update({
                                agents: admin.firestore.FieldValue.arrayUnion({
                                    agentId: id,
                                    name: searchSubStrings[searchSubStrings.length - 1]
                                })
                            }).then(() => {
                                if (m === newDataLength) {
                                    resolve({ status: 'Done' })
                                }
                            }).catch((err: any) => {
                                return res.status(400).json({
                                    "status": 400,
                                    "message": err,
                                });
                            });
                        })
                    }
                }).catch((err: any) => {
                    return res.status(400).json({
                        "status": 400,
                        "message": err,
                    });
                });
            })
        })
    }

    const a:any=await UpdateAgent()
    const b:any=await UpdateAgentinRoleCollection()
    const c:any=await UpdateAgentinDepartmentCollection()

    if(a.status == 'Done' && b.status == 'Done' && c.status == 'Done'){
        return res.status(201).json({
            "status": 201,
            "message": `AgentId`
        });
    }
    
}



const deleteAgents = async (req: any, res: any) => {

    const id: any = req.body.agentId



    for (let i = 0; i < id.length; i++) {
        const a: any = await admin.firestore().collection('users').doc(id[i]).delete()

        const b: any = await admin.firestore().collection("departments").where('userId', "==", req.body.userId)
            .get().then((documentSet: any) => {
                documentSet.forEach((doc: any) => {

                    doc.data().agents.map((agent: any) => {
                        if (agent.agentId === id[i]) {
                            admin.firestore().collection("departments").doc(doc.id).update({
                                "agents": admin.firestore.FieldValue.arrayRemove({ "agentId": agent.agentId, "name": agent.name })
                            })

                        }
                    })
                })
            }).catch((err: any) => {
                return res.status(400).json({
                    "status": 400,
                    "message": err,
                });
            });

        const c: any = await admin.firestore().collection("roles").where('userId', "==", req.body.userId)
            .get().then((documentSet: any) => {
                documentSet.forEach((doc: any) => {

                    doc.data().agents.map((agent: any) => {
                        if (agent.agentId === id[i]) {
                            admin.firestore().collection("roles").doc(doc.id).update({
                                "agents": admin.firestore.FieldValue.arrayRemove({ "agentId": agent.agentId, "name": agent.name })
                            })
                        }
                    })
                })
            }).catch((err: any) => {
                return res.status(400).json({
                    "status": 400,
                    "message": err,
                });
            });

        console.log(a, b, c)

        if (i === id.length - 1) {
            return res.status(200).json({
                "status": 200,
                "message": "Agents deleted",
                "data": "Agents deleted"
            });
        }


    }
}


const searchAgents = async (req: any, res: any) => {

    let query = admin.firestore().collection('users').where("parentId", "==", req.query.userId)
    query = query.where("searchName", "array-contains", req.query.search)
        .get().then((documentSet: any) => {
            const agents: any = [];

            documentSet.forEach((doc: any) => {
                agents.push({
                    agentId: doc.id,
                    firstName: doc.data().firstName,
                    lastName: doc.data().lastName,
                    alias: doc.data().alias,
                    department: doc.data().department,
                    role: doc.data().role,
                    lastLogin: doc.data().lastLogin,
                    status: doc.data().status,
                    photo: doc.data().photo
                })
            })
            return res.status(200).json({
                "status": 200,
                "message": "Agents Received",
                "data": { agents: agents }
            });
        }).catch((err: any) => {
            return res.status(400).json({
                "status": 400,
                "message": err,
            });
        });
}


const getAgentSubstrings = async (req: any, res: any) => {

    admin.firestore().collection('users').where("parentId", "==", req.query.userId)
        .get().then((documentSet: any) => {
            const subStrings: any = [];
            documentSet.forEach((doc: any) => {
                if (doc.id !== req.query.userId) {
                    subStrings.push({
                        id: doc.id,
                        substrings: doc.data().searchName
                    })
                }
            })
            return res.status(200).json({
                "status": 200,
                "message": "Agents substrings Received",
                "data": { subStrings: subStrings }
            });
        }).catch((err: any) => {
            return res.status(400).json({
                "status": 400,
                "message": err,
            });
        });
}


module.exports = {
    getAgents: getAgents,
    createAgent: createAgent,
    getAgentSidebarData: getAgentSidebarData,
    getAgent: getAgent,
    deleteAgents: deleteAgents,
    updateAgent: updateAgent,
    searchAgents: searchAgents,
    getAgentSubstrings: getAgentSubstrings,
    checkEmailExist: checkEmailExist

}