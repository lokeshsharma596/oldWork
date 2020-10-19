import admin from "../lib/database";
const { validationResult } = require('express-validator');



const getFolderPageSeo = async (req: any, res: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "400",
      message: "Invalid Request",
      errors: errors.array()
    });

  } else {
  admin.firestore().collection('categorySeo')
    .where("categoryId", "==", req.query.CategoryId)
    .get().then((documentSet: any) => {
      const seo_data: any = [];
      documentSet.forEach((doc: any) => {
        seo_data.push({
          id: doc.id,
          title: doc.data().title,
          description: doc.data().description,
          keyword: doc.data().keyword,
        });
      })

      admin.firestore().collection('category')
        .doc(req.query.CategoryId)
        .get().then((documentSet1: any) => {
          const header_data = [];
          header_data.push({
            id: documentSet1.id,
            name: documentSet1.data().name,
            description: documentSet1.data().description,
          });

          return res.status(200).json({
            "status": "200",
            "message": "Seo Received",
            "data": { seo_data: seo_data[0], header_data: header_data[0] }
          });
        }).catch((err: any) => {
          const _res = {
            "status": 400,
            "message": err,
          };
          return res.status(400).json(_res);
        });
    });
}
}

const listFolders = async (req: any, res: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "400",
      message: "Invalid Request",
      errors: errors.array()
    });

  } else {
  if (req.query.lastVisible === 'init') {

    admin.firestore().collection('category').doc(req.query.CategoryId).get().then((cat: any) => {
      if (cat.exists) {

        let folders: any = {}

        let query = admin.firestore().collection('folder');
        query = query.where("catId", "==", req.query.CategoryId)
        query = query.where("UserId", "==", req.query.UserId)
        query = query.where("IsDelete", "==", 0)
        query = query.orderBy("position", "desc").limit(9)
          .get().then((documentSet: any) => {

            if (documentSet.empty) {
              return res.status(200).json({
                "status": "200",
                "message": "No Folders Exist",
                "data": { Folders: folders, lastVisible: '' }
              });
            }
            else {
              const len0: any = [];
              const len: any = documentSet.docs.length
              documentSet.forEach((doc: any, j: any) => {
                const ID: any = doc.id

                folders = {
                  ...folders, [ID]: {
                    folder_data: {
                      id: doc.id,
                      name: doc.data().name,
                      description: doc.data().description
                    }
                  }
                }


                let query1 = admin.firestore().collection('article');
                query1 = query1.where("folderId", "==", ID)
                query1 = query1.where("UserId", "==", req.query.UserId)
                query1 = query1.where("IsDelete", "==", 0)
                query1 = query1.where("Ispublish", "==", 1)
                query1 = query1.where("pinStatus", "==", 1)
                query1 = query1.orderBy("updatedOn", "desc").limit(5)
                  .get().then((documentSet1: any) => {

                    documentSet1.forEach((doc1: any) => {

                      folders[ID] = {
                        ...folders[ID], article: {
                          ...folders[ID].article,
                          [doc1.id]: {
                            id: doc1.id,
                            name: doc1.data().name,
                            pinStatus: doc1.data().pinStatus
                          }
                        }

                      }
                    })


                    if (folders[ID].article && Object.keys(folders[ID].article).length < 5) {


                      let query2 = admin.firestore().collection('article');
                      query2 = query2.where("folderId", "==", ID)
                      query2 = query2.where("UserId", "==", req.query.UserId)
                      query2 = query2.where("IsDelete", "==", 0)
                      query2 = query2.where("Ispublish", "==", 1)
                      query2 = query2.where("pinStatus", "==", 0)
                      query2 = query2.orderBy("position", "desc").limit(5 - Object.keys(folders[ID].article).length)
                        .get().then((documentSet2: any) => {
                          documentSet2.forEach((doc2: any) => {
                            folders[ID] = {
                              ...folders[ID], article: {
                                ...folders[ID].article,
                                [doc2.id]: {
                                  id: doc2.id,
                                  name: doc2.data().name,
                                  pinStatus: doc2.data().pinStatus
                                }
                              }

                            }
                          })

                        }).catch((err: any) => {
                          console.log(err);
                        })

                    } else if (folders[ID].article === undefined) {



                      let query3 = admin.firestore().collection('article');
                      query3 = query3.where("folderId", "==", ID)
                      query3 = query3.where("UserId", "==", req.query.UserId)
                      query3 = query3.where("IsDelete", "==", 0)
                      query3 = query3.where("Ispublish", "==", 1)
                      query3 = query3.where("pinStatus", "==", 0)
                      query3 = query3.orderBy("position", "desc").limit(5)
                        .get().then((documentSet2: any) => {
                          documentSet2.forEach((doc2: any) => {
                            folders[ID] = {
                              ...folders[ID], article: {
                                ...folders[ID].article,
                                [doc2.id]: {
                                  id: doc2.id,
                                  name: doc2.data().name,
                                  pinStatus: doc2.data().pinStatus
                                }
                              }

                            }
                          })

                        }).catch((err: any) => {
                          console.log(err);
                        })
                    }

                    let query4 = admin.firestore().collection('article');
                    query4 = query4.where("folderId", "==", ID)
                    query4 = query4.where("UserId", "==", req.query.UserId)
                    query4 = query4.where("IsDelete", "==", 0)
                    query4 = query4.where("Ispublish", "==", 1)
                      .get().then((documentSet3: any) => {

                        const total_count: any = documentSet3.docs.length
                        folders[ID] = {
                          ...folders[ID], count: total_count
                        }
                        len0.push(j)

                        if ((len) === len0.length) {
                          const message: string = (Object.keys(folders).length < 9) ? "All Folders Received" : "Folders Received More Available"
                          const lastVisible: string = (Object.keys(folders).length < 9) ? "" : documentSet.docs[documentSet.docs.length - 1].id
        
                          return res.status(200).json({
                            "status": "200",
                            "message": message,
                            "data": { Folders: folders, lastVisible: lastVisible }
                          });
                        }
                      }).catch((err: any) => {
                        console.log(err);
                      })
                  }).catch((err: any) => {
                    console.log(err);
                  })
              })
            }

          }).catch((err: any) => {
            console.log(err);
          })
      } else {
  
        return res.status(404).json({
          "status": "404",
          "message": "Incorrect Catgeory ID"
        });
      }
    }).catch((err: any) => {
      console.log(err);
    })

  } else {

    admin.firestore().collection('folder').doc(req.query.lastVisible).get().then((noc: any) => {

      let folders: any = {}

      let query5 = admin.firestore().collection('folder');
      query5 = query5.where("catId", "==", req.query.CategoryId)
      query5 = query5.where("UserId", "==", req.query.UserId)
      query5 = query5.where("IsDelete", "==", 0)
      query5 = query5.orderBy("position", "desc")
      query5 = query5.startAfter(noc).limit(9)

        .get().then((documentSet: any) => {
          if (documentSet.empty) {
            return res.status(200).json({
              "status": "200",
              "message": "All Folders Received",
              "data": { Folders: folders, lastVisible: '' }
            });;
          }
          else {
            const len0: any = [];
            const len: any = documentSet.docs.length
            documentSet.forEach((doc: any, j: any) => {
              const ID: any = doc.id
              folders = {
                ...folders, [ID]: {
                  folder_data: {
                    id: doc.id,
                    name: doc.data().name,
                    description: doc.data().description
                  }
                }
              }


              let query6 = admin.firestore().collection('article');
              query6 = query6.where("folderId", "==", ID)
              query6 = query6.where("UserId", "==", req.query.UserId)
              query6 = query6.where("IsDelete", "==", 0)
              query6 = query6.where("Ispublish", "==", 1)
              query6 = query6.where("pinStatus", "==", 1)
              query6 = query6.orderBy("updatedOn", "desc").limit(5)
                .get().then((documentSet1: any) => {

                  documentSet1.forEach((doc1: any) => {
                    folders[ID] = {
                      ...folders[ID], article: {
                        ...folders[ID].article,
                        [doc1.id]: {
                          id: doc1.id,
                          name: doc1.data().name,
                          pinStatus: doc1.data().pinStatus
                        }
                      }

                    }
                  })


                  if (folders[ID].article && Object.keys(folders[ID].article).length < 5) {
                    let query7 = admin.firestore().collection('article');
                    query7 = query7.where("folderId", "==", ID)
                    query7 = query7.where("UserId", "==", req.query.UserId)
                    query7 = query7.where("IsDelete", "==", 0)
                    query7 = query7.where("Ispublish", "==", 1)
                    query7 = query7.where("pinStatus", "==", 0)
                    query7 = query7.orderBy("position", "desc").limit(5 - Object.keys(folders[ID].article).length)
                      .get().then((documentSet2: any) => {
                        documentSet2.forEach((doc2: any) => {
                          folders[ID] = {
                            ...folders[ID], article: {
                              ...folders[ID].article,
                              [doc2.id]: {
                                id: doc2.id,
                                name: doc2.data().name,
                                pinStatus: doc2.data().pinStatus
                              }
                            }

                          }
                        })

                      }).catch((err: any) => {
                        console.log(err);
                      })
                  } else if (folders[ID].article === undefined) {
                    let query8 = admin.firestore().collection('article');
                    query8 = query8.where("folderId", "==", ID)
                    query8 = query8.where("UserId", "==", req.query.UserId)
                    query8 = query8.where("IsDelete", "==", 0)
                    query8 = query8.where("Ispublish", "==", 1)
                    query8 = query8.where("pinStatus", "==", 0)
                    query8 = query8.orderBy("position", "desc").limit(5)
                      .get().then((documentSet2: any) => {
                        documentSet2.forEach((doc2: any) => {
                          folders[ID] = {
                            ...folders[ID], article: {
                              ...folders[ID].article,
                              [doc2.id]: {
                                id: doc2.id,
                                name: doc2.data().name,
                                pinStatus: doc2.data().pinStatus
                              }
                            }

                          }
                        })

                      }).catch((err: any) => {
                        console.log(err);
                      })
                  }

                  let query9 = admin.firestore().collection('article');
                  query9 = query9.where("folderId", "==", ID)
                  query9 = query9.where("UserId", "==", req.query.UserId)
                  query9 = query9.where("IsDelete", "==", 0)
                  query9 = query9.where("Ispublish", "==", 1)
                    .get().then((documentSet3: any) => {

                      const total_count: any = documentSet3.docs.length
                      folders[ID] = {
                        ...folders[ID], count: total_count
                      }
                      len0.push(j)




                      if ((len) === len0.length) {

                        const message: string = (Object.keys(folders).length < 9) ? "All Folders Received" : "Folders Received More Available"
                        const lastVisible: string = (Object.keys(folders).length < 9) ? "" : documentSet.docs[documentSet.docs.length - 1].id
          

                        return res.status(200).json({
                          "status": "200",
                          "message": message,
                          "data": { Folders: folders, lastVisible: lastVisible }
                        });;
                      }

                    }).catch((err: any) => {
                      console.log(err);
                    })
                }).catch((err: any) => {
                  console.log(err);
                })
            })


          }

        }).catch((err: any) => {
          console.log(err);
        })
    }).catch((err: any) => {
      console.log(err);
    })
  }
}}


