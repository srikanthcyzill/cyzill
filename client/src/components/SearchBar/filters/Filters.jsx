import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { MdMyLocation } from 'react-icons/md';
import SearchBar from '../SearchBar';
import { PriceFilter } from './PriceFilter/PriceFilter';
import { BedroomFilter } from './BedsFilter/BedsFilter';
import { BathroomFilter } from './BathsFilter/BathsFilter';
import { PropertyTypeFilter } from './PropertyTypeFilter/PropertyTypeFilter';

const Filters = ({ onSearch, onFilterChange }) => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const initialFilters = {
        searchTerm: searchParams.get('searchTerm') || '',
        price: searchParams.get('price') || [10000, 20000, 50000],
        bedrooms: searchParams.get('bedrooms') || 'Any',
        bathrooms: searchParams.get('bathrooms') || 'Any',
        propertyType: searchParams.get('propertyType') || '',
        amenities: searchParams.getAll('amenities') || [],
        saleOrRent: searchParams.get('saleOrRent') || '',
    };
    const [filters, setFilters] = useState(initialFilters);

    useEffect(() => {
        const queryParams = Object.fromEntries(searchParams.entries());
        setFilters({
            searchTerm: queryParams.searchTerm || '',
            price: [
                isNaN(parseInt(queryParams.minPrice, 10)) ? 0 : parseInt(queryParams.minPrice, 10),
                isNaN(parseInt(queryParams.maxPrice, 10)) ? 1000000 : parseInt(queryParams.maxPrice, 10),
            ],
            bedrooms: queryParams.bedrooms || 'Any',
            bathrooms: queryParams.bathrooms || 'Any',
            propertyType: queryParams.propertyType || '',
            amenities: queryParams.amenities ? queryParams.amenities.split(',') : [],
            saleOrRent: queryParams.saleOrRent || 'sell',
        });
    }, [searchParams]);


    const updateSearchParams = (name, value) => {
        const params = new URLSearchParams(searchParams);
        params.set(name, value);
        navigate({ search: params.toString() });
    };

    const handleFilterChange = (name, value) => {
        setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
        onFilterChange(name, value);
        updateSearchParams(name, value);
    };

    const handleBedroomChange = (value) => {
        handleFilterChange('bedrooms', value);
    };


    const handleBathroomChange = (value) => {
        handleFilterChange('bathrooms', value);
    };


    const handlePropertyTypeChange = (value) => {
        handleFilterChange('propertyType', value);
    };

    const handlePriceChange = (minOrMax, value) => {
        setFilters((prevFilters) => {
            const newFilters = { ...prevFilters };
            if (minOrMax === 'minimum') {
                newFilters.price[0] = value;
            } else if (minOrMax === 'maximum') {
                newFilters.price[1] = value;
            }
            return newFilters;
        });
        onFilterChange(minOrMax, value);
        updateSearchParams(minOrMax, value);
    };


    const handleCurrentLocationClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const newPosition = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                onSearch(newPosition);
            });
        }
    };

    useEffect(() => {
        console.log('Filters:', filters);
    }, [filters]);

    return (
        <div className='flex items-center justify-center gap-4'>
            <div className=" flex items-center">
                <SearchBar />
                <button onClick={handleCurrentLocationClick} className="ml-2 p-2 bg-blue-500 text-white rounded">
                    <MdMyLocation />
                </button>
            </div>
            {/* <PriceFilter value={filters.price} onChange={handlePriceChange} /> */}
            <BedroomFilter value={filters.bedrooms} onChange={handleBedroomChange} />
            <BathroomFilter value={filters.bathrooms} onChange={handleBathroomChange} />
            <PropertyTypeFilter value={filters.propertyType} onChange={handlePropertyTypeChange} />
        </div>
    );
};

export default Filters;
