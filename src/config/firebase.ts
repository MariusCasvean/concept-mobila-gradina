// Import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAvhnbePlO8nzEyVWH3PBAY4c0g20KiygE',
  authDomain: 'concept-mobila-gradina.firebaseapp.com',
  databaseURL: 'https://concept-mobila-gradina-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'concept-mobila-gradina',
  storageBucket: 'concept-mobila-gradina.firebasestorage.app',
  messagingSenderId: '215351369846',
  appId: '1:215351369846:web:e9454538bd3a5d7326bf57',
  measurementId: 'G-TPNPMB6P9C',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

export {
  analytics,
  app,
}
