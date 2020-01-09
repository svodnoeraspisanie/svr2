import firebase from 'firebase/app';
import 'firebase/firestore';

export const db = firebase.initializeApp({ projectId: 'svora-6f3df' }).firestore();

const { Timestamp, GeoPoint } = firebase.firestore
export { Timestamp, GeoPoint }
