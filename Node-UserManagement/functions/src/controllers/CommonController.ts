import admin from "../database";

const checkNameAvailable = async (req: any, res: any) => {

    let query: any = admin.firestore().collection(req.query.collection).where("userId", "==", req.query.userId)
    query = query.where("name", "==", req.query.name)
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

const getPermissions = async (req: any, res: any) => {

    admin.firestore().collection('users').doc(req.query.userId)
        .get().then((documentSet: any) => {
            return res.status(200).json({
                "status": 200,
                "message": 'Already Exist',
                "data": documentSet.data().permissions
            });

        }).catch((err: any) => {
            return res.status(400).json({
                "status": 400,
                "message": err,
            });
        });
}




module.exports = {
    checkNameAvailable: checkNameAvailable,
    getPermissions: getPermissions,
}