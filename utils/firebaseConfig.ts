import { initializeApp } from 'firebase/app';
import { getAuth} from 'firebase/auth';
import { getMessaging } from 'firebase/messaging';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
   apiKey: "AIzaSyBW-74U1EYlfU0Y5KT-bFu-goWYk_VadJg",
  authDomain: "ved-vivah-7ae12.firebaseapp.com",
  databaseURL: "https://ved-vivah-7ae12-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ved-vivah-7ae12",
  storageBucket: "ved-vivah-7ae12.firebasestorage.app",
  messagingSenderId: "1024620095064",
  appId: "1:1024620095064:web:f815fb002df84044ae0c2d",
  measurementId: "G-V8JGSR13QP"
};


const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);
const database = getDatabase(app);
const auth = getAuth(app);
// Get the storage
const storage = getStorage(app);
export const db = getDatabase(app);

export { app, auth, messaging, database,storage} ;