const listFolderNames = async (req: any, res: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "400",
      message: "Invalid Request",
      errors: errors.array()
    });

  } else {
  if (req.query.lastVisible === 'init') {

    let query = admin.firestore().collection('folder');
    query = query.where("catId", "==", req.query.CategoryId)
    query = query.where("UserId", "==", req.query.UserId)
    query = query.where("IsDelete", "==", 0)
    query = query.orderBy("position", "desc").limit(12)
      .get().then((documentSet: any) => {
        if (documentSet.empty) {
          return res.status(200).json({
            "status": "200",
            "message": "No Folders Exist",
            "data": { Folders: [], lastVisible: '' }
          });
        }
        else {
          const folders: any = []
          documentSet.forEach((doc: any) => {
            folders.push({
              id: doc.id,
              name: doc.data().name
            })
          })
          const message: string = (folders.length < 12) ? "All Folders Received" : "Folders Received More Available"
          const lastVisible: string = (folders.length < 12) ? "" : documentSet.docs[documentSet.docs.length - 1].id
        
          return res.status(200).json({
            "status": "200",
            "message": message,
            "data": { Folders: folders, lastVisible: lastVisible }
          });
        }

      }).catch((err: any) => {
        console.log(err);
      })
  }
  else {

    admin.firestore().collection('folder').doc(req.query.lastVisible)
      .get().then((ldoc: any) => {

        let query1 = admin.firestore().collection('folder');
        query1 = query1.where("catId", "==", req.query.CategoryId)
        query1 = query1.where("UserId", "==", req.query.UserId)
        query1 = query1.where("IsDelete", "==", 0)
        query1 = query1.orderBy("position", "desc")
        query1 = query1.startAfter(ldoc).limit(12)
          .get().then((documentSet: any) => {
            if (documentSet.empty) {
              return res.status(200).json({
                "status": "200",
                "message": "All Folders Received",
                "data": { Folders: [], lastVisible: '' }
              });
            }
            else {
              const folders: any = []
              documentSet.forEach((doc: any) => {
                folders.push({
                  id: doc.id,
                  name: doc.data().name
                })
              })

              const message: string = (folders.length < 12) ? "All Folders Received" : "Folders Received More Available"
              const lastVisible: string = (folders.length < 12) ? "" : documentSet.docs[documentSet.docs.length - 1].id
             

              return res.status(200).json({
                "status": "200",
                "message": message,
                "data": { Folders: folders, lastVisible: lastVisible }
              });
            }
          }).catch((err: any) => {
            console.log(err);
          })
      }).catch((err: any) => {
        console.log(err);
      })
  }
}
}

module.exports = {
  getFolderPageSeo: getFolderPageSeo,
  listFolders: listFolders,
  listFolderNames: listFolderNames
}