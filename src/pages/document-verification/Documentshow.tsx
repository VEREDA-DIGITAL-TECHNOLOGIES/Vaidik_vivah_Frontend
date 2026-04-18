// import React, { useEffect, useState } from "react";
// import { Dialog } from "@headlessui/react";
// import { ExclamationTriangleIcon, CheckCircleIcon, ClockIcon } from "@heroicons/react/24/outline";
// import { useDocumentgetMutation, useDocumentdeleteMutation } from "../../Redux/Api/document.api";
// import { Link, useNavigate } from "react-router-dom";

// interface DocumentData {
//     id: string;
//     userId: string;
//     documentFrontUrl: string;
//     documentBackUrl: string;
//     documentType: string;
//     isVerified: string; // 'pending', 'verified', 'rejected'
//     createdAt: string;
// }

// const Documentshow: React.FC = () => {
//     const [document, setDocument] = useState<DocumentData | null>(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const [successMsg, setSuccessMsg] = useState<string | null>(null);
//     const [confirmOpen, setConfirmOpen] = useState(false);
//     const navigate = useNavigate();

//     const [getDocument] = useDocumentgetMutation();
//     const [deleteDocumentApi] = useDocumentdeleteMutation();

//     const fetchDocument = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const res: any = await getDocument().unwrap();
//             setDocument(res.data);
//         } catch (err: any) {
//             setError(err?.data?.message || "Failed to fetch document");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const deleteDocument = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             await deleteDocumentApi({}).unwrap();
//             setSuccessMsg("Document deleted successfully");
//             setDocument(null);
//         } catch (err: any) {
//             setError(err?.data?.message || "Failed to delete document");
//         } finally {
//             setLoading(false);
//             setConfirmOpen(false);
//         }
//     };

//     const goToDashboard = () => {
//         navigate('/user-dashboard'); // Adjust the route as needed
//     };

//     useEffect(() => {
//         fetchDocument();
//     }, []);

//     // Format date for display
//     const formatDate = (dateString: string) => {
//         const options: Intl.DateTimeFormatOptions = {
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric',
//             hour: '2-digit',
//             minute: '2-digit'
//         };
//         return new Date(dateString).toLocaleDateString(undefined, options);
//     };

//     return (
//         <div className="p-6 max-w-2xl mx-auto space-y-6">
//             <h2 className="text-3xl font-bold">Your Uploaded Documents</h2>

//             {loading && (
//                 <div className="animate-pulse space-y-4">
//                     <div className="h-48 bg-gray-200 rounded" />
//                     <div className="h-48 bg-gray-200 rounded" />
//                 </div>
//             )}

//             {error && (
//                 <div className="bg-red-100 text-red-700 px-4 py-2 rounded shadow">
//                     {error}
//                 </div>
//             )}

//             {successMsg && (
//                 <div className="bg-green-100 text-green-700 px-4 py-2 rounded shadow">
//                     {successMsg}
//                 </div>
//             )}

//             {document && (
//                 <div className="space-y-6">
//                     {/* Verification Status Banner */}
//                     <div className={`p-4 rounded-lg ${document.isVerified === 'verified'
//                             ? 'bg-green-100 text-green-800'
//                             : document.isVerified === 'rejected'
//                                 ? 'bg-red-100 text-red-800'
//                                 : 'bg-blue-100 text-blue-800'
//                         }`}>
//                         <div className="flex items-center gap-2">
//                             {document.isVerified === 'verified' ? (
//                                 <CheckCircleIcon className="h-5 w-5" />
//                             ) : (
//                                 <ClockIcon className="h-5 w-5" />
//                             )}
//                             <p className="font-medium">
//                                 {document.isVerified === 'verified'
//                                     ? 'Your document has been verified!'
//                                     : document.isVerified === 'rejected'
//                                         ? 'Your document was rejected. Please upload again.'
//                                         : `Your document is under verification (submitted on ${formatDate(document.createdAt)})`}
//                             </p>
//                         </div>
//                         {document.isVerified === 'pending' && (
//                             <p className="mt-1 text-sm">
//                                 Verification typically takes 2-3 business days. Thank you for your patience.
//                             </p>
//                         )}
//                     </div>

