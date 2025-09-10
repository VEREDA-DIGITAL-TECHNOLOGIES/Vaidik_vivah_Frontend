import React from "react";
import { useGetPlansQuery } from "../../Redux/Api/plan.api"; 

type Plan = {
  name: string;
  monthly: string;
  discount: string;
  features: { text: string; included: boolean }[];
};
type ApiResponse = {
  success: boolean;
  data: {
    id: string;
    planName: string;
    price: string;
    durationInMonths: number;
    description: string;
    planType: string;
    featureList: string[];
  }[];
  message: string;
};

const MembershipPlans: React.FC = () => {
  const { data, isLoading, isError } = useGetPlansQuery() as {
    data?: ApiResponse;
    isLoading: boolean;
    isError: boolean;
  };

  if (isLoading) {
    return <p className="text-center text-white">Loading plans...</p>;
  }

  if (isError || !data?.success) {
    return <p className="text-center text-red-500">Failed to load plans</p>;
  }

  const plans: Plan[] = data.data.map((p: any) => ({
    name: p.planName,
    monthly: `₹${Number(p.price) + 5000}`, // Example crossed-out price
    discount: `₹${p.price}`,
    features: p.featureList.map((f: string) => ({
      text: f,
      included: true,
    })),
  }));

  return (
    <section className="bg-gradient-to-b from-[#FD5C90] to-[#FFFFFF] py-16 px-4 text-center">
      <h2 className="text-3xl font-bold mb-12 text-white">Membership Plan</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className="bg-[#FECEDC] rounded-xl shadow-lg p-6 flex flex-col items-center"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#FFFFFF] to-[#FD5C90] text-black py-3 w-[250px] rounded-md shadow mb-4">
              <p className="font-bold text-xl">{plan.name}</p>
              <span>(3 Months Plan)</span>
            </div>

            {/* Prices */}
            <div className="text-sm text-left w-full border-t border-b py-3 space-y-1 border-white">
              <div className="flex justify-center gap-3 font-bold">
                <del>
                  <span>{plan.monthly}</span>
                </del>
                <span>{plan.discount}</span>
              </div>
            </div>

            {/* Features */}
            <ul className="mt-4 text-left w-full space-y-2">
              {plan.features.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-black"
                >
                  <span className="text-lg">
                    {feature.included ? "✅" : "❌"}
                  </span>
                  {feature.text}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MembershipPlans;
