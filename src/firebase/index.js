import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyDZk2nQ9J7ebJFo5vc1MKJ4XkuJv207Dp8",
    authDomain: "reactjs-5a1bf.firebaseapp.com",
    projectId: "reactjs-5a1bf",
    storageBucket: "reactjs-5a1bf.appspot.com",
    messagingSenderId: "944547180432",
    appId: "1:944547180432:web:e60ac8d40bea73cb314d15",
    measurementId: "G-VYM9762SJY"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;