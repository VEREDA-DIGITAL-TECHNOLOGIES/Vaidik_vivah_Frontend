import { useIncomingCall } from "../../hooks/useIncomingCall";
import CallReceiverPopup from "./CallReceiverPopup";


export  const ScreenCall = () => {
    const userId = localStorage.getItem("uid") || "";
    const { incomingCall, clearCall } = useIncomingCall(userId);

    return (
        <>
            {incomingCall && (
                <CallReceiverPopup call={incomingCall} clearCall={clearCall} />
            )}

            {/* rest of your chat UI */}
        </>
    );
};
