import React, { useEffect, useState } from 'react';
import PropertyCard from '../../property/PropertyCard/PropertyCard';
import { BASE_URL } from '../../../config';
import { useSelector } from 'react-redux';

const Saved = () => {
    const [allProperties] = useState([]);
    const [savedProperties, setSavedProperties] = useState([]);
    const { currentUser } = useSelector(state => state.user);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchLikedProperties = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/user/${currentUser._id}/savedProperties`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                const data = await response.json();
                setSavedProperties(data.savedProperties);
            } catch (error) {
                console.error('Error fetching liked properties:', error);
            }
        };
        if (currentUser && currentUser._id) {
            fetchLikedProperties();
        }
    }, [currentUser, token]);



    useEffect(() => {
        if (currentUser && currentUser.savedProperties && allProperties.length > 0) {
            const fullProperties = allProperties.filter(property => currentUser.savedProperties.includes(property._id));
            setSavedProperties(fullProperties);
        }
    }, [currentUser, allProperties]);

    return (
        <div className='mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8' >
            <div className="text-2xl font-semibold mb-4 ">
                <h3>Saved Properties</h3>
            </div>
            <div className="grid lg:grid-cols-4 gap-4 md:grid-cols-3 sm:grid-cols-2">
                {savedProperties.map(property => (
                    <div className="property-card" key={property._id}>
                        <PropertyCard
                            key={property._id}
                            property={property}
                            smallSize={true}
                            saleOrRent={property.saleOrRent}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Saved;
