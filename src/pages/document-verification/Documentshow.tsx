import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useDocumentgetMutation, useDocumentdeleteMutation } from "../../Redux/Api/document.api"; // adjust path

interface DocumentData {
    id: string;
    userId: string;
    documentFrontUrl: string;
    documentBackUrl: string;
}

const Documentshow: React.FC = () => {
    const [document, setDocument] = useState<DocumentData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const [getDocument] = useDocumentgetMutation();
    const [deleteDocumentApi] = useDocumentdeleteMutation();

    const fetchDocument = async () => {
        setLoading(true);
        setError(null);
        try {
            
            const res: any = await getDocument({}).unwrap();

            setDocument(res.data);
        } catch (err: any) {
            setError(err?.data?.message || "Failed to fetch document");
        } finally {
            setLoading(false);
        }
    };

    const deleteDocument = async () => {
        setLoading(true);
        setError(null);
        try {
            
            await deleteDocumentApi({}).unwrap();

            setSuccessMsg("Document deleted successfully");
            setDocument(null);
        } catch (err: any) {
            setError(err?.data?.message || "Failed to delete document");
        } finally {
            setLoading(false);
            setConfirmOpen(false);
        }
    };

    useEffect(() => {
        fetchDocument();
    }, []);

    return (
        <div className="p-6 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold">Your Uploaded Documents</h2>

            {loading && (
                <div className="animate-pulse space-y-4">
                    <div className="h-48 bg-gray-200 rounded" />
                    <div className="h-48 bg-gray-200 rounded" />
                </div>
            )}

            {error && (
                <div className="bg-red-100 text-red-700 px-4 py-2 rounded shadow">
                    {error}
                </div>
            )}

            {successMsg && (
                <div className="bg-green-100 text-green-700 px-4 py-2 rounded shadow">
                    {successMsg}
                </div>
            )}

            {document && (
                <div className="grid sm:grid-cols-2 gap-6">
                    <div className="rounded-lg shadow-md overflow-hidden border">
                        <img
                            src={document.documentFrontUrl}
                            alt="Front"
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <p className="text-lg font-semibold">Front Side</p>
                        </div>
                    </div>

                    <div className="rounded-lg shadow-md overflow-hidden border">
                        <img
                            src={document.documentBackUrl}
                            alt="Back"
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <p className="text-lg font-semibold">Back Side</p>
                        </div>
                    </div>

                    <div className="col-span-2">
                        <button
                            onClick={() => setConfirmOpen(true)}
                            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg shadow"
                        >
                            Delete Document
                        </button>
                    </div>
                </div>
            )}

            {!document && !loading && !error && (
                <p className="text-gray-500">No document uploaded yet.</p>
            )}

            {/* Confirmation Modal */}
            <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)} className="fixed z-50 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen px-4">
                    <Dialog.Panel className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg">
                        <div className="flex items-center space-x-4">
                            <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
                            <Dialog.Title className="text-lg font-semibold text-gray-900">
                                Confirm Deletion
                            </Dialog.Title>
                        </div>
                        <Dialog.Description className="mt-2 text-gray-700">
                            Are you sure you want to delete your document? This action cannot be undone.
                        </Dialog.Description>
                        <div className="mt-4 flex justify-end gap-3">
                            <button
                                onClick={() => setConfirmOpen(false)}
                                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={deleteDocument}
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    );
};

export default Documentshow;
