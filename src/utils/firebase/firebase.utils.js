import {initializeApp} from 'firebase/app';
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import  {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';
import {findRenderedComponentWithType} from "react-dom/test-utils";
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

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try{
            await setDoc(userDocRef, {displayName, email, createdAt});
        }catch (error){
            console.log('Error creating user', error.message)
        }
    };
    return userDocRef;
}
