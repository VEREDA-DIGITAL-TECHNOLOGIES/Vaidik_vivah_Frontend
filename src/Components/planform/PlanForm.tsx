import React, { useState } from 'react';
import { useCreateApplicationMutation } from '../../Redux/Api/application.api';
import { toast } from "sonner";
import { useSelector } from 'react-redux';
import type { RootState } from '../../Redux/store';

interface FormData {
  userId: string;
  planId: string;
  // Personal Information
  nom: string;
  fatherName: string;
  
  // Address
  villageCityTown: string;
  district: string;
  state: string;
  country: string;
  pincode: string;
  
  // Penalty Type
  penaltyType: string;
  
  // Partner Information
  partnerName: string;
  partnerFatherName: string;
  yourMobNo: string;
  
  // Marriage Venue Address
  venueName: string;
  venueVillageCityTown: string;
  venueDistrict: string;
  venueState: string;
  venueCountry: string;
  venuePincode: string;
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
    // Personal Information
    nom: '',
    fatherName: '',
    
    // Address
    villageCityTown: '',
    district: '',
    state: '',
    country: '',
    pincode: '',
    
    // Penalty Type
    penaltyType: '',
    
    // Partner Information
    partnerName: '',
    partnerFatherName: '',
    yourMobNo: '',
    
