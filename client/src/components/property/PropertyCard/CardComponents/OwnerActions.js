import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { BASE_URL } from '../../../../config';
import { Switch, Modal, Button, Backdrop } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PhonePePaymentGateway from '../../checkout/PhonePePaymentGateway';

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
    const [selectedPlan, setSelectedPlan] = useState(null);
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
                    <Modal
                        open={open}
                        onClose={handleToggleChange}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            style: { backgroundColor: 'rgba(255, 255, 255, 0.8)' },
                        }}
                    >
                        <PhonePePaymentGateway open={open} handleToggleChange={handleToggleChange} propertyId={property._id} plan={selectedPlan} />
                    </Modal>
                </div>
            </>
        </div>
    );
};

export default OwnerActions;
