// contactApi.ts
import { apiSlice } from './apiSlice';

export const contactApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    contactus: builder.mutation<void, { name: string; mobile: string; email: string; message: string }>({
      query: (data) => ({
        url: 'admin/contact/',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useContactusMutation } = contactApi;
