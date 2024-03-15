import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    reducerPath: "adminApi",
    tagTypes: [
        "User",
        "Properties",
        "Customers",
        "Transactions",
        "Geography",
        "Sales",
        "Admins",
        "Performance",
        "Dashboard",
    ],
    endpoints: (build) => ({
        getUser: build.query({
            query: (id) => `general/user/${id}`,
            providesTags: ["User"],
        }),
        getProperties: build.query({
            query: () => "api/property/properties",
            providesTags: ["Properties"],
        }),
        getCustomers: build.query({
            query: () => "api/user",
            providesTags: ["Customers"],
        }),
        getTransactions: build.query({
            query: ({ page, pageSize, sort, search }) => ({
                url: "client/transactions",
                method: "GET",
                params: { page, pageSize, sort, search },
            }),
            providesTags: ["Transactions"],
        }),
        addAgent: build.mutation({
            query: (agent) => ({
                url: 'api/admin/agent',
                method: 'POST',
                body: agent,
            }),
            invalidatesTags: ['User'],
        }),
        getAgents: build.query({
            query: () => 'api/admin/agent',
            providesTags: ['Agents'],
        }),
        removeAgent: build.mutation({
            query: (id) => ({
                url: `api/admin/agent/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Agents'],
        }),
        getGeography: build.query({
            query: () => "client/geography",
            providesTags: ["Geography"],
        }),
        getSales: build.query({
            query: () => "sales/sales",
            providesTags: ["Sales"],
        }),
        getAdmins: build.query({
            query: () => "management/admins",
            providesTags: ["Admins"],
        }),
        getUserPerformance: build.query({
            query: (id) => `management/performance/${id}`,
            providesTags: ["Performance"],
        }),
        getDashboard: build.query({
            query: () => "general/dashboard",
            providesTags: ["Dashboard"],
        }),
    }),
});

export const {
    useGetUserQuery,
    useGetPropertiesQuery,
    useGetCustomersQuery,
    useGetTransactionsQuery,
    useGetGeographyQuery,
    useGetSalesQuery,
    useGetAdminsQuery,
    useGetUserPerformanceQuery,
    useGetDashboardQuery,
    useAddAgentMutation,
    useGetAgentsQuery,
    useRemoveAgentMutation,
} = api;

