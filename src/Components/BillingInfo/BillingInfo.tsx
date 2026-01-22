import { useEffect, useState, useMemo, useCallback } from "react";
import {
    Button,
    LinearProgress,
    Typography,
    Card,
    CardContent,
} from "@mui/material";
import { useGetBillingInfoQuery } from "../../Redux/Api/billing.api";
import { useGetSubscriptionHistoryQuery } from "../../Redux/Api/checkout.api";
import Loading from "../Loading";
import { Alert } from "antd";
import { CiWarning } from "react-icons/ci";
import type { RootState } from "../../Redux/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Types
interface BillingDataItem {
    currentPlan: string;
    expirationDate: string;
    notification: boolean;
    remainingDays: string;
    totalDays: string;
    price: string;
    planType: string;
}

interface SubscriptionHistoryItem {
    id: string;
    orderId: string;
    paymentStatus: string;
    planName: string;
    purchaseDate: string;
    amount: string;
    serial?: number;
}

interface BillingInfoResponse {
    success: boolean;
    message: string;
    data?: BillingDataItem;
}

interface SubscriptionHistoryResponse {
    success: boolean;
    message: string;
    data?: SubscriptionHistoryItem[];
}

// Helper Hooks
const usePlanLogic = () => {
    const isFeesVedvivahRegistration = useCallback((planName: string) => {
        const plan = planName?.toLowerCase();
        return plan === "diamond" || plan === "vivah sansakar";
    }, []);

    const isPaidSubscriptionPlan = useCallback((planName: string) => {
        const plan = planName?.toLowerCase();
        const paidPlans = ["standard", "gold", "platinum"];
        return paidPlans.includes(plan);
    }, []);

    const getPlanDisplayName = useCallback((planName: string) => {
        const plan = planName?.toLowerCase();
        
        if (!plan) return "No Plan Selected";
        
        if (plan === "diamond" || plan === "vivah sansakar") {
            return "Vivah Sansakar (Registration Fees)";
        }
        
        switch (plan) {
            case "standard":
                return "Standard";
            case "gold":
                return "Gold";
            case "platinum":
                return "Platinum";
            default:
                return planName;
        }
    }, []);

    const getPlanDescription = useCallback((planName: string) => {
        const plan = planName?.toLowerCase();
        const descriptions: Record<string, string> = {
            "vivah sansakar": "Fees registration with basic features",
            "diamond": "Fees registration with basic features",
            "standard": "A simple start for everyone",
            "gold": "Advanced features for serious seekers",
            "platinum": "Premium features for exclusive matching"
        };
        return descriptions[plan] || "Please select a plan to get started";
    }, []);

    return {
        isFeesVedvivahRegistration,
        isPaidSubscriptionPlan,
        getPlanDisplayName,
        getPlanDescription
    };
};

// Error Component
const ErrorDisplay = ({ error, onRetry }: { error: any, onRetry?: () => void }) => (
    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-red-800 font-semibold mb-2">Error loading billing info</h3>
        <p className="text-red-600 text-sm mb-3">
            {error?.data?.message || error?.message || 'Unknown error occurred'}
        </p>
        {onRetry && (
            <Button 
                variant="outlined" 
                size="small" 
                onClick={onRetry}
                sx={{ color: '#dc2626', borderColor: '#dc2626' }}
            >
                Retry
            </Button>
        )}
    </div>
);

// Plan Progress Component
const PlanProgress = ({ 
    remainingDays, 
    totalDays, 
    planName 
}: { 
    remainingDays: string; 
    totalDays: string; 
    planName: string;
}) => {
    const progressValue = useMemo(() => {
        if (!remainingDays || !totalDays) return 0;
        return (Number(remainingDays) / Number(totalDays)) * 100;
    }, [remainingDays, totalDays]);

    const isStandardPlan = planName?.toLowerCase() === "standard";

    if (isStandardPlan) {
        return (
            <div className="mb-4 mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <h4 className="text-lg font-semibold text-gray-700">Standard Plan</h4>
                <p className="text-gray-600">
                    Your Standard plan has no expiration date. You can continue using it indefinitely.
                </p>
            </div>
        );
    }

    return (
        <div className="mb-4 mt-4">
            <div className="flex justify-between font-bold text-[#4C4E64]">
                <h4>Days</h4>
                <h4>
                    {remainingDays} of {totalDays} days
                </h4>
            </div>
            <div className="mb-2 mt-2">
                <LinearProgress
                    variant="determinate"
                    value={progressValue}
                    sx={{
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: '#f0f0f0',
                        '& .MuiLinearProgress-bar': {
                            backgroundColor: '#FD5C90',
                            borderRadius: 5,
                        }
                    }}
                />
            </div>
            <p className="text-[#4C4E64]">
                {remainingDays} days remaining until your plan requires update
            </p>
        </div>
    );
};

