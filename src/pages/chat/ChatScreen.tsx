import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { getDatabase, ref as rtdbRef, onValue } from "firebase/database";
import { FaMicrophone, FaSearch } from "react-icons/fa";
import { format } from "date-fns";
import { useGetConnectionStatusMutation } from "../../Redux/Api/connection.api";

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
    // const [users, setUsers] = useState<UserModel[]>([]);
    const [connectedUsers, setConnectedUsers] = useState<UserModel[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [unseenCount, ] = useState<{ [key: string]: number }>({});
    const [lastMessages, ] = useState<{ [key: string]: any }>({});

    const currentUser = getAuth().currentUser;
    const navigate = useNavigate();
    const [getConnectionStatus] = useGetConnectionStatusMutation();

    useEffect(() => {
        const realtimeDb = getDatabase();
        const usersRef = rtdbRef(realtimeDb, "users");

        const unsubscribe = onValue(usersRef, async (snapshot) => {
            const data = snapshot.val();
            if (data && currentUser) {
                const rawUsers: UserModel[] = Object.entries(data).map(([id, user]) => ({
                    id,
                    ...(user as any),
                }));

                console.log("All users from Realtime Database:", rawUsers);

                const filtered = rawUsers.filter((user) => user.id !== currentUser.uid);

                const connections = await Promise.all(
                    filtered.map(async (user) => {
                        if (!user.userId) return null;
                        try {
                            const res: any = await getConnectionStatus(user.userId).unwrap();
                            if (res?.data?.connection_status === "accepted") return user;
                            return null;
                        } catch {
                            return null;
                        }
                    })
                );

                setConnectedUsers(connections.filter(Boolean) as UserModel[]);
            }
        });

        return () => unsubscribe();
    }, [currentUser, getConnectionStatus]);

    const handleChatOpen = (user: UserModel) => {
        navigate(`/chat/${user.id}`, { state: user });
    };

    const searchedUsers = connectedUsers.filter(
        (user) =>
            user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.lastName?.toLowerCase().includes(searchTerm.toLowerCase())
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
                {searchedUsers.map((user) => (
                    <div
                        key={user.id}
                        className="flex flex-col items-center cursor-pointer hover:scale-105 transition"
                        onClick={() => handleChatOpen(user)}
                    >
                        <img
                            src={user.profilePic || "/default-avatar.png"}
                            alt={user.displayName}
                            className="w-16 h-16 rounded-full border-2 border-[#007EAF] mb-2"
                        />
                        <span className="text-sm text-gray-700">{user.firstName}</span>
                    </div>
                ))}
            </div>

            <div className="divide-y text-[#FD5C90]">
                {searchedUsers.map((user) => {
                    const message = lastMessages[user.id] || {};
                    const formattedTime = message.timestamp
                        ? format(new Date(message.timestamp), "hh:mm a")
                        : "";

                    return (
                        <div
                            key={user.id}
                            className="flex justify-between items-center py-4 px-2 rounded-lg hover:bg-[#f5fcff] transition cursor-pointer"
                            onClick={() => handleChatOpen(user)}
                        >
                            <div className="flex items-center">
                                <img
                                    src={user.profilePic || "/default-avatar.png"}
                                    alt={user.displayName}
                                    className="w-10 h-10 rounded-full border border-[#007EAF] mr-3"
                                />
                                <div>
                                    <p className="font-semibold text-gray-800">{user.displayName}</p>
                                    <p className="text-sm text-gray-500">
                                        {message.text || "Say hi!"}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-gray-400">{formattedTime}</p>
                                {unseenCount[user.id] > 0 && (
                                    <div className="bg-[#007EAF] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center mx-auto mt-1">
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
