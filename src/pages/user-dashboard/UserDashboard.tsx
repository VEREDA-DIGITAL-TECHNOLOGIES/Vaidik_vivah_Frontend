import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import { ConfigProvider } from "antd";
import type { TabsProps } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type{ RootState } from "../../Redux/store";
import Mydetails from "../../components/user-dashboard/Mydetails";
import Discover from "../../components/user-dashboard/Discover";
import Favourate from "../../components/user-dashboard/Favourate";
import Plan from "../plan/Plan";
import BillingInfo from "../../components/BillingInfo/BillingInfo";
import Notification from "../../components/user-dashboard/Notification";
import FAQs from "../../components/user-dashboard/FAQs";
import Header from "../../components/header-footer-profile/Header";
import Footer from "../../components/header-footer-profile/Footer";



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
      key: "details",
      label: `My Details`,
      children: <Mydetails />,
    },
    {
      key: "discover",
      label: `Discover`,
      children: <Discover />,
    },
    {
      key: "favourite-profiles",
      label: `Favourite Profiles`,
      children: <Favourate />,
    },
    {
      key: "plans",
      label: `Plan`,
      children: <Plan />,
    },
    {
      key: "billings",
      label: `Billing`,
      children: <BillingInfo />,
      // disabled: !(user?.usertype === "Exclusive" || user?.usertype === "Premium"),
    },
    {
      key: "notifications",
      label: `Notifications`,
      children: <Notification />,
    },
    {
      key: "FAQs",
      label: `FAQs`,
      children: <FAQs />,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col ">
      <Header />
      <div className="flex-grow bg-[#fceef2]">
        <div className="flex justify-center">
          <img title="bigad" src="/bigad.png" className="h-14 w-full" />
        </div>

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
  );
};

export default UserDashboard;
