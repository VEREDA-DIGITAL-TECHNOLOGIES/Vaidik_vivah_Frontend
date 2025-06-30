import React from 'react';
import { useUserProfileNotificationQuery } from '../../Redux/Api/profile.api';

interface UserProfileProps {
    userId: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
    const { data, isLoading, isError, error } = useUserProfileNotificationQuery({ userId });

    if (isLoading) {
        return (
            <div className="p-6 max-w-xl mx-auto">
                <div className="animate-pulse space-y-4">
                    <div className="rounded-full bg-gray-300 h-24 w-24 mx-auto" />
                    <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto" />
                    <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto" />
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <p className="text-center text-red-500">
                {(error as any)?.data?.message || 'Failed to load profile.'}
            </p>
        );
    }

    const profile = data?.data?.[0];

    if (!profile) {
        return <p className="text-center">No profile found.</p>;
    }

    const {
        profileImage,
        basic_and_lifestyle,
        education_and_financial,
        family_details,
        interest_and_hobbies,
        connection_status,
    } = profile;

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-xl space-y-6">
            {/* Profile Image */}
            <div className="flex flex-col items-center">
                <img
                    src={profileImage?.[0] || '/default.jpg'}
                    alt="Profile"
                    className="w-28 h-28 rounded-full object-cover"
                />
                <h2 className="text-xl font-semibold mt-2">
                    {basic_and_lifestyle?.firstName} {basic_and_lifestyle?.lastName}
                </h2>
                <p className="text-sm text-gray-500">Status: {connection_status}</p>
            </div>

            {/* Sections */}
            {basic_and_lifestyle && (
                <section>
                    <h3 className="text-lg font-bold">Basic & Lifestyle</h3>
                    <ul className="text-sm text-gray-700 space-y-1">
                        <li>Age: {basic_and_lifestyle.age}</li>
                        <li>Gender: {basic_and_lifestyle.gender}</li>
                        <li>Marital Status: {basic_and_lifestyle.maritalStatus}</li>
                        <li>About: {basic_and_lifestyle.about}</li>
                        <li>Posted By: {basic_and_lifestyle.postedBy}</li>
                    </ul>
                </section>
            )}

            {education_and_financial && (
                <section>
                    <h3 className="text-lg font-bold">Education & Financial</h3>
                    <ul className="text-sm text-gray-700 space-y-1">
                        <li>Qualification: {education_and_financial.qualification}</li>
                        <li>Occupation: {education_and_financial.occupation}</li>
                        <li>Income: {education_and_financial.income}</li>
                    </ul>
                </section>
            )}

            {family_details && (
                <section>
                    <h3 className="text-lg font-bold">Family Details</h3>
                    <ul className="text-sm text-gray-700 space-y-1">
                        <li>Father’s Occupation: {family_details.fatherOccupation}</li>
                        <li>Mother’s Occupation: {family_details.motherOccupation}</li>
                        <li>Number of Siblings: {family_details.numberOfSiblings}</li>
                        <li>Living With Family: {family_details.livingWithFamily}</li>
                    </ul>
                </section>
            )}

            {interest_and_hobbies && (
                <section>
                    <h3 className="text-lg font-bold">Interests & Hobbies</h3>
                    <p className="text-sm text-gray-700">{interest_and_hobbies}</p>
                </section>
            )}
        </div>
    );
};

export default UserProfile;
