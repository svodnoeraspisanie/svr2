import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

const config = {

  authDomain: "svora-6f3df.firebaseapp.com",
  databaseURL: "https://svora-6f3df.firebaseio.com/",
  storageBucket: "svora-6f3df.appspot.com",
  projectId: 'svora-6f3df',
};


firebase.initializeApp(config);
export const db = firebase.firestore();
export const st = firebase.storage();
const { Timestamp, GeoPoint } = firebase.firestore;
export { Timestamp, GeoPoint };
