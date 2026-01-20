import React, { useState } from 'react';
import { useCreateApplicationMutation } from '../../Redux/Api/application.api';
import { toast } from "sonner";
import { useSelector } from 'react-redux';
import type { RootState } from '../../Redux/store';

interface FormData {
  userId: string;
  planId: string;
  nom: string;
  fatherName: string;
  loginId: string;
  address: string;
  penaltyType: string;
  partnerName: string;
  partnerFatherName: string;
  partnerLoginId: string;
  partnerAddress: string;
  yourMobNo: string;
  partnerMobNo: string;
  yourIdNumber: string; // Changed from File to string
  parentsIdNumber: string; // Changed from File to string
  parentsCertified: boolean;
  parentsMobNo: string;
  partnerParentsMobNo: string;
  partnerIdNumber: string; // Changed from File to string
  partnerParentsIdNumber: string; // Changed from File to string
  partnerParentsCertified: boolean;
}

type Plan = {
  id: string;
  name: string;
  monthly: string;
  discount: string;
  features: { text: string; included: boolean }[];
  duration: string;
  durationInMonths: number;
  description: string;
};

interface DiamondPlanApplicationProps {
  plan: Plan;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
}

const PlanForm: React.FC<DiamondPlanApplicationProps> = ({ plan, onClose, onSubmit }) => {
  const [createApplication, { isLoading }] = useCreateApplicationMutation();
  const { user } = useSelector((state: RootState) => state.userReducer);
  const [formData, setFormData] = useState<FormData>({
    planId: plan.id,
    userId: user!.userId,
    nom: '',
    fatherName: '',
    loginId: '',
    address: '',
    penaltyType: '',
    partnerName: '',
    partnerFatherName: '',
    partnerLoginId: '',
    partnerAddress: '',
    yourMobNo: '',
    partnerMobNo: '',
    yourIdNumber: '', // Changed from null to empty string
    parentsIdNumber: '', // Changed from null to empty string
    parentsCertified: false,
    parentsMobNo: '',
    partnerParentsMobNo: '',
    partnerIdNumber: '', // Changed from null to empty string
    partnerParentsIdNumber: '', // Changed from null to empty string
    partnerParentsCertified: false,
  });
  
  const [currentSection, setCurrentSection] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isAnimating, setIsAnimating] = useState(false);

  const sections = [
    { title: 'Personal Information', fields: ['nom', 'fatherName', 'loginId', 'address'] },
    { title: 'Penalty Type', fields: ['penaltyType'] },
    { title: 'Partner Information', fields: ['partnerName', 'partnerFatherName', 'partnerLoginId', 'partnerAddress', 'yourMobNo', 'partnerMobNo'] },
    { title: 'ID and Certification', fields: ['yourIdNumber', 'parentsIdNumber', 'parentsCertified', 'parentsMobNo', 'partnerParentsMobNo', 'partnerIdNumber', 'partnerParentsIdNumber', 'partnerParentsCertified'] },
  ];

  const validateSection = (sectionIndex: number): boolean => {
    const sectionFields = sections[sectionIndex].fields;
    const newErrors: Record<string, string> = {};

    sectionFields.forEach(field => {
      // Mobile number validation
      if (field === 'parentsMobNo' || field === 'partnerParentsMobNo' || field === 'yourMobNo' || field === 'partnerMobNo') {
        const value = formData[field as keyof FormData] as string;
        if (!value) {
          newErrors[field] = 'Mobile number is required';
        } else if (!/^\d{10}$/.test(value)) {
          newErrors[field] = 'Please enter a valid 10-digit mobile number';
        }
      }
      // ID number validation
      else if (field.includes('IdNumber')) {
        const value = formData[field as keyof FormData] as string;
        if (!value) {
          const fieldName = field.replace('IdNumber', ' ID Number').replace(/([A-Z])/g, ' $1');
          newErrors[field] = `${fieldName} is required`;
        } else if (value.length < 3) {
          newErrors[field] = 'ID number must be at least 3 characters long';
        }
      }
      // Other required fields
      else if (field !== 'parentsCertified' && field !== 'partnerParentsCertified') {
        const value = formData[field as keyof FormData] as string;
        if (!value) {
          const fieldName = field.replace(/([A-Z])/g, ' $1').toLowerCase();
          newErrors[field] = `${fieldName} is required`;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleNext = () => {
    if (validateSection(currentSection)) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSection(prev => Math.min(prev + 1, sections.length - 1));
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleBack = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSection(prev => Math.max(prev - 1, 0));
      setIsAnimating(false);
    }, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validateSection(currentSection)) return;

  try {
    const payload = {
      ...formData,
      planId: plan.id,
      userId: user!.userId,
      planName: plan.name,
      applicationFee: 1000,
      applicationDate: new Date().toISOString(),
    };

    console.log("🚀 SUBMIT PAYLOAD:", payload);

    const result = await createApplication(payload).unwrap();
    if(result){
        console.log("submit done !");
    }

    toast.success("✅ Application submitted successfully!");
    onSubmit(formData);
  } catch (error: any) {
    console.error("❌ Submission failed:", error);

    let message = "Submission failed. Please try again.";

    if (error?.data?.message) message = error.data.message;

    toast.error(`❌ ${message}`);
  }
};


  const animationStyles: React.CSSProperties = {
    animation: isAnimating ? 'none' : 'fadeIn 0.3s ease-out'
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[95vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#FD5C90] to-[#FF8CB3] px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold text-white">Vivah Sansakar Application</h3>
              <p className="text-white/90">Plan: {plan.name} • Fee: ₹1000</p>
            </div>
            <button
              onClick={onClose}
              disabled={isLoading}
              className="text-white hover:text-gray-200 transition-colors text-2xl bg-white/20 rounded-full w-8 h-8 flex items-center justify-center hover:bg-white/30 disabled:opacity-50"
              aria-label="Close"
            >
              ×
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-white/90 text-sm mb-2">
              <span>Step {currentSection + 1} of {sections.length}</span>
              <span>{sections[currentSection].title}</span>
            </div>
            <div className="w-full bg-white/30 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
        
        {/* Application Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Personal Information Section */}
            {currentSection === 0 && (
              <div 
                className="space-y-6"
                style={animationStyles}
              >
                <h2 className="text-xl font-semibold text-gray-900 border-b pb-3 flex items-center">
                  <span className="bg-[#FD5C90] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">1</span>
                  Personal Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="nom"
                      name="nom"
                      value={formData.nom}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD5C90] focus:border-transparent transition-all duration-200 disabled:bg-gray-100"
                      placeholder="Enter your full name"
                    />
                    {errors.nom && <p className="text-red-500 text-xs mt-1 flex items-center">⚠️ {errors.nom}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="fatherName" className="block text-sm font-medium text-gray-700 mb-2">
                      Father's Name *
                    </label>
                    <input
                      type="text"
                      id="fatherName"
                      name="fatherName"
                      value={formData.fatherName}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD5C90] focus:border-transparent transition-all duration-200 disabled:bg-gray-100"
                      placeholder="Enter father's name"
                    />
                    {errors.fatherName && <p className="text-red-500 text-xs mt-1 flex items-center">⚠️ {errors.fatherName}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="loginId" className="block text-sm font-medium text-gray-700 mb-2">
                    Login ID *
                  </label>
                  <input
                    type="text"
                    id="loginId"
                    name="loginId"
                    value={formData.loginId}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD5C90] focus:border-transparent transition-all duration-200 disabled:bg-gray-100"
                    placeholder="Enter your login ID"
                  />
                  {errors.loginId && <p className="text-red-500 text-xs mt-1 flex items-center">⚠️ {errors.loginId}</p>}
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                    Address *
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD5C90] focus:border-transparent transition-all duration-200 disabled:bg-gray-100"
                    placeholder="Enter your complete address"
                  />
                  {errors.address && <p className="text-red-500 text-xs mt-1 flex items-center">⚠️ {errors.address}</p>}
                </div>
              </div>
            )}

            {/* Penalty Type Section */}
            {currentSection === 1 && (
              <div 
                className="space-y-6"
                style={animationStyles}
              >
                <h2 className="text-xl font-semibold text-gray-900 border-b pb-3 flex items-center">
                  <span className="bg-[#FD5C90] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">2</span>
                  Acharya(Pandit ji) for VedVivah
                </h2>
                <div>
                  <label htmlFor="penaltyType" className="block text-sm font-medium text-gray-700 mb-3">
                    Select Option *
                  </label>
                  <select
                    id="penaltyType"
                    name="penaltyType"
                    value={formData.penaltyType}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD5C90] focus:border-transparent transition-all duration-200 bg-white disabled:bg-gray-100"
                  >
                    <option value="">Select One Option</option>
                    <option value="home-simple">Home Wedding(1-2 Acharya)</option>
                    <option value="home-voluntary">Home VedVivah(3-4 Acharya)</option>
                    <option value="maximize-hall">Banquet Hall(1-2 Acharya)</option>
                    <option value="maximize-hall-returns">Banquet Hall VedVivah(3-4 Acharya)</option>
                  </select>
                  {errors.penaltyType && <p className="text-red-500 text-xs mt-1 flex items-center">⚠️ {errors.penaltyType}</p>}
                </div>
              </div>
            )}

            {/* Partner Information Section */}
            {currentSection === 2 && (
              <div 
                className="space-y-6"
                style={animationStyles}
              >
                <h2 className="text-xl font-semibold text-gray-900 border-b pb-3 flex items-center">
                  <span className="bg-[#FD5C90] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">3</span>
                  Partner Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="partnerName" className="block text-sm font-medium text-gray-700 mb-2">
                      Partner Name *
                    </label>
                    <input
                      type="text"
                      id="partnerName"
                      name="partnerName"
                      value={formData.partnerName}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD5C90] focus:border-transparent transition-all duration-200 disabled:bg-gray-100"
                      placeholder="Enter partner's name"
                    />
                    {errors.partnerName && <p className="text-red-500 text-xs mt-1 flex items-center">⚠️ {errors.partnerName}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="partnerFatherName" className="block text-sm font-medium text-gray-700 mb-2">
                      Partner Father Name *
                    </label>
                    <input
                      type="text"
                      id="partnerFatherName"
                      name="partnerFatherName"
                      value={formData.partnerFatherName}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD5C90] focus:border-transparent transition-all duration-200 disabled:bg-gray-100"
                      placeholder="Enter partner's father name"
                    />
                    {errors.partnerFatherName && <p className="text-red-500 text-xs mt-1 flex items-center">⚠️ {errors.partnerFatherName}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="partnerLoginId" className="block text-sm font-medium text-gray-700 mb-2">
                    Partner Login ID *
                  </label>
                  <input
                    type="text"
                    id="partnerLoginId"
                    name="partnerLoginId"
                    value={formData.partnerLoginId}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD5C90] focus:border-transparent transition-all duration-200 disabled:bg-gray-100"
                    placeholder="Enter partner's login ID"
                  />
                  {errors.partnerLoginId && <p className="text-red-500 text-xs mt-1 flex items-center">⚠️ {errors.partnerLoginId}</p>}
                </div>

                <div>
                  <label htmlFor="partnerAddress" className="block text-sm font-medium text-gray-700 mb-2">
                    Partner Home Address *
                  </label>
                  <textarea
                    id="partnerAddress"
                    name="partnerAddress"
                    value={formData.partnerAddress}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD5C90] focus:border-transparent transition-all duration-200 disabled:bg-gray-100"
                    placeholder="Enter partner's complete address"
                  />
                  {errors.partnerAddress && <p className="text-red-500 text-xs mt-1 flex items-center">⚠️ {errors.partnerAddress}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="yourMobNo" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Mobile No. *
                    </label>
                    <input
                      type="tel"
                      id="yourMobNo"
                      name="yourMobNo"
                      value={formData.yourMobNo}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD5C90] focus:border-transparent transition-all duration-200 disabled:bg-gray-100"
                      placeholder="10-digit mobile number"
                      maxLength={10}
                    />
                    {errors.yourMobNo && <p className="text-red-500 text-xs mt-1 flex items-center">⚠️ {errors.yourMobNo}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="partnerMobNo" className="block text-sm font-medium text-gray-700 mb-2">
                      Partner Mobile No. *
                    </label>
                    <input
                      type="tel"
                      id="partnerMobNo"
                      name="partnerMobNo"
                      value={formData.partnerMobNo}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD5C90] focus:border-transparent transition-all duration-200 disabled:bg-gray-100"
                      placeholder="10-digit mobile number"
                      maxLength={10}
                    />
                    {errors.partnerMobNo && <p className="text-red-500 text-xs mt-1 flex items-center">⚠️ {errors.partnerMobNo}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* ID and Certification Section */}
            {currentSection === 3 && (
              <div 
                className="space-y-6"
                style={animationStyles}
              >
                <h2 className="text-xl font-semibold text-gray-900 border-b pb-3 flex items-center">
                  <span className="bg-[#FD5C90] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">4</span>
                  ID and Certification
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="yourIdNumber" className="block text-sm font-medium text-gray-700 mb-2">
                      Your ID Number *
                    </label>
                    <input
                      type="text"
                      id="yourIdNumber"
                      name="yourIdNumber"
                      value={formData.yourIdNumber}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD5C90] focus:border-transparent transition-all duration-200 disabled:bg-gray-100"
                      placeholder="Enter your ID/Aadhar number"
                    />
                    {errors.yourIdNumber && <p className="text-red-500 text-xs mt-1 flex items-center">⚠️ {errors.yourIdNumber}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="partnerIdNumber" className="block text-sm font-medium text-gray-700 mb-2">
                      Partner ID Number *
                    </label>
                    <input
                      type="text"
                      id="partnerIdNumber"
                      name="partnerIdNumber"
                      value={formData.partnerIdNumber}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD5C90] focus:border-transparent transition-all duration-200 disabled:bg-gray-100"
                      placeholder="Enter partner's ID/Aadhar number"
                    />
                    {errors.partnerIdNumber && <p className="text-red-500 text-xs mt-1 flex items-center">⚠️ {errors.partnerIdNumber}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="parentsIdNumber" className="block text-sm font-medium text-gray-700 mb-2">
                      Parents ID Number *
                    </label>
                    <input
                      type="text"
                      id="parentsIdNumber"
                      name="parentsIdNumber"
                      value={formData.parentsIdNumber}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD5C90] focus:border-transparent transition-all duration-200 disabled:bg-gray-100"
                      placeholder="Enter parents' ID/Aadhar number"
                    />
                    {errors.parentsIdNumber && <p className="text-red-500 text-xs mt-1 flex items-center">⚠️ {errors.parentsIdNumber}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="partnerParentsIdNumber" className="block text-sm font-medium text-gray-700 mb-2">
                      Partner Parents ID Number *
                    </label>
                    <input
                      type="text"
                      id="partnerParentsIdNumber"
                      name="partnerParentsIdNumber"
                      value={formData.partnerParentsIdNumber}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD5C90] focus:border-transparent transition-all duration-200 disabled:bg-gray-100"
                      placeholder="Enter partner parents' ID/Aadhar number"
                    />
                    {errors.partnerParentsIdNumber && <p className="text-red-500 text-xs mt-1 flex items-center">⚠️ {errors.partnerParentsIdNumber}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="parentsMobNo" className="block text-sm font-medium text-gray-700 mb-2">
                      Parents Mobile No. *
                    </label>
                    <input
                      type="tel"
                      id="parentsMobNo"
                      name="parentsMobNo"
                      value={formData.parentsMobNo}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD5C90] focus:border-transparent transition-all duration-200 disabled:bg-gray-100"
                      placeholder="10-digit mobile number"
                      maxLength={10}
                    />
                    {errors.parentsMobNo && <p className="text-red-500 text-xs mt-1 flex items-center">⚠️ {errors.parentsMobNo}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="partnerParentsMobNo" className="block text-sm font-medium text-gray-700 mb-2">
                      Partner Parents Mobile No. *
                    </label>
                    <input
                      type="tel"
                      id="partnerParentsMobNo"
                      name="partnerParentsMobNo"
                      value={formData.partnerParentsMobNo}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD5C90] focus:border-transparent transition-all duration-200 disabled:bg-gray-100"
                      placeholder="10-digit mobile number"
                      maxLength={10}
                    />
                    {errors.partnerParentsMobNo && <p className="text-red-500 text-xs mt-1 flex items-center">⚠️ {errors.partnerParentsMobNo}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="parentsCertified"
                      name="parentsCertified"
                      checked={formData.parentsCertified}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className="w-4 h-4 text-[#FD5C90] border-gray-300 rounded focus:ring-[#FD5C90]"
                    />
                    <label htmlFor="parentsCertified" className="ml-2 text-sm text-gray-700">
                      Parents have certified the information
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="partnerParentsCertified"
                      name="partnerParentsCertified"
                      checked={formData.partnerParentsCertified}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className="w-4 h-4 text-[#FD5C90] border-gray-300 rounded focus:ring-[#FD5C90]"
                    />
                    <label htmlFor="partnerParentsCertified" className="ml-2 text-sm text-gray-700">
                      Partner's parents have certified the information
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="border-t px-6 py-4 bg-gray-50">
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentSection === 0 || isLoading}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
              >
                ← Back
              </button>
              
              {currentSection < sections.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={isLoading}
                  className="px-6 py-3 bg-gradient-to-r from-[#FD5C90] to-[#FF8CB3] text-white rounded-lg hover:from-[#E04A7A] hover:to-[#FD5C90] transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next →
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    '✅ Submit Application - ₹1000'
                  )}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
      `}</style>
    </div>
  );
};

export default PlanForm;