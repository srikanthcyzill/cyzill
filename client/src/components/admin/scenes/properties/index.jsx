import React from 'react';
import { useGetPropertiesQuery } from '../../state/api';
import PropertyCard from '../../../property/PropertyCard/PropertyCard';

const Properties = () => {
    const { data, isLoading } = useGetPropertiesQuery();
    const properties = data?.properties;

    return (
        <div className='mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8'>
            <div className="text-2xl font-semibold mb-4 ">
                <h3>Properties</h3>
            </div>
            <div className="grid lg:grid-cols-4 gap-4 md:grid-cols-3 sm:grid-cols-2">
                {Array.isArray(properties) && !isLoading ? (
                    properties.map((property) => (
                        <div className="property-card" key={property._id}>
                            <PropertyCard property={property} />
                        </div>
                    ))
                ) : (
                    <>Loading...</>
                )}
            </div>
        </div>
    );
};

export default Properties;
