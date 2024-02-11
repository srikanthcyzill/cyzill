import React, { useEffect, useState } from 'react';
import PropertyCard from '../../property/PropertyCard/PropertyCard';
import { BASE_URL } from '../../../config';

const Saved = () => {
    const [savedProperties, setSavedProperties] = useState([]);

    useEffect(() => {
        const fetchSavedProperties = async () => {
            const response = await fetch(`${BASE_URL}/api/saves/saves/`);
            const data = await response.json();
            console.log(data);
            setSavedProperties(data.listings);
        };


        fetchSavedProperties();

    }, []);

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Saved Properties</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {Array.isArray(savedProperties) && savedProperties.map((property) => (
                    <PropertyCard
                        key={property._id}
                        property={property}
                        onPropertyClick={() => { }}
                    />
                ))}
            </div>
        </div>
    );
}

export default Saved;
