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
        "Files",
    ],
    endpoints: (build) => ({
        getPlans: build.query({
            query: () => 'api/admin/plans',
            providesTags: ['Plans'],
        }),
        createPlan: build.mutation({
            query: (newPlan) => ({
                url: 'api/admin/plans',
                method: 'POST',
                body: newPlan,
            }),
            invalidatesTags: ['Plans'],
        }),
        updatePlan: build.mutation({
            query: ({ id, updatedPlan }) => ({
                url: `api/admin/plans/${id}`,
                method: 'PUT',
                body: updatedPlan,
            }),
            invalidatesTags: ['Plans'],
        }),
        deletePlan: build.mutation({
            query: (id) => ({
                url: `api/admin/plans/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Plans'],
        }),
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
            query: () => 'api/admin/admins',
            providesTags: ["Admins"],
        }),
        createAdmin: build.mutation({
            query: (newAdmin) => ({
                url: 'api/admin/admins',
                method: 'POST',
                body: newAdmin,
            }),
            invalidatesTags: ['Admins'],
        }),
        updateAdmin: build.mutation({
            query: ({ id, updatedAdmin }) => ({
                url: `api/admin/admins/${id}`,
                method: 'PUT',
                body: updatedAdmin,
            }),
            invalidatesTags: ['Admins'],
        }),
        deleteAdmin: build.mutation({
            query: (id) => ({
                url: `api/admin/admins/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Admins'],
        }),

        getUserPerformance: build.query({
            query: (id) => `management/performance/${id}`,
            providesTags: ["Performance"],
        }),
        getDashboard: build.query({
            query: () => "general/dashboard",
            providesTags: ["Dashboard"],
        }),
        getFiles: build.query({
            query: () => 'api/admin/files',
            providesTags: ['Files'],
        }),
        getFile: build.query({
            query: (id) => `api/admin/files/${id}`,
            providesTags: ['Files'],
        }),
        addFile: build.mutation({
            query: (newFile) => ({
                url: 'api/admin/files',
                method: 'POST',
                body: newFile,
            }),
            invalidatesTags: ['Files'],
        }),
        updateFile: build.mutation({
            query: ({ id, updatedFile }) => ({
                url: `api/admin/files/${id}`,
                method: 'PUT',
                body: updatedFile,
            }),
            invalidatesTags: ['Files'],
        }),
        deleteFile: build.mutation({
            query: (id) => ({
                url: `api/admin/files/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Files'],
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
    useCreateAdminMutation,
    useUpdateAdminMutation,
    useDeleteAdminMutation,
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
    useGetPlansQuery,
    useCreatePlanMutation,
    useUpdatePlanMutation,
    useDeletePlanMutation,
    useGetFilesQuery,
    useGetFileQuery,
    useAddFileMutation,
    useUpdateFileMutation,
    useDeleteFileMutation,
} = api;

