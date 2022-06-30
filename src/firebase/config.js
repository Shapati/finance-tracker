import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXBxzYZqpDRQtr2YtBxmCrBhKbt8sEN10",
  authDomain: "finance-trackker.firebaseapp.com",
  projectId: "finance-trackker",
  storageBucket: "finance-trackker.appspot.com",
  messagingSenderId: "922413386261",
  appId: "1:922413386261:web:1a868158a3e699eccfdc1c",
  measurementId: "G-WD95GQD40J"
};

firebase.initializeApp(firebaseConfig)

const projectFireStore = firebase.firestore()
const projectAuth = firebase.auth()

const timestamp = firebase.firestore.Timestamp

export {projectFireStore,projectAuth,timestamp }