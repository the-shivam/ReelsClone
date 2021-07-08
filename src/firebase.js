import firebase from "firebase/app"
import "firebase/auth"
import "firebase/storage"
import "firebase/firestore"

firebase.initializeApp(
    {
        apiKey: "AIzaSyDIbI3bj_YRlJrB2KcDnVuCMdGh4OIlHhI",
        authDomain: "reels-5d4cc.firebaseapp.com",
        projectId: "reels-5d4cc",
        storageBucket: "reels-5d4cc.appspot.com",
        messagingSenderId: "343916608465",
        appId: "1:343916608465:web:760f63fff5619464c13ef0"
    }
)

export const auth = firebase.auth();
const firestore = firebase.firestore();
export const database = {
    users: firestore.collection('users'),
    getCurrentTimeStamp: firebase.firestore.FieldValue.serverTimestamp
}

export const storage = firebase.storage();

