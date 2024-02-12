import './App.css';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './components/common/header/Header'
import Footer from './components/common/footer/Footer'
import LogIn from './components/auth/LogIn/LogIn';
import SignUp from './components/auth/SignUp/SignUp';
import ResetPassword from './components/auth/LogIn/ResetPassword/ResetPassword';
import PropertyListing from './components/property/PropertyListing/PropertyListing';
import Profile from './components/user/Profile/Profile';
import Verification from './components/user/verification/Verification';
import Hero from './components/common/Hero/Hero';
import Homes from './components/marketplace/homes/Homes';
import { LoadScript } from "@react-google-maps/api";
import PrivateRoute from './components/routes/PrivateRoute';
import ListedProperties from './components/user/ListedProperties/ListedProperties';
import NotFoundPage from './components/common/NotFoundPage/NotFound';
import TermsAndConditions from './components/common/LegalDocuments/TermsAndConditions';
import PrivacyPolicy from './components/common/LegalDocuments/PrivacyPolicy';
import FAQ from './components/common/faq/FAQ';
import PropertyDetails from './components/property/PropertyCard/PropertyDetails';
import Loading from './components/common/Loading/Loading';
import { useEffect, useState } from 'react';
import FindAgents from './components/common/findagents/FindAgents';
import PropertyPricingCards from './components/property/PropertyStatus/PropertyPricingCards';
import Saved from './components/user/saved/Saved';
import { NextUIProvider } from "@nextui-org/system";
import Checkout from './components/property/checkout/Checkout';

const libraries = ['places'];
function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const currentUser = useSelector(state => state.user.currentUser);
  const username = currentUser?.username
  const showFooter = !location.pathname.includes('/homes' && '/maps');
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <NextUIProvider>
      <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={libraries}>
        <Header />
        <Routes>
          <Route path="/" exact={true} element={<Hero />} />
          <Route path="/login" exact={true} element={<LogIn />} />
          <Route path="/signup" exact={true} element={<SignUp />} />
          <Route path="/reset-password" exact={true} element={<ResetPassword />} />
          <Route path="/property-details/:propertyId?" exact={true} element={<PropertyDetails />} />
          <Route path="/property-plans" exact={true} element={<PropertyPricingCards />} />
          <Route path="/homes" exact={true} element={<Homes />} />
          <Route path="/find-agents" exact={true} element={<FindAgents />} />
          <Route path="/verification" exact={true} element={<Verification />} />
          <Route path="/terms-and-conditions" exact={true} element={<TermsAndConditions />} />
          <Route path="/privacy-policy" exact={true} element={<PrivacyPolicy />} />
          <Route path="/help" exact={true} element={<FAQ />} />
          <Route exact path='/checkout' element={<Checkout />} />
          <Route element={<PrivateRoute />}>
            <Route path="/property-listing" exact={true} element={<PropertyListing />} />
            <Route path="/saved" exact={true} element={<Saved />} />
            <Route path="/listed-properties" element={currentUser ? <ListedProperties username={username} /> : <Navigate to="/login" replace />} />
            <Route exact path='/profile' element={<Profile />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        {showFooter && <Footer />}
      </LoadScript>
    </NextUIProvider>
  );
}

export default App;
