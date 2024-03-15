import './App.css';
import { useLocation } from 'react-router-dom';
import Header from './components/common/header/Header'
import Footer from './components/common/footer/Footer'
import { LoadScript } from "@react-google-maps/api";
import Loading from './components/common/Loading/Loading';
import { useEffect, useState } from 'react';
import { NextUIProvider } from "@nextui-org/system";
import UserRoutes from './components/routes/UserRoutes';
import { CssBaseline } from '@material-ui/core';

const libraries = ['places'];

function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const showFooter = !location.pathname.includes('/homes' && '/maps');
  const showHeaderFooter = !location.pathname.includes('/admin');
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
      <CssBaseline />
      <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={libraries}>
        {showHeaderFooter && <Header />}
        <UserRoutes />
        {showHeaderFooter && showFooter && <Footer />}
      </LoadScript>
    </NextUIProvider>
  );
}

export default App;
