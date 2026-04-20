import { apiSlice } from "./apiSlice";

export const notificationFcmApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    // 🔥 Enqueue notification (THIS is your API)
    enqueueNotification: builder.mutation<
      { ok: boolean },      // response
      { identifier: string }       // request body
    >({
      query: (body) => ({
        url: "fcm-notification/notifications/enqueue",
        method: "POST",
        body,
      }),
    }),

  }),
});

export const {
  useEnqueueNotificationMutation,
} = notificationFcmApi;