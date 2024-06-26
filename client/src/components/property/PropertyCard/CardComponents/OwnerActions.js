import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { BASE_URL } from '../../../../config';
import { Switch, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const CustomSwitch = withStyles({
    switchBase: {
        color: 'red',
        '&$checked': {
            color: 'green',
        },
        '&$checked + $track': {
            backgroundColor: 'green',
        },
    },
    checked: {},
    track: {},
})(Switch);

const OwnerActions = ({ property, properties, setProperties }) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleDelete = async (propertyId, event) => {
        event.stopPropagation();
        console.log(properties, setProperties);
        try {
            const response = await fetch(`${BASE_URL}/api/property/properties/${propertyId}`, {
                method: 'DELETE',
            });

            console.log('Delete response', response);

            if (!response.ok && response.status !== 204) {
                throw new Error('Error deleting property');
            }

            console.log('Properties before deletion', properties);
            const updatedProperties = properties.filter((property) => property._id !== propertyId);
            console.log('Properties after deletion', updatedProperties);

            setProperties(updatedProperties);
        } catch (error) {
            console.error(error);
            alert('An error occurred while deleting the property. Please try again.');
        }
    };
    const handleToggleChange = (event) => {
        event.stopPropagation();
        if (!open) {
            navigate(`/checkout/${property._id}`, { state: { property } });
        }
        setOpen(!open);
    };


    return (
        <div className="absolute bottom-2 right-2 flex items-center">
            <>
                <Link to={`/edit-property/${property._id}`} className="mr-2 text-blue-500 hover:text-blue-700">
                    <FiEdit2 className="mr-1" />
                </Link>
                <Button onClick={(event) => handleDelete(property._id, event)} className="text-red-500 hover:text-red-700">
                    <FiTrash2 />
                </Button>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div onClick={(event) => event.stopPropagation()}>
                        <CustomSwitch checked={open} onChange={handleToggleChange} />
                    </div>
                </div>
            </>
        </div>
    );
};

export default OwnerActions;
