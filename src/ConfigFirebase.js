// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import {getAuth ,indexedDBLocalPersistence} from "firebase/auth";
import {getFirestore, initializeFirestore,persistentSingleTabManager, persistentLocalCache,  CACHE_SIZE_UNLIMITED } from "firebase/firestore"
import { getStorage, ref as storageRef, uploadBytesResumable } from 'firebase/storage';
import {onAuthStateChanged}from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBX3pGNFs0PIRbC-6Y-xNOd4nSk00W4WdQ",
  authDomain: "sgm-pentecostal.firebaseapp.com",
  projectId: "sgm-pentecostal",
  storageBucket: "sgm-pentecostal.appspot.com",
  messagingSenderId: "940394996461",
  appId: "1:940394996461:web:b341efd6e9bdd831e7e2e4"
};





// Initialize Firebase
const app = initializeApp(firebaseConfig);

initializeFirestore(app,
  {localCache:
    persistentLocalCache(/*settings*/{tabManager: persistentSingleTabManager()})
    
});



const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Habilitar el almacenamiento en caché persistente

  



export{auth,db,storage};