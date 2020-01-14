import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/analytics';

const config = {

    apiKey: "AIzaSyBUrnt50CnPcbG0EvIVsoQawYC_rHyzlQ0",
    authDomain: "svora-6f3df.firebaseapp.com",
    databaseURL: "https://svora-6f3df.firebaseio.com",
    projectId: "svora-6f3df",
    storageBucket: "svora-6f3df.appspot.com",
    messagingSenderId: "983691734839",
    appId: "1:983691734839:web:27960e6410c29c7f4eb4b2",
    measurementId: "G-HQ0W3ZDMQ9"
};


firebase.initializeApp(config);
firebase.analytics();
export const db = firebase.firestore();
export const st = firebase.storage();
const { Timestamp, GeoPoint } = firebase.firestore;
export { Timestamp, GeoPoint };
