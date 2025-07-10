
import { apiSlice } from './apiSlice';

export const reportApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
      reportuser: build.mutation({
        query: (data: { userId: string,reason:string }) => ({
          url: 'report/report',
          method: 'POST',
          body: data
        }),
      
      }),
      myreportsuser: build.mutation({
        query: (data: { userId: string }) => ({
          url: 'report/my-reports',
          method: 'GET',
          body: data
        }),
      
      }),
      reportalllist: build.mutation({
        query: () => ({
          url: 'block/all',
          method: 'GET',
        //   body: data
        }),
      
      }),
   })
});
export const {
   useReportalllistMutation,useReportuserMutation,useMyreportsuserMutation
    } = reportApi;