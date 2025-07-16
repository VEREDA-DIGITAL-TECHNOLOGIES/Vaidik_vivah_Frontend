import { ref, update } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { db } from "../../../utils/firebaseConfig";

const CallReceiverPopup = ({ call, clearCall }: any) => {
  const navigate = useNavigate();

  const acceptCall = async () => {
    await update(ref(db, `calls/${call.to}`), {
      status: "accepted",
    });

    localStorage.setItem("uid", call.roomId.split("_")[1]);
    localStorage.setItem("name", "You");

    navigate(`/${call.type}-call/${call.roomId}`);
  };

  const rejectCall = () => {
    clearCall();
  };

  return (
    <div className="fixed top-6 right-6 bg-white border shadow-xl rounded-xl p-4 z-50">
      <p className="text-lg font-semibold">{call.fromName} is calling you</p>
      <div className="flex justify-end gap-3 mt-4">
        <button onClick={acceptCall} className="bg-green-500 text-white px-3 py-1 rounded">Accept</button>
        <button onClick={rejectCall} className="bg-red-500 text-white px-3 py-1 rounded">Reject</button>
      </div>
    </div>
  );
};

export default CallReceiverPopup;
