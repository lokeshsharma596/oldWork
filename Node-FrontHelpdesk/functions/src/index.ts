import * as functions from 'firebase-functions';
import * as Config from './lib/config';
const server = require('./server');
const algoliasearch = require('algoliasearch');
const algoliaClient = algoliasearch(Config.ALGOLIA_APP_ID, Config.ALGOLIA_SECRET_KEY)



//Main API
export const kbFrontApi = functions.https.onRequest(server);





//Firestore Triggers

export const algoliaSyncArticle =  functions.firestore.document('article/{doc}').onWrite(async (change, context) => {

      const oldData:any = change.before
      const newData:any = change.after
      const data = {
        name: newData.data().name,
        type: "article"
      }
  
      const objectID = newData.id
  
      if (!oldData.exists && newData.exists && newData.data().IsDelete === 0 && newData.data().Ispublish === 1) {
        console.log("creating");
  
        return algoliaClient.initIndex(newData.data().UserId).saveObject(Object.assign({}, {
          objectID
        }, data))
      } else if ((newData.exists && oldData.exists && newData.data().IsDelete === 1) || (newData.exists && oldData.exists && newData.data().Ispublish === 0)) {
        console.log("deleting");
  
        return algoliaClient.initIndex(newData.data().UserId).deleteObject(objectID)
      } else if (newData.exists && oldData.exists && newData.data().IsDelete === 0 && newData.data().Ispublish === 1) {
        console.log("updating");
  
        return algoliaClient.initIndex(newData.data().UserId).saveObject(Object.assign({}, {
          objectID
        }, data))
      }
    })
  
  
  
  export const algoliaSyncCategory = functions.firestore.document('category/{doc}').onWrite(async (change, context) => {
  
      const oldData:any = change.before
      const newData:any = change.after
      const data = {
        name: newData.data().name,
        type: "category"
      }
  
      const objectID = newData.id
  
      if (!oldData.exists && newData.exists && newData.data().IsDelete === 0) {
        console.log("creating");
  
        return algoliaClient.initIndex(newData.data().UserId).saveObject(Object.assign({}, {
          objectID
        }, data))
      } else if (newData.exists && oldData.exists && newData.data().IsDelete === 1) {
        console.log("deleting");
  
        return algoliaClient.initIndex(newData.data().UserId).deleteObject(objectID)
      } else if (newData.exists && oldData.exists && newData.data().IsDelete === 0) {
        console.log("updating");
  
        return algoliaClient.initIndex(newData.data().UserId).saveObject(Object.assign({}, {
          objectID
        }, data))
      }
    })
  
  
  export const algoliaSyncFolder = functions.firestore.document('folder/{doc}').onWrite(async (change, context) => {
  
      const oldData:any = change.before
      const newData:any = change.after
      const data = {
        name: newData.data().name,
        type: "folder"
      }
  
      const objectID = newData.id
  
      if (!oldData.exists && newData.exists && newData.data().IsDelete === 0) {
        console.log("creating");
  
        return algoliaClient.initIndex(newData.data().UserId).saveObject(Object.assign({}, {
          objectID
        }, data))
      } else if (newData.exists && oldData.exists && newData.data().IsDelete === 1) {
        console.log("deleting");
  
        return algoliaClient.initIndex(newData.data().UserId).deleteObject(objectID)
      } else if (newData.exists && oldData.exists && newData.data().IsDelete === 0) {
        console.log("updating");
  
        return algoliaClient.initIndex(newData.data().UserId).saveObject(Object.assign({}, {
          objectID
        }, data))
      }
    })