import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const VoiceCallScreen = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const callContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!roomId || !callContainerRef.current) return;

    const appID = 2115183927;
    const serverSecret = "4977c76aa1ed87f352489cec1c99c5f8";
    const userId = localStorage.getItem("uid")!;
    const userName = localStorage.getItem("name")!;

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      userId,
      userName
    );

    const zc = ZegoUIKitPrebuilt.create(kitToken);

    zc.joinRoom({
      container: callContainerRef.current,
      scenario: { mode: ZegoUIKitPrebuilt.OneONoneCall },
      showScreenSharingButton: false,
      showRoomTimer: false,
      showPreJoinView: false,
      turnOnCameraWhenJoining: false,
      showMyCameraToggleButton: false,
      showAudioVideoSettingsButton: false,
      showLayoutButton: false,
      showTextChat: false,
    });
  }, [roomId]);

  return <div ref={callContainerRef} style={{ width: "100%", height: "100vh" }} />;
};

export default VoiceCallScreen;
