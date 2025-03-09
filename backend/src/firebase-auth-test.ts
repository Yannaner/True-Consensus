import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
});

async function testFirebaseAuth() {
  try {
    const email = 'turtle@example.com';
    const password = 'password123';
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('User created:', userCredential.user);

    const loginCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('User logged in:', loginCredential.user);


//< ------------------------------------------------------------ >
    // Display the access token
    const idToken = await loginCredential.user.getIdToken();
    console.log('ID Token:', idToken); 


    // Display the UID
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    console.log('Decoded Token UID:', decodedToken.uid); 
//< ------------------------------------------------------------ >

  } catch (error) {
    console.error('Error:', error);
  }
}

testFirebaseAuth();