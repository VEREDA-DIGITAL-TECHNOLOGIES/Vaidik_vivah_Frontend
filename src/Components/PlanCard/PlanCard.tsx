import { useState } from "react";
import { MdDone } from "react-icons/md";
import { FaArrowRightLong, FaBan } from "react-icons/fa6";
import PlanForm from "../planform/PlanForm";
import { Link } from "react-router-dom";

type Plan = {
  id: string;
  name: string;
  monthly: string;
  discount: string;
  features: { text: string; included: boolean }[];
  duration: string;
  durationInMonths: number;
  description: string;
};

interface PlanCardProps {
  title: string;
  price: string;
  duration?: string;
  isHighlighted?: boolean;
  features: string[];
  id: string;
  onClick: (id: string) => void;
  isDisabled?: boolean;
}

const PlanCard = ({
  title,
  price,
  duration = "Per Month",
  isHighlighted = false,
  features,
  id,
  onClick,
  isDisabled = false,
}: PlanCardProps) => {
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  
  const isDiamondPlan = title === "Diamond";
  const displayTitle = isDiamondPlan ? "Registration for vedvivah" : title;

  const getDuration = () => {
    if (isDiamondPlan) return "";
    if (title === "Platinum") return "3 Months";
    return duration;
  };

  const displayDuration = getDuration();

  // Handle form submission and proceed to payment
  const handleFormSubmit = (formData: any) => {
    console.log("Form submitted with data:", formData);
    // Close the form
    setShowApplicationForm(false);
    
    // Trigger payment for the Diamond plan
    if (isDiamondPlan) {
      // You can pass the form data to the payment handler if needed
      handleDiamondPayment(id, formData);
    }
  };

  // Handle Diamond plan payment
  const handleDiamondPayment = async (planId: string, formData?: any) => {
    try {
      // Here you would integrate with your payment provider
      // For now, we'll use the same payment flow as other plans
      onClick(planId);
      
      // If you need to send form data with payment, you can modify your payment handlers
      // to accept additional data
      console.log("formdatam after payment are",formData);
    } catch (error) {
      console.error("Payment initiation failed:", error);
    }
  };

  const handleApplyNow = () => {
    if (isDiamondPlan) {
      setShowApplicationForm(true);
    } else {
      onClick(id);
    }
  };

  const handleCloseForm = () => {
    setShowApplicationForm(false);
  };

  const createPlanObject = (): Plan => {
    return {
      id: id,
      name: displayTitle,
      monthly: price, 
      discount: "₹0",
      features: features.map(feature => ({ text: feature, included: true })),
      duration: "Custom Plan",
      durationInMonths: 0,
      description: "Custom marriage consultation plan"
    };
  };

  return (
    <>
      <div
        className={`space-y-3 flex flex-col rounded-lg p-4 h-full ${
          isHighlighted ? "bg-[#f63371] text-white" : "bg-[#fe80a8] shadow text-white border"
        }`}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h1 className={`font-semibold text-3xl ${isHighlighted ? "" : "text-white"}`}>
              {displayTitle}
            </h1>
            
          </div>
          <h1 className={`text-4xl font-bold ${isHighlighted ? "" : "text-white"}`}>
            {price !== "Free" ? `INR ₹${price}` : price}
            {displayDuration && (
              <span className={`text-base font-normal text-white`}>
                {` /${displayDuration}`}
              </span>
            )}
          </h1>
        </div>

        <div className="space-y-3 flex-grow">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div
                className={`flex h-5 w-5 items-center justify-center rounded-full ${
                  isHighlighted ? "bg-[#007EAF] text-[#DDDDDD]" : "bg-[#F0F5FF] text-[#007EAF]"
                }`}
              >
                <MdDone />
              </div>
              <h1 className={isHighlighted ? "" : "text-white"}>{feature}</h1>
            </div>
          ))}
        </div>

        <div className="mt-auto flex justify-start">
            <div className="flex flex-col items-center gap-2">
              <button
                className={`flex w-80 items-center justify-center gap-4 rounded-lg border-2 p-2 font-semibold transition-all duration-300
                  ${
                    isDisabled
                      ? "cursor-not-allowed border-gray-400 bg-gray-200 text-gray-600"
                      : isDiamondPlan
                      ? "border-[#0a0809] bg-white text-[#FD5C90] hover:bg-[#FD5C90] hover:text-white"
                      : "border-[#FD5C90] bg-white text-[#FD5C90] hover:bg-[#FD5C90] hover:text-white"
                  }
                `}
                onClick={() => !isDisabled && onClick(id)}
                disabled={isDisabled}
              >
                {isDisabled ? (
                  <>
                    <FaBan className="text-xl" />
                    <span>Purchased</span>
                  </>
                ) : (
                  <>
                    <span>{isDiamondPlan ? "Apply Now" : "Get Started"}</span>
                    <FaArrowRightLong className="text-xl" />
                  </>
                )}
              </button>

              {isDiamondPlan && (
                <Link
                  to="/terms-and-conditions"
                  className="text-sm text-gray-500 underline hover:text-[#FD5C90]"
                >
                  Terms & Conditions apply
                </Link>
              )}
            </div>
          </div>
  </div>

      {showApplicationForm && isDiamondPlan && (
        <PlanForm
          plan={createPlanObject()}
          onClose={handleCloseForm}
          onSubmit={handleFormSubmit} // Pass the submit handler
        />
      )}
    </>
  );
};

export default PlanCard;