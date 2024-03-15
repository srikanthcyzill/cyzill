import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Input } from '@nextui-org/react';
import { SearchIcon } from '@nextui-org/shared-icons';

const SearchBar = () => {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const saleOrRent = queryParams.get('saleOrRent');

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        navigate(`/homes?saleOrRent=${saleOrRent}&keyword=${search}`);
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
                    value={search}
                    onChange={handleSearchChange}
                />
            </form>
        </div>
    );
};

export default SearchBar;
