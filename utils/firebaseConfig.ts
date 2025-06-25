import { initializeApp } from 'firebase/app';
import { getAuth} from 'firebase/auth';
import { getMessaging } from 'firebase/messaging';
import { getDatabase } from 'firebase/database';


const firebaseConfig = {
    apiKey: "AIzaSyCWu-erLUsLXFSxbD-xKLbS0j3Sd5veNFQ",
    authDomain: "vaidikvibah.firebaseapp.com",
    databaseURL: "https://vaidikvibah-default-rtdb.firebaseio.com",
    projectId: "vaidikvibah",
    storageBucket: "vaidikvibah.firebasestorage.app",
    messagingSenderId: "46448607357",
    appId: "1:46448607357:web:f4601196fab75bfacd7114",
    measurementId: "G-BFY5SQQT5J"
};


const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);
const database = getDatabase(app);
const auth = getAuth(app);


export { app, auth, messaging, database} ;
