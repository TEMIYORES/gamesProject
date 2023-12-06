import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `user/login`,
        method: "POST",
        body: data,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: `auth/password/forgot-password`,
        method: "POST",
        body: data,
      }),
    }),
    emailVerification: builder.mutation({
      query: (data) => ({
        url: `auth/password/verify`,
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: `auth/password/reset-password`,
        method: "POST",
        body: data,
      }),
    }),
    getUser: builder.query({
      query: () => ({
        url: `user/get-user`,
        headers: {
          Authorization: `Bearer ${
            JSON.parse(sessionStorage.getItem("userInfo") || "").token
          }`,
        },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetUserQuery,
  useForgotPasswordMutation,
  useEmailVerificationMutation,
  useResetPasswordMutation,
} = userApiSlice;
