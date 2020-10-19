import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'

// production 

// const firebaseConfig = {
//     apiKey: "AIzaSyDS5HoDLENso0Mw5uia1WVIW9GQLBZdfZI",
//     authDomain: "knowledgebase-a8b2b.firebaseapp.com",
//     databaseURL: "https://knowledgebase-a8b2b.firebaseio.com",
//     projectId: "knowledgebase-a8b2b",
//     storageBucket: "knowledgebase-a8b2b.appspot.com",
//     messagingSenderId: "639860190847",
//     appId: "1:639860190847:web:845affe75642fbccdf994a",
//     measurementId: "G-RFDW2JVE4V"
// };

// Development
const firebaseConfig = {
    apiKey: "AIzaSyCv7nIzJaBekPi0t16XH1qMw-BzrH1YseU",
    authDomain: "knowledgebase-production.firebaseapp.com",
    databaseURL: "https://knowledgebase-production.firebaseio.com",
    projectId: "knowledgebase-production",
    storageBucket: "knowledgebase-production.appspot.com",
    messagingSenderId: "132852135139",
    appId: "1:132852135139:web:834bb099db30ae8c0881d6",
    measurementId: "G-ZDBBXS8XDW"
  };

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
else {
    firebase.app()
}


const db=firebase.firestore();

export {firebase,db};
