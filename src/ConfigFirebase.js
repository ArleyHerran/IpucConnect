// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import {getAuth ,indexedDBLocalPersistence} from "firebase/auth";
import {getFirestore, initializeFirestore,persistentSingleTabManager, persistentLocalCache,  CACHE_SIZE_UNLIMITED } from "firebase/firestore"
import { getStorage, ref as storageRef, uploadBytesResumable } from 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyCst8aj8MmrZxOm6xXSrdOYiYW8QnJNHiY",
  authDomain: "ipuc-connet.firebaseapp.com",
  projectId: "ipuc-connet",
  storageBucket: "ipuc-connet.appspot.com",
  messagingSenderId: "565330644497",
  appId: "1:565330644497:web:55a51dee248c7180e4ebb0"
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