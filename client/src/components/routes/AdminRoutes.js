import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminPrivateRoute from './AdminPrivateRoute'
import Dashboard from '../admin/dashboard/dashboard'
import AllUsers from '../admin/components/AllUsers'
import EditPlans from '../admin/components/EditPlans'
import AddAgents from '../admin/components/AddAgents'
import AdminEditPrivacyPolicy from '../admin/components/AdminEditPrivacyPolicy'
import NotFoundPage from '../common/NotFoundPage/NotFound'
import AdminLogin from '../admin/auth/AdminLogin'

const AdminRoutes = () => {
    return (
        <Routes>
            <Route exact path='/admin/login' element={<AdminLogin />} />
            <Route element={<AdminPrivateRoute />}>
                <Route exact path='/admin/dashboard' element={<Dashboard />} />
                <Route exact path='/admin/dashboard/users' element={<AllUsers />} />
                <Route exact path='/admin/dashboard/plans' element={<EditPlans />} />
                <Route exact path='/admin/dashboard/agents' element={<AddAgents />} />
                <Route exact path='/admin/dashboard/privacy-policy' element={<AdminEditPrivacyPolicy />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    )
}

export default AdminRoutes;
