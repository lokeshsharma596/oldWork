import admin from "../lib/database";
const { validationResult } = require('express-validator');

const listCategories =  async (req: any, res: any) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status:"400",
      message:"Invalid Request",
      errors: errors.array() 
    });

  } else {

    if (req.query.lastVisible === 'init') {

      let query = admin.firestore().collection('category')
      query = query.where("UserId", "==", req.query.UserId)
      query = query.where("IsDelete", "==", 0)
      query = query.orderBy("position", "desc").limit(12)
        .get().then((documentSet: any) => {
          if (documentSet.empty) {
            return res.status(200).json({
              "status": "200",
              "message": "No Categories Exist",
              "data": { category: {} }
            });
          }
          else {
            let count: any = 0
            const category: any = [];
            documentSet.forEach((doc: any) => {
              category.push({
                id: doc.id,
                name: doc.data().name,
                description: doc.data().description
              });
              count += 1
            })

            const message: any = (count < 12) ? "All Categories Received" : "Categories Received More Available"

            return res.status(200).json({
              "status": "200",
              "message": message,
              "data": { category: category, lastVisible: documentSet.docs[documentSet.docs.length - 1].id }
            });
          }
        }).catch((err: any) => {
          console.log(err)
        })
    }
    else {

      admin.firestore().collection('category').doc(req.query.lastVisible).get().then((ldoc: any) => {
        let query1 = admin.firestore().collection('category')
        query1 = query1.where("UserId", "==", req.query.UserId)
        query1 = query1.where("IsDelete", "==", 0)
        query1 = query1.orderBy("position", "desc")
        query1 = query1.startAfter(ldoc).limit(12)
          .get().then((documentSet: any) => {
            if (documentSet.empty) {
              return res.status(200).json({
                "status": "200",
                "message": "All Categories Received",
                "data": { category: [], lastVisible: '' }
              });
            } else {
              let count: any = 0;
              const category: any = [];
              documentSet.forEach((doc1: any) => {
                category.push({
                  id: doc1.id,
                  name: doc1.data().name,
                  description: doc1.data().description
                });
                count += 1
              })

              const message: any = (count < 12) ? "All Categories Received" : "Categories Received More Available"

              return res.status(200).json({
                "status": "200",
                "message": message,
                "data": { category: category, lastVisible: documentSet.docs[documentSet.docs.length - 1].id }
              });
            }

          }).catch((err: any) => {
            console.log(err)
          })
      }).catch((err: any) => {
        console.log(err)
      })
    }

  }


}

module.exports = {
  listCategories: listCategories
}