    // Marriage Venue Address
    venueName: '',
    venueVillageCityTown: '',
    venueDistrict: '',
    venueState: '',
    venueCountry: '',
    venuePincode: '',
  });
  
  const [currentSection, setCurrentSection] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isAnimating, setIsAnimating] = useState(false);

  const sections = [
    { 
      title: 'Personal Information', 
      fields: ['nom', 'fatherName'] 
    },
    { 
      title: 'Address', 
      fields: ['villageCityTown', 'district', 'state', 'country', 'pincode'] 
    },
    { 
      title: 'Penalty Type', 
      fields: ['penaltyType'] 
    },
    { 
      title: 'Partner Information', 
      fields: ['partnerName', 'partnerFatherName', 'yourMobNo'] 
    },
    { 
      title: 'Marriage Venue Address', 
      fields: ['venueName', 'venueVillageCityTown', 'venueDistrict', 'venueState', 'venueCountry', 'venuePincode']
    }
  ];

  const validateSection = (sectionIndex: number): boolean => {
    const sectionFields = sections[sectionIndex].fields;
    const newErrors: Record<string, string> = {};

    sectionFields.forEach(field => {
      // Mobile number validation
      if (field === 'yourMobNo') {
        const value = formData[field as keyof FormData] as string;
        if (!value) {
          newErrors[field] = 'Mobile number is required';
        } else if (!/^\d{10}$/.test(value)) {
          newErrors[field] = 'Please enter a valid 10-digit mobile number';
        }
      }
      // Pincode validation
      else if (field === 'pincode' || field === 'venuePincode') {
        const value = formData[field as keyof FormData] as string;
        if (!value) {
          newErrors[field] = `${field === 'venuePincode' ? 'Venue ' : ''}Pincode is required`;
        } else if (!/^\d{6}$/.test(value)) {
          newErrors[field] = 'Please enter a valid 6-digit pincode';
        }
      }
      // Other required fields
      else {
        const value = formData[field as keyof FormData] as string;
        if (!value) {
          const fieldName = field
            .replace(/([A-Z])/g, ' $1')
            .replace('village City Town', 'Village/City/Town')
            .replace('venue ', 'Venue ')
            .replace('your Mob No', 'Mobile Number');
          newErrors[field] = `${fieldName} fieldName is required`;
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
        applicationFee: plan.monthly,
        applicationDate: new Date().toISOString(),
      };

      console.log("🚀 SUBMIT PAYLOAD:", payload);

      const result = await createApplication(payload).unwrap();
      if(result){
          console.log("submit done !");
      }

      toast.success("✅ Application submitted successfully!. Go to Payment Section.");
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
              <p className="text-white/90">Plan: {plan.name} • Fee: ₹{plan.monthly}</p>
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
              </div>
            )}

            {/* Address Section */}
            {currentSection === 1 && (
              <div 
                className="space-y-6"
                style={animationStyles}
              >
                <h2 className="text-xl font-semibold text-gray-900 border-b pb-3 flex items-center">
                  <span className="bg-[#FD5C90] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">2</span>
                  Address
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="villageCityTown" className="block text-sm font-medium text-gray-700 mb-2">
                      Village/City/Town *
                    </label>
                    <input
                      type="text"
                      id="villageCityTown"
                      name="villageCityTown"
                      value={formData.villageCityTown}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD5C90] focus:border-transparent transition-all duration-200 disabled:bg-gray-100"
                      placeholder="Enter village/city/town"
                    />
                    {errors.villageCityTown && <p className="text-red-500 text-xs mt-1 flex items-center">⚠️ {errors.villageCityTown}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-2">
                      District *
                    </label>
                    <input
                      type="text"
                      id="district"
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD5C90] focus:border-transparent transition-all duration-200 disabled:bg-gray-100"
                      placeholder="Enter district"
                    />
                    {errors.district && <p className="text-red-500 text-xs mt-1 flex items-center">⚠️ {errors.district}</p>}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD5C90] focus:border-transparent transition-all duration-200 disabled:bg-gray-100"
                      placeholder="Enter state"
                    />
                    {errors.state && <p className="text-red-500 text-xs mt-1 flex items-center">⚠️ {errors.state}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                      Country *
                    </label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD5C90] focus:border-transparent transition-all duration-200 disabled:bg-gray-100"
                      placeholder="Enter country"
                    />
                    {errors.country && <p className="text-red-500 text-xs mt-1 flex items-center">⚠️ {errors.country}</p>}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-2">
                    Pincode/ZIP Code *
                  </label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD5C90] focus:border-transparent transition-all duration-200 disabled:bg-gray-100"
                    placeholder="Enter pincode/ZIP code"
                  />
                  {errors.pincode && <p className="text-red-500 text-xs mt-1 flex items-center">⚠️ {errors.pincode}</p>}
                </div>
              </div>
            )}

            {/* Penalty Type Section */}
            {currentSection === 2 && (
              <div 
                className="space-y-6"
                style={animationStyles}
              >
                <h2 className="text-xl font-semibold text-gray-900 border-b pb-3 flex items-center">
                  <span className="bg-[#FD5C90] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">3</span>
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
            {currentSection === 3 && (
              <div 
                className="space-y-6"
                style={animationStyles}
              >
                <h2 className="text-xl font-semibold text-gray-900 border-b pb-3 flex items-center">
                  <span className="bg-[#FD5C90] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">4</span>
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
              </div>
            )}

            {/* Marriage Venue Address Section */}
            {currentSection === 4 && (
              <div 
                className="space-y-6"
                style={animationStyles}
              >
                <h2 className="text-xl font-semibold text-gray-900 border-b pb-3 flex items-center">
                  <span className="bg-[#FD5C90] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">5</span>
                  Marriage Venue Address
                </h2>
                
                <div>
                  <label htmlFor="venueName" className="block text-sm font-medium text-gray-700 mb-2">
                    Venue Name *
                  </label>
                  <input
                    type="text"
                    id="venueName"
                    name="venueName"
                    value={formData.venueName}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD5C90] focus:border-transparent transition-all duration-200 disabled:bg-gray-100"
                    placeholder="Enter venue/hall name"
                  />
                  {errors.venueName && <p className="text-red-500 text-xs mt-1 flex items-center">⚠️ {errors.venueName}</p>}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="venueVillageCityTown" className="block text-sm font-medium text-gray-700 mb-2">
                      Village/City/Town *
                    </label>
                    <input
                      type="text"
                      id="venueVillageCityTown"
                      name="venueVillageCityTown"
                      value={formData.venueVillageCityTown}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD5C90] focus:border-transparent transition-all duration-200 disabled:bg-gray-100"
                      placeholder="Enter venue village/city/town"
                    />
                    {errors.venueVillageCityTown && <p className="text-red-500 text-xs mt-1 flex items-center">⚠️ {errors.venueVillageCityTown}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="venueDistrict" className="block text-sm font-medium text-gray-700 mb-2">
                      District *
                    </label>
                    <input
                      type="text"
                      id="venueDistrict"
                      name="venueDistrict"
                      value={formData.venueDistrict}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD5C90] focus:border-transparent transition-all duration-200 disabled:bg-gray-100"
                      placeholder="Enter venue district"
                    />
                    {errors.venueDistrict && <p className="text-red-500 text-xs mt-1 flex items-center">⚠️ {errors.venueDistrict}</p>}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="venueState" className="block text-sm font-medium text-gray-700 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      id="venueState"
                      name="venueState"
                      value={formData.venueState}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD5C90] focus:border-transparent transition-all duration-200 disabled:bg-gray-100"
                      placeholder="Enter venue state"
                    />
                    {errors.venueState && <p className="text-red-500 text-xs mt-1 flex items-center">⚠️ {errors.venueState}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="venueCountry" className="block text-sm font-medium text-gray-700 mb-2">
                      Country *
                    </label>
                    <input
                      type="text"
                      id="venueCountry"
                      name="venueCountry"
                      value={formData.venueCountry}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD5C90] focus:border-transparent transition-all duration-200 disabled:bg-gray-100"
                      placeholder="Enter venue country"
                    />
                    {errors.venueCountry && <p className="text-red-500 text-xs mt-1 flex items-center">⚠️ {errors.venueCountry}</p>}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="venuePincode" className="block text-sm font-medium text-gray-700 mb-2">
                    Pincode/ZIP Code *
                  </label>
                  <input
                    type="text"
                    id="venuePincode"
                    name="venuePincode"
                    value={formData.venuePincode}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD5C90] focus:border-transparent transition-all duration-200 disabled:bg-gray-100"
                    placeholder="Enter venue pincode/ZIP code"
                  />
                  {errors.venuePincode && <p className="text-red-500 text-xs mt-1 flex items-center">⚠️ {errors.venuePincode}</p>}
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
                  className="px-8 py-3 bg-gradient-to-r from-[#FD5C90] to-[#FF8CB3] text-white rounded-lg hover:from-[#E04A7A] hover:to-[#FD5C90] transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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
                    `Submit Application`
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