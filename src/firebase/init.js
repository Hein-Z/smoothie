import firebase from 'firebase'
import firestore from 'firebase/firestore'
var firebaseConfig = {
  apiKey: "AIzaSyBb3Un4nNpNUD4osvUrUD9DVoK2fnL9t8E",
  authDomain: "ninja-smoothies-5463c.firebaseapp.com",
  databaseURL: "https://ninja-smoothies-5463c.firebaseio.com",
  projectId: "ninja-smoothies-5463c",
  storageBucket: "ninja-smoothies-5463c.appspot.com",
  messagingSenderId: "965016757824",
  appId: "1:965016757824:web:c5f82054b88a31bc9421a5",
  measurementId: "G-LXMHH3FP2G"
};

const firebaseApp=firebase.initializeApp(firebaseConfig);
firebaseApp.firestore().settings({timestampsInSnapshot:true})
firebase.analytics();

export default firebaseApp.firestore()

