import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface UserProfileProps {
    userId: string;
}

interface BasicLifestyle {
    firstName?: string;
    lastName?: string;
    age?: string;
    gender?: string;
    about?: string;
    maritalStatus?: string;
    postedBy?: string;
}

interface EducationDetails {
    qualification?: string;
    occupation?: string;
    income?: string;
}

interface FamilyDetails {
    fatherOccupation?: string;
    motherOccupation?: string;
    numberOfSiblings?: string;
    livingWithFamily?: string;
}

interface ProfileData {
    profileImage?: string[];
    basic_and_lifestyle?: BasicLifestyle;
    education_and_financial?: EducationDetails;
    family_details?: FamilyDetails;
    interest_and_hobbies?: string;
    connection_status: string;
    connectionType: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const { data } = await axios.post('/api/user/view-profile', { userId }, {
                    withCredentials: true,
                });

                if (data.success) {
                    setProfile(data.data[0]);
                } else {
                    setError(data.message || 'Failed to fetch profile.');
                }
            } catch (err: any) {
                setError(err?.response?.data?.message || 'Server error occurred.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [userId]);

    if (loading) {
        return (
            <div className="p-6">
                <div className="animate-pulse space-y-4">
                    <div className="rounded-full bg-gray-300 h-24 w-24 mx-auto" />
                    <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto" />
                    <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto" />
                </div>
            </div>
        );
    }

    if (error) return <div className="text-red-600 text-center mt-4">{error}</div>;
    if (!profile) return <div className="text-center mt-4">No profile found.</div>;

    const {
        basic_and_lifestyle,
        education_and_financial,
        family_details,
        interest_and_hobbies,
        profileImage,
        connection_status,
    } = profile;

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow-xl rounded-2xl space-y-6">
            {/* Profile Image */}
            <div className="flex flex-col items-center">
                <img
                    src={profileImage?.[0] || '/default.jpg'}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover"
                />
                <h2 className="text-xl font-semibold mt-2">
                    {basic_and_lifestyle?.firstName} {basic_and_lifestyle?.lastName}
                </h2>
                <p className="text-gray-500 capitalize">Status: {connection_status}</p>
            </div>

            {/* Basic & Lifestyle */}
            {basic_and_lifestyle && (
                <div>
                    <h3 className="text-lg font-bold mb-1">Basic & Lifestyle</h3>
                    <ul className="text-sm text-gray-700 space-y-1">
                        <li>Age: {basic_and_lifestyle.age}</li>
                        <li>Gender: {basic_and_lifestyle.gender}</li>
                        <li>Marital Status: {basic_and_lifestyle.maritalStatus}</li>
                        <li>About: {basic_and_lifestyle.about}</li>
                        <li>Posted By: {basic_and_lifestyle.postedBy}</li>
                    </ul>
                </div>
            )}

            {/* Education & Financial */}
            {education_and_financial && (
                <div>
                    <h3 className="text-lg font-bold mb-1">Education & Financial</h3>
                    <ul className="text-sm text-gray-700 space-y-1">
                        <li>Qualification: {education_and_financial.qualification}</li>
                        <li>Occupation: {education_and_financial.occupation}</li>
                        <li>Income: {education_and_financial.income}</li>
                    </ul>
                </div>
            )}

            {/* Family Details */}
            {family_details && (
                <div>
                    <h3 className="text-lg font-bold mb-1">Family Details</h3>
                    <ul className="text-sm text-gray-700 space-y-1">
                        <li>Father's Occupation: {family_details.fatherOccupation}</li>
                        <li>Mother's Occupation: {family_details.motherOccupation}</li>
                        <li>Number of Siblings: {family_details.numberOfSiblings}</li>
                        <li>Living With Family: {family_details.livingWithFamily}</li>
                    </ul>
                </div>
            )}

            {/* Interests & Hobbies */}
            {interest_and_hobbies && (
                <div>
                    <h3 className="text-lg font-bold mb-1">Interests & Hobbies</h3>
                    <p className="text-sm text-gray-700">{interest_and_hobbies}</p>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
