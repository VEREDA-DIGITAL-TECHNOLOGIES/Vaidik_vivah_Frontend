import { apiSlice } from "./apiSlice";

// Define the response type for the application
interface ApplicationResponse {
  id: string;
  status: 'pending' | 'approved' | 'rejected';
  message?: string;
}




export const applicationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create new application
    createApplication: builder.mutation<ApplicationResponse, FormData>({
      query: (formData) => ({
        url: 'application-plan/applications-create',
        method: 'POST',
        body: formData,
        // Note: For file uploads, we need to handle FormData differently
        // RTK Query automatically sets Content-Type to multipart/form-data for FormData
      }),
      
    }),

    // Get all applications with pagination and filters
    // getApplications: builder.query({
    //   query: ({ page = 1, limit = 10, status } = {}) => ({
    //     url: 'applications',
    //     method: 'GET',
    //     params: { page, limit, status },
    //   }),
    
    // }),

    // Get application by ID
    getApplicationById: builder.query({
      query: (id) => ({
        url: `applications/${id}`,
        method: 'GET',
      }),
      
    }),

    // Update application status
    updateApplicationStatus: builder.mutation({
      query: ({ id, status, notes }) => ({
        url: `applications/${id}/status`,
        method: 'PATCH',
        body: { status, notes },
      }),
      
    }),

    // Get application statistics
    getApplicationStats: builder.query({
      query: () => ({
        url: 'applications/stats',
        method: 'GET',
      }),
      
    }),

    // Delete application (if needed)
    deleteApplication: builder.mutation({
      query: (id) => ({
        url: `applications/${id}`,
        method: 'DELETE',
      }),
      
    }),
  }),
});

export const {
  useCreateApplicationMutation,
//   useGetApplicationsQuery,
  useGetApplicationByIdQuery,
  useUpdateApplicationStatusMutation,
  useGetApplicationStatsQuery,
  useDeleteApplicationMutation,
} = applicationApi;