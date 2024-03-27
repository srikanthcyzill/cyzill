import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../../../config';
import confetti from 'canvas-confetti';

const Payment = ({ formData, saveFormData }) => {
    const { currentUser } = useSelector(state => state.user);
    const username = currentUser?.username;
    const photo = currentUser?.photo;
    const phoneNumber = currentUser?.phoneNumber;
    const [price, setPrice] = useState(formData.price || '');
    const [advanceDeposit, setAdvanceDeposit] = useState(formData.advanceDeposit || '');
    const [maintenanceCharges, setMaintenanceCharges] = useState(formData.maintenanceCharges || '');
    const [excludeStampDuty, setExcludeStampDuty] = useState(formData.excludeStampDuty || false);
    const [priceIncludes, setPriceIncludes] = useState(formData.priceIncludes || '');
    const [status, setStatus] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async () => {
        setSubmitting(true);
        const response = await fetch(`${BASE_URL}/api/property/properties`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...formData, username: username, photo: photo, phoneNumber: phoneNumber })
        });
        if (response.ok) {
            console.log('Data saved successfully');
            setStatus('Saved Successfully');
            confetti({
                particleCount: 300,
                spread: 70,
                origin: { y: 0.6 }
            });
            navigate('/checkout', { state: { formData } });
        } else {
            console.error('Error saving data');
            setStatus('Error saving data');
            setSubmitting(false);
        }
    };

    const handleInputChange = (event, setter) => {
        setter(event.target.value);
        saveFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handlePriceIncludesChange = (e) => {
        setPriceIncludes(e.target.value);
        saveFormData({ ...formData, priceIncludes: e.target.value });
    };

    const handleCheckboxChange = (event) => {
        setExcludeStampDuty(event.target.checked);
        saveFormData({ ...formData, excludeStampDuty: event.target.checked });
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full md:w-1/2 p-4 md:p-10">
                <h2 className="text-2xl font-semibold mb-4">Payment Details</h2>
                <label className="flex flex-col">
                    Price in INR(₹)
                    <input
                        type="number"
                        name="price"
                        value={price}
                        onChange={(e) => handleInputChange(e, setPrice)}
                        className="mt-1 p-2 border rounded-md"
                    />
                </label>
                <label className="flex flex-col">
                    Advance Deposit
                    <input
                        type="number"
                        name="advanceDeposit"
                        value={advanceDeposit}
                        onChange={(e) => handleInputChange(e, setAdvanceDeposit)}
                        className="mt-1 p-2 border rounded-md"
                    />
                </label>
                <label className="flex flex-col">
                    Price Includes:
                    <select
                        value={priceIncludes}
                        onChange={handlePriceIncludesChange}
                        className="mt-1 p-2 border rounded-md"
                    >
                        <option value="">Select...</option>
                        <option value="Fixed">Fixed</option>
                        <option value="Negotiable">Negotiable</option>
                        <option value="Call For Price">Call For Price</option>
                    </select>
                </label>
                <label className="flex flex-col">
                    Maintenance Charges per Month
                    <input
                        type="number"
                        name="maintenanceCharges"
                        value={maintenanceCharges}
                        onChange={(e) => handleInputChange(e, setMaintenanceCharges)}
                        className="mt-1 p-2 border rounded-md"
                    />
                </label>
                <label className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        name="excludeStampDuty"
                        checked={excludeStampDuty}
                        onChange={handleCheckboxChange}
                        className="form-checkbox"
                    />
                    <span>Exclude Stamp Duty and Registration Charges</span>
                </label>
                <p>{status}</p>
                <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className={`mt-4 p-2 text-white rounded-md mx-auto block ${submitting ? 'bg-blue-300' : 'bg-blue-500'
                        }`}
                >
                    {submitting ? 'Submitting...' : 'Submit'}
                </button>
            </div>
        </div>
    );

};

export default Payment;
