import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../../config';

const PhonePePaymentGateway = ({ open, handleToggleChange, propertyId, plan }) => {
    const [amount, setAmount] = useState(plan ? plan.cost : '');
    const [error, setError] = useState('');
    const [plans, setPlans] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState(null);

    useEffect(() => {
        fetch(`${BASE_URL}/api/admin/plans`)
            .then(response => response.json())
            .then(data => setPlans(data))
            .catch(error => console.error('Error:', error));
    }, []);

    const handlePayment = async (event) => {
        event.stopPropagation();
        if (!plan) {
            setError('Plan is undefined');
            return;
        }
        try {
            const response = await fetch(`${BASE_URL}/api/pay`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: amount, propertyId: propertyId }),
            });
            if (!response.ok) {
                throw new Error('Payment failed');
            }
            const data = await response.json();
            window.location.href = data.url;
        } catch (error) {
            console.error('Error:', error.message);
            const errorMessage = error.message || 'An error occurred while processing the payment.';
            console.error('Server Error:', errorMessage);
            setError(errorMessage);
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
