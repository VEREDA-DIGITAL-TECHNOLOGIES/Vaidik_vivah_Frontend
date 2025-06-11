import React from "react";

const Subscription: React.FC = () => {
  return (
    <div className="  p-6 mt-12 max-md:mx-0 mx-24 ">
      <h2 className="text-3xl font-semibold text-center mb-4  pt-10  ">
        Subscription Plan Comparison
      </h2>

      <hr className="my-4" />

      <div>
        {/* <div className="overflow-x-auto ">
          <table className="w-full   border-collapse table-auto ">
            <thead className="border-b-2">
              <tr className="border-b-2  max-md:text-md text-center  text-2xl ">
                <th className="text-center">
                  <div className="pt-5 pb-5">Features</div>
                </th>
                <th>
                  <div className="pt-5 pb-5 mr-10">Standard</div>
                </th>
                <th>
                  <div className="pt-5 pb-5">Advanced ($9.99/month)</div>
                </th>
                <th>
                  <div className="pt-5 pb-5">Premium ($29.99/month)</div>
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
              <tr className="border-b-2 ">
                <td className="font-normal text-xl  max-md:text-md font-[Proxima-Nova-bold]  text-center pt-5 pb-5 ">
                  Price
                </td>
                <td className="font-normal pt-5 pb-5">Free</td>
                <td className="font-normal pt-5 pb-5">$9.99 per month</td>
                <td className="font-normal pt-5 pb-5">$29.99 per month</td>
              </tr>

              <tr className="border-b-2">
                <td className="pt-5 pb-5 text-xl max-md:text-md font-[Proxima-Nova-bold]">Match Access </td>
                <td className="pt-5 pb-5 text-md">
                  Limited matches
                </td>
                <td className="pt-5 pb-5 text-md">
                  Unlimited matches
                </td>
                <td className="pt-5 pb-5 ttext-md ">
                  Personalised matchmaking
                </td>
              </tr>

              <tr className="border-b-2 ">
                <td className="text-xl max-md:text-md font-[Proxima-Nova-bold]">Search Filters</td>
                <td className="pt-5 pb-5  text-md   ">
                  {" "}
                  Basic filters
                </td>
                <td className="pt-5 pb-5 text-md">
                  Advanced search filters
                </td>
                <td className="pt-5 pb-5 text-md">
                  {" "}
                  Advanced + Exclusive matchmaking filters
                </td>
              </tr>

              <tr className="border-b-2">
                <td className="text-xl max-md:text-md font-[Proxima-Nova-bold]">Visibility</td>
                <td className=" pt-5 pb-5 text-md  ">
                  {" "}
                  Standard visibility
                </td>
                <td className="pt-5 pb-5 text-md ">
                  {" "}
                  Visibility boosts
                </td>
                <td className="pt-5 pb-5 text-md ">
                  {" "}
                  Top-tier profile visibility
                </td>
              </tr>

              <tr className="border-b-2">
                <td className="text-xl max-md:text-md font-[Proxima-Nova-bold]">Events/Workshops</td>
                <td className="pt-5 pb-5  text-md ">
                  {" "}
                  Community forums only
                </td>
                <td className="pt-5 pb-5 text-md ">
                  {" "}
                  Monthly webinars
                </td>
                <td className="pt-5 pb-5 text-md ">
                  {" "}
                  Exclusive events + workshops
                </td>
              </tr>
              <tr className="border-b-2">
                <td className="text-xl max-md:text-md font-[Proxima-Nova-bold]">Customer Support</td>
                <td className="pt-5 pb-5 text-md  ">
                  {" "}
                  Basic support
                </td>
                <td className="pt-5 pb-5 text-md  ">
                  {" "}
                  Priority customer support
                </td>
                <td className="pt-5 pb-5 text-md ">
                  {" "}
                  24/7 VIP support + dedicated relationship manager
                </td>
              </tr>
              <tr className="border-b-2">
                <td className="text-xl font-[Proxima-Nova-bold]">Privacy Settings</td>
                <td className="pt-5 pb-5 text-md  ">
                  {" "}
                  Basic privacy
                </td>
                <td className="pt-5 pb-5 text-md  ">
                  {" "}
                  Enhanced privacy
                </td>
                <td className="pt-5 pb-5 text-md ">
                  {" "}
                  Ultimate control over privacy and visibility
                </td>
              </tr>

              <tr className="border-b-2">
                <td className="text-xl font-[Proxima-Nova-bold]">Additional Benefits</td>
                <td className="pt-5 pb-5 text-md ">
                  {" "}
                  N/A
                </td>
                <td className="pt-5 pb-5  text-md  ">
                  {" "}
                  Monthly relationship webinars
                </td>
                <td className="pt-5 pb-5 text-md ">
                  {" "}
                  Personality assessments + VIP networking events
                </td>
              </tr>

            </tbody>
          </table>
        </div> */}

        <div className="overflow-x-auto">
          <table className="w-full  border">
            <thead className="border-b-2 ">
              <tr className="border-b-2  max-md:text-md text-center  text-2xl">
                <th className="text-left p-2">
                  <div className="pt-5 pb-5 text-2xl">Features</div>
                </th>
                <th>
                  <div className="pt-5 pb-5 text-2xl">Standard</div>
                </th>
                <th>
                  <div className="pt-5 pb-5 text-2xl">Premium</div>
                </th>
                <th>
                  <div className="pt-5 pb-5 text-2xl">Exclusive</div>
                </th>
              </tr>
            </thead>

            <tbody className="text-center ">
              <tr className="border-b-2 ">
                <td className="font-normal text-xl max-md:text-md font-[Proxima-Nova-semiBold] text-left text-gray-500 ">
                  Membership Costs
                </td>
              </tr>
              <tr className="border-b-2">
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-left ">
                  1 Month
                </td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">Free</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">AU $5.99</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">AU $9.99</td>
              </tr>
              <tr className="border-b-2">
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-left ">
                  12 Months
                </td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">Free</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">AU $59.99</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">AU $79.99</td>
              </tr>
              {/* <tr className="border-b-2">
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-left ">
                  Subscriptions will auto-renew
                </td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">X</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">X</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
              </tr> */}

              <tr className="border-b-2">
                <td className="font-normal text-xl max-md:text-md font-Proxima-Nova-SemiBold text-left text-gray-500 ">
                  Basic access
                </td>
              </tr>

              <tr className="border-b-2">
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-left ">
                  Create favorites lists
                </td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
              </tr>

              <tr className="border-b-2">
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-left ">
                  Create photo profile
                </td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
              </tr>

              <tr className="border-b-2">
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-left ">
                  Send friend requests
                </td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">Limited to Premium and Standard profiles only</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
              </tr>

              <tr className="border-b-2">
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-left ">
                  View profiles in full
                </td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">X</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">Limited to Premium and Standard profiles only</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
              </tr>

              <tr className="border-b-2">
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-left ">
                  Access to Exclusive profiles
                </td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">X</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">X</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
              </tr>

              <tr className="border-b-2 ">
                <td className="font-normal text-xl max-md:text-md font-Proxima-Nova-SemiBold text-left text-gray-500">
                  Searching
                </td>
              </tr>

              <tr className="border-b-2">
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-left ">
                  Appear first in searches
                </td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">X</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">Limited</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
              </tr>
              <tr className="border-b-2">
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-left ">
                  Save searches
                </td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
              </tr>
              <tr className="border-b-2">
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-left ">
                  Search/browse profiles
                </td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
              </tr>
              <tr className="border-b-2">
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-left ">
                  Use advanced searching
                </td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
              </tr>

              <tr className="border-b-2">
                <td className="font-normal text-xl max-md:text-md font-Proxima-Nova-SemiBold text-left text-gray-500">
                  Communication
                </td>
              </tr>

              <tr className="border-b-2">
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-left ">
                  Send interests to members
                </td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
              </tr>
              <tr className="border-b-2">
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-left ">
                  Initiate in-app chat conversations
                </td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">X</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
              </tr>
              <tr className="border-b-2">
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-left ">
                  Respond to in-app chat requests
                </td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">X</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
              </tr>
              <tr className="border-b-2">
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-left ">
                  Initiate in-app video conversations
                </td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">X</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
              </tr>
              <tr className="border-b-2">
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-left ">
                  Send unlimited messages
                </td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">X</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
              </tr>
              <tr className="border-b-2">
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-left ">
                  Video conversation limit
                </td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">X</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">15 mins per call for each profile</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">30 mins per call for each profile</td>
              </tr>


              <tr className="border-b-2">
                <td className="font-normal text-xl max-md:text-md font-Proxima-Nova-SemiBold text-left text-gray-500">
                  Profile Management
                </td>
              </tr>

              <tr className="border-b-2">
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-left ">
                  Customize your profile
                </td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>

              </tr>
              <tr className="border-b-2">
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-left ">
                  See who's viewed your profile
                </td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
              </tr>
              <tr className="border-b-2">
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-left ">
                  Stand out from other profiles
                </td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">X</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">X</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center "></td>
              </tr>

              <tr className="border-b-2">
                <td className="font-normal text-xl max-md:text-md font-Proxima-Nova-SemiBold text-left  text-gray-500">
                  Matchmaking
                </td>
              </tr>

              <tr className="border-b-2">
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-left ">
                  Receive suggested matches
                </td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>

              </tr>
              <tr className="border-b-2">
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-left ">
                  Take personality test
                </td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
              </tr>
              <tr className="border-b-2">
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-left ">
                  Use matchmaking tools
                </td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
              </tr>

              <tr className="border-b-2">
                <td className="font-normal text-xl max-md:text-md font-Proxima-Nova-SemiBold text-left text-gray-500">
                  Security
                </td>
              </tr>

              <tr className="border-b-2">
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-left ">
                  Profile verification
                </td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>

              </tr>
              <tr className="border-b-2">
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-left ">
                  Password and OTP authentication
                </td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
              </tr>

            </tbody>
          </table>

        </div>


      </div>
    </div>
  );
};

export default Subscription;
