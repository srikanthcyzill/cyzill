import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
        return `${text.substring(0, maxLength)}...`;
    }
    return text;
};
const LocationDetails = ({ property }) => (
    <div className="location-details">
        <div className="location-icon">
            <FaMapMarkerAlt />
        </div>
        {truncateText(property.location.address, 30)}
    </div>
);

export default LocationDetails;
