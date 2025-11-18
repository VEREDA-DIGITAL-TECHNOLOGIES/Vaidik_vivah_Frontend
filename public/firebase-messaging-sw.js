


// In firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");

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

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(async (payload) => {
    console.log("[firebase-messaging-sw.js] Received background message", payload);

    const notificationTitle = `${payload.data.title} from ${payload.data.senderName}`;
    const notificationOptions = {
        body: payload.body,
        icon: payload.data.senderImage,
        data: {
            receiverId: payload.data.receiverId,
            receiverFCM: payload.data.receiverFCM,
            senderId: payload.data.senderId,
            senderFCM: payload.data.senderFCM,
            senderName: payload.data.senderName,
        },
    };

    console.log(payload)


    // Show notification
    self.registration.showNotification(notificationTitle, notificationOptions);
});
