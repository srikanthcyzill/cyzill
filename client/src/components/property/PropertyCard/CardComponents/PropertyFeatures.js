import React from 'react';
import { FaBed, FaBath, FaRulerCombined } from 'react-icons/fa';

const PropertyFeatures = ({ property }) => (
    <div className="property-features">
        <div className="features-list">
            <div className="feature">
                <div className="icon">
                    <FaBed />
                </div>
                {property.bedrooms} /
            </div>
            <div className="features-list">
                <div className="icon">
                    <FaBath />
                </div>
                {property.bathrooms} /
            </div>
            <div className="features-list">
                <div className="icon">
                    <FaRulerCombined />
                </div>
                {property.coveredArea} sqft
            </div>
        </div>
    </div>
);

export default PropertyFeatures;
