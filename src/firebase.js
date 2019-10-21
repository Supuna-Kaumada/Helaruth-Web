import * as firebase from 'firebase';
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDs1yXvgcD6CqxWByk3oJLP2RtJKFeM08w",
    authDomain: "helaruth.firebaseapp.com",
    databaseURL: "https://helaruth.firebaseio.com",
    projectId: "helaruth",
    storageBucket: "helaruth.appspot.com",
    messagingSenderId: "524070784613",
    appId: "1:524070784613:web:34d5d6bf32b2d41e41408c"
};
// Initialize Firebase
var fire = firebase.initializeApp(firebaseConfig);

export const database = firebase.database().ref('/Requests');
export const database2 = firebase.database().ref('/Words');
export default fire;