// Fees Registration Card
const FeesRegistrationCard = () => (
    <div className="mb-4 mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <h4 className="text-lg font-semibold text-[#FD5C90] mb-2">
            Vedvivah  Free features
        </h4>
        <p className="text-[#FD5C90] mb-2">
            You have registered for Vedvivah with basic features:
        </p>
        <ul className="list-disc pl-5 text-[#FD5C90] space-y-1">
            <li>Basic profile creation</li>
            <li>Limited matches viewing</li>
            <li>Standard search functionality</li>
            <li>Basic communication tools</li>
        </ul>
        <p className="text-[#FD5C90] mt-3">
            Upgrade to a paid plan for unlimited matches, advanced search, and premium features.
        </p>
    </div>
);

// Plan Status Component
const PlanStatus = ({ 
    isFeesRegistration, 
    isPaidPlan, 
    expirationDate 
}: { 
    isFeesRegistration: boolean; 
    isPaidPlan: boolean; 
    expirationDate: string;
}) => {
    if (isFeesRegistration) {
        return (
            <>
                <h4 className="text-lg text-[#101828] font-semibold">
                    Registration Fees Forever
                </h4>
                <p className="text-md text-[#4C4E64]">
                    Your registration never expires
                </p>
            </>
        );
    }

    if (isPaidPlan) {
        return (
            <>
                <h4 className="text-lg text-[#101828] font-semibold">
                    {expirationDate === 'N/A' 
                        ? 'Active' 
                        : `Active until ${expirationDate}`
                    }
                </h4>
                <p className="text-md text-[#4C4E64]">
                    We will send you a notification upon subscription expiration
                </p>
            </>
        );
    }

    return (
        <>
            <h4 className="text-lg text-[#101828] font-semibold">
                Not Active
            </h4>
            <p className="text-md text-[#4C4E64]">
                Please select a plan to get started
            </p>
        </>
    );
};

// Main Component
const BillingInfo = () => {
    const { user } = useSelector((state: RootState) => state.userReducer);
    const navigate = useNavigate();
    
    const [isExclusive, setIsExclusive] = useState(false);
    const [billingData, setBillingData] = useState<BillingDataItem>({
        currentPlan: '',
        expirationDate: '',
        notification: false,
        remainingDays: '',
        totalDays: '',
        price: '',
        planType: '',
    });

    const { 
        isFeesVedvivahRegistration, 
        isPaidSubscriptionPlan, 
        getPlanDisplayName,
        getPlanDescription 
    } = usePlanLogic();

    // Fetch billing info
    const { 
        data: billingResponse, 
        error: billingError, 
        isLoading: isBillingLoading,
        refetch: refetchBilling 
    } = useGetBillingInfoQuery() as {
        data: BillingInfoResponse;
        error: any;
        isLoading: boolean;
        refetch: () => void;
    };

    // Fetch subscription history
    const { 
        data: subscriptionHistoryResponse, 
        error: historyError,
        isLoading: isHistoryLoading 
    } = useGetSubscriptionHistoryQuery() as {
        data: SubscriptionHistoryResponse;
        error: any;
        isLoading: boolean;
    };

    // Check exclusive status
    useEffect(() => {
        const isExclusive = localStorage.getItem("isExclusive");
        if (isExclusive === "true" || user?.usertype === "Exclusive") {
            setIsExclusive(true);
        }
    }, [user?.usertype]);

    // Set billing data
    useEffect(() => {
        if (billingResponse?.success && billingResponse.data) {
            setBillingData(billingResponse.data);
        }
    }, [billingResponse]);

    // Set subscription history
    useEffect(() => {
        if (subscriptionHistoryResponse?.success && subscriptionHistoryResponse.data) {
            const historyWithSerial = subscriptionHistoryResponse.data.map((item, index) => ({
                ...item,
                serial: index + 1,
                id: item.orderId || `order-${index}`,
            }));
            // You can store this in state if needed elsewhere
            console.log('Subscription history:', historyWithSerial);
        }
    }, [subscriptionHistoryResponse]);

    // Memoized computed values
    const actualPlanName = useMemo(() => 
        billingData?.currentPlan?.toLowerCase(), 
        [billingData?.currentPlan]
    );

    const isFeesRegistration = useMemo(() => 
        isFeesVedvivahRegistration(billingData?.currentPlan), 
        [billingData?.currentPlan, isFeesVedvivahRegistration]
    );

    const isPaidPlan = useMemo(() => 
        isPaidSubscriptionPlan(billingData?.currentPlan), 
        [billingData?.currentPlan, isPaidSubscriptionPlan]
    );

    const planDisplayName = useMemo(() => 
        getPlanDisplayName(billingData?.currentPlan), 
        [billingData?.currentPlan, getPlanDisplayName]
    );

    const planDescription = useMemo(() => 
        getPlanDescription(billingData?.currentPlan), 
        [billingData?.currentPlan, getPlanDescription]
    );

    const handleUpgradeClick = () => {
        navigate("/user-dashboard?tab=plans");
    };

    const handleRetry = () => {
        refetchBilling();
    };

    // Loading state
    if (isBillingLoading || isHistoryLoading) {
        return (
            <div className="min-h-[400px] flex items-center justify-center">
                <Loading />
            </div>
        );
    }

    // Error state
    if (billingError || historyError) {
        return (
            <div className="p-4">
                {billingError && <ErrorDisplay error={billingError} onRetry={handleRetry} />}
                {historyError && !billingError && (
                    <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-yellow-700">
                            Note: Could not load subscription history, but billing info is available.
                        </p>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen p-4">
            <Card className="mb-10 rounded-lg shadow-lg">
                <CardContent className="p-6 md:p-10">
                    <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
                        {/* Left Section - Plan Details */}
                        <div className="flex w-full flex-col items-center justify-center gap-6 md:items-start md:justify-start lg:w-[50%]">
                            {/* Current Plan Header */}
                            <div>
                                <Typography variant="h6" className="text-[#4C4E64]">
                                    Current Plan
                                </Typography>
                            </div>

                            {/* Plan Name */}
                            <div className="py-2 text-center md:text-left">
                                <h4 className="text-lg text-[#101828] font-semibold">
                                    {isFeesRegistration ? (
                                        <>
                                            You have <span className="text-[#FD5C90]">Fees Registration</span> for Vedvivah
                                        </>
                                    ) : isPaidPlan ? (
                                        <>
                                            Your Current Plan is <span className="text-[#FD5C90]">
                                                {planDisplayName}
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            No Plan Selected
                                        </>
                                    )}
                                </h4>
                                <p className="text-md text-[#4C4E64] mt-1">
                                    {planDescription}
                                </p>
                            </div>

                            {/* Plan Status */}
                            <div className="py-2 text-center md:text-left">
                                <PlanStatus 
                                    isFeesRegistration={isFeesRegistration}
                                    isPaidPlan={isPaidPlan}
                                    expirationDate={billingData?.expirationDate}
                                />
                            </div>
                            
                            {/* Price */}
                            <div className="py-2 text-center md:text-left">
                                <h4 className="text-lg text-[#101828] font-semibold">
                                    {isFeesRegistration ? (
                                        <span className="text-green-600">FREE</span>
                                    ) : (
                                        <>
                                            {billingData?.price}
                                            {billingData?.price !== 'Free' && billingData?.price && billingData?.planType && 
                                                ` Per ${billingData?.planType}`}
                                        </>
                                    )}
                                    {isPaidPlan && !isExclusive && actualPlanName === "standard" && (
                                        <span className="ml-2 rounded-full bg-[#e9e9fc] px-3 py-1 text-sm text-[#FD5C90]">
                                            Popular
                                        </span>
                                    )}
                                </h4>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col gap-3 sm:flex-row">
                                {/* Upgrade button for non-exclusive users without paid plans */}
                                {!isExclusive && !isPaidPlan && (
                                    <Button 
                                        variant="contained" 
                                        onClick={handleUpgradeClick} 
                                        sx={{ 
                                            backgroundColor: '#FD5C90', 
                                            textTransform: 'none',
                                            borderRadius: '8px',
                                            '&:hover': {
                                                backgroundColor: '#ff7da8',
                                            }
                                        }}
                                    >
                                        {isFeesRegistration ? "Upgrade to Premium" : "Choose a Plan"}
                                    </Button>
                                )}

                                {/* Manage subscription button for paid plan users */}
                                {isPaidPlan && !isExclusive && (
                                    <Button 
                                        variant="outlined" 
                                        onClick={handleUpgradeClick}
                                        sx={{ 
                                            borderColor: '#FD5C90',
                                            color: '#FD5C90',
                                            textTransform: 'none',
                                            borderRadius: '8px',
                                            '&:hover': {
                                                borderColor: '#ff7da8',
                                                color: '#ff7da8',
                                            }
                                        }}
                                    >
                                        Manage Subscription
                                    </Button>
                                )}
                            </div>

                            {/* User Status Messages */}
                            <div className="mt-2">
                                {isExclusive && (
                                    <div className="text-green-600 font-medium flex items-center gap-2">
                                        <span className="text-xl">✓</span>
                                        You have exclusive access with premium features
                                    </div>
                                )}

                                {isPaidPlan && !isExclusive && (
                                    <div className="text-[#4C4E64]">
                                        You can upgrade or manage your subscription from the Plans page
                                    </div>
                                )}

                                {isFeesRegistration && (
                                    <div className="text-[#FD5C90]">
                                        Enjoy your basic registration features. Consider upgrading for more benefits.
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        {/* Right Section - Alerts and Progress */}
                        <div className="w-full lg:w-[50%]">
                            {/* Warning alert for paid plans only */}
                            {isPaidPlan && billingData?.notification === true && (
                                <div className="text-[#FDB528] mb-4">
                                    <Alert
                                        message="We need your attention!"
                                        description="Your plan requires update"
                                        type="warning"
                                        showIcon
                                        icon={<CiWarning />}
                                        closable
                                        className="rounded-lg"
                                    />
                                </div>
                            )}

                            {/* Fees registration message */}
                            {isFeesRegistration && <FeesRegistrationCard />}

                            {/* Progress bar for paid plans */}
                            {isPaidPlan && (
                                <PlanProgress 
                                    remainingDays={billingData?.remainingDays}
                                    totalDays={billingData?.totalDays}
                                    planName={billingData?.currentPlan}
                                />
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Additional Information Section (Optional) */}
            {(isPaidPlan || isFeesRegistration) && (
                <Card className="rounded-lg shadow">
                    <CardContent className="p-6">
                        <Typography variant="h6" className="mb-4 text-[#4C4E64]">
                            Plan Information
                        </Typography>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Typography variant="body2" className="text-[#4C4E64]">
                                    Plan Type
                                </Typography>
                                <Typography variant="body1" className="font-medium">
                                    {planDisplayName}
                                </Typography>
                            </div>
                            <div>
                                <Typography variant="body2" className="text-[#4C4E64]">
                                    Payment Status
                                </Typography>
                                <Typography variant="body1" className="font-medium">
                                    {isFeesRegistration ? 'One-time Fee' : 'Subscription'}
                                </Typography>
                            </div>
                            {isPaidPlan && (
                                <>
                                    <div>
                                        <Typography variant="body2" className="text-[#4C4E64]">
                                            Billing Cycle
                                        </Typography>
                                        <Typography variant="body1" className="font-medium">
                                            {billingData?.planType || 'N/A'}
                                        </Typography>
                                    </div>
                                    <div>
                                        <Typography variant="body2" className="text-[#4C4E64]">
                                            Next Billing Date
                                        </Typography>
                                        <Typography variant="body1" className="font-medium">
                                            {billingData?.expirationDate === 'N/A' 
                                                ? 'Not applicable' 
                                                : billingData?.expirationDate}
                                        </Typography>
                                    </div>
                                </>
                            )}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default BillingInfo;