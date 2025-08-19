import { apiSlice } from './apiSlice';

interface DocumentData {
  id: string;
  documentType: string;
  isVerified: string; // or boolean depending on your backend
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
    documentcheckexists: build.query<DocumentCheckResponse, void>({
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