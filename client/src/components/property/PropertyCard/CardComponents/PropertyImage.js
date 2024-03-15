import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const PropertyImage = ({ property, activeImageIndex, handleToggleClick }) => (
    <div className="property-image">
        {property.photos && property.photos.length > 0 ? (
            <>
                {property.photos.length > 1 && (
                    <>
                        <div className="toggler-icon left" onClick={() => handleToggleClick(-1)}>
                            <FaChevronLeft />
                        </div>
                        <div className="toggler-icon right" onClick={() => handleToggleClick(1)}>
                            <FaChevronRight />
                        </div>
                    </>
                )}
                <img src={property.photos[activeImageIndex]} alt={`Property ${property._id}`} />
            </>
        ) : (
            <div className="placeholder">No Image Available</div>
        )}
    </div>
);

export default PropertyImage;
