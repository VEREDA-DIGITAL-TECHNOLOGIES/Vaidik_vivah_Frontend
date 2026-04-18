import { messaging } from "../../utils/firebaseConfig";
import { onMessage } from "firebase/messaging";
import { store } from "../Redux/store";
import { setsocketNotification } from "../Redux/Reducers/notification.reducers";
interface INotification {
  notificationId: string;
  title: string;
  message: string;
  body: IBody;
}
interface IBody {
  notificationId: string;
  type: string;
  senderId: string;
  senderName: string;
  senderImage: string;
  message: string;
}
let initialized = false;
const receivedIds = new Set<string>(); // prevent duplicates

export const initFCMListener = () => {
  if (initialized) return;
  initialized = true;

  onMessage(messaging, (payload) => {
    try {
      console.log("FCM:", payload);

      // 🔥 SAFE EXTRACTION
      const notification = payload?.notification || {};
      const data = payload?.data || {};

      // 🔥 ID HANDLING (important for dedupe)
      const notificationId =
        data?.notificationId ||
        data?.id ||
        payload?.messageId ||
        Date.now().toString();

      // 🔥 DEDUPLICATION (prevents double dispatch)
      if (receivedIds.has(notificationId)) return;
      receivedIds.add(notificationId);

      // 🔥 NORMALIZED OBJECT (matches your UI expectations)
      const newNotification: INotification = {
  notificationId,

  title:
    notification.title ||
    data.title ||
    "Notification",

  message:
    notification.body ||
    data.message ||
    data.body ||
    "You have a new update",

  body: {
    notificationId,

    type: data?.type || "",

    senderId: data?.senderId || "",

    senderName: data?.senderName || "",

    senderImage: data?.senderImage || "",

    message:
      data?.message ||
      notification.body ||
      "You have a new update",
  },
};

store.dispatch(setsocketNotification(newNotification));

      // 🔥 OPTIONAL: browser notification (safe)
      if (Notification.permission === "granted") {
        const n = new Notification(newNotification.title, {
          body: newNotification.message,
        });

        // optional click redirect
        n.onclick = () => {
          window.focus();
          window.location.href = "/user-dashboard";
        };
      }

    } catch (error) {
      console.error("FCM handler error:", error);
    }
  });
};