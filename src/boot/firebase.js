import firebase from "firebase/app"
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDeSomiwuSdzC0NvizYZeHafl3noWkELXo",
  authDomain: "twitter-quasar.firebaseapp.com",
  projectId: "twitter-quasar",
  storageBucket: "twitter-quasar.appspot.com",
  messagingSenderId: "887495370875",
  appId: "1:887495370875:web:dd477db8a73913a4195ade"
}

firebase.initializeApp(firebaseConfig)

let db = firebase.firestore()

export default db
