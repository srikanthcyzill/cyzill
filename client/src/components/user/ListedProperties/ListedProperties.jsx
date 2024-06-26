import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlusCircle } from 'react-icons/fi';
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

    return (
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
            <h2 className="text-2xl font-semibold mb-4">Listed Properties by {username}</h2>
            <div className="mb-4 flex justify-end">
                <Link to="/property-listing" className="flex items-center text-blue-500 hover:text-blue-700">
                    <FiPlusCircle className="mr-1" />
                    Add Property
                </Link>
            </div>
            <div className="grid lg:grid-cols-4 gap-4 md:grid-cols-3 sm:grid-cols-2">
                {properties.map((property) => (
                    <div key={property._id}>
                        <PropertyCard property={property} formatter={formatter} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListedProperties;
