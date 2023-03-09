import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword
  } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBC-Ijv6jtK6C-QrOY71PkTZepN7TQkUKk",
    authDomain: "crwn-clothing-db-d6cfb.firebaseapp.com",
    projectId: "crwn-clothing-db-d6cfb",
    storageBucket: "crwn-clothing-db-d6cfb.appspot.com",
    messagingSenderId: "1051803836021",
    appId: "1:1051803836021:web:fde47e9cd6ecd8c271223c"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async (
  userAuth, additionalInformation = {}
) => {
  if (!userAuth) return;
  const userDocRef = new doc(db, 'users', userAuth.uid);

  console.log(userDocRef)

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
          await setDoc(userDocRef, {
            displayName,
            email,
            createdAt,
            ...additionalInformation
          });
        } catch (error) {
          console.log('error creating the user', error.message);
        }
  }
  return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return alert("Password does not match");

  return await createUserWithEmailAndPassword(auth, email, password);
};