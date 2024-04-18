// PropertyActions.js
import React from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

const PropertyActions = ({ propertyId, onEdit, onDelete, onPay }) => {
    return (
        <div>
            <button onClick={() => onEdit(propertyId)} className="mr-2">
                <FiEdit2 />
            </button>
            <button onClick={() => onDelete(propertyId)} className="mr-2">
                <FiTrash2 />
            </button>
            <button onClick={() => onPay(propertyId)}>
                Pay
            </button>
        </div>
    );
};

export default PropertyActions;
