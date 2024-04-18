import React from 'react';
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaRegUser } from 'react-icons/fa';
import { Chip } from "@nextui-org/react";

const PropertyInfo = ({ property, currencyFormatter }) => {
    return (
        <div className="property-info p-4">
            <div className="listing-details">
                <div className="price-details">
                    <h2 className="price text-2xl font-semibold">{currencyFormatter.format(property.price)}</h2>
                </div>
            </div>
            <div className="property-features mt-4">
                <div className="features-list">
                    <div className="flex items-center">
                        <FaBed className="mr-2" />
                        <span>{property.bedrooms} Bedrooms</span>
                    </div>
                    <div className="flex items-center">
                        <FaBath className="mr-2" />
                        <span>{property.bathrooms} Bathrooms</span>
                    </div>
                    <div className="flex items-center">
                        <FaRulerCombined className="mr-2" />
                        <span>{property.coveredArea} sqft</span>
                    </div>
                </div>
            </div>
            <div className="location-details mt-4">
                <div className="flex items-center">
                    <FaMapMarkerAlt className="mr-2" />
                    <span>{property.location.address}</span>
                </div>
            </div>
            <div className="agent-details mt-4">
                <div className="flex items-center">
                    <FaRegUser className="mr-2" />
                    <span>{property.username}</span>
                </div>
            </div>
            <div className="other-details mt-4">
                <div>Construction Year: {property.constructionYear}</div>
                <div>Furnished Status: {property.furnishedStatus}</div>
                <div>Amenities:
                    <div className="flex gap-4">
                        {property.amenities.map((amenity, index) => (
                            <Chip
                                key={index}
                                variant="shadow"
                                classNames={{
                                    base: "bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
                                    content: "drop-shadow shadow-black text-white",
                                }}
                            >
                                {amenity}
                            </Chip>
                        ))}
                    </div>
                </div>
                <div>Price Includes: {property.priceIncludes}</div>
                <div>Maintenance Charges: {currencyFormatter.format(property.maintenanceCharges)}</div>
                <div>Description about the place : {property.description}</div>
            </div>
        </div>
    );
};

export default PropertyInfo;
