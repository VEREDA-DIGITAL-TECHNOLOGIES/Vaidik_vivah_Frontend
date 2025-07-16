import React, { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import {
    FiUpload,
    FiCheckCircle,
    FiXCircle,
    FiInfo,
    FiArrowRight,
    FiArrowLeft,
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useDocumentuploadMutation } from '../../Redux/Api/document.api';

const DocumentVerification: React.FC = () => {
    const navigate = useNavigate();

    const [selectedTab, setSelectedTab] = useState<'ndls' | 'manual'>('manual');
    const [documentType, setDocumentType] = useState<string>('Aadhaar Card');
    const [frontFile, setFrontFile] = useState<File | null>(null);
    const [backFile, setBackFile] = useState<File | null>(null);
    const [message, setMessage] = useState<{
        text: string;
        type: 'success' | 'error' | 'info';
    } | null>(null);

    const [documentupload, { isLoading }] = useDocumentuploadMutation();

    const documentTypes = [
        'Aadhaar Card',
        'PAN Card',
        'Voter ID',
        'Driving License',
        'Passport',
    ];

    const handleTabSwitch = (tab: 'ndls' | 'manual') => {
        setSelectedTab(tab);
        setMessage(null);
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>, side: 'front' | 'back') => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];

            if (file.size > 5 * 1024 * 1024) {
                setMessage({ text: 'File size should be less than 5MB', type: 'error' });
                return;
            }
            if (!validTypes.includes(file.type)) {
                setMessage({ text: 'Only JPG, PNG, and PDF files are allowed', type: 'error' });
                return;
            }

            if (side === 'front') setFrontFile(file);
            else setBackFile(file);

            setMessage(null);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (isLoading) return;
        // console.log('Submitting:', {
        //     front: frontFile?.name,
        //     back: backFile?.name,
        // });
          

        if (!frontFile || !backFile) {
            setMessage({ text: 'Please upload both front and back documents', type: 'error' });
            return;
        }

        const formData = new FormData();
        formData.append('documentType', documentType);
        formData.append('front', frontFile);
        formData.append('back', backFile);

        // console.log('Submitting:', {
        //     front: frontFile?.name,
        //     back: backFile?.name,
        // });
        try {
            setMessage({ text: 'Uploading your documents...', type: 'info' });
            // console.log(formData)
            await documentupload(formData).unwrap();
            setMessage({
                text: 'Documents uploaded successfully! Verification in progress.',
                type: 'success',
            });

            setFrontFile(null);
            setBackFile(null);
            navigate('/document-show');
        } catch (error: any) {
            const errorMsg = error?.data?.error || 'Upload failed. Please try again.';
            setMessage({ text: errorMsg, type: 'error' });
        }
    };

    const renderMessage = () => {
        if (!message) return null;

        const icon = {
            success: <FiCheckCircle className="mr-2" size={18} />,
            error: <FiXCircle className="mr-2" size={18} />,
            info: <FiInfo className="mr-2" size={18} />,
        }[message.type];

        const color = {
            success: 'bg-green-50 text-green-800 border-green-100',
            error: 'bg-red-50 text-red-800 border-red-100',
            info: 'bg-blue-50 text-blue-800 border-blue-100',
        }[message.type];

        return (
            <div className={`mt-4 p-3 rounded-md border flex items-start ${color}`}>
                {icon}
                <span>{message.text}</span>
            </div>
        );
    };

    const FilePreview = ({ file, side }: { file: File | null; side: string }) => (
        <div className="mt-2 text-sm text-gray-600">
            {file ? (
                <div className="flex items-center">
                    <span className="truncate max-w-xs">{file.name}</span>
                    <span className="ml-2 text-gray-500">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                </div>
            ) : (
                <span>No {side} file selected</span>
            )}
        </div>
    );

    return (
        <div className='bg-[#FFF0F5]'>

        <div className="max-w-3xl mx-auto my-8 p-4 sm:p-6">
            <div className=" flex border-b border-gray-200 mb-4 space-x-4">
                <button
                    onClick={() => handleTabSwitch('manual')}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-all duration-200 ${selectedTab === 'manual'
                            ? 'text-[#FD5C90] border-[#FD5C90] font-semibold'
                            : 'text-gray-500 border-transparent hover:text-[#FD5C90]'
                        }`}
                >
                    Manual Verification
                </button>
                <button
                    onClick={() => handleTabSwitch('ndls')}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-all duration-200 ${selectedTab === 'ndls'
                            ? 'text-[#FD5C90] border-[#FD5C90] font-semibold'
                            : 'text-gray-500 border-transparent hover:text-[#FD5C90]'
                        }`}
                >
                    NDLS Verification
                </button>
            </div>

            <div className="transition-all duration-300 min-h-[400px]">
                {selectedTab === 'ndls' && (
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-gray-800">Manual Document Upload</h2>
                            <button
                                onClick={() => handleTabSwitch('manual')}
                                    className="text-sm text-[#FD5C90] hover:text-[#FD5C90] flex items-center cursor-pointer"
                            >
                                <FiArrowRight className="mr-1 transform rotate-180" />
                                Go to Manual Verification
                            </button>
                        </div>
                        <div className="mx-auto max-w-md text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FiInfo className="text-[#FD5C90] text-2xl" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-3">NDLS Verification</h2>
                            <p className="text-gray-600 mb-6 mt-6">NDLS Verification coming soon...</p>
                        </div>
                    </div>
                )}

                {selectedTab === 'manual' && (
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-gray-800">Manual Document Upload</h2>
                            <button
                                onClick={() => handleTabSwitch('ndls')}
                                    className="text-sm text-[#FD5C90] gap-1 hover:text-[#f68aac] flex items-center cursor-pointer"
                            >
                                Go to NDLS Verification
                                <FiArrowLeft className="mr-1 transform rotate-180" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Document Type <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={documentType}
                                    onChange={(e) => setDocumentType(e.target.value)}
                                    required
                                    className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                >
                                    {documentTypes.map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-4">
                                {['front', 'back'].map((side) => (
                                    <div key={side}>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            {side === 'front' ? 'Front Side' : 'Back Side'}
                                            <span className="text-gray-500 ml-1">(Max 5MB, JPG/PNG/PDF)</span>
                                            <span className="text-red-500"> *</span>
                                        </label>
                                        <label className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">
                                            <div className="flex flex-col items-center justify-center">
                                                <FiUpload className="w-6 h-6 text-gray-500 mb-2" />
                                                <p className="text-sm text-gray-600">Click to upload {side} image</p>
                                                <p className="text-xs text-gray-500 mt-1">or drag and drop file here</p>
                                            </div>
                                            <input
                                                type="file"
                                                accept="image/jpeg,image/png,application/pdf"
                                                onChange={(e) => handleFileChange(e, side as 'front' | 'back')}
                                                required
                                                className="hidden"
                                                disabled={isLoading}
                                            />
                                        </label>
                                        <FilePreview file={side === 'front' ? frontFile : backFile} side={side} />
                                    </div>
                                ))}
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-2.5 px-4 bg-[#FD5C90] text-white font-medium rounded-md hover:bg-[#FD5C90] transition flex items-center justify-center disabled:bg-blue-400 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <>
                                        <svg
                                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            />
                                        </svg>
                                        Uploading Documents...
                                    </>
                                ) : (
                                    'Submit Documents for Verification'
                                )}
                            </button>
                        </form>

                        {renderMessage()}

                        <div className="mt-6 p-4 bg-gray-50 rounded-md text-sm text-gray-600 border border-gray-200">
                            <h3 className="font-medium mb-2 flex items-center">
                                <FiInfo className="mr-2" /> Document Upload Guidelines
                            </h3>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Ensure documents are clear and all text is readable</li>
                                <li>Upload high-quality color images (300 DPI recommended)</li>
                                <li>File size must be under 5MB per document</li>
                                <li>Accepted formats: JPG, PNG, or PDF</li>
                                <li>For ID cards, upload both front and back sides</li>
                                <li>Remove any covers or holders before scanning</li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
        </div>
    );
};

export default DocumentVerification;
