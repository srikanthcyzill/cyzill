import React from 'react';
import { Link } from 'react-router-dom';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

const OwnerActions = ({ property, handleDelete }) => (
    <div className="absolute bottom-2 right-2 flex">
        <>
            <Link to={`/edit-property/${property._id}`} className="mr-2 text-blue-500 hover:text-blue-700">
                <FiEdit2 className="mr-1" />
            </Link>
            <button onClick={() => handleDelete(property._id)} className="text-red-500 hover:text-red-700">
                <FiTrash2 />
            </button>
        </>
    </div>
);

export default OwnerActions;
