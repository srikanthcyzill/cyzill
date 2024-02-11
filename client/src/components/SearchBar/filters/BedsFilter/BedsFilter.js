import React from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@nextui-org/react';
import { FaChevronDown } from 'react-icons/fa';

export const BedroomFilter = ({ value, onChange }) => {
    const handleBedroomChange = (value) => {
        onChange(value);
    };

    return (
        <div className="filter">
            <Dropdown>
                <DropdownTrigger>
                    <Button variant="bordered">
                        Beds: {value} <FaChevronDown className=' text-slate-300 ' />
                    </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Bedroom options">
                    <DropdownItem key="Any" onClick={() => handleBedroomChange('Any')}>Any</DropdownItem>
                    <DropdownItem key="1" onClick={() => handleBedroomChange('1')}>1</DropdownItem>
                    <DropdownItem key="2" onClick={() => handleBedroomChange('2')}>2</DropdownItem>
                    <DropdownItem key="3" onClick={() => handleBedroomChange('3')}>3</DropdownItem>
                    <DropdownItem key="4" onClick={() => handleBedroomChange('4')}>4</DropdownItem>
                    <DropdownItem key="5" onClick={() => handleBedroomChange('5')}>5</DropdownItem>
                    <DropdownItem key="5+" onClick={() => handleBedroomChange('5+')}>5+</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
};