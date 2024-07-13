import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../../config';

const PhonePePaymentGateway = ({ propertyId }) => {
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');
    const [plans, setPlans] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState(null);

    useEffect(() => {
        fetch(`${BASE_URL}/api/admin/plans`)
            .then(response => response.json())
            .then(data => {
                console.log('Fetched plans:', data);
                setPlans(data);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    const handlePayment = async (event) => {
        event.stopPropagation();
        if (!selectedPlan) {
            setError('Plan is undefined');
            return;
        }
        try {
            const response = await fetch(`${BASE_URL}/api/payment`, {
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

    const selectPlan = (event) => {
        const selectedPlanId = event.target.value;
        const selectedPlan = plans.find(plan => plan._id === selectedPlanId);
        if (selectedPlan) {
            setSelectedPlan(selectedPlan);
            setAmount(selectedPlan.price);
        } else {
            setSelectedPlan(null);
            setAmount('');
        }
    };

    return (
        <div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="plan">
                    Select a Plan
                </label>
                <select
                    id="plan"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={selectedPlan ? selectedPlan._id : ''}
                    onChange={selectPlan}
                >
                    <option value="">Select a Plan</option>
                    {plans.map((plan) => (
                        <option key={plan._id} value={plan._id}>
                            {`${plan.name} - Hosting: ${plan.days} days - Price: ₹${plan.price}`}
                        </option>
                    ))}
                </select>
            </div>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={handlePayment}>Pay</button>
        </div>
    );
};

export default PhonePePaymentGateway;
