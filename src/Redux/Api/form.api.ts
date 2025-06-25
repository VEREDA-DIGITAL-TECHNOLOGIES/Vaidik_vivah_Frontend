
import { apiSlice } from './apiSlice';

export const formApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
      personalDetials: build.mutation({
        query: (data) => ({
          url: 'form/personalDetails',
          method: 'POST',
          body: data
        }),
      
      }),
      gayatriDetials: build.mutation({
        query: (data) => ({
          url: 'form/gayatriDetails',
          method: 'POST',
          body: data
        }),
      
      }),
      qualificationDetails: build.mutation({
        query: (data) => ({
          url: 'form/qualificationDetails',
          method: 'POST',
          body: data
        }),
      
        }),

        locationDetails: build.mutation({
          query: (data) => ({
            url: 'form/locationDetails',
            method: 'POST',
            body: data
          }),
          }),

        otherDetails: build.mutation({
          query: (data) => ({
            url: 'form/otherDetails',
            method: 'POST',
            body: data
          }),
          }),

          profileImageUpload: build.mutation({
            query: (data) => ({
              url: 'form/profileImageUpload',
              method: 'POST',
              body: data
            }),
            }),
    }),

});
export const {
   usePersonalDetialsMutation,
    useQualificationDetailsMutation, 
    useLocationDetailsMutation,
     useOtherDetailsMutation, 
     useProfileImageUploadMutation ,
     useGayatriDetialsMutation
    } = formApi;