import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import moment from 'moment';

const renderPrice = (property, saleOrRent) => {
    const formattedPrice = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(property.price);
    if (saleOrRent === 'rent') {
        return `${formattedPrice} / month`;
    } else {
        return formattedPrice;
    }
};

const PropertyDetails = ({ property, isLiked, handleLikeClick, saleOrRent }) => (
    <div className="property-details">
        <div className="listing-details">
            <div className="price-details">
                <h2 className="price">{renderPrice(property, saleOrRent)}</h2>
            </div>
        </div>
        <div className="card-top">
            <div className="posted-on-overlay">
                {moment(new Date(property.createdAt)).fromNow()}
            </div>
            <div className="like-icon" onClick={handleLikeClick}>
                {isLiked ? <FaHeart /> : <FaRegHeart />}
            </div>
        </div>
    </div>
);

export default PropertyDetails;
