// Checkout.js

import React from 'react';
import { useLocation } from 'react-router-dom';
import PropertyCard from "../PropertyCard/PropertyCard";
import PhonePePaymentGateway from "./PhonePePaymentGateway";

function Checkout() {
    const location = useLocation();
    const property = location.state?.property;

    return (
        <div className="container mx-auto mt-10">
            <div className="flex shadow-md my-10">
                <div className="w-3/4 bg-white px-10 py-10">
                    <div className="flex justify-between border-b pb-8">
                        <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                    </div>
                    <div className="flex items-center -mx-8 px-6 py-5">
                        <div className="flex w-full md:w-1/3">
                            {property ? <PropertyCard property={property} /> : <div>No property data</div>}
                        </div>
                    </div>
                </div>
                <div id="summary" className="w-1/4 px-8 py-10">
                    <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
                    <PhonePePaymentGateway />
                    <div className="border-t mt-8">
                        <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;


