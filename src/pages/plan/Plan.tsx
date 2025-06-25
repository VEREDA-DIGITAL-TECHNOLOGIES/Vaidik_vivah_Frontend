import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../font.css";
import { useGetPlansQuery } from "../../Redux/Api/plan.api";

import Loading from "../../components/Loading";
import type{ FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { useCreateCheckoutSessionMutation, useGetSubscriptionHistoryQuery } from "../../Redux/Api/checkout.api";
import { toast } from 'sonner';
import type{ RootState } from "./../../Redux/store";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {

  Button,

} from "@mui/material";
import PlanCard from "../../components/PlanCard/PlanCard";
const columns = [
  {
    field: "serial",
    headerName: "S/N",
    width: 90,


  },
  {
    field: "orderId",
    headerName: "Order ID",
    width: 300,
    renderCell: (params: any) => (
      <Typography color="#000000" marginTop={"15px"}>
        #{params.value}
      </Typography>
    ),
  },

  {
    field: "planName",
    headerName: "Plan Name",
    width: 320,
    renderCell: (params: any) => (
      <Typography style={{ marginTop: "15px" }}>{params.value}</Typography>
    ),
  },
  {
    field: "purchaseDate",
    headerName: "Purchase Date",
    width: 430,
  },
  {
    field: "amount",
    headerName: "Amount",
    width: 310,
    renderCell: (params: any) => (
      <Box display="flex" alignItems="center">
        <Typography
          style={{
            backgroundColor: params.row.paymentStatus === "Completed" ? "#03C988" : "#FF0000",
            color: "white",
            padding: "4px 8px",
            borderRadius: "40px",
            fontWeight: "bold",
            marginTop: "10px",
          }}
        >
          ${params.value}
        </Typography>
      </Box>
    ),
  },
  // {
  //   field: "action",
  //   headerName: "Action",
  //   width: 150,
  //   renderCell: (params: any) => (
  //     <Box display="flex"  width="100%">
  //       <IconButton aria-label="view">
  //         <VisibilityIcon />
  //       </IconButton>
  //     </Box>
  //   ),
  // },
];
interface SubscriptionHistoryItem {
  id: string;
  orderId: string;
  paymentStatus: string;
  planName: string;
  purchaseDate: string;
  amount: string;
}
type SubscriptionHistoryData = {
  success: boolean;
  message: string;
  data?: any;
};

const PricingPage = () => {
  const navigate = useNavigate();

  const [isExclusive, setIsExclusive] = useState(false);
  const handleUpgradeClick = () => {
    navigate("/user-dashboard?tab=plans");
  };
  useEffect(() => {
    const isExclusive = localStorage.getItem("isExclusive");
    if (isExclusive === "true" || user?.usertype === "Exclusive") {
      setIsExclusive(true);
    }
    [];
  });
  const { user } = useSelector((state: RootState) => state.userReducer);
  const [activeTab, setActiveTab] = useState("Monthly");

  const currentPlan = user?.usertype;

  const { data: planData, isLoading, error } = useGetPlansQuery<any>();
  const [createCheckoutSession] = useCreateCheckoutSessionMutation();

  const { data: subscriptionHistoryData } = useGetSubscriptionHistoryQuery() as {
    data: SubscriptionHistoryData;
    error: any;
    isLoading: boolean;
  };

  const [subscriptionHistory, setSubscriptionHistory] = useState<SubscriptionHistoryItem[]>([]);
  useEffect(() => {
    if (subscriptionHistoryData?.success) {
      const historyWithId = subscriptionHistoryData.data.map((item: any, index: any) => ({
        ...item,
        serial: index + 1,
        id: item.orderId,
      }));
      setSubscriptionHistory(historyWithId);
    }
  }, [subscriptionHistoryData]);

  console.log(planData, "planData");

  const getPlanDuration = () =>
    activeTab === "Monthly" ? " Per Month" : " Per Year";

  const filteredPlans = planData?.data
    ?.filter((plan: any) => {
      if (activeTab === "Monthly" && plan.planType !== "Monthly") return false;
      if (activeTab === "Yearly" && plan.planType !== "Yearly") return false;
      if (currentPlan === "Exclusive" && plan.planName === "Premium") return false;
      return true;
    })
    .sort((a: any, b: any) => {
      if (a.planName === "Premium") return -1;
      if (b.planName === "Premium") return 1;
      return 0;
    });

  if (isLoading) return <div><Loading /></div>;
  if (error || !planData?.data) return <div>Error loading plans</div>;

  type ApiResponse = {
    success: boolean;
    message: string;
    url: string;
  };

  type FetchBaseQueryErrorWithData = FetchBaseQueryError & {
    data: ApiResponse;
  };

  const handleCheckout = async (id: string) => {
    try {
      const res = await createCheckoutSession(id);
      if ("error" in res && res.error) {
        const errorData = res.error as FetchBaseQueryErrorWithData;
        if (errorData.data?.success === false) {
          toast.error(errorData.data.message);
          return;
        }
      }
      const successData = res.data as ApiResponse;
      window.location.href = successData.url;
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  return (
    <div className="space-y-20 xl:space-y-20 ">
      <div className="px-2">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="flex flex-col space-y-4 p-4 md:p-8 ">
            <h3 className="text-5xl max-md:text-xl  font-semibold">Subscription tiers</h3>
            <p className="mt-4 text-2xl max-md:text-md text-[#000000] md:mt-0">
              Upgrade to Premium or Exclusive for an enhanced Vaidik Vivah experience.
            </p>
          </div>

          <div className="mt-5 flex h-16 w-60 items-center gap-8 rounded-full bg-[#FFF9EE] p-3 xl:mt-0">
            <button
              className={`flex h-10 w-32 items-center justify-center p-2 rounded-full transition-all duration-300 ${activeTab === "Monthly" ? "bg-[#f99dba] w-52" : "bg-transparent"
                }`}
              onClick={() => setActiveTab("Monthly")}
            >
              <h1
                className={`font-semibold transition-colors duration-300 ${activeTab === "Monthly" ? "text-white" : "text-[#42526B]"
                  }`}
              >
                Monthly
              </h1>
            </button>

            <button
              className={`flex h-10 w-32 items-center justify-center p-2 rounded-full transition-all duration-300 ${activeTab === "Yearly" ? "bg-[#f98daf] w-52" : "bg-transparent"
                }`}
              onClick={() => setActiveTab("Yearly")}
            >
              <h1
                className={`font-semibold transition-colors duration-300 ${activeTab === "Yearly" ? "text-white" : "text-[#42526B]"
                  }`}
              >
                Yearly
              </h1>
            </button>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 justify-items-center content-center gap-4 md:grid-cols-2 lg:gap-8 xl:gap-24">

          {filteredPlans.map((plan: any) => (

            <PlanCard
              key={plan.id}
              title={plan.planName}
              price={plan.price}
              duration={getPlanDuration()}
              isHighlighted={plan.planName === "Exclusive"}
              features={plan.featureList}
              isDisabled={plan.planName === currentPlan && plan.planType === activeTab}
              id={plan.id}
              onClick={() => handleCheckout(plan.id)}
            />
          ))}
        </div>
      </div>

      <div className="rounded-lg bg-[#FFFFFF]">
        {
          isExclusive ? <div></div> : <div className="flex justify-end p-4">
            <Button variant="contained" onClick={handleUpgradeClick} sx={{ backgroundColor: `${isExclusive ? '#8E69B4' : '#FD5C90'}`, textTransform: 'none', }}>
              Upgrade Plan
            </Button>
          </div>

        }
        <div>
          <DataGrid
            sx={{
              "& .MuiDataGrid-columnHeader": {
                backgroundColor: "#F5F5F7",
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                color: "#4C4E64",
                alignItems: "center",
                fontWeight: "bold",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .MuiDataGrid-row": {
                borderBottom: "1px solid #e0e0e0",
              },
            }}
            rows={subscriptionHistory}
            disableColumnResize
            columns={columns}

          />
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
