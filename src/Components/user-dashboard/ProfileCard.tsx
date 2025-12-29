import React from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { FaRegMap } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../Redux/store";
import { useSelector } from "react-redux";
import { useUserProfileNotificationMutation } from "../../Redux/Api/profile.api";
import "../../font.css";

interface Profile {
  id: string;
  profileImages: Array<string>;
  userId: string;
  userType: string;
  gender: string;
  age: string;
  match_percentage: string;
  displayName: string;
  firstName: string;
  occupation: string;
  religion: string;
  verified: boolean;
  country: string;
  state: string;
  maritalStatus: string;
}

interface ProfileCardProps {
  profiles: Profile[];
  isFavourite: boolean;
  handleFavouriteToggle: (userId: string) => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  profiles,
  isFavourite,
  handleFavouriteToggle,
}) => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  // console.log("profile data ",profiles);

  const [userprofilesdetailsnotification] =
    useUserProfileNotificationMutation();
  const navigate = useNavigate();

  const getBorderColor = (userType: string) => {
    switch (userType) {
      case "Exclusive":
        return "border-[#60457E]";
      case "Premium":
        return "border-[#007EAF]";
      default:
        return "";
    }
  };

  const getBlurStyle = (currentUserType: string): string => {
    return currentUserType === "Standard" ? "blur-[5px]" : "";
  };

  const handleCardClick = (userId: string, name: string) => {
    userprofilesdetailsnotification({ targetUserId: userId });
    navigate(`/profile/${name}/${userId}`);
  };

  return (
    <div className="w-full flex flex-wrap gap-6">
      {profiles.map((data) => (
        <div
          key={data.id}
          onClick={() => handleCardClick(data.userId, data.firstName)}
          className={`
            relative cursor-pointer rounded-3xl overflow-hidden 
            shadow-lg bg-white transition-transform duration-300 
            hover:scale-[1.02] hover:shadow-2xl 
            w-full md:w-[22rem]
            border-t-[12px]
            ${getBorderColor(data.userType)}
          `}
        >
          {/* IMAGE (auto height) */}
          <div className="w-full h-64 sm:h-72 md:h-80 overflow-hidden">
            <img
              src={
                data.profileImages?.[0] ||
                "https://via.placeholder.com/300x300?text=No+Image"
              }
              alt="Profile"
              className={`h-full w-full object-cover ${getBlurStyle(
                user?.usertype || ""
              )}`}
            />
          </div>

          {/* DETAILS */}
          <div className="p-5 flex flex-col gap-4">
            {/* TOP ROW */}
            <div className="flex items-center justify-between">
              <span className="rounded-full px-3 py-1 bg-[#FFF1F6] text-[#FD5C90] font-bold text-sm">
                {data.userType}
              </span>

              {isFavourite ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFavouriteToggle(data.userId);
                  }}
                >
                  <FaStar className="text-2xl text-[#FD5C90]" />
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFavouriteToggle(data.userId);
                  }}
                >
                  <FaRegStar className="text-2xl text-[#FD5C90]" />
                </button>
              )}
            </div>

            {/* Match % */}
            <div className="w-max px-3 py-1 rounded-lg bg-gradient-to-t from-[#FFD54266] to-[#C0970766]">
              <p className="text-[#FD5C90] text-sm font-medium">
                {data.match_percentage}% match
              </p>
            </div>

            {/* NAME + AGE */}
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold flex items-center gap-2 text-black leading-tight">
                {data.displayName || data.firstName}
                {data.verified && (
                  <MdVerified className="text-[#FD5C90] text-xl" />
                )}
              </h1>

              <p className="text-gray-700 font-semibold">
                {`${data.gender === "Man" ? "M" : "F"}, ${data.age}`}
              </p>
            </div>

            {/* OCCUPATION */}
            <p className="text-lg font-semibold text-gray-800 leading-tight">
              {data.occupation}
            </p>

            {/* RELIGION + MARITAL STATUS */}
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold text-gray-900">
                {data.religion}
              </p>

              <div className="flex items-center gap-2 text-gray-800">
                <FaRegUser />
                <p className="font-semibold">{data.maritalStatus}</p>
              </div>
            </div>

            {/* LOCATION */}
            <div className="w-max px-3 py-1 rounded-full bg-[#F0F5FF] text-[#FD5C90] font-medium flex items-center gap-2">
              <FaRegMap />
              <span className="whitespace-nowrap">{`${data.country}, ${data.state}`}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileCard;
