import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
 import "firebase/storage";
// const config = {
//     apiKey: "AIzaSyDS5HoDLENso0Mw5uia1WVIW9GQLBZdfZI",
//     authDomain: "knowledgebase-a8b2b.firebaseapp.com",
//     databaseURL: "https://knowledgebase-a8b2b.firebaseio.com",
//     projectId: "knowledgebase-a8b2b",
//     storageBucket: "/b/knowledgebase-a8b2b.appspot.com/o",
//     messagingSenderId: "639860190847",
//     appId: "1:639860190847:web:845affe75642fbccdf994a"
// };
const config = {
    apiKey: "AIzaSyDS5HoDLENso0Mw5uia1WVIW9GQLBZdfZI",
    authDomain: "knowledgebase-a8b2b.firebaseapp.com",
    databaseURL: "https://knowledgebase-a8b2b.firebaseio.com",
    projectId: "knowledgebase-a8b2b",
    storageBucket: "knowledgebase-data",
    messagingSenderId: "639860190847",
    appId: "1:639860190847:web:845affe75642fbccdf994a",
    measurementId: "G-RFDW2JVE4V"
  };


firebase.initializeApp(config);

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;
export const storage = firebase.storage();
export { firebase, storage as default };