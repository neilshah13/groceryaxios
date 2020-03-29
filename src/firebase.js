import firebase from 'firebase';

const firebaseConfig = {
  //Key in your database details
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",

};

  
  firebase.initializeApp(firebaseConfig);
  var database = firebase.firestore();
  export default database;