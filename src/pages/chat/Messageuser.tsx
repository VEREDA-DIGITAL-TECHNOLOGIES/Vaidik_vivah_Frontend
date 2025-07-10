import { useEffect, useRef, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, push, onValue, off, remove, set } from "firebase/database";
import { toast } from "sonner";

import { useBlockuserMutation, useUnblockuserMutation } from "../../Redux/Api/block.api";
import { useReportuserMutation } from "../../Redux/Api/report.api";
import { db } from "../../../utils/firebaseConfig";
import { ScreenCall } from "../zegocall/ScreenCall";

interface Message {
    senderId: string;
    receiverId: string;
    text: string;
    timestamp: number;
    seen: boolean;
}

export default function Messageuser() {
    const { id: recipientId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const recipientUser = location.state;

    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [showMenu, setShowMenu] = useState(false);
    const [modalAction, setModalAction] = useState<null | "block" | "report">(null);
    const [reportText, setReportText] = useState("");
    const [isBlocked, setIsBlocked] = useState(false);

    const [isCalling, setIsCalling] = useState(false);
    const [callRefPath, setCallRefPath] = useState<string | null>(null);

    const currentUser = getAuth().currentUser;
    const currentUserId = currentUser?.uid;
    const scrollRef = useRef<HTMLDivElement>(null);

    const [blockUser] = useBlockuserMutation();
    const [unblockUser] = useUnblockuserMutation();
    const [reportUser] = useReportuserMutation();
    const [showDeleteModal, setShowDeleteModal] = useState(false);


    useEffect(() => {
                if (!currentUserId || !recipientId) return;
        
                const db = getDatabase();
                const myPath = ref(db, `messages/${currentUserId}/${recipientId}`);
                const theirPath = ref(db, `messages/${recipientId}/${currentUserId}`);
        
                let all: Message[] = [];
        
                const updateMessages = () => {
                    const deduped = all.filter(
                        (msg, index, self) =>
                            index === self.findIndex(
                                (m) =>
                                    m.timestamp === msg.timestamp &&
                                    m.text === msg.text &&
                                    m.senderId === msg.senderId
                            )
                    );
                    deduped.sort((a, b) => a.timestamp - b.timestamp);
                    setMessages(deduped);
                };
        
                const unsubMe = onValue(myPath, (snapshot) => {
                    const data = snapshot.val();
                    const mine = data ? (Object.values(data) as Message[]) : [];
                    all = [...all.filter((m) => m.senderId !== currentUserId), ...mine];
                    updateMessages();
                });
        
                const unsubThem = onValue(theirPath, (snapshot) => {
                    const data = snapshot.val();
                    const theirs = data ? (Object.values(data) as Message[]) : [];
                    all = [...all.filter((m) => m.senderId !== recipientId), ...theirs];
                    updateMessages();
                });
        
                return () => {
                    unsubMe();
                    unsubThem();
                };
            }, [currentUserId, recipientId]);
        

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = () => {
        if (!newMessage.trim() || !currentUserId || !recipientId || isBlocked) return;

        const db = getDatabase();
        const myPath = ref(db, `messages/${currentUserId}/${recipientId}`);
        const theirPath = ref(db, `messages/${recipientId}/${currentUserId}`);

        const message: Message = {
            senderId: currentUserId,
            receiverId: recipientId,
            text: newMessage.trim(),
            timestamp: Date.now(),
            seen: false,
        };

        push(myPath, message).catch((e) => console.error("Error pushing to myPath:", e));
        push(theirPath, message).catch((e) => console.error("Error pushing to theirPath:", e));

        setNewMessage("");
    };

    const handleStartCall = async () => {
        if (!currentUserId || !recipientId) return;

        localStorage.setItem("uid", currentUserId);
        localStorage.setItem("name", currentUser?.displayName || "You");

        const roomId = `${currentUserId}_${recipientId}`;
        const path = `calls/${recipientId}`;
        const callRef = ref(db, path);

        setIsCalling(true);
        setCallRefPath(path);

        await set(callRef, {
            from: currentUserId,
            fromName: currentUser?.displayName || "Unknown",
            roomId,
            status: "pending",
            to: recipientId,
            timestamp: Date.now(),
        });

        let navigated = false;
        const listener = onValue(callRef, (snapshot) => {
            const data = snapshot.val();
            if (data?.status === "accepted" && !navigated) {
                navigated = true;
                off(callRef, "value", listener);
                setIsCalling(false);
                navigate(`/room/${roomId}`);
            }
        });
    };

    const handleCancelCall = async () => {
        if (callRefPath) {
            await remove(ref(db, callRefPath));
            setIsCalling(false);
            setCallRefPath(null);
        }
    };

    const handleAction = (action: "block" | "report") => {
        setShowMenu(false);
        setModalAction(action);
    };

    const confirmAction = async () => {
        if (!recipientId) return;

        try {
            if (modalAction === "block") {
                if (isBlocked) {
                    await unblockUser({ userId: recipientUser.userId });
                    toast.success("User unblocked!");
                    setIsBlocked(false);
                } else {
                    await blockUser({ userId: recipientUser.userId });
                    toast.success("User blocked!");
                    setIsBlocked(true);
                }
            } else if (modalAction === "report") {
                if (!reportText.trim()) {
                    toast.warning("Please write a reason.");
                    return;
                }
                await reportUser({ userId: recipientUser.userId, reason: reportText });
                toast.success("User reported!");
            }
        } catch (err) {
            toast.warning("An error occurred. Please try again.");
        }

        setModalAction(null);
        setReportText("");
    };
    const handleDeleteChat = async () => {
        if (!currentUserId || !recipientId) return;

        try {
            const path = `messages/${currentUserId}/${recipientId}`;
            await remove(ref(getDatabase(), path));
            toast.success("Chat deleted");
            setMessages([]); // Clear UI
            setShowDeleteModal(false);
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete chat");
        }
    };
      

    return (
        <div className="flex flex-col max-w-5xl mt-8 mb-3 mx-auto border  rounded-2xl shadow-lg overflow-hidden">
          <ScreenCall />
      
          {/* Header */}
          <div className="sticky top-0 z-40 bg-gradient-to-r from-[#FD5C90] to-[#f689ab] flex justify-between items-center p-4 text-white">
            <div className="flex items-center gap-3">
              <img
                src={recipientUser?.profilePic || "/default-avatar.png"}
                alt={recipientUser?.displayName}
                className="w-12 h-12 rounded-full border-2 border-white shadow-md"
              />
              <div>
                <h2 className="text-lg font-bold">{recipientUser?.displayName || "Chat"}</h2>
                <p className="text-sm text-white/90">Online</p>
              </div>
            </div>
      
            <div className="relative flex items-center gap-3">
              <button
                onClick={handleStartCall}
                        className="bg-white cursor-pointer text-[#FD5C90] px-4 py-1 rounded-full border border-white shadow hover:bg-[#FD5C90] hover:text-white transition text-sm"
              >
                Call
              </button>
      
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="text-2xl cursor-pointer font-bold focus:outline-none"
              >
                ⋮
              </button>
      
              {/* Dropdown Menu */}
              {showMenu && (
                <div className="absolute text-black right-0 top-10 w-44 bg-white border rounded-xl shadow-lg z-[9999] overflow-hidden">
                  <button
                    onClick={() => handleAction("block")}
                    className="w-full px-4 py-2 text-left hover:bg-[#FD5C90]/20 text-sm cursor-pointer"
                  >
                    {isBlocked ? "Unblock" : "Block"}
                  </button>
                  <button
                    onClick={() => handleAction("report")}
                                className="w-full px-4 py-2 text-left hover:bg-[#FD5C90]/20 text-sm cursor-pointer"
                  >
                    Report
                  </button>
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      setShowDeleteModal(true);
                    }}
                                className="w-full px-4 py-2 text-left text-red-500 hover:bg-red-100 text-sm cursor-pointer"
                  >
                    Delete Chat
                  </button>
                </div>
              )}
            </div>
          </div>
      
          {/* Calling Modal */}
          {isCalling && (
            <div className="fixed inset-0  bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl p-8 shadow-xl text-center w-80">
                <p className="text-xl font-semibold mb-6">Calling...</p>
                <button
                  onClick={handleCancelCall}
                            className="bg-red-500 text-white cursor-pointer px-6 py-2 rounded-full hover:bg-red-600 transition"
                >
                  Cancel Call
                </button>
              </div>
            </div>
          )}
      
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm shadow-sm break-words ${
                  msg.senderId === currentUserId
                    ? "bg-[#FD5C90] text-white ml-auto"
                    : "bg-gray-200 text-gray-900 mr-auto"
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={scrollRef} />
          </div>
      
          {/* Message Input */}
          <div className="flex items-center gap-2 p-4 border-t bg-white">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={isBlocked ? "You blocked this user." : "Type a message..."}
              disabled={isBlocked}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            />
            <button
              onClick={handleSendMessage}
              disabled={isBlocked}
                    className="px-4 py-2 bg-[#FD5C90] cursor-pointer text-white rounded-full hover:bg-[#e64c83] transition"
            >
              Send
            </button>
          </div>
      
          {/* Block/Report Modal */}
          {modalAction && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[9999]">
              <div className="bg-white p-6 rounded-2xl shadow-lg w-80 text-center">
                <h2 className="text-lg font-semibold mb-4">
                  {modalAction === "block"
                    ? isBlocked
                      ? "Unblock User"
                      : "Block User"
                    : "Report User"}
                </h2>
                {modalAction === "report" ? (
                  <textarea
                    value={reportText}
                    onChange={(e) => setReportText(e.target.value)}
                    className="w-full border border-gray-300 rounded p-2 mb-4"
                    rows={4}
                    placeholder="Write your report..."
                  />
                ) : (
                  <p className="mb-6">
                    Are you sure you want to {isBlocked ? "unblock" : "block"} this user?
                  </p>
                )}
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setModalAction(null)}
                                className="px-4 py-2 bg-gray-300 cursor-pointer text-black rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmAction}
                                className="px-4 py-2 cursor-pointer bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
      
          {/* Delete Modal */}
          {showDeleteModal && (
            <div className="fixed inset-0  bg-opacity-40 flex items-center justify-center z-[9999]">
              <div className="bg-white p-6 rounded-2xl shadow-lg w-80 text-center">
                <h2 className="text-lg font-semibold mb-4">Delete Chat</h2>
                <p className="mb-4 text-sm text-gray-600">
                  Are you sure you want to delete this conversation? This action cannot be undone.
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 cursor-pointer bg-gray-300 text-black rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteChat}
                                className="px-4 py-2 cursor-pointer bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
      

    // return (
    //     <div className="flex flex-col max-w-5xl mt-8 mb-3 mx-auto border bg-white rounded shadow-md">
    //         <ScreenCall />

    //         {/* Header */}
    //         <div className="sticky top-0 z-50 bg-[#f689ab] flex justify-between items-center p-4 border-b shadow-sm">
    //             <div className="flex items-center gap-3">
    //                 <img
    //                     src={recipientUser?.profilePic || "/default-avatar.png"}
    //                     alt={recipientUser?.displayName}
    //                     className="w-10 h-10 rounded-full object-cover"
    //                 />
    //                 <div>
    //                     <h2 className="text-lg font-semibold text-gray-800">
    //                         {recipientUser?.displayName || "Chat"}
    //                     </h2>
    //                     <p className="text-sm text-gray-100">Online</p>
    //                 </div>
    //             </div>

    //             <div className="relative flex items-center gap-3 z-50">
    //                 <button
    //                     onClick={handleStartCall}
    //                     className="bg-white text-[#FD5C90] border border-[#FD5C90] px-3 py-1 rounded-full hover:bg-[#FD5C90] hover:text-white transition text-sm cursor-pointer"
    //                 >
    //                     Call
    //                 </button>

    //                 {isCalling && (
    //                     <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
    //                         <div className="bg-white rounded-xl shadow-xl p-9 text-center w-90">
    //                             <p className="text-lg font-semibold mb-4">Calling...</p>
    //                             <div className="flex justify-center">
    //                                 <button
    //                                     onClick={handleCancelCall}
    //                                     className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
    //                                 >
    //                                     Cancel Call
    //                                 </button>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 )}

    //                 <div className="relative">
    //                     <button
    //                         onClick={() => setShowMenu(!showMenu)}
    //                         className="text-white text-2xl hover:text-gray-200 focus:outline-none cursor-pointer"
    //                     >
    //                         ⋮
    //                     </button>
    //                     {showMenu && (
    //                         <div className="absolute right-0 top-8 w-40 bg-white border rounded shadow z-[9999]">
    //                             <button
    //                                 onClick={() => handleAction("block")}
    //                                 className="w-full px-4 py-2 text-left hover:bg-[#FD5C90] text-sm cursor-pointer"
    //                             >
    //                                 {isBlocked ? "Unblock" : "Block"}
    //                             </button>
    //                             <button
    //                                 onClick={() => handleAction("report")}
    //                                 className="w-full px-4 py-2 text-left hover:bg-[#FD5C90] text-sm cursor-pointer"
    //                             >
    //                                 Report
    //                             </button>
    //                             <button
    //                                 onClick={() => {
    //                                     setShowMenu(false);
    //                                     setShowDeleteModal(true);
    //                                 }}
    //                                 className="w-full px-4 py-2 text-left hover:bg-red-100 text-sm cursor-pointer text-red-500"
    //                             >
    //                                 Delete Chat
    //                             </button>
                               
    //                         </div>
    //                     )}
    //                 </div>
    //             </div>
    //         </div>

    //         {/* Modal */}
    //         {modalAction && (
    //             <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-[9999]">
    //                 <div className="bg-white p-6 rounded-lg shadow-md w-80 text-center">
    //                     <h2 className="text-lg font-semibold mb-4">
    //                         {modalAction === "block"
    //                             ? isBlocked
    //                                 ? "Unblock User"
    //                                 : "Block User"
    //                             : "Report User"}
    //                     </h2>
    //                     {modalAction === "report" ? (
    //                         <textarea
    //                             value={reportText}
    //                             onChange={(e) => setReportText(e.target.value)}
    //                             className="w-full border border-gray-300 rounded p-2 mb-4"
    //                             rows={4}
    //                             placeholder="Write your report..."
    //                         />
    //                     ) : (
    //                         <p className="mb-6">
    //                             Are you sure you want to {isBlocked ? "unblock" : "block"} this user?
    //                         </p>
    //                     )}
    //                     <div className="flex justify-center gap-4">
    //                         <button
    //                             onClick={() => setModalAction(null)}
    //                             className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
    //                         >
    //                             Cancel
    //                         </button>
    //                         <button
    //                             onClick={confirmAction}
    //                             className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
    //                         >
    //                             Confirm
    //                         </button>
    //                     </div>
                       
    //                 </div>
    //             </div>
    //         )}
    //         {showDeleteModal && (
    //             <div className="fixed inset-0  bg-opacity-40 flex items-center justify-center z-[9999]">
    //                 <div className="bg-white p-6 rounded-lg shadow-md w-80 text-center">
    //                     <h2 className="text-lg font-semibold mb-4">Delete Chat</h2>
    //                     <p className="mb-4">Are you sure you want to delete this conversation? This action cannot be undone.</p>
    //                     <div className="flex justify-center gap-4">
    //                         <button
    //                             onClick={() => setShowDeleteModal(false)}
    //                             className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
    //                         >
    //                             Cancel
    //                         </button>
    //                         <button
    //                             onClick={handleDeleteChat}
    //                             className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
    //                         >
    //                             Delete
    //                         </button>
    //                     </div>
    //                 </div>
    //             </div>
    //         )}


    //         {/* Chat messages */}
    //         <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 bg-gray-50">
    //             {messages.map((msg, index) => (
    //                 <div
    //                     key={index}
    //                     className={`max-w-[70%] px-4 py-2 rounded-xl shadow-sm text-sm ${msg.senderId === currentUserId
    //                             ? "bg-[#FD5C90] text-white ml-auto"
    //                             : "bg-gray-200 text-gray-900 mr-auto"
    //                         }`}
    //                 >
    //                     {msg.text}
    //                 </div>
    //             ))}
    //             <div ref={scrollRef} />
    //         </div>

    //         {/* Message Input */}
    //         <div className="flex items-center gap-2 p-4 border-t bg-white">
    //             <input
    //                 type="text"
    //                 value={newMessage}
    //                 onChange={(e) => setNewMessage(e.target.value)}
    //                 placeholder={isBlocked ? "You blocked this user." : "Type a message..."}
    //                 className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
    //                 disabled={isBlocked}
    //                 onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
    //             />
    //             <button
    //                 onClick={handleSendMessage}
    //                 disabled={isBlocked}
    //                 className="px-4 py-2 bg-[#FD5C90] text-white rounded-full hover:bg-[#e64c83] transition"
    //             >
    //                 Send
    //             </button>
    //         </div>
    //     </div>
    // );
}









// import { useEffect, useRef, useState } from "react";
// import { useParams, useLocation } from "react-router-dom";
// import { getAuth } from "firebase/auth";
// import { getDatabase, ref, push, onValue } from "firebase/database";

// interface Message {
//     senderId: string;
//     receiverId: string;
//     text: string;
//     timestamp: number;
//     seen: boolean;
// }

// export default function Messageuser() {
//     const { id: recipientId } = useParams();
//     const location = useLocation();
//     const recipientUser = location.state;

//     const [messages, setMessages] = useState<Message[]>([]);
//     const [newMessage, setNewMessage] = useState("");
//     const scrollRef = useRef<HTMLDivElement>(null);

//     const currentUser = getAuth().currentUser;
//     const currentUserId = currentUser?.uid;

//     useEffect(() => {
//         if (!currentUserId || !recipientId) return;

//         const db = getDatabase();
//         const myPath = ref(db, `messages/${currentUserId}/${recipientId}`);
//         const theirPath = ref(db, `messages/${recipientId}/${currentUserId}`);

//         let all: Message[] = [];

//         const updateMessages = () => {
//             const deduped = all.filter(
//                 (msg, index, self) =>
//                     index === self.findIndex(
//                         (m) =>
//                             m.timestamp === msg.timestamp &&
//                             m.text === msg.text &&
//                             m.senderId === msg.senderId
//                     )
//             );
//             deduped.sort((a, b) => a.timestamp - b.timestamp);
//             setMessages(deduped);
//         };

//         const unsubMe = onValue(myPath, (snapshot) => {
//             const data = snapshot.val();
//             const mine = data ? (Object.values(data) as Message[]) : [];
//             all = [...all.filter((m) => m.senderId !== currentUserId), ...mine];
//             updateMessages();
//         });

//         const unsubThem = onValue(theirPath, (snapshot) => {
//             const data = snapshot.val();
//             const theirs = data ? (Object.values(data) as Message[]) : [];
//             all = [...all.filter((m) => m.senderId !== recipientId), ...theirs];
//             updateMessages();
//         });

//         return () => {
//             unsubMe();
//             unsubThem();
//         };
//     }, [currentUserId, recipientId]);

//     useEffect(() => {
//         scrollRef.current?.scrollIntoView({ behavior: "smooth" });
//     }, [messages]);

//     const handleSendMessage = () => {
//         if (!newMessage.trim() || !currentUserId || !recipientId) return;

//         const db = getDatabase();
//         const myPath = ref(db, `messages/${currentUserId}/${recipientId}`);
//         const theirPath = ref(db, `messages/${recipientId}/${currentUserId}`);

//         const message: Message = {
//             senderId: currentUserId,
//             receiverId: recipientId,
//             text: newMessage.trim(),
//             timestamp: Date.now(),
//             seen: false,
//         };

//         push(myPath, message);
//         push(theirPath, message);
//         setNewMessage("");
//     };

//     return (
//         <div className="flex flex-col h-screen max-w-4xl mt-8 mb-3 mx-auto border bg-white rounded shadow-md">
//             {/* Header */}
//             <div className="sticky top-0 z-10 bg-[#f689ab] flex items-center gap-3 p-4 border-b shadow-sm">
//                 <img
//                     src={recipientUser?.profilePic || "/default-avatar.png"}
//                     alt={recipientUser?.displayName}
//                     className="w-10 h-10 rounded-full object-cover"
//                 />
//                 <div>
//                     <h2 className="text-lg font-semibold text-gray-800">
//                         {recipientUser?.displayName || "Chat"}
//                     </h2>
//                     <p className="text-sm text-gray-500">Online</p>
//                 </div>
//             </div>

//             {/* Messages */}
//             <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 bg-gray-50">
//                 {messages.map((msg, index) => (
//                     <div
//                         key={index}
//                         className={`max-w-[70%] px-4 py-2 rounded-xl shadow-sm text-sm ${msg.senderId === currentUserId
//                             ? "bg-[#FD5C90] text-white ml-auto animate-fadeIn"
//                                 : "bg-gray-200 text-gray-900 mr-auto animate-fadeIn"
//                             }`}
//                     >
//                         {msg.text}
//                     </div>
//                 ))}
                
//             </div>

//             {/* Input */}
//             <div className="flex items-center gap-2 p-4 border-t bg-white">
//                 <input
//                     type="text"
//                     value={newMessage}
//                     onChange={(e) => setNewMessage(e.target.value)}
//                     placeholder="Type a message..."
//                     className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
//                     onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
//                 />
//                 <button
//                     onClick={handleSendMessage}
//                     className="px-4 py-2 bg-[#FD5C90] text-white rounded-full hover:bg-[#FD5C90] cursor-pointer transition"
//                 >
//                     Send
//                 </button>
//             </div>
//         </div>
//     );
// }
