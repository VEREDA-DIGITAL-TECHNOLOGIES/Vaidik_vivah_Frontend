import React from "react";

type Plan = {
    name: string;
    monthly: string;
    yearly: string;
    features: { text: string; included: boolean }[];
};

const plans: Plan[] = [
    {
        name: "Silver",
        monthly: "₹1149",
        yearly: "₹24449",
        features: [
            { text: "Browse Profiles", included: true },
            { text: "Shortlist & Send Interest", included: true },
            { text: "Message & chat with unlimited users", included: true },
            { text: "Get up to 3x more matches daily", included: false },
            { text: "Unlock access to advanced search", included: false },
            { text: "View contact details", included: false },
            { text: "Make unlimited voice and video calls", included: false },
            { text: "Get 3 free Spotlights", included: false },
        ],
    },
    {
        name: "Gold",
        monthly: "₹1149",
        yearly: "₹24449",
        features: [
            { text: "Browse Profiles", included: true },
            { text: "Shortlist & Send Interest", included: true },
            { text: "Message & chat with unlimited users", included: true },
            { text: "Get up to 3x more matches daily", included: false },
            { text: "Unlock access to advanced search", included: false },
            { text: "View contact details", included: false },
            { text: "Make unlimited voice and video calls", included: false },
            { text: "Get 3 free Spotlights", included: false },
        ],
    },
    {
        name: "Diamond",
        monthly: "₹1149",
        yearly: "₹24449",
        features: [
            { text: "Browse Profiles", included: true },
            { text: "Shortlist & Send Interest", included: true },
            { text: "Message & chat with unlimited users", included: true },
            { text: "Get up to 3x more matches daily", included: false },
            { text: "Unlock access to advanced search", included: false },
            { text: "View contact details", included: false },
            { text: "Make unlimited voice and video calls", included: false },
            { text: "Get 3 free Spotlights", included: false },
        ],
    },
];

const MembershipPlans: React.FC = () => {
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
                        <div className="bg-gradient-to-r from-[#FFFFFF] to-[#FD5C90] text-black font-bold text-xl py-3 w-[250px]  rounded-md shadow mb-4">
                            {plan.name}
                        </div>

                        {/* Prices */}
                        <div className="text-sm text-left w-full border-t border-b py-3 space-y-1 border-white">
                            <div className="flex justify-between">
                                <span>Monthly Price</span>
                                <span>{plan.monthly}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Yearly Price</span>
                                <span>{plan.yearly}</span>
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
