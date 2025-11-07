import { apiSlice } from './apiSlice';

interface DocumentData {
  id: string;
  documentType: string;
  exists: boolean;
  isVerified: string; // 'pending', 'verified', 'rejected', 'suspended'
  
}
interface DocumentDatacheckres {
  id: string;
  documentType: string;
  exists: boolean;
  isVerified: string; // 'pending' | 'verified' | 'rejected' | 'suspended'
  data?: DocumentData;
}

interface DocumentCheckResponse {
  success: boolean;
  exists: boolean;
  message: string;
  data?: DocumentData;
}

export const documentApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    documentupload: build.mutation({
      query: (data: FormData) => ({
        url: 'uploadDocuments/upload-document',
        method: 'POST',
        body: data
      }),
    }),
    documentget: build.mutation<DocumentCheckResponse, void>({
      query: () => ({
        url: 'uploadDocuments/get-document',
        method: 'GET',
      }),
    }),
    documentcheckexists: build.query<DocumentDatacheckres, void>({
      query: () => ({
        url: 'uploadDocuments/check-document',
        method: 'GET',
      }),
    }),
    documentdelete: build.mutation({
      query: () => ({
        url: 'uploadDocuments/delete-document',
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useDocumentuploadMutation,
  useDocumentgetMutation,
  useDocumentdeleteMutation,
  useDocumentcheckexistsQuery
} = documentApi;