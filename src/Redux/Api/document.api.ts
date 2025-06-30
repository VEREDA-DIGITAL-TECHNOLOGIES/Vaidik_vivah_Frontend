
import { apiSlice } from './apiSlice';

export const documentApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
      documentupload: build.mutation({
        query: (data) => ({
          url: 'uploadDocuments/upload-document',
          method: 'POST',
          body: data
        }),
      
      }),
      documentget: build.mutation({
        query: () => ({
          url: 'uploadDocuments/get-document',
          method: 'GET',
         
        }),
      
      }),
      documentdelete: build.mutation({
        query: () => ({
          url: 'uploadDocuments/delete-document',
          method: 'DELETE',
        //   body: data
        }),
      
      }),
   })
});
export const {
   useDocumentuploadMutation,useDocumentgetMutation,useDocumentdeleteMutation
    
    } = documentApi;