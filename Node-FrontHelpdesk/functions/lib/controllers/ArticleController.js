"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../lib/database");
const { validationResult } = require('express-validator');
const getArticle = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: "400",
            message: "Invalid Request",
            errors: errors.array()
        });
    }
    else {
        console.log(req.query, "get article");
        database_1.default.firestore().collection('article').doc(req.query.ArticleId)
            .get().then((documentSet) => {
            console.log(documentSet.exists === false, documentSet.data().UserId !== req.query.UserId, documentSet.data().IsDelete !== 0, documentSet.data().Ispublish !== 1);
            if (documentSet.exists === false || documentSet.data().UserId !== req.query.UserId || documentSet.data().IsDelete !== 0 || documentSet.data().Ispublish !== 1) {
                return res.status(404).json({
                    "status": "404",
                    "message": "Not Exist",
                });
            }
            else {
                const article = [];
                article.push(Object.assign({ id: documentSet.id }, documentSet.data()));
                database_1.default.firestore().collection('articleSeo').where("articleId", "==", req.query.ArticleId)
                    .get().then((documentSet1) => {
                    const seo_data = [];
                    documentSet1.forEach((doc1) => {
                        seo_data.push(Object.assign({ id: doc1.id }, doc1.data()));
                    });
                    database_1.default.firestore().collection('folder').doc(article[0].folderId)
                        .get().then((documentSet2) => {
                        const folder_info = [];
                        folder_info.push({
                            id: documentSet2.id,
                            name: documentSet2.data().name,
                        });
                        database_1.default.firestore().collection('category').doc(article[0].catId)
                            .get().then((documentSet3) => {
                            const category_info = [];
                            category_info.push({
                                id: documentSet3.id,
                                name: documentSet3.data().name,
                            });
                            return res.status(200).json({
                                "status": "200",
                                "message": "Article and Seo Received",
                                "data": { seo_data: seo_data[0], category_info: category_info[0], folder_info: folder_info[0], article: article[0] }
                            });
                        }).catch((err) => {
                            console.log(err);
                        });
                    }).catch((err) => {
                        console.log(err);
                    });
                }).catch((err) => {
                    console.log(err);
                });
            }
        }).catch((err) => {
            console.log(err);
        });
    }
};
const getAllArticlesSeo = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: "400",
            message: "Invalid Request",
            errors: errors.array()
        });
    }
    else {
        console.log(req.query, "getallarticlesseo");
        database_1.default.firestore().collection('folderSeo').where("folderId", "==", req.query.FolderId)
            .get().then((documentSet) => {
            const seo_data = [];
            documentSet.forEach((doc) => {
                seo_data.push(Object.assign({ id: doc.id }, doc.data()));
            });
            const folder_info = [];
            database_1.default.firestore().collection('folder').doc(req.query.FolderId)
                .get().then((documentSet2) => {
                folder_info.push({
                    id: documentSet2.id,
                    name: documentSet2.data().name,
                    catid: documentSet2.data().catId,
                    description: documentSet2.data().description
                });
                const category_info = [];
                database_1.default.firestore().collection('category').doc(folder_info[0].catid)
                    .get().then((documentSet3) => {
                    category_info.push({
                        id: documentSet3.id,
                        name: documentSet3.data().name
                    });
                    return res.status(200).json({
                        "status": "200",
                        "message": "Seo Received",
                        "data": { seo_data: seo_data[0], category_info: category_info[0], folder_info: folder_info[0] }
                    });
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        }).catch((err) => {
            console.log(err);
        });
    }
};
const listArticles = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: "400",
            message: "Invalid Request",
            errors: errors.array()
        });
    }
    else {
        console.log(req.query, "list articles");
        const type = (req.query.more === "init") ? "init" : req.query.more;
        if (req.query.lastVisible === "init" && type === "init") {
            let query = database_1.default.firestore().collection('article');
            query = query.where("folderId", "==", req.query.FolderId);
            query = query.where("UserId", "==", req.query.UserId);
            query = query.where("IsDelete", "==", 0);
            query = query.where("Ispublish", "==", 1);
            query = query.where("pinStatus", "==", 1);
            query = query.orderBy("updatedOn", "desc").limit(12)
                .get().then((documentSet) => {
                const articles = [];
                documentSet.forEach((doc) => {
                    articles.push({
                        id: doc.id,
                        name: doc.data().name,
                        pinStatus: doc.data().pinStatus
                    });
                });
                if (articles.length < 12) {
                    let query1 = database_1.default.firestore().collection('article');
                    query1 = query1.where("folderId", "==", req.query.FolderId);
                    query1 = query1.where("UserId", "==", req.query.UserId);
                    query1 = query1.where("IsDelete", "==", 0);
                    query1 = query1.where("Ispublish", "==", 1);
                    query1 = query1.where("pinStatus", "==", 0);
                    query1 = query1.orderBy("position", "desc").limit(12 - articles.length)
                        .get().then((documentSet1) => {
                        documentSet1.forEach((doc1) => {
                            articles.push({
                                id: doc1.id,
                                name: doc1.data().name,
                                pinStatus: doc1.data().pinStatus
                            });
                        });
                        const message = (articles.length === 0) ? "No Articles Exist" : (articles.length > 0 && articles.length < 12) ? "All Articles Received" : "Articles Received More Unpinned Available";
                        const lastVisible = (articles.length === 0) ? "" : (articles.length > 0 && articles.length < 12) ? "" : documentSet1.docs[documentSet1.docs.length - 1].id;
                        const more = (articles.length === 0) ? "" : (articles.length > 0 && articles.length < 12) ? "" : "Unpinned";
                        return res.status(200).json({
                            "status": "200",
                            "message": message,
                            "data": { articles: articles, lastVisible: lastVisible, more: more }
                        });
                    }).catch((err) => {
                        console.log(err);
                    });
                }
                else {
                    return res.status(200).json({
                        "status": "200",
                        "message": "Articles Received More Pinned Available ",
                        "data": { articles: articles, lastVisible: documentSet.docs[documentSet.docs.length - 1].id, more: "Pinned" }
                    });
                }
            }).catch((err) => {
                console.log(err);
            });
        }
        else if (req.query.lastVisible.length > 0 && type === "Pinned") {
            database_1.default.firestore().collection('article').doc(req.query.lastVisible).get().then((ldoc) => {
                const articles = [];
                let query2 = database_1.default.firestore().collection('article');
                query2 = query2.where("folderId", "==", req.query.FolderId);
                query2 = query2.where("UserId", "==", req.query.UserId);
                query2 = query2.where("IsDelete", "==", 0);
                query2 = query2.where("Ispublish", "==", 1);
                query2 = query2.where("pinStatus", "==", 1);
                query2 = query2.orderBy("updatedOn", "desc");
                query2 = query2.startAfter(ldoc).limit(12)
                    .get().then((documentSet) => {
                    documentSet.forEach((doc) => {
                        articles.push({
                            id: doc.id,
                            name: doc.data().name,
                            pinStatus: doc.data().pinStatus
                        });
                    });
                    if (articles.length < 12) {
                        let query3 = database_1.default.firestore().collection('article');
                        query3 = query3.where("folderId", "==", req.query.FolderId);
                        query3 = query3.where("UserId", "==", req.query.UserId);
                        query3 = query3.where("IsDelete", "==", 0);
                        query3 = query3.where("Ispublish", "==", 1);
                        query3 = query3.where("pinStatus", "==", 0).orderBy("position", "desc").limit(12 - articles.length)
                            .get().then((documentSet1) => {
                            documentSet1.forEach((doc1) => {
                                articles.push({
                                    id: doc1.id,
                                    name: doc1.data().name,
                                    pinStatus: doc1.data().pinStatus
                                });
                            });
                            const message = (articles.length < 12) ? "All Articles Received" : "Articles Received More Unpinned Available";
                            const lastVisible = (articles.length < 12) ? "" : documentSet1.docs[documentSet1.docs.length - 1].id;
                            const more = (articles.length < 12) ? "" : "Unpinned";
                            return res.status(200).json({
                                "status": "200",
                                "message": message,
                                "data": { articles: articles, lastVisible: lastVisible, more: more }
                            });
                        }).catch((err) => {
                            console.log(err);
                        });
                    }
                    else {
                        return res.status(200).json({
                            "status": "200",
                            "message": "Articles Received More Pinned Available ",
                            "data": { articles: articles, lastVisible: documentSet.docs[documentSet.docs.length - 1].id, more: "Pinned" }
                        });
                    }
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        }
        else if (req.query.lastVisible.length > 0 && type === "Unpinned") {
            database_1.default.firestore().collection('article').doc(req.query.lastVisible).get().then((doc) => {
                const articles = [];
                let query4 = database_1.default.firestore().collection('article');
                query4 = query4.where("folderId", "==", req.query.FolderId);
                query4 = query4.where("UserId", "==", req.query.UserId);
                query4 = query4.where("IsDelete", "==", 0);
                query4 = query4.where("Ispublish", "==", 1);
                query4 = query4.where("pinStatus", "==", 0).orderBy("position", "desc");
                query4 = query4.startAfter(doc).limit(12)
                    .get().then((documentSet1) => {
                    documentSet1.forEach((doc1) => {
                        articles.push({
                            id: doc1.id,
                            name: doc1.data().name,
                            pinStatus: doc1.data().pinStatus
                        });
                    });
                    const message = (articles.length < 12) ? "All Articles Received" : "Articles Received More Unpinned Available";
                    const lastVisible = (articles.length < 12) ? "" : documentSet1.docs[documentSet1.docs.length - 1].id;
                    const more = (articles.length < 12) ? "" : "Unpinned";
                    return res.status(200).json({
                        "status": "200",
                        "message": message,
                        "data": { articles: articles, lastVisible: lastVisible, more: more }
                    });
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        }
    }
};
const getPreviewArticle = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: "400",
            message: "Invalid Request",
            errors: errors.array()
        });
    }
    else {
        database_1.default.firestore().collection('temparticle').doc(req.query.ArticleId)
            .get().then((documentSet) => {
            if (documentSet.exists && documentSet.data().UserId === req.query.UserId) {
                const article = [];
                article.push(Object.assign({}, documentSet.data()));
                return res.status(200).json({
                    "status": 200,
                    "message": "Preview Article Received",
                    "data": { article: article[0] }
                });
            }
            else {
                return res.status(404).json({
                    "status": 200,
                    "message": "Not Available",
                    "data": { article: [] }
                });
            }
        }).catch((err) => {
            console.log(err);
        });
    }
};
const checkVoteStatus = async (req, res) => {
    let query = database_1.default.firestore().collection('users').doc(req.body.userId).collection('upvotes').where('articleId', '==', req.body.articleId);
    query = query.where('userEmail', '==', req.body.userEmail).get().then((documentSet) => {
        if (documentSet.empty) {
            let query1 = database_1.default.firestore().collection('users').doc(req.body.userId).collection('downvotes').where('articleId', '==', req.body.articleId);
            query1 = query1.where('userEmail', '==', req.body.userEmail).get().then((documentSet2) => {
                if (documentSet2.empty) {
                    return res.status(200).json({
                        status: 200,
                        data: {
                            upvote: false,
                            downvote: false
                        }
                    });
                }
                else {
                    return res.status(200).json({
                        status: 200,
                        data: {
                            upvote: false,
                            downvote: true
                        }
                    });
                }
            });
        }
        else {
            return res.status(200).json({
                status: 200,
                data: {
                    upvote: true,
                    downvote: false
                }
            });
        }
    });
};
module.exports = {
    getArticle: getArticle,
    getAllArticlesSeo: getAllArticlesSeo,
    listArticles: listArticles,
    getPreviewArticle: getPreviewArticle,
    checkVoteStatus: checkVoteStatus
};
//# sourceMappingURL=ArticleController.js.map