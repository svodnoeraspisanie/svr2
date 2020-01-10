import firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyBUrnt50CnPcbG0EvIVsoQawYC_rHyzlQ0",
    authDomain: "svora-6f3df.firebaseapp.com",
    databaseURL: "https://svora-6f3df.firebaseio.com/",
    storageBucket: "svora-6f3df.appspot.com",
    projectId: 'svora-6f3df',
  };
export const db = firebase.initializeApp(config).firestore();

const { Timestamp, GeoPoint } = firebase.firestore
export { Timestamp, GeoPoint }
