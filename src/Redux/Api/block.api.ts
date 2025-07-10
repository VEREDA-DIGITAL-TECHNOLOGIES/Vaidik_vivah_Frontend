
import { apiSlice } from './apiSlice';

export const blockApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
      blockuser: build.mutation({
        query: (data: { userId: string }) => ({
          url: 'block/block',
          method: 'POST',
          body: data,
        }),
      
      }),
      unblockuser: build.mutation({
        query: (data) => ({
          url: 'block/unblock',
          method: 'POST',
          body: data
        }),
      
      }),
      blockuserlist: build.mutation({
        query: () => ({
          url: 'block/blocked',
          method: 'GET',
        //   body: data
        }),
      
      }),
   })
});
export const {
   useBlockuserMutation,useUnblockuserMutation,useBlockuserlistMutation
    
    } = blockApi;