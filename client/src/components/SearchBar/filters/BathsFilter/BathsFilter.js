import React from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@nextui-org/react';
import { FaChevronDown } from 'react-icons/fa';

export const BathroomFilter = ({ value, onChange }) => {
    const handleBathroomChange = (value) => {
        onChange(value);
    };

    return (
        <div className="filter">
            <Dropdown>
                <DropdownTrigger>
                    <Button variant="bordered">
                        Baths: {value} <FaChevronDown className=' text-slate-300 ' />
                    </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Bathroom options">
                    <DropdownItem key="Any" onClick={() => handleBathroomChange('Any')}>Any</DropdownItem>
                    <DropdownItem key="1" onClick={() => handleBathroomChange('1')}>1</DropdownItem>
                    <DropdownItem key="2" onClick={() => handleBathroomChange('2')}>2</DropdownItem>
                    <DropdownItem key="3" onClick={() => handleBathroomChange('3')}>3</DropdownItem>
                    <DropdownItem key="4" onClick={() => handleBathroomChange('4')}>4</DropdownItem>
                    <DropdownItem key="5" onClick={() => handleBathroomChange('5')}>5</DropdownItem>
                    <DropdownItem key="5+" onClick={() => handleBathroomChange('5+')}>5+</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
};
