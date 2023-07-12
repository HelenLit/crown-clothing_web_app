import {initializeApp} from 'firebase/app';
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDV-KVM0W-MYxAZ0AeRMAdVHGtha56I2Is",
    authDomain: "crwn-clothing-db-f41bd.firebaseapp.com",
    projectId: "crwn-clothing-db-f41bd",
    storageBucket: "crwn-clothing-db-f41bd.appspot.com",
    messagingSenderId: "969975909261",
    appId: "1:969975909261:web:12b8a521f7386b6ef8cbc4"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt:"select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

