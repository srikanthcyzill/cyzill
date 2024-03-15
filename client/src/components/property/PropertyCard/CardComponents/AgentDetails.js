import React from 'react';
import { FaRegUser } from 'react-icons/fa';

const AgentDetails = ({ property }) => (
    <div className="agent-details">
        <div>
            <FaRegUser />
        </div>
        <div className="agent-name">{property.username}</div>
    </div>
);

export default AgentDetails;
