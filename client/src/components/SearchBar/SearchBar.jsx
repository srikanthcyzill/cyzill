import { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Input } from '@nextui-org/react';
import { SearchIcon } from '@nextui-org/shared-icons';

const SearchBar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchRef = useRef(null);
    const isAtListingIndex = location.pathname === '/homes';
    const [value, setValue] = useState('');

    const handleSearchOnChange = (e) => {
        const searchString = e.target.value;
        setValue(searchString);
        // Add your search logic here
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // Add your submit logic here
        if (isAtListingIndex) {
            navigate('/homes');
        }
    };

    return (
        <div>
            <form onSubmit={handleSearchSubmit}>
                <Input
                    classNames={{
                        base: 'max-w-full sm:max-w-[15rem] h-10',
                        mainWrapper: 'h-full',
                        input: 'text-small',
                        inputWrapper: 'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20',
                    }}
                    placeholder='Enter a city, address or pincode'
                    size='sm'
                    startContent={<SearchIcon size={18} />}
                    type='search'
                    value={value}
                    onChange={handleSearchOnChange}
                    ref={searchRef}
                />
            </form>
        </div>
    );
};

export default SearchBar;
