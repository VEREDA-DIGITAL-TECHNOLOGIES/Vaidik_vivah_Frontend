import React from "react";

type Plan = {
    name: string;
    monthly: string;
    discount:string;
    features: { text: string; included: boolean }[];

};

const plans: Plan[] = [
    // {
    //     name: "Free",
    //     monthly: "0",
    //     yearly: "0",
    //     features: [
    //         { text: "Blurred  two profile shown rest will be blurred photo or locked", included: true },
    //         { text: "Profile view- 50", included: true },
    //         { text: "Request  can sent", included: true },
    //         { text: "Chat initiate- Hi", included: true },
    //         { text: "Horoscope view", included: true },

            
    //     ],
    // },
    {
        name: "Gold",
        monthly: "₹4999",
        discount:"₹3499",
        
        features: [
            { text: "Initiate Conversation with matching ", included: true },
            { text: "View Unlimited verified users", included: true },
            { text: "Access verified profiles with photos", included: true },
            { text: "Connected with your preferred match", included: true },
            {
                text: "Send unlimited massages ", included: true },
            { text: "Unlimited horoscope views ", included: true },
            { text: "Voice/ Video call - 30 min ", included: true },
            { text: "Astrologer support  ", included: true },
            {text: "Ved vivah plan / meet-up video call ", included: true },
            { text: "ved vivah virtual plan and support  ", included: true },
        ],
    },
    {
        name: "Platinum",
        monthly: "₹21000",
        discount: "₹14999",
        features: [
            { text: "Includes all features from gold ", included: true },
            {
                text: "Includes all features from gold ", included: true },
            { text: "Unlimited Voice/Video call", included: true },
            { text: "Astrologer support ", included: true },
            { text: "ved vivah plan and support ", included: true },
            { text: "1 Acharya", included: true },
            { text: "1 Mantra pathi ( pandit ji)", included: true },
            {   text: "2 Musician", included: true },
            { text: "Free All sanskar ", included: true },
            
        ],
    },
    {
        name: "Diamond",
        monthly: "₹31000",
        discount: "₹21999",
        features: [
            {
                text: "Includes all features from gold ", included: true },
            {
                text: "Unlimited Voice/Video call ", included: true },
            { text: "Astrologer support ", included: true },
            { text: "Ved vivah plan and support", included: true },
            { text: "1 Acharya ", included: true },
            { text: "2 Mantra pathi ( pandit ji)", included: true },
            { text: "2 Singer ", included: true },
            { text: "3 Musician  ", included: true },
            { text: "Free All sanskar  ", included: true },
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
                        <div className="bg-gradient-to-r from-[#FFFFFF] to-[#FD5C90] text-black  py-3 w-[250px]  rounded-md shadow mb-4">
                            <p className="font-bold text-xl">
                             {plan.name}
                            </p>   
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
                            {/* <div className="flex justify-between">
                                <span>Yearly Price</span>
                                <span>{plan.yearly}</span>
                            </div> */}
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
