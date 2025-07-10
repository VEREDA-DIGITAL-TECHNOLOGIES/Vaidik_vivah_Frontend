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
            { text: "Blurred  two profile shown rest will be blurred photo or locked", included: true },
            { text: "Profile view- 50", included: true },
            { text: "Request  can sent", included: true },
            { text: "Chat initiate- Hi", included: true },
            { text: "Horoscope view", included: true },

            
        ],
    },
    {
        name: "Gold",
        monthly: "₹1149",
        yearly: "₹24449",
        features: [
            { text: "Includes all features from Free Tier, plus", included: true },
            { text: "Initiate chat", included: true },
            { text: "View unlimited verified users", included: true },
            { text: "Send unlimited message", included: true },
            { text: "Connect with your preferred match", included: true },
            {text: "RequestView - city, cast, horoscope, age, height, color, income, food,Audio, VC - 15 minutes ", included: true },
            
           
        ],
    },
    {
        name: "Platinum",
        monthly: "₹1149",
        yearly: "₹24449",
        features: [
            { text: "Includes all features from Gold, plus", included: true },
            { text: "Ac/ Vc Limitation - 30 minute", included: true },
            { text: "Send unlimited msg", included: true },
            { text: "Connect with match", included: true },
            { text: "Astrologer support by vaidik vivah", included: true },
            { text: "Dedicated customer support", included: true },

            
        ],
    },
    {
        name: "Diamond",
        monthly: "₹1149",
        yearly: "₹24449",
        features: [
            {
                text: "Videochat unlimited", included: true },
            { text: "Dedicated relationship manager", included: true },
            { text: "Astrologer support", included: true },
            { text: "Provide pandit jee for shadi", included: true },
            { text: "Astrologer  support by vaidik vivah", included: true },
            { text: "5 profiles daily will be provide by Vadik team", included: true },
            { text: "We will arrange a meeting with your preferred match…", included: true },

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
