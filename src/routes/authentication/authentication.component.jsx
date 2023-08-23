import {auth, signInWithGooglePopup,createUserDocumentFromAuth,signInWithGoogleRedirect } from "../../utils/firebase/firebase.utils";
import { useEffect } from 'react';
import './authentication.styles.scss';
import {getRedirectResult} from 'firebase/auth';
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form copy/sign-in-form.component";
  const Authentication = () => {
    // const doStuff = async () => {
    //   const response = await getRedirectResult(auth);
    //  console.log(response)
    // };
      const logMe = async() =>  {
      const response = await getRedirectResult(auth)
      if(response) {
        const userDocRef = await createUserDocumentFromAuth(response.user)
      }
      }
     useEffect( () => {
      logMe()

      // doStuff();
     },[])
  

  return (
    <div className="authentication-container">
        <SignInForm />
        <SignUpForm />
    </div>
  );
};
export default Authentication;
