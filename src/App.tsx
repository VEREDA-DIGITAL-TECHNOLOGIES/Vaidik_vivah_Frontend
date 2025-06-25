import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense, useState } from "react";
import "./App.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import type{ RootState } from "./Redux/store";
import { messaging } from "../utils/firebaseConfig";
import { getToken } from "firebase/messaging";
import { useUpdateFcmTokenMutation } from "./Redux/Api/user.api";

import { connectSocket, disconnectSocket } from "./services/socketservice";
import { useGetUserSubscriptionStatusQuery } from "./Redux/Api/checkout.api";
import { setUserType } from "./Redux/Reducers/user.reducer";
import { useDispatch } from "react-redux";

import './App.css'
import ScrollToTop from "./components/ScrollTop/ScrollToTop";
import Loading from "./components/Loading";
import Footer from "./components/home/Footer";
import Navbar from "./components/home/Navbar";

import ProtectedRoute from "./components/ProtectedRoute";


const Home = lazy(() => import("./pages/home/Home"));
const Login = lazy(() => import("./pages/auth/Login"));

const Question = lazy(() => import("./pages/questionare/Questionare"));
const Register = lazy(() => import("./pages/auth/Register"));
const Verification = lazy(() => import("./pages/auth/Verification"));
const VerifyOtp = lazy(() => import("./pages/auth/VerifyOtp"));
const ChangePassword = lazy(() => import("./pages/auth/ChangePassword"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const CreatePassword = lazy(() => import("./pages/auth/CreatePassword"));
const Personal = lazy(() => import("./pages/forms/PersonalDetails"));
const Gayatri = lazy(() => import("./pages/forms/GayatriDetails"));
const Sucessfull = lazy(() => import("./pages/sucessfull/Sucessfull"))
const Profile = lazy(() => import("./pages/profile/Profile"))

const Qualification = lazy(() => import("./pages/forms/QualificationDetails"));
const Location = lazy(() => import("./pages/forms/LocationDetails"));
const Photoupload = lazy(() => import("./pages/forms/PhotoUpload"));
const Other = lazy(() => import("./pages/forms/OtherDetails"));
const Success = lazy(() => import("./pages/forms/SuccessPage"));
const UserDashboard = lazy(() => import("./pages/user-dashboard/UserDashboard"));





function App() {
  const { accessToken, refreshToken, user } = useSelector((state: RootState) => state.userReducer);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!accessToken || !!refreshToken);

  const dispatch = useDispatch();


  const { data } = useGetUserSubscriptionStatusQuery(null);


  useEffect(() => {
    if (data?.usertype) {
      const userType = data.usertype;

      dispatch(setUserType(userType));
    }
  }, [data, dispatch]);


  useEffect(() => {
    if (!accessToken && !refreshToken) {
      localStorage.clear();
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  }, [accessToken, refreshToken]);

  useEffect(() => {
    if (accessToken) {
      connectSocket();
    } else {
      disconnectSocket();
    }
  }, [accessToken]);










  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/firebase-messaging-sw.js')
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  }



  const [updateFcmToken] = useUpdateFcmTokenMutation();

  async function requestPermission() {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: 'BDMJ1bttVFT8x_Im4tTOPjWMXR4lqlb193pBRAfRYPWx2JkkvSk9eZkjf3d0dfDPlMfcwawtCd21WTMPq_0x2_w'
      });

      localStorage.setItem("fcmToken", token!);

    } else {
      alert("You denied for notification");
    }
  }



  useEffect(() => {
    const useruid = user?.uid;

    const fcmToken = localStorage.getItem("fcmToken");
    const uid = localStorage.getItem("uid") || useruid;
    const userStatus = "false";

    const data = {
      fcmToken,
      uid,
      userStatus
    }
    if (fcmToken) {
      updateFcmToken(data);
    }

  }, [])

  useEffect(() => {
    requestPermission();
  }, [])
  

  return (
    <Router>
      <Navbar />
      <ScrollToTop />

      
      <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><Loading /></div>}>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/user-dashboard" replace /> : <Home />} />
          {/* <Route path="/" element={  <Home />} /> */}
          
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute isAuthenticated={!accessToken} />}>
            <Route path="/questions" element={<Question />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create-password" element={<CreatePassword />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/verification" element={<Verification />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />
          </Route>

          <Route element={<ProtectedRoute isAuthenticated={!!accessToken}  />}>
           <Route path="/user-dashboard" element={<UserDashboard />} />
           <Route path="/personal-details" element={<Personal />} />
            <Route path="/gayatri-details" element={<Gayatri/>} />
            <Route path="/profile/:name/:userId" element={<Profile />} />
           <Route path="/qualification-details" element={<Qualification />} />
           <Route path="/location-details" element={<Location />} />
           <Route path="/photoupload" element={<Photoupload />} />
           <Route path="/other-details" element={<Other />} /> 
           <Route path="/success" element={<Success />} />
            <Route path="/Payment-Success" element={<Sucessfull />} />
          </Route>



          </Routes>
          </Suspense>
          <Footer/>
          </Router>

  )
}

export default App
