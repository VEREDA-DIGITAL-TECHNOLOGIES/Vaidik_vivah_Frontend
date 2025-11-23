// import { useSelector } from "react-redux";

// import type{ RootState } from '../../Redux/store';
// import { useState ,useEffect} from "react";
// import { toast } from "sonner";
// import { Phone, Video } from "lucide-react";
// import CallService from "../zegocall/CallService";
// import { useMyDetailsQuery } from "../../Redux/Api/profile.api";

// function CallButton({ userId, userName, userImage }: any) {
//   const usertype = useSelector((state: RootState) => state.userReducer.user?.usertype);
//   const [premiumCallTimeUsed, setPremiumCallTimeUsed] = useState(0); // in minutes

//   const MAX_PREMIUM_MINUTES = 30;

//       const { data: myDetailsData, isLoading: isLoading } = useMyDetailsQuery<any>();
//   //  console.log("I look detailsssss",myDetailsData);
//   //  console.log(myDetailsData?.data?.[0]?.basic_and_lifestyle?.gender);
//    const Gender =myDetailsData?.data?.[0]?.basic_and_lifestyle?.gender;

//    // if Gender to Women to get free Gold plan to calling 


//  useEffect(() => {
//     // Initialize call service once on this page
//     CallService.initialize();
//   }, []);
//   const handleStartCall = (isVideo: boolean) => {
//     if (usertype === "Standard") {
//       toast.warning("Activation of this feature is contingent upon approval of your request and your enrollment in the ved Vivah subscription plan.");
//       return;
//     }

//     if (usertype === "Gold" && premiumCallTimeUsed >= MAX_PREMIUM_MINUTES) {
//       toast.error("You have used your 30 min. call limit. Upgrade to Exclusive for unlimited calls.");
//       return;
//     }

//     CallService.startCall({
//       receiverId: userId,
//       receiverName: userName,
//       isVideo,
//       profileImage: userImage,
//     });

//     toast.success(isVideo ? "Video call started" : "Voice call started");

//     if (usertype === "Premium") {
//       simulatePremiumCallDuration();
//     }
//   };

//   const simulatePremiumCallDuration = () => {
//     const simulatedMinutes = 10;
//     setPremiumCallTimeUsed(prev => Math.min(prev + simulatedMinutes, MAX_PREMIUM_MINUTES));
//   };

//   return (
//     <div className="flex items-center gap-3">
//       <button className="p-3   text-white  active:scale-95 transition-all "
//        title="Start Video Call" onClick={() => handleStartCall(true)}> <Video className="w-5 h-5" /></button>
//       <button className="p-3   text-white  active:scale-95 transition-all "
//              title="Start Voice Call"
//         onClick={() => handleStartCall(false)}> <Phone className="w-5 h-5" /></button>

//       {usertype === "Premium" && (
//         <p>Used {premiumCallTimeUsed}/{MAX_PREMIUM_MINUTES} minutes of your call limit.</p>
//       )}
//     </div>
//   );
// }

// export default CallButton;







// import { useEffect } from "react";
// import CallService from "../zegocall/CallService";
// import { Phone, Video } from "lucide-react";



// function CallButton({ userId, userName, userImage }: any) {
  


//    useEffect(() => {
//     // Initialize call service once on this page
//     CallService.initialize();
//   }, []);
     

//     // console.log("here call details are ",userId,userName,userImage);
//     const handleStartVideoCall = () => {
//          console.log(`reciver id : ${userId}`);
//         CallService.startCall({
//             receiverId: userId,
//             receiverName: userName,
//             isVideo: true,
//             profileImage: userImage,
//         });
//     };

//     const handleStartVoiceCall = () => {
//         console.log(`reciver id : ${userId}`);

//         CallService.startCall({
//             receiverId: userId,
//             receiverName: userName,
//             isVideo: false,
//             profileImage: userImage,
//         });
//     };

//     return (
//         <div className="flex items-center gap-3">
//             <button
//                 onClick={handleStartVideoCall}
//                 className="p-3   text-white  active:scale-95 transition-all "
//                 title="Start Video Call"
//             >
//                 <Video className="w-5 h-5" />
//             </button>

//             <button
//                 onClick={handleStartVoiceCall}
//                 className="p-3   text-white  active:scale-95 transition-all "
//                 title="Start Voice Call"
//             >
//                 <Phone className="w-5 h-5" />
//             </button>
//         </div> 

//     );
// }

// export default CallButton;



import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Phone, Video } from "lucide-react";
import { toast } from "sonner";
import CallService from "../zegocall/CallService";
import { useMyDetailsQuery } from "../../Redux/Api/profile.api";
import type { RootState } from "../../Redux/store";

function CallButton({ userId, userName, userImage }: any) {
  const usertype = useSelector(
    (state: RootState) => state.userReducer.user?.usertype
  );

  const [premiumCallTimeUsed, setPremiumCallTimeUsed] = useState(0);
  const MAX_PREMIUM_MINUTES = 30;

  // fetch gender
  const { data: myDetailsData } = useMyDetailsQuery<any>();
  const gender = myDetailsData?.data?.[0]?.basic_and_lifestyle?.gender;

  useEffect(() => {
    CallService.initialize();
  }, []);

  // =============================
  // CORE CALL LOGIC
  // =============================
  const makeCall = (isVideo: boolean) => {
    // 1️⃣ WOMAN -> Free Gold Calling (No restriction)
    if (gender === "Woman") {
      CallService.startCall({
        receiverId: userId,
        receiverName: userName,
        isVideo,
        profileImage: userImage,
      });

      toast.success(
        isVideo
          ? "Video call started (Free Gold Benefit)"
          : "Voice call started (Free Gold Benefit)"
      );
      return;
    }

    // 2️⃣ STANDARD RESTRICTION
    if (usertype === "Standard") {
      toast.warning(
        "Activation of this feature is contingent upon approval of your request and your enrollment in the Ved Vivah subscription plan."
      );
      return;
    }

    // 3️⃣ GOLD LIMIT CHECK
    if (usertype === "Gold" && premiumCallTimeUsed >= MAX_PREMIUM_MINUTES) {
      toast.error(
        "You have used your 30 min. call limit. Upgrade to Exclusive for unlimited calls."
      );
      return;
    }

    // 4️⃣ CALL START
    CallService.startCall({
      receiverId: userId,
      receiverName: userName,
      isVideo,
      profileImage: userImage,
    });

    toast.success(isVideo ? "Video call started" : "Voice call started");

    // 5️⃣ Only Premium Users use minutes
    if (usertype === "Premium") {
      simulatePremiumCallDuration();
    }
  };

  const simulatePremiumCallDuration = () => {
    const simulatedMinutes = 30;
    setPremiumCallTimeUsed((prev) =>
      Math.min(prev + simulatedMinutes, MAX_PREMIUM_MINUTES)
    );
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => makeCall(true)}
        className="p-3 text-white active:scale-95 transition-all"
        title="Start Video Call"
      >
        <Video className="w-5 h-5" />
      </button>

      <button
        onClick={() => makeCall(false)}
        className="p-3 text-white active:scale-95 transition-all"
        title="Start Voice Call"
      >
        <Phone className="w-5 h-5" />
      </button>

      {usertype === "Premium" && (
        <p>
          Used {premiumCallTimeUsed}/{MAX_PREMIUM_MINUTES} minutes
        </p>
      )}
    </div>
  );
}

export default CallButton;
