// src/hooks/useIncomingCall.ts
import { useEffect, useState } from "react";
import { db } from "../../utils/firebaseConfig";
import { onValue, ref, remove } from "firebase/database";

interface CallData {
  from: string;
  fromName: string;
  roomId: string;
  timestamp: number;
}

export const useIncomingCall = (userId: string) => {
  const [incomingCall, setIncomingCall] = useState<CallData | null>(null);

  useEffect(() => {
    if (!userId) return;

    const callRef = ref(db, `calls/${userId}`);
    console.log("call ref",callRef)

    const unsubscribe = onValue(callRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Incoming call data:", data); 
      if (data) {
        setIncomingCall(data);
      }
    });
    

    return () => unsubscribe();
  }, [userId]);
  

  const clearCall = () => {
    // delay remove to let both users navigate
  setTimeout(() => {
    remove(ref(db, `calls/${userId}`));
    setIncomingCall(null);
  }, 3000); 
    // remove(ref(db, `calls/${userId}`));
    // setIncomingCall(null);
  };

  return { incomingCall, clearCall };
};
