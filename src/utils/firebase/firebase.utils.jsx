
import {initializeApp} from 'firebase/app';
import {getAuth,signInWithRedirect,signInWithPopup,GoogleAuthProvider,
  createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,onAuthStateChanged}
 from 'firebase/auth';
import {getFirestore,doc,getDoc,setDoc} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCevu4SrrHY0Mb1I93yJVTFIGu6poG7uak",
    authDomain: "stylesavvy-7777.firebaseapp.com",
    projectId: "stylesavvy-7777",
    storageBucket: "stylesavvy-7777.appspot.com",
    messagingSenderId: "922447759716",
    appId: "1:922447759716:web:be1dce5edad4a40891d271"
  };
  
  // Initialize Firebase
  const firebaseapp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({
    prompt : "select_account"
  })

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth,googleProvider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth,googleProvider)    

  export const db = getFirestore()
  export const createUserDocumentFromAuth = async (userAuth,additionalInformation = {}) => {
    if(!userAuth) return;
  const userDocRef = doc(db,'users',userAuth.uid)
  console.log(userDocRef)

  const userSnapshot = await getDoc(userDocRef);
  // console.log(userSnapshot)
  // console.log(userSnapshot.exists());

  if(!userSnapshot.exists()) {
    const{displayName,email} = userAuth;
    const createdAt = new Date();

    try{
      await setDoc(userDocRef,{
        displayName,
        email,
        createdAt,
        ...additionalInformation
      })
    }
    catch(error) {
console.log("error creating the user",error.message);
    }
  }
 return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email,password) => {
  if(!email || !password) return;
 return await createUserWithEmailAndPassword(auth,email,password)
}
export const signInAuthUserWithEmailAndPassword = async (email,password) => {
  if(!email || !password) return;
 return await createUserWithEmailAndPassword(auth,email,password)
}
export const signOutUser = async() => await signOut(auth)

export const onAuthStateChangedListener = (callback)=> 
onAuthStateChanged(auth,callback)