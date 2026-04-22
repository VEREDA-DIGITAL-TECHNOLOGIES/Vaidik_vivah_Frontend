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
  const [showGSTModal, setShowGSTModal] = useState(false);

  const isDiamondPlan = title === "Diamond";
  const displayTitle = isDiamondPlan ? "Registration for vedvivah" : title;

  const getDuration = () => {
    if (isDiamondPlan) return "";
    if (title === "Platinum") return "3 Months";
    return duration;
  };

  const displayDuration = getDuration();

  // GST Calculation
  const basePrice =
    price !== "Free" ? Math.round(Number(price) / 1.18) : 0;

  const gstAmount =
    price !== "Free" ? Number(price) - basePrice : 0;

  const handleFormSubmit = (formData: any) => {
    setShowApplicationForm(false);

    if (isDiamondPlan) {
      handleDiamondPayment(id, formData);
    }
  };

  const handleDiamondPayment = async (planId: string, formData?: any) => {
    try {
      onClick(planId);
      console.log(formData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleApplyNow = () => {
    if (isDiamondPlan) {
      setShowApplicationForm(true);
    } else {
      onClick(id);
    }
  };

  const createPlanObject = (): Plan => {
    return {
      id,
      name: displayTitle,
      monthly: price,
      discount: "₹0",
      features: features.map((feature) => ({
        text: feature,
        included: true,
      })),
      duration: "Custom Plan",
      durationInMonths: 0,
      description: "Custom marriage consultation plan",
    };
  };

  return (
    <>
      <div
        className={`space-y-3 flex flex-col rounded-lg p-4 h-full ${
          isHighlighted
            ? "bg-[#f63371] text-white"
            : "bg-[#fe80a8] shadow text-white border"
        }`}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="font-semibold text-3xl">
              {displayTitle}
            </h1>
          </div>

          {/* GST Section */}
          <div className="flex justify-between  items-center text-center">
            <p className="text-sm">incl. 18% GST</p>

            <button
              onClick={() => setShowGSTModal(true)}
              className="text-sm underline hover:text-gray-200 cursor-pointer"
            >
              View breakdown
            </button>
          </div>

          <h1 className="text-4xl font-bold">
            {price !== "Free" ? `INR ₹${price}` : price}

            {displayDuration && (
              <span className="text-base font-normal">
                {` /${displayDuration}`}
              </span>
            )}
          </h1>
        </div>

        {/* Features */}
        <div className="space-y-3 flex-grow">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#007EAF]">
                <MdDone />
              </div>
              <h1>{feature}</h1>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="mt-auto">
          <button
            className={`flex w-full items-center justify-center gap-4 rounded-lg border-2 p-2 font-semibold transition-all duration-300 ${
              isDisabled
                ? "cursor-not-allowed border-gray-400 bg-gray-200 text-gray-600"
                : "border-[#FD5C90] bg-white text-[#FD5C90] hover:bg-[#FD5C90] hover:text-white"
            }`}
            onClick={() => {
              if (isDisabled) return;

              if (isDiamondPlan) {
                handleApplyNow();
              } else {
                onClick(id);
              }
            }}
            disabled={isDisabled}
          >
            {isDisabled ? (
              <>
                <FaBan className="text-xl" />
                <span>Purchased</span>
              </>
            ) : (
              <>
                <span>
                  {isDiamondPlan ? "Apply Now" : "Get Started"}
                </span>
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

      {/* GST Modal */}
      {showGSTModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              GST Breakdown
            </h2>

            <div className="space-y-3 text-gray-700">
              <div className="flex justify-between">
                <span>Base Price</span>
                <span>₹{basePrice}</span>
              </div>

              <div className="flex justify-between">
                <span>GST (18%)</span>
                <span>₹{gstAmount}</span>
              </div>

              <div className="border-t pt-3 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{price}</span>
              </div>
            </div>

            <button
              onClick={() => setShowGSTModal(false)}
              className="mt-6 w-full  cursor-pointer rounded-lg bg-[#FD5C90] py-2 text-white font-semibold hover:opacity-90"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showApplicationForm && isDiamondPlan && (
        <PlanForm
          plan={createPlanObject()}
          onClose={() => setShowApplicationForm(false)}
          onSubmit={handleFormSubmit}
        />
      )}
    </>
  );
};

export default PlanCard;