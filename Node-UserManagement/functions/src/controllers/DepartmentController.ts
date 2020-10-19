import admin from "../database";

const getDepartments = async (req: any, res: any) => {

    const addGeneralDepartment = (userId: any) => {
        return new Promise((resolve, reject) => {
            let query: any = admin.firestore().collection('departments').where('userId', '==', userId)
            query = query.where('name', '==', 'general').get().then((documentSet: any) => {
                if (documentSet.empty) {
                    admin.firestore().collection('departments').add({
                        name: 'general',
                        description: 'General Department',
                        agents: [],
                        userId: userId
                    }).then((docRef: any) => {
                        resolve({ status: 'Created' })
                    })
                } else {
                    resolve({ status: 'Already Exist' })
                }
            })
        })
    }

    const getDep = (userId: any) => {
        return new Promise((resolve, reject) => {
            admin.firestore().collection('departments').where("userId", "==", userId)
                .get().then((documentSet: any) => {
                    const departments: any = [];

                    documentSet.forEach((doc: any) => {
                        departments.push({
                            departmentId: doc.id,
                            name: doc.data().name,
                            description: doc.data().description,
                            agents: doc.data().agents.length
                        })
                    })

                    resolve({ departments: departments })

                })
        })
    }

    await addGeneralDepartment(req.query.userId)
    const data: any = await getDep(req.query.userId)

    const _res = {
        "status": 200,
        "message": "Departments Received",
        "data": { departments: data.departments }
    };
    return res.status(200).json(_res);


}


const getDepartment = async (req: any, res: any) => {

    admin.firestore().collection('departments').doc(req.query.departmentId)
        .get().then((documentSet: any) => {

            return res.status(200).json({
                "status": 200,
                "message": "Department Received",
                "data": { department: { ...documentSet.data() } }
            })

        }).catch((err: any) => {
            const _res = {
                "status": 400,
                "message": err,
            };
            return res.status(400).json(_res);
        });
}


const deleteDepartments = async (req: any, res: any) => {

    const ids = req.body.departmentId

    let query: any = admin.firestore().collection('departments').where('userId', "==", req.body.userId)
    query = query.where("name", "==", "general").get().then((documentSet: any) => {
        const data: any = []

        documentSet.forEach((doc: any) => {
            data.push(doc.id)
        })

        const id: any = ids.filter((item: any) => !data.includes(item));
        console.log(ids,id)
        if (id.length > 0) {
            for (let i = 0; i < id.length; i++) {

                let agents: any = []
                let departmentId: any = ''
                let departmentName: any = ''

                admin.firestore().collection('departments').doc(id[i]).get().then((documentSet1: any) => {
                        agents = documentSet1.data().agents
                        departmentId = documentSet1.id
                        departmentName = documentSet1.data().name
                }).then(() => {
                    console.log(agents,departmentId,departmentName,"here")
                    admin.firestore().collection('departments').doc(id[i]).delete().then(() => {

                        agents.map((agent: any) => {
                            admin.firestore().collection('users').doc(agent.agentId).update({
                                "department": admin.firestore.FieldValue.arrayRemove({ "departmentId": departmentId, "name": departmentName })
                            }).then(() => {
                                console.log(i,id.length - 1,"condition")
                                if (i === id.length - 1) {
                                    return res.status(200).json({
                                        "status": 200,
                                        "message": "Departments deleted",
                                    });
                                }
                            })
                        })
                    })
                })
            }
        } else {
            return res.status(200).json({
                "status": 200,
                "message": "Departments deleted",
            });
        }
    })
}


const createDepartment = async (req: any, res: any) => {


    admin.firestore().collection('departments').add({
        name: req.body.name,
        description: req.body.description,
        agents: req.body.agents,
        userId: req.body.userId
    }).then((docRef: any) => {


        const _res = {
            "status": 201,
            "message": `DepartmentId:${docRef.id}`,
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

const updateDepartment = async (req: any, res: any) => {

    admin.firestore().collection('departments').doc(req.body.departmentId).update({
        name: req.body.name,
        description: req.body.description,
        agents: req.body.agents
    }).then((docRef: any) => {


        const _res = {
            "status": 201,
            "message": `Department Updated`,
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
    getDepartments: getDepartments,
    getDepartment: getDepartment,
    deleteDepartments: deleteDepartments,
    createDepartment: createDepartment,
    updateDepartment: updateDepartment

}