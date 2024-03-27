import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../config";

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
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
        "Pages",
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
        getLeads: build.query({
            query: () => 'api/admin/contact',
            providesTags: ['Leads'],
        }),
        deleteLead: build.mutation({
            query: (id) => ({
                url: `api/admin/contact/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Leads'],
        }),
        updateLeadStatus: build.mutation({
            query: ({ id, status }) => ({
                url: `api/admin/contact/${id}`,
                method: 'PATCH',
                body: { status },
            }),
            invalidatesTags: ['Leads'],
        }),
        getPage: build.query({
            query: (identifier) => `api/admin/page/${identifier}`,
        }),
        getPages: build.query({
            query: () => 'api/admin/pages',
        }),
        createPage: build.mutation({
            query: (page) => ({
                url: 'api/admin/page',
                method: 'POST',
                body: page,
            }),
        }),
        updatePage: build.mutation({
            query: ({ id, page }) => ({
                url: `api/admin/page/${id}`,
                method: 'PUT',
                body: page,
            }),
        }),
        deletePage: build.mutation({
            query: (id) => ({
                url: `api/admin/page/${id}`,
                method: 'DELETE',
            }),
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
        getContent: build.query({
            query: () => 'api/admin/content',
        }),
        updateContent: build.mutation({
            query: (newContent) => ({
                url: 'api/admin/content/privacy-policy',
                method: 'PUT',
                body: newContent,
            }),
        }),
        createContent: build.mutation({
            query: (initialContent) => ({
                url: 'api/admin/content',
                method: 'POST',
                body: initialContent,
            }),
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
    useGetLeadsQuery,
    useDeleteLeadMutation,
    useUpdateLeadStatusMutation,
    useGetPageQuery,
    useCreatePageMutation,
    useUpdatePageMutation,
    useDeletePageMutation,
    useGetPagesQuery,
} = api;

