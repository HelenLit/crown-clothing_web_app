import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInWithGoogleRedirect,
    auth
} from '../../utils/firebase/firebase.utils';
import {useEffect} from "react";
import {getRedirectResult} from "firebase/auth";

import SignUpForm from "../../components/sign-up/sign-up-form.component";

const SignIn = () => {
    // useEffect(  () => {
    //     //when I made effect function in useEffect async, I got an error 'destroy is not a function'
    //     //So I found solution in this inner async function 'asyncFunction'
    //     const asyncFunction = async () =>{
    //         const response = await getRedirectResult(auth);
    //         if(response){
    //             const userDocRef = await createUserDocumentFromAuth(response.user);
    //             console.log(userDocRef);
    //         }
    //     }
    //     asyncFunction();
    // }, []);

    const logGoogleUser = async () =>{
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }
    return(
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign in with Google Popup</button>
            {/*<button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button>*/}
            <SignUpForm/>
        </div>
    )
}
export default SignIn;