import React, { useState } from "react";
import { useGetPlansQuery } from "../../Redux/Api/plan.api";
import PlanForm from "../planform/PlanForm";

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

type ApiPlan = {
  id: string;
  planName: string;
  price: string;
  durationInMonths: number;
  description: string;
  planType: string;
  featureList: string[];
};

type ApiResponse = {
  success: boolean;
  data: ApiPlan[];
  message: string;
};

const MembershipPlans: React.FC = () => {
  const { data, isLoading, isError } = useGetPlansQuery(undefined, {
    selectFromResult: ({ data, isLoading, isError }) => ({
      data: data as ApiResponse | undefined,
      isLoading,
      isError,
    }),
  });

  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [selectedDiamondPlan, setSelectedDiamondPlan] = useState<Plan | null>(null);

  const handleApplyNow = (plan: Plan) => {
    setSelectedDiamondPlan(plan);
    setShowApplicationForm(true);
  };

  const handleCloseForm = () => {
    setShowApplicationForm(false);
    setSelectedDiamondPlan(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-[#FD5C90] to-[#FFFFFF]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        <p className="ml-4 text-white text-lg">Loading plans...</p>
      </div>
    );
  }

  if (isError || !data?.success) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-[#FD5C90] to-[#FFFFFF]">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-red-500 text-xl mb-2">Failed to load plans</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-white text-[#FD5C90] rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const planOrder: Record<string, number> = {
    "Gold": 1,
    "Platinum": 2,
    "Vivah Sansakar": 3
  };

  const plans: Plan[] = data.data
    .map((p: ApiPlan) => {
      const isDiamondPlan = p.planName === "Diamond";
      const monthlyPrice = Number(p.price) + 5000;
      const discountPrice = Number(p.price);
      
      return {
        id: p.id,
        name: isDiamondPlan ? "Vivah Sansakar" : p.planName,
        monthly: isDiamondPlan ? "₹1000" : `₹${monthlyPrice}`,
        discount: isDiamondPlan ? "₹1000" : `₹${discountPrice}`,
        features: p.featureList.map((f: string) => ({
          text: f,
          included: true,
        })),
        duration: isDiamondPlan 
          ? "Custom Plan" 
          : p.durationInMonths === 1 
            ? "1 Month Plan" 
            : `${p.durationInMonths} Months Plan`,
        durationInMonths: isDiamondPlan ? 0 : p.durationInMonths,
        description: p.description
      };
    })
    .sort((a, b) => {
      const aOrder = planOrder[a.name] || 999;
      const bOrder = planOrder[b.name] || 999;
      return aOrder - bOrder;
    });

  return (
    <>
      <section className="min-h-screen bg-gradient-to-b from-[#FD5C90] to-[#FFFFFF] py-16 px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Choose Your Perfect Plan
          </h2>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            Select the membership that fits your goals. All plans include premium features with flexible durations.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan) => {
            const isVivahSansakar = plan.name === "Vivah Sansakar";
            const isSelected = selectedPlan === plan.id;
            
            return (
              <div
                key={plan.id}
                className={`relative transition-all duration-300 ${
                  isSelected ? 'scale-105' : 'hover:scale-102'
                }`}
                onMouseEnter={() => setSelectedPlan(plan.id)}
                onMouseLeave={() => setSelectedPlan(null)}
              >
                {/* Plan Card */}
                <div className={`
                  bg-[#FECEDC] rounded-2xl shadow-xl overflow-hidden h-full flex flex-col
                  transition-all duration-300 hover:shadow-2xl
                `}>
                  {/* Plan Header */}
                  <div className="flex flex-col p-4 items-center">
                    <div className="bg-gradient-to-r from-[#FFFFFF] to-[#FD5C90] text-black py-3 w-[250px] rounded-md shadow mb-4 flex justify-center flex-col items-center">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                      <span className="text-gray-700 font-semibold">({plan.duration})</span>
                    </div>
                    <p className="text-gray-600 mt-2 text-sm text-center">{plan.description}</p>
                  </div>

                  {/* Price Section - Hidden for Vivah Sansakar */}
                  {!isVivahSansakar && (
                    <div className="p-6 border-b border-gray-200">
                      <div className="flex items-center justify-center gap-4 mb-2">
                        <del className="text-gray-500 text-lg">
                          {plan.monthly}
                        </del>
                        <span className="text-3xl font-bold text-gray-900">{plan.discount}</span>
                      </div>
                      <div className="text-green-600 font-semibold text-sm text-center">
                        Save ₹5000 ({Math.round((5000 / Number(plan.monthly.replace('₹', ''))) * 100)}% OFF)
                      </div>
                    </div>
                  )}

                  {/* Features List */}
                  <div className="p-6 flex-grow">
                    <h4 className="font-semibold text-gray-900 mb-4 text-lg">What's Included:</h4>
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-green-500 text-lg mt-0.5">✓</span>
                          <span className="text-gray-700">{feature.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Section */}
                  <div className="p-6 pt-0">
                    {isVivahSansakar ? (
                      <button
                        onClick={() => handleApplyNow(plan)}
                        className="w-full py-3 bg-[#FD5C90] text-white rounded-lg font-semibold hover:bg-[#e04a7d] transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                      >
                        Apply Now - ₹1000
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                      </button>
                    ) : (
                      <button className="w-full py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold cursor-not-allowed opacity-50">
                        Select Plan
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Application Form Popup */}
      {showApplicationForm && selectedDiamondPlan && (
        <PlanForm
          plan={selectedDiamondPlan}
          onClose={handleCloseForm}
        />
      )}
    </>
  );
};

export default MembershipPlans;