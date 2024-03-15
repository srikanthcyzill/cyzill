// PriceFilter.jsx

import React, { useState } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Button } from "@nextui-org/react";

export const PriceFilter = ({ value, onChange }) => {
    const [minPrice, setMinPrice] = useState(value[0]);
    const [maxPrice, setMaxPrice] = useState(value[1]);

    const handlePriceChange = (minOrMax, value) => {
        if (minOrMax === 'minimum') {
            setMinPrice(value);
        } else {
            setMaxPrice(value);
        }
        onChange(minOrMax, value);
    };

    return (
        <div>
            <div className="flex space-x-4">
                <div className="w-1/2">
                    <Dropdown>
                        <DropdownTrigger>
                            <Button variant="bordered"> Minimum: {minPrice} </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Minimum price options">
                            <DropdownItem key="Any" onClick={() => handlePriceChange('minimum', 'Any')}>Any</DropdownItem>
                            <DropdownItem key="1000" onClick={() => handlePriceChange('minimum', 1000)}>1000</DropdownItem>
                            <DropdownItem key="5000" onClick={() => handlePriceChange('minimum', 5000)}>5000</DropdownItem>
                            <DropdownItem key="10000" onClick={() => handlePriceChange('minimum', 10000)}>10000</DropdownItem>
                            <DropdownItem key="50000" onClick={() => handlePriceChange('minimum', 50000)}>50000</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div className="w-1/2">
                    <Dropdown>
                        <DropdownTrigger>
                            <Button variant="bordered"> Maximum: {maxPrice} </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Maximum price options">
                            <DropdownItem key="100000" onClick={() => handlePriceChange('maximum', 100000)}>100000</DropdownItem>
                            <DropdownItem key="200000" onClick={() => handlePriceChange('maximum', 200000)}>200000</DropdownItem>
                            <DropdownItem key="500000" onClick={() => handlePriceChange('maximum', 500000)}>500000</DropdownItem>
                            <DropdownItem key="1000000" onClick={() => handlePriceChange('maximum', 1000000)}>1000000</DropdownItem>
                            <DropdownItem key="Infinity" onClick={() => handlePriceChange('maximum', 'Any')}>Any</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
        </div>
    );
};

export default PriceFilter;
