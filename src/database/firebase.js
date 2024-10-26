import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAQKGU0pmlrKsdLAffmreDKFqZEc0-sc1Q",
    authDomain: "basecamp-4a181.firebaseapp.com",
    projectId: "basecamp-4a181",
    storageBucket: "basecamp-4a181.appspot.com",
    messagingSenderId: "202581891050",
    appId: "1:202581891050:web:9f2a57930e84528dc44493"
  };

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const store = getFirestore(app);
const SignInWithGooglePopup = () => signInWithPopup(auth, provider);
export { auth, store, SignInWithGooglePopup };