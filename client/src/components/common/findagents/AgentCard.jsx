import React, { useState } from 'react';
import { Card, CardContent, Typography, Avatar } from '@material-ui/core';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';;

const AgentCard = ({ agent }) => {
    const { agentName, officeAddress, serviceArea, phoneNumber, agencyName, photo, officePhotos } = agent;
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

    const handlePreviousClick = () => {
        setCurrentPhotoIndex((currentPhotoIndex - 1 + officePhotos.length) % officePhotos.length);
    };

    const handleNextClick = () => {
        setCurrentPhotoIndex((currentPhotoIndex + 1) % officePhotos.length);
    };

    return (
        <Card>
            {officePhotos && officePhotos.length > 0 && <img src={officePhotos[currentPhotoIndex]} alt="Office" />}
            <FaChevronLeft onClick={handlePreviousClick} />
            <FaChevronRight onClick={handleNextClick} />
            <CardContent>
                <Avatar src={photo} />
                <Typography variant="h5">{agentName}</Typography>
                <Typography variant="body1">{officeAddress}</Typography>
                <Typography variant="body1">{serviceArea}</Typography>
                <Typography variant="body1">{phoneNumber}</Typography>
                <Typography variant="body1">{agencyName}</Typography>
            </CardContent>
        </Card>
    );
};


export default AgentCard;
