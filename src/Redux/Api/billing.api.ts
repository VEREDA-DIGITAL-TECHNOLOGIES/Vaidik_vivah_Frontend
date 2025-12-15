
import { apiSlice } from './apiSlice';

type BillingInfoData = {
        success: boolean;
        message: string;
        data?: any;
    };

export const billingApi = apiSlice.injectEndpoints({   
    
    endpoints: (builder) => ({
        getBillingInfo: builder.query<BillingInfoData, void>({
            query: () => ({
                url: 'billing/getBillingInfo',
                method: 'GET',
            }),
        })
    })


})


export const { useGetBillingInfoQuery } = billingApi