import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/storage'


const config = {
    apiKey: "AIzaSyCv7nIzJaBekPi0t16XH1qMw-BzrH1YseU",
    authDomain: "knowledgebase-production.firebaseapp.com",
    databaseURL: "https://knowledgebase-production.firebaseio.com",
    projectId: "knowledgebase-production",
    storageBucket: "knowledgebase-production.appspot.com",
    messagingSenderId: "132852135139",
    appId: "1:132852135139:web:28648ca1c0e4fab80881d6",
    measurementId: "G-KDQVN75YE6"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}
else {
    firebase.app()
}

const db = firebase.firestore();
const storage = firebase.storage()


export { firebase, db, storage };