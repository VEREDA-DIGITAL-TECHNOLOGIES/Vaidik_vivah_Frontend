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

// 🔥 HANDLE BACKGROUND NOTIFICATIONS (TAB CLOSED)
messaging.onBackgroundMessage(async (payload) => {
  console.log("[firebase-messaging-sw.js] Received background message", payload);

  // ✅ SUPPORT BOTH OLD + NEW PAYLOADS

  const title =
    (payload?.data?.title && payload?.data?.senderName
      ? `${payload.data.title} from ${payload.data.senderName}`
      : null) ||
    payload?.notification?.title ||
    payload?.data?.title ||
    "Notification";

  const body =
    payload?.notification?.body ||
    payload?.data?.message ||
    payload?.data?.body ||
    "You have a new update";

  const notificationOptions = {
    body,

    icon:
      payload?.data?.senderImage ||
      "https://vedvivah.com/logotest3.png",

    data: {
      // ✅ KEEP OLD DATA (your existing system)
      receiverId: payload?.data?.receiverId,
      receiverFCM: payload?.data?.receiverFCM,
      senderId: payload?.data?.senderId,
      senderFCM: payload?.data?.senderFCM,
      senderName: payload?.data?.senderName,

      // ✅ NEW: handle redirect link
      url:
        payload?.fcmOptions?.link ||
        payload?.data?.link ||
        "/user-dashboard",
    },
  };

  // 🔔 SHOW NOTIFICATION
  self.registration.showNotification(title, notificationOptions);
});


// 🔥 HANDLE CLICK ON NOTIFICATION
self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  const url = event.notification?.data?.url;

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      // If already open → focus
      for (const client of clientList) {
        if (client.url.includes(url) && "focus" in client) {
          return client.focus();
        }
      }

      // Else open new tab
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});