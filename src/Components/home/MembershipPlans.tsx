import React from "react";

type Plan = {
    name: string;
    monthly: string;
    yearly: string;
    features: { text: string; included: boolean }[];
};

const plans: Plan[] = [
    {
        name: "Free",
        monthly: "0",
        yearly: "0",
        features: [
            { text: "Browse Profiles", included: true },
            { text: "View profiles (with blurry effect)", included: true },
            { text: "Cannot view mobile numbers", included: false },
            { text: "Call and video features are disabled", included: false },
            
        ],
    },
    {
        name: "Gold",
        monthly: "₹1149",
        yearly: "₹24449",
        features: [
            { text: "Includes all features from Free Tier, plus", included: true },
            { text: "Unlimited chat with your matches or connections", included: true },
            { text: "Send unlimited requests", included: true },
            { text: "View profiles and photos without blur", included: true },
            { text: "15-minute video/audio call limit per profile", included: true },
            { text: "Access mobile numbers", included: true },
            { text: "View hidden photos (up to 3)", included: true },
           
        ],
    },
    {
        name: "Platinum",
        monthly: "₹1149",
        yearly: "₹24449",
        features: [
            { text: "Includes all features from Gold, plus", included: true },
            { text: "Unlimited chat with any user (even if not connected)", included: true },
            { text: "View hidden photos (up to 3)", included: true },
            { text: " 30-minute video/audio call limit per profile", included: true },
            {text: "Priority listing – your profile appears at the top in search results (SEO optimized)", included: true },
            
        ],
    },
    {
        name: "Diamond",
        monthly: "₹1149",
        yearly: "₹24449",
        features: [
            { text: "Includes all features from the above Platinum tiers, plus", included: true },
            { text: "Personal Relationship Manager to improve your profile", included: true },
            { text: " Free access to Astrologer / Panditji / Jyotish consultations", included: true },
        
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
