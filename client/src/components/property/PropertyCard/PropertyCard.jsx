import React, { useEffect, useState } from 'react';
import './PropertyCard.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../../../config';
import PropertyImage from './CardComponents/PropertyImage';
import LocationDetails from './CardComponents/LocationDetails';
import OwnerActions from './CardComponents/OwnerActions';
import PropertyDetails from './CardComponents/PropertyDetails';
import PropertyFeatures from './CardComponents/PropertyFeatures';
import AgentDetails from './CardComponents/AgentDetails';
import { likeProperty, setLikedProperties, unlikeProperty } from '../../../redux/actions';

const PropertyCard = ({ property, smallSize, onPropertyClick, handleDelete, saleOrRent }) => {
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [, setSelectedProperty] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const navigate = useNavigate();
    const { currentUser } = useSelector(state => state.user);
    const token = localStorage.getItem('token');
    const dispatch = useDispatch();

    useEffect(() => {
        if (currentUser && property && property.likes) {
            setIsLiked(property.likes.some(like => like.user === currentUser._id));
        }
    }, [property?.likes, currentUser, property]);


    const handleLikeClick = async (e) => {
        e.stopPropagation();
        if (!currentUser || !currentUser._id) {
            console.log('User not logged in, redirecting to signup');
            navigate('/signup');
            return;
        }
        try {
            const response = await fetch(`${BASE_URL}/api/user/${currentUser._id}/savedProperties`, {
                method: isLiked ? 'DELETE' : 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ property_id: property._id })
            });
            const data = await response.json();
            const isPropertyLiked = data.user.savedProperties.includes(property._id);
            setIsLiked(isPropertyLiked);
            if (isPropertyLiked) {
                dispatch(likeProperty(property._id));
            } else {
                dispatch(unlikeProperty(property._id));
            }
            dispatch(setLikedProperties(currentUser.savedProperties));
        } catch (err) {
            console.error('Error liking property:', err);
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

    const isOwner = currentUser && property.username === currentUser.username;
    return (
        <div className="property-card" key={property._id} onClick={handleCardClick}>
            <PropertyImage property={property} activeImageIndex={activeImageIndex} handleToggleClick={handleToggleClick} />
            <div className="property-info">
                <PropertyDetails property={property} isLiked={isLiked} handleLikeClick={handleLikeClick} saleOrRent={saleOrRent} />
                <PropertyFeatures property={property} />
                <LocationDetails property={property} />
                <AgentDetails property={property} />
            </div>
            {isOwner && <OwnerActions property={property} handleDelete={handleDelete} />}
        </div>
    );
};

export default PropertyCard;