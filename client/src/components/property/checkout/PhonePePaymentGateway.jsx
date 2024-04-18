import React, { useState } from 'react';
import { BASE_URL } from '../../../config';

const PhonePePaymentGateway = ({ open, handleToggleChange }) => {
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');

    const handlePayment = async (event) => {
        event.stopPropagation();
        try {
            const response = await fetch(`${BASE_URL}/api/pay?amount=${amount}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                throw new Error('Payment failed');
            }

            const data = await response.json();
            window.location.href = data.url;
        } catch (error) {
            console.error('Error:', error.message);
            const errorMessage = error.message || 'An error occurred while processing the payment.';
            console.error('Server Error:', errorMessage); // Log the server error message
            setError(errorMessage); // Set the error message to be displayed
        }
    };


    return (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-900 bg-opacity-50" onClick={(event) => event.stopPropagation()}>
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Payment</h2>
                <input className="block w-full border border-gray-300 rounded px-4 py-2 mb-4" type="text" value={amount} onChange={(e) => { e.stopPropagation(); setAmount(e.target.value); }} placeholder="Amount" />
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <button className="bg-blue-500 text-white py-2 px-4 rounded mr-2" onClick={handlePayment}>Pay</button>
                <button className="bg-gray-500 text-white py-2 px-4 rounded" onClick={(event) => { event.stopPropagation(); handleToggleChange(event, !open); }}>Close</button>
            </div>
        </div>
    );
};

export default PhonePePaymentGateway;
