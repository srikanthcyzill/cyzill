import React, { useState } from 'react';
import './PropertyCard.css';
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaChevronLeft, FaChevronRight, FaRegUser, FaHeart, FaRegHeart } from 'react-icons/fa';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useCurrencyFormatter from '../../../utils/useCurrencyFormatter';
import { BASE_URL } from '../../../config';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

const PropertyCard = ({ property, smallSize, onPropertyClick, handleDelete }) => {
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [, setSelectedProperty] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const navigate = useNavigate();
    const { currentUser } = useSelector(state => state.user);
    const currencyFormatter = useCurrencyFormatter();

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return `${text.substring(0, maxLength)}...`;
        }
        return text;
    };

    const handleLikeClick = async (e) => {
        e.stopPropagation();
        if (!currentUser) {
            navigate('/signup');
            return;
        }
        try {
            const response = isLiked
                ? await fetch(`${BASE_URL}/api/saved/saved/${property._id}`, { method: 'DELETE' })
                : await fetch(`${BASE_URL}/api/saved/saved/`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ listing_id: property._id }),
                });

            console.log(JSON.stringify({ listing_id: property._id }));

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setIsLiked(!isLiked);
        } catch (error) {
            console.error('Error occurred while processing like/unlike action:', error);
        }
    };



    const handleToggleClick = (direction) => {
        let newIndex = activeImageIndex + direction;
        if (newIndex >= property.photos.length) {
            newIndex = 0;
        } else if (newIndex < 0) {
            newIndex = property.photos.length - 1;
        }
        setActiveImageIndex(newIndex);
    };

    const handleCardClick = (e) => {
        if (!e.target.closest('.toggler-icon')) {
            if (smallSize) {
                onPropertyClick();
            } else {
                setSelectedProperty(property);
                navigate(`/property-details/${property._id}`, { state: { showModal: true } });
            }
        }
    };

    return (
        <div className="property-card" key={property._id} onClick={handleCardClick}>
            <div className="property-info">
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
                <div className="card-top">
                    <div className="posted-on-overlay">
                        {moment(new Date(property.createdAt)).fromNow()}
                    </div>
                    <div className="like-icon" onClick={handleLikeClick}>
                        {isLiked ? <FaHeart /> : <FaRegHeart />}
                    </div>
                </div>
                <div className="property-details">
                    <div className="listing-details">
                        <div className="price-details">
                            <h2 className="price">{currencyFormatter.format(property.price)}</h2>
                        </div>
                    </div>
                    <div className="property-features">
                        <div className="features-list">
                            <div className="feature">
                                <div className="icon">
                                    <FaBed />
                                </div>
                                {property.bedrooms}&emsp;/
                            </div>
                            <div className="features-list">
                                <div className="icon">
                                    <FaBath />
                                </div>
                                {property.bathrooms}&emsp;/
                            </div>
                            <div className="features-list">
                                <div className="icon">
                                    <FaRulerCombined />
                                </div>
                                {property.coveredArea} sqft
                            </div>
                        </div>
                    </div>
                    <div className="location-details">
                        <div className="location-icon">
                            <FaMapMarkerAlt />
                        </div>
                        {truncateText(property.location.address, 30)}
                    </div>
                    <div className="agent-details">
                        <div>
                            <FaRegUser />
                        </div>
                        <div className="agent-name">{property.username}</div>
                    </div>
                </div>
            </div>
            {/* <div className="absolute bottom-2 right-2 flex">
                <Link to={`/edit-property/${property._id}`} className="mr-2 text-blue-500 hover:text-blue-700">
                    <FiEdit2 className="mr-1" />
                </Link>
                <button onClick={() => handleDelete(property._id)} className="text-red-500 hover:text-red-700">
                    <FiTrash2 />
                </button>
            </div> */}
        </div>
    );
};

export default PropertyCard;
