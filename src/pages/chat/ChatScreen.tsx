import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { getDatabase, ref as rtdbRef, onValue } from "firebase/database";
import { FaMicrophone, FaSearch } from "react-icons/fa";
import { format } from "date-fns";


interface UserModel {
    id: string;
    userId: string;
    displayName: string;
    firstName: string;
    lastName: string;
    profilePic: string;
    fcmToken: string;
    isOnline: boolean;
}

export default function ChatScreen() {
    const [users, setUsers] = useState<UserModel[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [unseenCount, setUnseenCount] = useState<{ [key: string]: number }>({});
    const [lastMessages, setLastMessages] = useState<{ [key: string]: any }>({});

    const currentUser = getAuth().currentUser;
    const navigate = useNavigate();
   

    useEffect(() => {
        const realtimeDb = getDatabase();
        const usersRef = rtdbRef(realtimeDb, "users");

        const unsubscribe = onValue(usersRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const usersArray = Object.entries(data).map(([id, user]) => ({
                    id,
                    ...(user as any),
                }));
                setUsers(usersArray);
            } else {
                setUsers([]);
            }
        });

        return () => unsubscribe();
    }, []);
    
    const handleChatOpen = (user: UserModel) => {
        navigate(`/chat/${user.id}`, { state: user });
    };

    const filteredUsers = users.filter(
        (user) =>
            user.id !== currentUser?.uid &&
            (user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="p-4 max-w-6xl mx-auto mt-9">
            <div className="flex items-center mb-4">
                <img
                    src={currentUser?.photoURL || "/default-avatar.png"}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full mr-3"
                />
                <h1 className="text-3xl font-bold text-gray-800">Message</h1>
            </div>

            <div className="mb-4">
                <div className="flex items-center bg-gray-100 p-2 rounded">
                    <FaSearch className="text-gray-500 mx-2" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search"
                        className="bg-transparent outline-none flex-1"
                    />
                    <FaMicrophone className="text-gray-800 mr-2" />
                </div>
            </div>

            <div className="flex justify-between items-center mb-2">
                <h2 className="text-sm font-medium text-gray-800">People</h2>
                <button className="text-sm text-[#FD5C90]">View All</button>
            </div>

            <div className="overflow-x-auto flex space-x-4 mb-4">
                {filteredUsers.map((user) => (
                    <div
                        key={user.id}
                        className="flex flex-col items-center cursor-pointer"
                        onClick={() => handleChatOpen(user)}
                    >
                        <img
                            src={user.profilePic || "/default-avatar.png"}
                            alt={user.displayName}
                            className="w-16 h-16 rounded-full mb-1 border"
                        />
                        <span className="text-sm text-gray-700">{user.firstName}</span>
                    </div>
                ))}
            </div>

            <div className="divide-y text-[#FD5C90]">
                {filteredUsers.map((user) => {
                    const message = lastMessages[user.id] || {};
                    const formattedTime = message.timestamp
                        ? format(new Date(message.timestamp), "hh:mm a")
                        : "";

                    return (
                        <div
                            key={user.id}
                            className="flex justify-between items-center py-3 cursor-pointer"
                            onClick={() => handleChatOpen(user)}
                        >
                            <div className="flex items-center">
                                <img
                                    src={user.profilePic || "/default-avatar.png"}
                                    alt={user.displayName}
                                    className="w-10 h-10 rounded-full mr-3"
                                />
                                <div>
                                    <p className="font-semibold text-gray-800">{user.displayName}</p>
                                    <p className="text-sm text-[#FD5C90]">
                                        {message.text || "Say hi!"}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-gray-500">{formattedTime}</p>
                                {unseenCount[user.id] > 0 && (
                                    <div className="bg-[#FD5C90] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center mx-auto">
                                        {unseenCount[user.id]}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
