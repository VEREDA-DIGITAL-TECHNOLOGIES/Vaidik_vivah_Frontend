import { apiSlice } from './apiSlice';


export const checkoutApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Stripe (existing)
        createCheckoutSession: builder.mutation({
            query: (planId: string) => ({
                url: 'subscription/createCheckoutSession',
                method: 'POST',
                body: { planId },
            }),
        }),

        // Razorpay: Create Order
        createRazorpayOrder: builder.mutation({
            query: (planId: string) => ({
                url: 'payment/create-razorpay-order', // Your backend endpoint
                method: 'POST',
                body: { planId },
            }),
        }),
        

        // Razorpay: Verify Payment
        verifyRazorpayPayment: builder.mutation({
            query: (data: { order_id: string, payment_Id: string, signature: string, planId: string }) => ({
                url: 'payment/verify-payment',
                method: 'POST',
                body: data,
            }),
        }),

        // Get subscription info
        getUserSubscriptionStatus: builder.query({
            query: () => ({
                url: 'subscription/checkSubscriptionStatus',
                method: 'GET',
            }),
        }),

        getSubscriptionHistory: builder.query<void, void>({
            query: () => ({
                url: 'subscription/getSubscriptionHistory',
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useCreateCheckoutSessionMutation,
    useCreateRazorpayOrderMutation,
    useVerifyRazorpayPaymentMutation,
    useGetUserSubscriptionStatusQuery,
    useGetSubscriptionHistoryQuery,
} = checkoutApi;
