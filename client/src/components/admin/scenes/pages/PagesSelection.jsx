import { Button, Select, SelectItem } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetPagesQuery } from '../../state/api';

const PageSelection = () => {
    const [selectedPage, setSelectedPage] = useState('');
    const { data: pages, isLoading } = useGetPagesQuery();

    const handlePageSelect = (event) => {
        setSelectedPage(event.target.value);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Select a Page</h2>
            <Select value={selectedPage} onChange={handlePageSelect}>
                {pages.map(page => (
                    <SelectItem key={page._id} value={page.identifier}>
                        {page.title}
                    </SelectItem>
                ))}
            </Select>
            {selectedPage && (
                <Link to={`/admin/dashboard/pages/${selectedPage}`}>
                    <Button variant="contained" color="primary">
                        Go to Selected Page
                    </Button>
                </Link>
            )}
        </div>
    );
};

export default PageSelection;
