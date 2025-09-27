import React, { useState, useRef } from 'react';
import { useCreateApplicationMutation } from '../../Redux/Api/application.api';

interface FormData {
  planId:string;
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
  yourIdPost: File | null;
  parentsIdPost: File | null;
  parentsCertified: boolean;
  parentsMobNo: string;
  partnerParentsMobNo: string;
  partnerIdPost: File | null;
  partnerParentsIdPost: File | null;
  partnerParentsCertified: boolean;
}

type Plan = {
  id:string;
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
}

const PlanForm: React.FC<DiamondPlanApplicationProps> = ({ plan, onClose }) => {
  const [createApplication, { isLoading, isError, error }] = useCreateApplicationMutation();
  
  const [formData, setFormData] = useState<FormData>({
    planId:"",
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
    yourIdPost: null,
    parentsIdPost: null,
    parentsCertified: false,
    parentsMobNo: '',
    partnerParentsMobNo: '',
    partnerIdPost: null,
    partnerParentsIdPost: null,
    partnerParentsCertified: false,
  });

  const [currentSection, setCurrentSection] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isAnimating, setIsAnimating] = useState(false);
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const sections = [
    { title: 'Personal Information', fields: ['nom', 'fatherName', 'loginId', 'address'] },
    { title: 'Penalty Type', fields: ['penaltyType'] },
    { title: 'Partner Information', fields: ['partnerName', 'partnerFatherName', 'partnerLoginId', 'partnerAddress', 'yourMobNo', 'partnerMobNo'] },
    { title: 'ID and Certification', fields: ['yourIdPost', 'parentsIdPost', 'parentsCertified', 'parentsMobNo', 'partnerParentsMobNo', 'partnerIdPost', 'partnerParentsIdPost', 'partnerParentsCertified'] },
  ];

  const validateSection = (sectionIndex: number): boolean => {
    const sectionFields = sections[sectionIndex].fields;
    const newErrors: Record<string, string> = {};

    sectionFields.forEach(field => {
      if (field.includes('IdPost')) {
        if (!formData[field as keyof FormData]) {
          const fieldName = field.replace(/([A-Z])/g, ' $1').toLowerCase();
          newErrors[field] = `${fieldName} is required`;
        }
      } else if (field === 'parentsMobNo' || field === 'partnerParentsMobNo' || field === 'yourMobNo' || field === 'partnerMobNo') {
        const value = formData[field as keyof FormData] as string;
        if (!value) {
          newErrors[field] = 'Mobile number is required';
        } else if (!/^\d{10}$/.test(value)) {
          newErrors[field] = 'Please enter a valid 10-digit mobile number';
        }
      } else if (field !== 'parentsCertified' && field !== 'partnerParentsCertified') {
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0] || null;
    
    // Validate file size (5MB max)
    if (file && file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: 'File size must be less than 5MB'
      }));
      return;
    }

    // Validate file type
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          [fieldName]: 'File type not supported. Please upload JPG, PNG, PDF, or DOC files'
        }));
        return;
      }
    }

    setFormData(prev => ({
      ...prev,
      [fieldName]: file
    }));

    if (errors[fieldName]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
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
    
    if (!validateSection(currentSection)) {
      return;
    }

    try {
      // Create FormData object for file uploads
      const submissionFormData = new FormData();
      
      // Add all form fields
      submissionFormData.append('planId', plan.id);
      submissionFormData.append('planName', plan.name);
      submissionFormData.append('nom', formData.nom);
      submissionFormData.append('fatherName', formData.fatherName);
      submissionFormData.append('loginId', formData.loginId);
      submissionFormData.append('address', formData.address);
      submissionFormData.append('penaltyType', formData.penaltyType);
      submissionFormData.append('partnerName', formData.partnerName);
      submissionFormData.append('partnerFatherName', formData.partnerFatherName);
      submissionFormData.append('partnerLoginId', formData.partnerLoginId);
      submissionFormData.append('partnerAddress', formData.partnerAddress);
      submissionFormData.append('yourMobNo', formData.yourMobNo);
      submissionFormData.append('partnerMobNo', formData.partnerMobNo);
      submissionFormData.append('parentsCertified', formData.parentsCertified.toString());
      submissionFormData.append('parentsMobNo', formData.parentsMobNo);
      submissionFormData.append('partnerParentsMobNo', formData.partnerParentsMobNo);
      submissionFormData.append('partnerParentsCertified', formData.partnerParentsCertified.toString());
      
      // Add files if they exist
      if (formData.yourIdPost) {
        submissionFormData.append('yourIdPost', formData.yourIdPost);
      }
      if (formData.parentsIdPost) {
        submissionFormData.append('parentsIdPost', formData.parentsIdPost);
      }
      if (formData.partnerIdPost) {
        submissionFormData.append('partnerIdPost', formData.partnerIdPost);
      }
      if (formData.partnerParentsIdPost) {
        submissionFormData.append('partnerParentsIdPost', formData.partnerParentsIdPost);
      }

      // Add metadata
      submissionFormData.append('applicationDate', new Date().toISOString());
      submissionFormData.append('applicationFee', '1000');

      // Log the submission data (without files for security)
      console.log('🚀 ===== VIVAH SANSAKAR APPLICATION SUBMISSION =====', {
        planId:plan.id,
        plan: plan.name,
        applicant: formData.nom,
        partner: formData.partnerName,
        penaltyType: formData.penaltyType,
        contactNumbers: {
          applicant: formData.yourMobNo,
          partner: formData.partnerMobNo,
          parents: formData.parentsMobNo,
          partnerParents: formData.partnerParentsMobNo
        },
        filesUploaded: [
          formData.yourIdPost?.name,
          formData.parentsIdPost?.name,
          formData.partnerIdPost?.name,
          formData.partnerParentsIdPost?.name
        ].filter(Boolean).length,
        timestamp: new Date().toLocaleString()
      });

      // Call the mutation
      const result = await createApplication(submissionFormData).unwrap();

      console.log('✅ Application submitted successfully:', result);

      // Show success message
      alert("✅ Application submitted successfully!\n\nYour application is now under review. You will receive a confirmation message shortly.");
      onClose();
      
    } catch (error: any) {
      console.error('❌ Application submission failed:', error);
      
      // Handle different error types
      let errorMessage = 'Submission failed. Please check your connection and try again.';
      
      if (error?.data?.message) {
        errorMessage = error.data.message;
      } else if (error?.status === 413) {
        errorMessage = 'File size too large. Please ensure each file is less than 5MB.';
      } else if (error?.status === 415) {
        errorMessage = 'Unsupported file type. Please upload only JPG, PNG, PDF, or DOC files.';
      } else if (error?.status === 400) {
        errorMessage = 'Invalid form data. Please check all fields and try again.';
      } else if (error?.status === 401) {
        errorMessage = 'Authentication required. Please login and try again.';
      } else if (error?.status === 500) {
        errorMessage = 'Server error. Please try again later.';
      }
      
      alert(`❌ Submission Error: ${errorMessage}`);
    }
  };

  const triggerFileInput = (fieldName: string) => {
    fileInputRefs.current[fieldName]?.click();
  };

  const FileUploadField = ({ fieldName, label, required = true }: { fieldName: string; label: string; required?: boolean }) => {
    const file = formData[fieldName as keyof FormData] as File | null;
    
    return (
      <div className="file-upload-field">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label} {required && '*'}
        </label>
        <input
          type="file"
          ref={(el) => {fileInputRefs.current[fieldName] = el}}
          onChange={(e) => handleFileChange(e, fieldName)}
          accept="image/*,.pdf,.doc,.docx"
          className="hidden"
        />
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => triggerFileInput(fieldName)}
            className="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-50 border border-gray-300 rounded-lg hover:from-gray-200 hover:to-gray-100 transition-all duration-200 text-sm font-medium shadow-sm"
          >
            📁 Choose File
          </button>
          <div className="flex-1 min-w-0">
            <span className="text-sm text-gray-700 truncate block">
              {file ? (
                <span className="text-green-600 font-medium">✓ {file.name}</span>
              ) : (
                <span className="text-gray-500">No file chosen</span>
              )}
            </span>
            {file && (
              <span className="text-xs text-gray-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </span>
            )}
          </div>
        </div>
        {errors[fieldName] && (
          <p className="text-red-500 text-xs mt-1 flex items-center">
            ⚠️ {errors[fieldName]}
          </p>
        )}
        <p className="text-xs text-gray-500 mt-1">
          Supported: JPG, PNG, PDF, DOC (Max 5MB)
        </p>
      </div>
    );
  };

  // Animation styles as CSS-in-JS object
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

          {/* Error Banner */}
          {isError && (
  <div className="mt-3 p-2 bg-red-100 border border-red-300 rounded-lg">
    <p className="text-red-700 text-sm font-medium flex items-center">
      ⚠️ {'data' in (error as any) && (error as any).data?.message 
          ? (error as any).data.message 
          : 'Submission failed. Please try again.'}
    </p>
  </div>
)}

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
                  Penalty Type
                </h2>
                <div>
                  <label htmlFor="penaltyType" className="block text-sm font-medium text-gray-700 mb-3">
                    Select Penalty Type *
                  </label>
                  <select
                    id="penaltyType"
                    name="penaltyType"
                    value={formData.penaltyType}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD5C90] focus:border-transparent transition-all duration-200 bg-white disabled:bg-gray-100"
                  >
                    <option value="">Choose penalty type</option>
                    <option value="home-simple">Home simple (1-2 penalty)</option>
                    <option value="home-voluntary">Home voluntary (4-8 penalty)</option>
                    <option value="maximize-hall">Maximize hall (simple 1-2 penalty)</option>
                    <option value="maximize-hall-returns">Maximize hall returns (4-8 penalty)</option>
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
                  <FileUploadField fieldName="yourIdPost" label="Your ID Proof" />
                  <FileUploadField fieldName="parentsIdPost" label="Parents ID Proof" />
                </div>

                <div className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <input
                    type="checkbox"
                    id="parentsCertified"
                    name="parentsCertified"
                    checked={formData.parentsCertified}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="h-5 w-5 text-[#FD5C90] focus:ring-[#FD5C90] border-gray-300 rounded disabled:bg-gray-200"
                  />
                  <label htmlFor="parentsCertified" className="ml-3 block text-sm text-gray-700">
                    Parents certified with stamped document
                  </label>
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
                  <FileUploadField fieldName="partnerIdPost" label="Partner ID Proof" />
                  <FileUploadField fieldName="partnerParentsIdPost" label="Partner Parents ID Proof" />
                </div>

                <div className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <input
                    type="checkbox"
                    id="partnerParentsCertified"
                    name="partnerParentsCertified"
                    checked={formData.partnerParentsCertified}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="h-5 w-5 text-[#FD5C90] focus:ring-[#FD5C90] border-gray-300 rounded disabled:bg-gray-200"
                  />
                  <label htmlFor="partnerParentsCertified" className="ml-3 block text-sm text-gray-700">
                    Partner parents certified with stamped document
                  </label>
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

      {/* Add CSS animation */}
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