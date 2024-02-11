import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { FaChevronDown } from "react-icons/fa";

export const PropertyTypeFilter = ({ value, onChange }) => {
    const handlePropertyTypeChange = (value) => {
        onChange(value);
    };

    return (
        <div className="filter">
            <Dropdown>
                <DropdownTrigger>
                    <Button variant="bordered">
                        Property Type: {value} <FaChevronDown className=' text-slate-300 ' />
                    </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Property type options">
                    <DropdownItem key="" onClick={() => handlePropertyTypeChange('')}>Any</DropdownItem>
                    <DropdownItem key="flat" onClick={() => handlePropertyTypeChange('flat')}>Flat/Apartment</DropdownItem>
                    <DropdownItem key="residentailhouse" onClick={() => handlePropertyTypeChange('residentailhouse')}>Residential House</DropdownItem>
                    <DropdownItem key="Villa" onClick={() => handlePropertyTypeChange('Villa')}>Villa</DropdownItem>
                    <DropdownItem key="residentialland" onClick={() => handlePropertyTypeChange('residentialland')}>Residential Land</DropdownItem>
                    <DropdownItem key="penthouse" onClick={() => handlePropertyTypeChange('penthouse')}>Penthouse</DropdownItem>
                    <DropdownItem key="commercialoffice" onClick={() => handlePropertyTypeChange('commercialoffice')}>Commercial Office Space</DropdownItem>
                    <DropdownItem key="commercialshop" onClick={() => handlePropertyTypeChange('commercialshop')}>Commercial Shop</DropdownItem>
                    <DropdownItem key="commercialland" onClick={() => handlePropertyTypeChange('commercialland')}>Commercial Land</DropdownItem>
                    <DropdownItem key="warehouse" onClick={() => handlePropertyTypeChange('warehouse')}>Warehouse/Godown</DropdownItem>
                    <DropdownItem key="industialland" onClick={() => handlePropertyTypeChange('industialland')}>Industrial Land</DropdownItem>
                    <DropdownItem key="industrialbuilding" onClick={() => handlePropertyTypeChange('industrialbuilding')}>Industrial Building</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
};
