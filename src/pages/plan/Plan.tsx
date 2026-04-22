import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../font.css";
import { useGetPlansQuery } from "../../Redux/Api/plan.api";
import Loading from "../../Components/Loading";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { Box, Typography, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import PlanCard from "../../Components/PlanCard/PlanCard";
import type { RootState } from "../../Redux/store";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";

import {
  useCreateCheckoutSessionMutation,
  useGetSubscriptionHistoryQuery,
  useCreateRazorpayOrderMutation,
  useVerifyRazorpayPaymentMutation,
} from "../../Redux/Api/checkout.api";
import { FaGift } from "react-icons/fa";



const columns = [
  { field: "serial", headerName: "S/N", width: 90 },
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
  { field: "purchaseDate", headerName: "Purchase Date", width: 430 },
  {
    field: "amount",
    headerName: "Amount",
    width: 310,
    renderCell: (params: any) => (
      <Box display="flex" alignItems="center">
        <Typography
          style={{
            backgroundColor:
              params.row.paymentStatus === "Completed" ? "#03C988" : "#FF0000",
            color: "white",
            padding: "4px 8px",
            borderRadius: "40px",
            fontWeight: "bold",
            marginTop: "10px",
          }}
        >
          ₹{params.value}
        </Typography>
      </Box>
    ),
  },
];

const PricingPage = () => {
  const navigate = useNavigate();
  const [isExclusive, setIsExclusive] = useState(false);
  const { user } = useSelector((state: RootState) => state.userReducer);
  const [activeTab, setActiveTab] = useState("Monthly");
  const [subscriptionHistory, setSubscriptionHistory] = useState<any[]>([]);

  const paymentProvider = "razorpay"; // Change to 'stripe' to use Stripe
  // Razorpay script loader
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);
  const {
    data: planData,
    isLoading,
    error,
  } = useGetPlansQuery<any>();

  const [createCheckoutSession] = useCreateCheckoutSessionMutation();
  const { data: subscriptionHistoryData } = useGetSubscriptionHistoryQuery() as any;

  const [createRazorpayOrder] = useCreateRazorpayOrderMutation();
  const [verifyRazorpayPayment] = useVerifyRazorpayPaymentMutation();

  useEffect(() => {
    const isExclusiveLocal = localStorage.getItem("isExclusive");
    if (isExclusiveLocal === "true" || user?.usertype === "Exclusive") {
      setIsExclusive(true);
    }
  }, [user]);

  useEffect(() => {
    if (subscriptionHistoryData?.success) {
      const historyWithId = subscriptionHistoryData.data.map((item: any, index: number) => ({
        ...item,
        serial: index + 1,
        id: item.orderId,
      }));
      setSubscriptionHistory(historyWithId);
    }
  }, [subscriptionHistoryData]);

  const getPlanDuration = () =>
    activeTab === "Monthly" ? " Per Month" : " Per Year";

  const filteredPlans = planData?.data
    ?.filter((plan: any) => {
      if (activeTab === "Monthly" && plan.planType !== "Monthly") return false;
      if (activeTab === "Yearly" && plan.planType !== "Yearly") return false;
      if (user?.usertype === "Exclusive" && plan.planName === "Premium") return false;
      return true;
    })
    .sort((a: any, b: any) => {
      if (a.planName === "Premium") return -1;
      if (b.planName === "Premium") return 1;
      return 0;
    });
    // console.log("plan data are",filteredPlans);
    // console.log("plan data user and active tab are",user?.usertype,activeTab);
    // console.log("plan user data are",user);



  const handleCheckout = async (id: string) => {
    try {
      const res = await createCheckoutSession(id);
      if ("error" in res && res.error) {
        const errorData = res.error as FetchBaseQueryError & { data: any };
        if (errorData.data?.success === false) {
          toast.error(errorData.data.message);
          return;
        }
      }
      const successData = res.data as { success: boolean; url: string };
      window.location.href = successData.url;
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const handleRazorpayCheckout = async (planId: string) => {
    try {
      const  data  = await createRazorpayOrder(planId).unwrap();
      console.log("data craete razorpay are ",data);
      // if (!data || !data.order || !data.key) {
      //   console.error("❌ Invalid Razorpay order response:", data);
      //   toast.error("Something went wrong. Please try again.");
      //   return;
      // }
      const options = {
        key: data.key,
        amount: data.order.amount,
        currency: "INR",
        name: "Vaidik Vivah",
        description: "Subscription Payment",
        order_id: data.order.id,
        handler: async function (response: any) {
          const payload = {
            order_id: response.razorpay_order_id,
            payment_Id: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            planId,
          };
          await verifyRazorpayPayment(payload).unwrap();
          toast.success("Payment successful! Subscription activated.");
        },
        prefill: {
          // name: user?.name
          email: user?.email,
        },
        theme: {
          color: "#FD5C90",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Razorpay Error:", err);
      toast.error("Payment failed. Please try again.");
    }
  };
  

  if (isLoading) return <Loading />;
  if (error || !planData?.data) return <div>Error loading plans</div>;

  return (
    <div className="space-y-20 xl:space-y-20">
      <div className="px-2">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="flex flex-col space-y-4 p-4 md:p-8">
            <h3 className="text-5xl max-md:text-xl font-semibold">Subscription tiers</h3>
            <p className="mt-4 text-2xl max-md:text-md text-[#000000] md:mt-0">
              Upgrade to Premium or Exclusive for an enhanced Vaidik Vivah experience.
            </p>
            {/* Free Gold Offer Banner */}
  <div className="mt-4 rounded-2xl border-2 border-green-500 bg-green-50 px-6 py-5 flex items-center gap-4">
   <div className="text-green-600 text-4xl">
  <FaGift />
</div>
    <p className="text-green-600 text-xl max-md:text-sm font-semibold">
      As we are offering <span className="font-bold">FREE Gold plan</span> to women.
    </p>
  </div>
          </div>
          <div className="mt-5 flex h-16 w-60 items-center gap-8 rounded-full bg-[#FFF9EE] p-3 xl:mt-0">
            {["Monthly"].map((tab) => (
              <button
                key={tab}
                className={`flex h-10 w-32 items-center justify-center p-2 rounded-full transition-all duration-300 ${activeTab === tab ? "bg-[#f98daf] w-52" : "bg-transparent"
                  }`}
                onClick={() => setActiveTab(tab)}
              >
                <h1
                  className={`font-semibold transition-colors duration-300 ${activeTab === tab ? "text-white" : "text-[#42526B]"
                    }`}
                >
                  {tab}
                </h1>
              </button>
            ))}
          </div>
        </div>

   <div  className="
    mt-5
    grid
    grid-cols-1
    gap-4
    sm:grid-cols-2
    md:grid-cols-2
    xl:grid-cols-3
    place-items-stretch
  "  >

          {filteredPlans.map((plan: any) => (
            <PlanCard
              key={plan.id}
              title={plan.planName}
              price={plan.price}
              duration={getPlanDuration()}
              isHighlighted={plan.planName === "Exclusive"}
              features={plan.featureList}
              isDisabled={plan.planName === user?.usertype && plan.planType === activeTab}
              id={plan.id}
              onClick={() =>
                paymentProvider === "razorpay"
                  ? handleRazorpayCheckout(plan.id)
                  : handleCheckout(plan.id)
              }
            />
          ))}
        </div>
      </div>

      <div className="rounded-lg bg-[#FFFFFF]">
        {!isExclusive && (
          <div className="flex justify-end p-4">
            <Button
              variant="contained"
              onClick={() => navigate("/user-dashboard?tab=plans")}
              sx={{
                backgroundColor: "#FD5C90",
                textTransform: "none",
              }}
            >
              Upgrade Plan
            </Button>
          </div>
        )}
        <div>
          <DataGrid
            sx={{
              "& .MuiDataGrid-columnHeader": {
                backgroundColor: "#F5F5F7",
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                color: "#4C4E64",
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
