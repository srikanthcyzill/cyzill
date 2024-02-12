import React from 'react';

const LocationDetails = ({ address }) => {
    return (
        <form className="w-full max-w-md">
            <div className="mb-4">
                <label className="block mb-2 font-semibold">Address:</label>
                <input
                    type="text"
                    value={address}
                    readOnly
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
            </div>
        </form>
    );
};

export default LocationDetails;
