// Checkout.js

import React from 'react';
import { useLocation } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PropertyCard from "../PropertyCard/PropertyCard";
import CardPayment from './CardPayment';
import GooglePay from './GooglePay'; // Import your GooglePay component

const stripePromise = loadStripe('YOUR_PUBLISHABLE_KEY');

function Checkout() {
    const location = useLocation();
    const formData = location.state.formData;
    const propertyId = location.state.propertyId;

    const handlePaymentSuccess = (paymentMethodId) => {
        // Send paymentMethodId to your server for further processing
        console.log('Payment successful, payment method ID:', paymentMethodId);
        // Proceed with checkout process
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full md:w-3/4 p-4 md:p-10 bg-gray-100">
                <div className="container mx-auto">
                    <h1 className="text-2xl font-semibold mb-4">Cart</h1>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="md:w-3/4">
                            <table className="w-full">
                                <thead>
                                    <tr>
                                        <th className="text-left font-semibold">Property Card</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="py-4">
                                            <div className="flex items-center">
                                                {formData.property ? <PropertyCard property={formData.property} /> : <div>No property data</div>}
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="md:w-1/4">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-lg font-semibold mb-4">Payment</h2>
                            <Elements stripe={stripePromise}>
                                <CardPayment handlePaymentSuccess={handlePaymentSuccess} />
                            </Elements>
                            <GooglePay handlePaymentSuccess={handlePaymentSuccess} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
