import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../../../config';
import PropertyCard from '../../../property/PropertyCard/PropertyCard';

const RentProperties = () => {
    const [propertyData, setPropertyData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/property/properties`);
                const data = await response.json();
                console.log('Fetched data:', data);
                setPropertyData(data.properties);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        if (!propertyData.length) {
            fetchData();
        }
    }, [propertyData]);

    return (
        <div className='mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8' >
            <div className="text-2xl font-semibold mb-4 ">
                <h3>Rent Properties</h3>
            </div>
            <div>
                <div className="grid lg:grid-cols-4 gap-4 md:grid-cols-3 sm:grid-cols-2">
                    {propertyData.map((property) => (
                        <div className="property-card" key={property._id}>
                            <PropertyCard property={property} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RentProperties;
