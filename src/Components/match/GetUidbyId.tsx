import { ref, query, orderByChild, equalTo, get } from "firebase/database";
import { database } from "../../../utils/firebaseConfig";


export const getUidFromUserId = async (userId:string) => {
  const usersRef = ref(database, "users");

  const q = query(usersRef, orderByChild("userId"), equalTo(userId));
  const snapshot = await get(q);

  if (snapshot.exists()) {
    const data = snapshot.val();

    // Firebase object hota hai → first key uid hoti hai
    const uid = Object.keys(data)[0];
    return uid;
  }

  return null;
};
