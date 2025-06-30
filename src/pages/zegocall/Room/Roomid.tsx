import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import axios from "axios"; // Add axios

const Roomid = () => {
    const { roomId } = useParams<{ roomId: string }>();
    const meetingRef = useRef<HTMLDivElement | null>(null);
    const callStartTime = useRef<number>(0);

    useEffect(() => {
        if (!roomId || !meetingRef.current) return;

        const appID = 2115183927;
        const serverSecret = "4977c76aa1ed87f352489cec1c99c5f8";
        const userName = "Sujit Kumar";
        const userId = Date.now().toString(); // You should get this from logged-in user

        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            roomId,
            userId,
            userName
        );

        const zc = ZegoUIKitPrebuilt.create(kitToken);

        zc.joinRoom({
            container: meetingRef.current,
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall,
            },
            showScreenSharingButton: false,
            onJoinRoom: () => {
                callStartTime.current = Date.now(); // mark start
            },
            onLeaveRoom: async () => {
                const callEndTime = Date.now();
                const durationInSeconds = Math.floor((callEndTime - callStartTime.current) / 1000);

                try {
                    await axios.put(
                        "http://localhost:3005/api/v1/call/updateCallDuration",
                        {
                            callieId: roomId,
                            totalCallDuration: durationInSeconds,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("token")}`, // make sure you store token on login
                            },
                        }
                      );
                } catch (error) {
                    console.error("Failed to update call duration", error);
                }
            },
        });
    }, [roomId]);

    return (
        <div>
            <div ref={meetingRef} />
        </div>
    );
};

export default Roomid;

//  this code using to call one to another persion
// const Room = () => {
//     const { roomId } = useParams();
//     const meetingRef = useRef(null);
//     const startTime = useRef(0);

//     useEffect(() => {
//         const appID = YOUR_ZEGOCLOUD_APP_ID;
//         const serverSecret = "YOUR_SERVER_SECRET";
//         const userId = localStorage.getItem("uid");
//         const userName = localStorage.getItem("name");

//         const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
//             appID, serverSecret, roomId, userId, userName
//         );

//         const zc = ZegoUIKitPrebuilt.create(kitToken);

//         zc.joinRoom({
//             container: meetingRef.current,
//             scenario: { mode: ZegoUIKitPrebuilt.OneONoneCall },
//             onJoinRoom: () => { startTime.current = Date.now(); },
//             onLeaveRoom: async () => {
//                 const duration = Math.floor((Date.now() - startTime.current) / 1000);
//                 await axios.put("/api/v1/call/updateCallDuration", {
//                     callieId: roomId.split("_")[1],
//                     totalCallDuration: duration,
//                 }, {
//                     headers: { Authorization: `Bearer ${token}` }
//                 });
//             }
//         });
//     }, [roomId]);

//     return <div ref={meetingRef} />;
// };
  





// import { useEffect, useRef } from "react";
// import { useParams } from "react-router-dom";
// import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

// const Roomid = () => {
//     const { roomId } = useParams<{ roomId: string }>();
//     const meetingRef = useRef<HTMLDivElement | null>(null);

//     useEffect(() => {
//         if (!roomId || !meetingRef.current) return;

//         const appID = 2115183927;
//         const serverSecret = "4977c76aa1ed87f352489cec1c99c5f8";
//         const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
//             appID,
//             serverSecret,
//             roomId,
//             Date.now().toString(),
//             "Sujit Kumar"
//         );

//         const zc = ZegoUIKitPrebuilt.create(kitToken);
//         zc.joinRoom({
//             container: meetingRef.current,
//             scenario: {
//                 mode: ZegoUIKitPrebuilt.OneONoneCall,
//             },
//             showScreenSharingButton: false,
//         });
//     }, [roomId]);

//     return (
//         <div>
//             <div ref={meetingRef} />
//         </div>
//     );
// };

// export default Roomid;
