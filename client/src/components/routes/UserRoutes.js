import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom'
import PrivateRoute from './PrivateRoute';
import Checkout from '../property/checkout/Checkout';
import FAQ from '../common/faq/FAQ';
import PrivacyPolicyTest from '../common/LegalDocuments/PrivacyPolicyTest';
import PrivacyPolicy from '../common/LegalDocuments/PrivacyPolicy';
import TermsAndConditions from '../common/LegalDocuments/TermsAndConditions';
import Verification from '../user/verification/Verification';
import Hero from '../common/Hero/Hero';
import Login from '../auth/LogIn/LogIn';
import SignUp from '../auth/SignUp/SignUp';
import ResetPassword from '../auth/LogIn/ResetPassword/ResetPassword';
import PropertyDetails from '../property/PropertyCard/PropertyDetails';
import PropertyPricingCards from '../property/PropertyStatus/PropertyPricingCards';
import Homes from '../marketplace/homes/Homes';
import FindAgents from '../common/findagents/FindAgents';
import PropertyListing from '../property/PropertyListing/PropertyListing';
import Saved from '../user/saved/Saved';
import ListedProperties from '../user/ListedProperties/ListedProperties';
import Profile from '../user/Profile/Profile';
import NotFoundPage from '../common/NotFoundPage/NotFound';
import AdminLogin from '../admin/auth/AdminLogin';
import AddAgents from '../admin/scenes/agents/AddAgents';
import EditPlans from '../admin/components/EditPlans';
import AllUsers from '../admin/components/AllUsers';
import Customers from "../admin/scenes/customers/index";
import AdminPrivateRoute from './AdminPrivateRoute';
import Layout from '../admin/scenes/layout';
import Properties from '../admin/scenes/properties';
import Leads from '../admin/scenes/leads/Leads';
import PrivacyPolicyPage from '../admin/scenes/pages/PrivacyPolicyPage';
import DynamicPage from '../admin/scenes/pages/DynamicPage';
import PageSelection from '../admin/scenes/pages/PagesSelection';
import Plans from '../admin/scenes/plans/Plans';
import Admins from '../admin/scenes/admins/Admins';
import AdsSection from '../admin/scenes/uploads/AdsSection';

const UserRoutes = () => {
    const currentUser = useSelector(state => state.user.currentUser);
    const username = currentUser?.username;

    return (
        <Routes>
            <Route path="/" exact={true} element={<Hero />} />
            <Route path="/login" element={currentUser ? <Navigate to="/" /> : <Login />} />
            <Route path="/signup" exact={true} element={<SignUp />} />
            <Route path="/reset-password" exact={true} element={<ResetPassword />} />
            <Route path="/property-details/:propertyId?" exact={true} element={<PropertyDetails />} />
            <Route path="/property-plans" exact={true} element={<PropertyPricingCards />} />
            <Route path="/homes" exact={true} element={<Homes />} />
            <Route path="/find-agents" exact={true} element={<FindAgents />} />
            <Route path="/verification" exact={true} element={<Verification />} />
            <Route path="/terms-and-conditions" exact={true} element={<TermsAndConditions />} />
            <Route path="/privacy-policy" exact={true} element={<PrivacyPolicy />} />
            <Route path="/privacy-policy-test" exact={true} element={<PrivacyPolicyTest />} />
            <Route path="/help" exact={true} element={<FAQ />} />
            <Route exact path='/checkout' element={<Checkout />} />
            <Route element={<PrivateRoute />}>
                <Route path="/property-listing" exact={true} element={<PropertyListing />} />
                <Route path="/saved" exact={true} element={<Saved />} />
                <Route path="/listed-properties" element={currentUser ? <ListedProperties username={username} /> : <Navigate to="/login" replace />} />
                <Route exact path='/profile' element={<Profile />} />
            </Route>
            <Route path='/admin/login' element={<AdminLogin />} />
            <Route path='/admin/dashboard/*' element={<Layout />}>
                <Route path='customers' element={<AdminPrivateRoute><Customers /></AdminPrivateRoute>} />
                <Route path='leads' element={<AdminPrivateRoute><Leads /></AdminPrivateRoute>} />
                <Route path='users' element={<AdminPrivateRoute><AllUsers /></AdminPrivateRoute>} />
                <Route path='properties' element={<AdminPrivateRoute><Properties /></AdminPrivateRoute>} />
                <Route path='plans' element={<AdminPrivateRoute><Plans /></AdminPrivateRoute>} />
                <Route path='agents' element={<AdminPrivateRoute><AddAgents /></AdminPrivateRoute>} />
                <Route path='admins' element={<AdminPrivateRoute><Admins /></AdminPrivateRoute>} />
                <Route path='uploads' element={<AdminPrivateRoute><AdsSection /></AdminPrivateRoute>} />
                <Route path='privacy' element={<AdminPrivateRoute><PrivacyPolicyPage /></AdminPrivateRoute>} />
                <Route path='pages' element={<AdminPrivateRoute><PageSelection /></AdminPrivateRoute>} />
                <Route path='pages/:identifier' element={<AdminPrivateRoute><DynamicPage /></AdminPrivateRoute>} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    )
}

export default UserRoutes