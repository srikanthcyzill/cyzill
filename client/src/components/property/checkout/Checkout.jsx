import React, { useState } from "react";
import { useLocation } from 'react-router-dom';

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Image, Tooltip } from "@nextui-org/react";
import { BASE_URL } from "../../../config";

const plans = [
    { name: 'Bronze', days: '29 days', support: 'Business hours only', listing: 'Instantly', emailSupport: true, inquiry: 'Unlimited', price: '₹ 49', color: 'bg-bronze', },
    { name: 'Silver', days: '89 days', support: 'Business hours only', listing: 'Instantly', emailSupport: true, inquiry: 'Unlimited', price: '₹ 129', color: 'bg-silver', },
    { name: 'Gold', days: '186 days', support: 'Business hours only', listing: 'Instantly', emailSupport: true, inquiry: 'Unlimited', price: '₹ 309', color: 'bg-gold', },
    { name: 'Platinum', days: '365 days', support: 'Business hours only', listing: 'Instantly', emailSupport: true, inquiry: 'Unlimited', price: '₹ 369', color: 'bg-platinum', },
];

function calculateTaxes(price) {
    const numericPrice = Number(price.replace(/[^0-9.-]+/g, ""));
    const taxes = numericPrice * 0.05;
    return `₹ ${taxes.toFixed(2)}`;
}
function calculateTotal(price, taxes) {
    const numericPrice = Number(price.replace(/[^0-9.-]+/g, ""));
    const numericTaxes = Number(taxes.replace(/[^0-9.-]+/g, ""));
    const total = numericPrice + numericTaxes;
    return `₹ ${total.toFixed(2)}`;
}


function Checkout() {
    const location = useLocation();
    const formData = location.state.formData;
    const username = formData.username;
    const [selectedPlan, setSelectedPlan] = useState(plans[0]);
    async function handleCheckout() {
        // Simulate a delay for the payment process
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Simulate a successful payment
        const paymentSuccessful = true;

        if (paymentSuccessful) {
            console.log('Payment successful');
            // Update the licenseCardStatus here...
            const response = await fetch(`${BASE_URL}/api/property/properties/${propertyId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    licenseCardStatus: {
                        paymentDate: new Date(),
                        plan: selectedPlan.name
                    }
                })
            });

            if (response.ok) {
                console.log('LicenseCardStatus updated successfully');
            } else {
                console.error('Error updating LicenseCardStatus');
            }
        } else {
            console.error('Payment failed');
        }
    }

    const propertyId = location.state.propertyId;


    return (
        <div className="bg-gray-100 h-screen py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-2xl font-semibold mb-4">Cart</h1>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-3/4">
                        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                            <table className="w-full">
                                <thead>
                                    <tr>
                                        <th className="text-left font-semibold">Property Card</th>
                                        <th className="text-left font-semibold">Price</th>
                                        <th className="text-left font-semibold">Property Plan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="py-4">
                                            <div className="flex items-center">
                                                <Image src="https://firebasestorage.googleapis.com/v0/b/gauth-estate.appspot.com/o/users%2Fsrikanthreddyct8f%2Fmedia%2Fimages%2Fpexels-photo-210617.jpeg?alt=media&token=e673585a-688c-42ef-9147-bca539068761" width={300} height={400} alt="Property" />
                                            </div>
                                        </td>
                                        <td className="py-4">{selectedPlan.price}</td>
                                        <td className="py-4">
                                            <Dropdown>
                                                <DropdownTrigger>
                                                    <Button variant="bordered">{selectedPlan.name}</Button>
                                                </DropdownTrigger>
                                                <DropdownMenu aria-label="Property Plan Options">
                                                    {plans.map((plan, index) => (
                                                        <DropdownItem key={index} onClick={() => setSelectedPlan(plan)}>
                                                            {plan.name}
                                                        </DropdownItem>
                                                    ))}
                                                </DropdownMenu>
                                            </Dropdown>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="md:w-1/4">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-lg font-semibold mb-4">Summary</h2>
                            <div className="flex justify-between mb-2">
                                <span>Property Plan</span>
                                <span>{selectedPlan.price}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Taxes 5%</span>
                                <span>{calculateTaxes(selectedPlan.price)}</span>
                            </div>
                            <hr className="my-2" />
                            <div className="flex justify-between mb-2">
                                <span className="font-semibold">Total</span>
                                <span className="font-semibold">{calculateTotal(selectedPlan.price, calculateTaxes(selectedPlan.price))}</span>
                            </div>

                            <button onClick={handleCheckout} className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">Checkout</button>
                            <div className="mt-4">
                                <h2 className="text-lg font-semibold mb-4">Property Details</h2>
                                <p><strong>Username:</strong> {username}</p>
                                <p><strong>Property Card:</strong> {JSON.stringify(formData, null, 2)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
