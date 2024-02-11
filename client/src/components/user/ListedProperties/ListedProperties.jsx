import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlusCircle, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { BASE_URL } from '../../../config';
import useCurrencyFormatter from '../../../utils/useCurrencyFormatter';
import PropertyCard from '../../property/PropertyCard/PropertyCard';

const ListedProperties = ({ username }) => {
    const [properties, setProperties] = useState([]);
    const formatter = useCurrencyFormatter();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${BASE_URL}/api/property/properties/user/${username}`);
            const data = await response.json();
            setProperties(data);
        };

        fetchData();
    }, [username]);

    const handleDelete = async (propertyId) => {
        const response = await fetch(`${BASE_URL}/api/property/properties/${propertyId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            setProperties(properties.filter((property) => property._id !== propertyId));
        } else {
        }
    };

    return (
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
            <h2 className="text-2xl font-semibold mb-4">Listed Properties by {username}</h2>
            <div className="mb-4 flex justify-end">
                <Link to="/property-listing" className="flex items-center text-blue-500 hover:text-blue-700">
                    <FiPlusCircle className="mr-1" />
                    Add Property
                </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                {properties.map((property) => (
                    <PropertyCard
                        key={property._id}
                        property={property}
                        formatter={formatter}
                        handleDelete={handleDelete}
                    />
                ))}
            </div>
        </div>
    );
};

export default ListedProperties;
