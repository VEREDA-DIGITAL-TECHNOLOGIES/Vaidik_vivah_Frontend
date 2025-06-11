const MembershipPlans = () => {
    return (
        <div className="bg-white py-16 px-6 lg:px-20 text-center">
            <h2 className="text-[28px] md:text-[48px] xl:text-[64px]  text-gray-800">
                <span className="text-[#a44949] font-Bembo-MT-Pro-Bold ">Membership</span> Plans
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-4 font-Bembo-MT-Pro-light">
                Upgrade your plan as per your customized requirements. With a paid membership, you can seamlessly
                connect with your prospects and get more responses. Here are some key benefits:
            </p>

            <div className="mt-12 flex flex-col lg:flex-row items-center justify-center gap-10">
                {/* Free Plan */}
                <div className="w-full max-w-sm bg-[#955454] text-white border border-gray-200 shadow rounded-lg p-6 text-left">
                    <h3 className="text-[20px] font-semibold mb-4">Free</h3>
                    <ul className="space-y-3 text-md text-white">
                        <li>✅ Browse Profiles</li>
                        <li>✅ Shortlist & Send Interest</li>
                        <li>✅ Message & chat with unlimited users</li>
                        <li >❌ Get up to 3x more matches daily</li>
                        <li >❌ Unlock access to advanced search</li>
                        <li >❌ View contact details</li>
                        <li >❌ Make unlimited voice and video calls</li>
                        <li >❌ Get 3 free Spotlights</li>
                    </ul>
                    <button className="mt-6 w-full text-[#a44949] bg-white py-2 rounded-md font-semibold text-md transition">
                        Register Free
                    </button>
                </div>

                {/* Paid Plan */}
                <div className="w-full max-w-sm bg-[#a44949] text-white shadow-lg rounded-lg p-6 text-left">
                    <h3 className="text-[20px] font-semibold mb-4">Paid</h3>
                    <ul className="space-y-3 text-md">
                        <li>✅ Browse Profiles</li>
                        <li>✅ Shortlist & Send Interest</li>
                        <li>✅ Message & chat with unlimited users</li>
                        <li>✅ Get up to 3x more matches daily</li>
                        <li>✅ Unlock access to advanced search</li>
                        <li>✅ View contact details</li>
                        <li>✅ Make unlimited voice and video calls</li>
                        <li>✅ Get 3 free Spotlights</li>
                    </ul>
                    <button className="mt-6 w-full bg-white text-[#a44949] text-md font-semibold py-2 rounded-md transition">
                        Browse Membership Plans
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MembershipPlans;
