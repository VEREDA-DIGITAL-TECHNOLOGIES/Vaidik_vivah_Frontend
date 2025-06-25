import { useEffect, useState } from "react";
import {

    Button,
    LinearProgress,

} from "@mui/material";
import { useGetBillingInfoQuery } from "../../Redux/Api/billing.api";
import { useGetSubscriptionHistoryQuery } from "../../Redux/Api/checkout.api";

import Loading from "../Loading";
import { Alert } from "antd";
import { CiWarning } from "react-icons/ci";
import type{ RootState } from "../../Redux/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";



const BillingInfo = () => {
    const { user } = useSelector((state: RootState) => state.userReducer);
    const navigate = useNavigate();

    const handleUpgradeClick = () => {
        navigate("/user-dashboard?tab=plans");
    };

    const [isExclusive, setIsExclusive] = useState(false);

    useEffect(() => {
        const isExclusive = localStorage.getItem("isExclusive");
        if (isExclusive === "true" || user?.usertype === "Exclusive") {
            setIsExclusive(true);
        }
        [];
    });


    interface BillingDataItem {
        currentPlan: string;
        expirationDate: string;
        notification: boolean;
        remainingDays: string;
        totalDays: string;
        price: string;
        planType: string;
    };


    interface SubscriptionHistoryItem {
        id: string;
        orderId: string;
        paymentStatus: string;
        planName: string;
        purchaseDate: string;
        amount: string;
    }

    const [billingData, setBillingData] = useState<BillingDataItem>({
        currentPlan: '',
        expirationDate: '',
        notification: false,
        remainingDays: '',
        totalDays: '',
        price: '',
        planType: '',
    });

    console.log(billingData);

    const [, setSubscriptionHistory] = useState<SubscriptionHistoryItem[]>([]);

    type BillingInfoData = {
        success: boolean;
        message: string;
        data?: any;
    };

    type SubscriptionHistoryData = {
        success: boolean;
        message: string;
        data?: any;
    };


    const { data, error, isLoading } = useGetBillingInfoQuery() as {
        data: BillingInfoData;
        error: any;
        isLoading: boolean;
    };

    const { data: subscriptionHistoryData } = useGetSubscriptionHistoryQuery() as {
        data: SubscriptionHistoryData;
        error: any;
        isLoading: boolean;
    };

    useEffect(() => {
        if (data?.success === true) {
            setBillingData(data.data);
        }
    }, [data]);



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



    if (isLoading) return <div><Loading /></div>;
    if (error) return <div>Error loading billing info</div>;




    // const columns = [
    //   {
    //     field: "serial",
    //     headerName: "S/N",
    //     width: 90,


    //   },
    //   {
    //     field: "orderId",
    //     headerName: "Order ID",
    //     width: 300,
    //     renderCell: (params: any) => (
    //       <Typography color="#000000" marginTop={"15px"}>
    //         #{params.value}
    //       </Typography>
    //     ),
    //   },

    //   {
    //     field: "planName",
    //     headerName: "Plan Name",
    //     width: 320,
    //     renderCell: (params: any) => (
    //       <Typography style={{ marginTop: "15px" }}>{params.value}</Typography>
    //     ),
    //   },
    //   {
    //     field: "purchaseDate",
    //     headerName: "Purchase Date",
    //     width: 430,
    //   },
    //   {
    //     field: "amount",
    //     headerName: "Amount",
    //     width: 310,
    //     renderCell: (params: any) => (
    //       <Box display="flex" alignItems="center">
    //         <Typography
    //           style={{
    //             backgroundColor: params.row.paymentStatus === "Completed" ? "#03C988" : "#FF0000",
    //             color: "white",
    //             padding: "4px 8px",
    //             borderRadius: "40px",
    //             fontWeight: "bold",
    //             marginTop: "10px",
    //           }}
    //         >
    //           ${params.value}
    //         </Typography>
    //       </Box>
    //     ),
    //   },
    //   // {
    //   //   field: "action",
    //   //   headerName: "Action",
    //   //   width: 150,
    //   //   renderCell: (params: any) => (
    //   //     <Box display="flex"  width="100%">
    //   //       <IconButton aria-label="view">
    //   //         <VisibilityIcon />
    //   //       </IconButton>
    //   //     </Box>
    //   //   ),
    //   // },
    // ];



    return (


        <div className="#BDC1CA">
            <div className="mb-10 flex flex-col items-center justify-between gap-8 rounded-lg bg-[#FFFFFF] md:flex-row md:p-10">
                <div className="flex w-full flex-col items-center justify-center gap-4 xl:w-[50%] 2xl:items-start 2xl:justify-start">
                    <div>
                        <h2 className="text-xl text-[#4C4E64]">Current Plan</h2>
                    </div>

                    <div className="py-2 text-center xl:py-4 2xl:text-left">
                        <h4
                            className="text-lg text-[#101828]"
                            style={{
                                fontFamily: "Proxima-Nova-semibold, sans-serif",
                                lineHeight: "27px",
                                letterSpacing: "3%",
                            }}
                        >
                            Your Current Plan is {billingData?.currentPlan}
                        </h4>
                        <p
                            className="text-md text-[#4C4E64]"
                            style={{ lineHeight: "24px", letterSpacing: "0.15px" }}
                        >
                            A simple start for everyone
                        </p>
                    </div>

                    <div className="py-2 text-center xl:py-4 2xl:text-left">
                        <h4
                            className="text-lg text-[#101828]"
                            style={{
                                fontFamily: "Proxima-Nova-semibold, sans-serif",
                                lineHeight: "27px",
                                letterSpacing: "3%",
                            }}
                        >

                            {
                                billingData?.expirationDate === 'N/A' ? 'Active' : `Active until ${billingData?.expirationDate}`
                            }


                        </h4>
                        <p
                            className="text-md text-[#4C4E64]"
                            style={{ lineHeight: "24px", letterSpacing: "0.15px" }}
                        >
                            We will send you a notification upon Subscription expiration{" "}
                        </p>
                    </div>
                    <div className="py-2 text-center xl:py-4 2xl:text-left">
                        <h4
                            className="text-lg text-[#101828]"
                            style={{
                                fontFamily: "Proxima-Nova-semibold, sans-serif",
                                lineHeight: "27px",
                                letterSpacing: "3%",
                            }}
                        >

                            <>
                                {billingData?.price}
                                {billingData?.price !== 'Free' && ` Per ${billingData?.planType}`}
                            </>
                            {!isExclusive || billingData?.currentPlan === "Standard" &&
                                <strong
                                    className="rounded-full bg-[#e9e9fc] p-2 px-2 text-sm text-[#666CFF] ml-2"
                                    style={{ fontFamily: "Proxima-Nova-Regular, sans-serif" }}
                                >
                                    Popular
                                </strong>
                            }
                        </h4>
                        {/* <p
              className="text-md text-[#4C4E64]"
              style={{ lineHeight: "24px", letterSpacing: "0.15px" }}
            >

            </p> */}
                    </div>

                    {isExclusive ? <div> </div> : <div>
                        <Button variant="contained" onClick={handleUpgradeClick} sx={{ backgroundColor: `${isExclusive ? '#8E69B4' : '#007EAF'}`, textTransform: 'none', }}>
                            Upgrade Plan
                        </Button>
                    </div>

                    }


                </div>
                <div className="w-[100%] px-2 xl:w-[50%]">
                    <div className="text-[#FDB528]">
                        {
                            billingData?.notification === true && (
                                <Alert
                                    message="We need your attention!"
                                    description="Your plan requires update"
                                    type="warning"
                                    showIcon
                                    icon={<CiWarning />}
                                    closable
                                />
                            )
                        }


                    </div>
                    {billingData?.currentPlan === "Standard" ? <div></div> : (
                        <div className="mb-4 mt-4">
                            <div className="flex justify-between font-bold text-[#4C4E64]">
                                <h4>Days</h4>
                                <h4>
                                    {billingData?.remainingDays} of {billingData?.totalDays} days
                                </h4>
                            </div>
                            <div className="mb-2 mt-2">
                                <LinearProgress
                                    variant="determinate"
                                    value={
                                        (Number(billingData?.remainingDays) / Number(billingData?.totalDays)) * 100
                                    }
                                />
                            </div>
                            <p>
                                {billingData?.remainingDays} days remaining until your plan requires update
                            </p>
                        </div>
                    )


                    }


                </div>
            </div>

            {/* <div className="rounded-lg bg-[#FFFFFF]">
        {
          isExclusive ? <div></div> : <div className="flex justify-end p-4">
            <Button variant="contained" onClick={handleUpgradeClick} sx={{ backgroundColor: `${isExclusive ? '#8E69B4' : '#007EAF'}`, textTransform: 'none', }}>
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
      </div> */}
        </div>
    );
};

export default BillingInfo;
