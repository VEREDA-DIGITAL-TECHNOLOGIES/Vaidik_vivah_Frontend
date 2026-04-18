import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type{ RootState } from "../../Redux/store";

import {
  setNotification,
  removeNotificationData
} from "../../Redux/Reducers/notification.reducers";

import { useGetNotificationQuery } from "../../Redux/Api/notification.api";
import { useRemoveNotificationMutation } from "../../Redux/Api/notification.api";
import type{ FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { useCancelConnectionMutation, useAcceptConnectionMutation } from "../../Redux/Api/connection.api";
import { toast } from "sonner";
import Connection from "../user-dashboard-model/Connection";
import ConnectionAccepted from "../user-dashboard-model/ConnectionAccepted";
import { Link } from "react-router-dom";

const Notification = () => {
  const dispatch = useDispatch();

  const { data: notificationData, isLoading } = useGetNotificationQuery<any>();

  const [removeNotification,] = useRemoveNotificationMutation<any>();
  const [cancel, { isLoading: isLoadingCancel }] = useCancelConnectionMutation();
  const [accept, { isLoading: isLoadingAccept }] = useAcceptConnectionMutation();




  const handleRemoveNotification = async (notificationId: string) => {
    try {
      await removeNotification(notificationId);
      dispatch(removeNotificationData(notificationId));
      toast.success("Notification removed successfully!");
    } catch (error) {
      toast.error("Failed to remove notification.");
    }
  };
  const { notifacations: notifications } = useSelector(
    (state: RootState) => state.notificationReducer
  );
  // const { user } = useSelector((state: RootState) => state.userReducer);

  useEffect(() => {
    if (!isLoading && notificationData) {
      dispatch(setNotification(notificationData.data));
    }
  }, [notificationData, isLoading, dispatch]);



  type ApiResponse = {
    success: boolean;
    message: string;
    data?: any;
  };


  const acceptConnection = async (notificationId: string, senderId: string) => {
    try {
      const response = await accept(senderId);
      if (response.error) {
        const errorData = response.error as FetchBaseQueryError;
        toast.error((errorData.data as ApiResponse).message);
        return;
      }
      await removeNotification(notificationId);
      dispatch(removeNotificationData(notificationId));
      toast.success("Connection accepted!");
    } catch (error) {
      toast.error("Failed to accept connection. Please try again later.");
    }
  };

  const rejectConnection = async (notificationId: string, senderId: string) => {
    try {
      const recieverId = senderId;
      const response = await cancel(recieverId);
      if (response.error) {
        const errorData = response.error as FetchBaseQueryError;
        toast.error((errorData.data as ApiResponse).message);
        return;
      }
      await removeNotification(notificationId);
      dispatch(removeNotificationData(notificationId));
      toast.success("Connection rejected!");
    } catch (error) {
      toast.error("Failed to reject connection. Please try again later.");
    }
  };

 

  return (
    <div className="space-y-4 min-h-screen">
      {notifications?.length === 0 && !isLoading ? (
        <p className="text-center">No notifications yet</p>
      ) : (
        notifications?.map((notification) => (
          
         

         
          <div
            key={notification.notificationId}
            className="p-4 bg-white border rounded-lg shadow-md mb-4"
          >
            

            {notification.body?.type === "connection_request" ? (

<Connection
  senderImage={notification.body?.senderImage}
  senderName={notification.body?.senderName}
  AcceptButton={
    <button
      onClick={() =>
        acceptConnection(
          notification.notificationId,
          notification.body?.senderId
        )
      }
      disabled={isLoadingAccept || isLoadingCancel}
      className={`px-4 py-2 text-white rounded ${
        isLoadingAccept
          ? "bg-green-300 cursor-not-allowed"
          : "bg-green-500"
      }`}
    >
      {isLoadingAccept ? "Accepting..." : "Accept"}
    </button>
  }
  RejectButton={
    <button
      className={`px-4 py-2 text-white rounded ${
        isLoadingCancel
          ? "bg-red-300 cursor-not-allowed"
          : "bg-red-500"
      }`}
      onClick={() =>
        rejectConnection(
          notification.notificationId,
          notification.body?.senderId
        )
      }
      disabled={isLoadingAccept || isLoadingCancel}
    >
      {isLoadingCancel ? "Rejecting..." : "Reject"}
    </button>
  }
/>

) : notification.body?.type === "connection_accepted" ? (

<ConnectionAccepted
  senderImage={notification.body?.senderImage}
  senderName={notification.body?.senderName}
  id={notification.body?.senderId}
/>

) : (

// 🔥 GENERIC FALLBACK FOR ANY TYPE
<div className="p-3">
  <p className="font-semibold">
    {notification.title || "Notification"}
  </p>

  <p className="text-sm text-gray-600">
    {notification.message || notification.body?.message || "You have a new update"}
  </p>

  {/* optional navigation if sender exists */}
  {notification.body?.senderId && (
    <Link
      to={`/profile/${notification.body?.senderName || "user"}/${notification.body?.senderId}`}
      className="text-blue-500 text-sm mt-2 inline-block"
    >
      View Profile
    </Link>
  )}
</div>

)}
            
          <div className="flex justify-end">
              <button
                className="mt-2 text-red-500 cursor-pointer"
                onClick={() => handleRemoveNotification(notification.notificationId)}
              >
                Remove
              </button>
            </div>
          
          </div>
          
        ))
      )}

      {notifications?.length === 0 && !isLoading ? (
        <p className="text-center">No Profiles views</p>
      ) : (
        notifications?.map((notification) => (
          <div key={notification.notificationId} className="bg-white p-8 rounded-3xl ">
              <p>{notification.title}</p>
            <div className="flex justify-end">
              <button
                className="mt-2 text-red-500 cursor-pointer"
                onClick={() => handleRemoveNotification(notification.notificationId)}
              >
                Remove
              </button>
            </div>
        <p>{notification.message}</p>
        {/* {
             notification?.message?.split(" viewed")[0]
        } */}
            <Link to={`/profile/${notification?.message?.split(" viewed")[0]}/${notification.body?.senderId}`}>
        View Profile
        </Link>
      </div>
       )))}
    </div>
  );
};

export default Notification;
