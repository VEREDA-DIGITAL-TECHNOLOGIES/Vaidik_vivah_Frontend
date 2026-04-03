import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import { ConfigProvider } from "antd";
import type { TabsProps } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type{ RootState } from "../../Redux/store";
import Mydetails from "../../Components/user-dashboard/Mydetails";
import Discover from "../../Components/user-dashboard/Discover";
import Favourate from "../../Components/user-dashboard/Favourate";
import Plan from "../plan/Plan";
import BillingInfo from "../../Components/BillingInfo/BillingInfo";
import Notification from "../../Components/user-dashboard/Notification";
import FAQs from "../../Components/user-dashboard/FAQs";
import Header from "../../Components/header-footer-profile/Header";
import Footer from "../../Components/header-footer-profile/Footer";
import {
  UserOutlined,
  CompassOutlined,
  HeartOutlined,
  ProfileOutlined,
  CreditCardOutlined,
  BellOutlined,
  QuestionCircleOutlined, MessageOutlined
} from "@ant-design/icons";
import ChatScreen from "../chat/ChatScreen";
import BannerPage from "../../Components/Banner/Banner";

import { Helmet } from "react-helmet-async";


const UserDashboard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.userReducer);

  const [isExclusive, setIsExclusive] = useState(false);

  useEffect(() => {
    const isExclusive = localStorage.getItem("isExclusive");
    if (isExclusive === "true" || user?.usertype === "Exclusive") {
      setIsExclusive(true);
    }
  }, [user]);



  // Get the current tab from URL parameters
  const params = new URLSearchParams(location.search);
  const activeTab = params.get("tab") || "details"; // Default to 'my-details' if no tab is provided

  // Function to handle tab change and update URL
  const handleTabChange = (key: string) => {
    params.set("tab", key);
    navigate({ search: params.toString() }, { replace: true });
  };

  const items: TabsProps["items"] = [
    
    {
      key: "discover",
      label: (
        <span>
          <CompassOutlined /> Discover
        </span>
      ),
      children: <Discover />,
    },
    {
      key: "favourite-profiles",
      label: (
        <span>
          <HeartOutlined /> Favourite Profiles
        </span>
      ),
      children: <Favourate />,
    },
    {
      key: "plans",
      label: (
        <span>
          <ProfileOutlined /> Plan
        </span>
      ),
      children: <Plan />,
    },
    {
      key: "billings",
      label: (
        <span>
          <CreditCardOutlined /> Billing
        </span>
      ),
      children: <BillingInfo />,
    },
    {
      key: "notifications",
      label: (
        <span>
          <BellOutlined /> Notifications
        </span>
      ),
      children: <Notification />,
    },
    {
      key: "Chats",
      label: (
        <span>
          <MessageOutlined  /> Chats
        </span>
      ),
      children: <ChatScreen />,
    },
    {
      key: "FAQs",
      label: (
        <span>
          <QuestionCircleOutlined /> FAQs
        </span>
      ),
      children: <FAQs />,
    },
    {
      key: "details",
      label: (
        <span>
          <UserOutlined /> My Details
        </span>
      ),
      children: <Mydetails />,
    },
  ];
  


  return (
    <>
  {/* ✅ SEO META */}
  <Helmet>
    <title>User Dashboard | Vedvivah</title>

    <meta
      name="description"
      content="Manage your Vedvivah profile, explore matches, chat, and track your matchmaking journey."
    />

    {/* ❗ VERY IMPORTANT: Private page */}
    <meta name="robots" content="noindex, nofollow" />

    {/* Optional OG */}
    <meta property="og:title" content="Vedvivah Dashboard" />
    <meta
      property="og:description"
      content="Access your profile, matches, and chats."
    />
  </Helmet>
    <div className="flex min-h-screen flex-col ">
      <BannerPage/>
      <Header />
      <div className="flex-grow bg-[#fceef2]">
        {/* <div className="flex justify-center">
          <img title="bigad" src="/bigad.png" className="h-14 w-full" />
        </div> */}

        <div className="px-4 py-6 ">
          <div className="p-0 md:p-4">
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: isExclusive ? "#60457E" : "#fa4e85",
                },
                components: {
                  Tabs: {
                    colorBgContainer: "#fa4e85",
                    colorText: "black",
                    colorBgTextActive: "#fa4e85",
                    colorBorder: "#E6F2F7",
                    fontSize: 18,
                    fontFamily: "Proxima-Nova-Semibold",
                  },
                },
              }}
            >
              <Tabs
                activeKey={activeTab}
                onChange={handleTabChange}
                items={items}
                tabBarStyle={{ backgroundColor: "#f8e4ea" }}
              />
            </ConfigProvider>
          </div>
        </div>
      </div>
      <Footer />
    </div>
     </>
  );
};

export default UserDashboard;