//                     {/* Document Images */}
//                     <div className="grid sm:grid-cols-2 gap-6">
//                         <div className="rounded-lg shadow-md overflow-hidden border">
//                             <img
//                                 src={document.documentFrontUrl}
//                                 alt="Front"
//                                 className="w-full h-48 object-cover"
//                             />
//                             <div className="p-4">
//                                 <p className="text-lg font-semibold">Front Side</p>
//                             </div>
//                         </div>

//                         <div className="rounded-lg shadow-md overflow-hidden border">
//                             <img
//                                 src={document.documentBackUrl}
//                                 alt="Back"
//                                 className="w-full h-48 object-cover"
//                             />
//                             <div className="p-4">
//                                 <p className="text-lg font-semibold">Back Side</p>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Document Details */}
//                     <div className="bg-gray-50 p-4 rounded-lg">
//                         <h3 className="font-medium text-lg mb-2">Document Details</h3>
//                         <div className="grid grid-cols-2 gap-2">
//                             <div>
//                                 <p className="text-gray-600">Document Type:</p>
//                                 <p className="font-medium">{document.documentType || 'Not specified'}</p>
//                             </div>
//                             <div>
//                                 <p className="text-gray-600">Upload Date:</p>
//                                 <p className="font-medium">{formatDate(document.createdAt)}</p>
//                             </div>
//                             <div>
//                                 <p className="text-gray-600">Status:</p>
//                                 <p className="font-medium capitalize">{document.isVerified}</p>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Action Buttons */}
//                                     <div className="flex flex-wrap gap-3">
//                 {document.isVerified === 'verified' ? (
//                     <button
//                     onClick={goToDashboard}
//                     className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow"
//                     >
//                     Go to Dashboard
//                     </button>
//                 ) : document.isVerified === 'suspended' ? (
//                     <Link
//                     to="/user-suspended"
//                     className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg shadow"
//                     >
//                    Account Suspended — Contact Support
//                     </Link>
//                 ) : (
//                     <button
//                     disabled
//                     className="bg-gray-300 text-gray-600 px-5 py-2 rounded-lg shadow cursor-not-allowed"
//                     >
//                     {document.isVerified === 'rejected'
//                         ? 'Please upload new documents'
//                         : 'Verification in progress (2-3 days)'}
//                     </button>
//                 )}

//                 <button
//                     onClick={() => setConfirmOpen(true)}
//                     className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg shadow"
//                 >
//                     Delete Document
//                 </button>
//                 </div>

//                 </div>
//             )}

//             {!document && !loading && !error && (
//                 <div className="text-center py-8">
//                     <p className="text-gray-500 mb-4">No document uploaded yet.</p>
//                     <button
//                         onClick={() => navigate('/document-verification')} // Adjust the route as needed
//                         className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow"
//                     >
//                         Upload Document
//                     </button>
//                 </div>
//             )}

//             {/* Confirmation Modal */}
//             <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)} className="fixed z-50 inset-0 overflow-y-auto">
//                 <div className="flex items-center justify-center min-h-screen px-4">
//                     <Dialog.Panel className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg">
//                         <div className="flex items-center space-x-4">
//                             <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
//                             <Dialog.Title className="text-lg font-semibold text-gray-900">
//                                 Confirm Deletion
//                             </Dialog.Title>
//                         </div>
//                         <Dialog.Description className="mt-2 text-gray-700">
//                             Are you sure you want to delete your document? This action cannot be undone.
//                         </Dialog.Description>
//                         <div className="mt-4 flex justify-end gap-3">
//                             <button
//                                 onClick={() => setConfirmOpen(false)}
//                                 className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 onClick={deleteDocument}
//                                 className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//                             >
//                                 Delete
//                             </button>
//                         </div>
//                     </Dialog.Panel>
//                 </div>
//             </Dialog>
//         </div>
//     );
// };

// export default Documentshow;