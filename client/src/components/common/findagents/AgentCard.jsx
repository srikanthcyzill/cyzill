import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Avatar } from "@nextui-org/react";

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
        <div className="p-4">
            <div className="flex flex-col items-center justify-center bg-white shadow-lg rounded-lg relative min-h-[17rem]">
                {officePhotos && officePhotos.length > 0 && (
                    <>
                        <img className="absolute top-0 w-full h-1/2 object-cover rounded-t-lg z-0" src={officePhotos[currentPhotoIndex]} alt="Office" />
                        <FaChevronLeft className="absolute left-2 top-1/4 text-black z-10" onClick={handlePreviousClick} />
                        <FaChevronRight className="absolute right-2 top-1/4 text-black z-10" onClick={handleNextClick} />
                    </>
                )}
                <Avatar src={photo} size="lg" className="z-20 shadow-lg" />
                <div className="mt-4 bg-black bg-opacity-50 rounded px-2 py-1 z-20">
                    <h2 className="text-xl font-semibold text-white">{agentName}</h2>
                </div>
                <div className="flex flex-col items-start w-full p-4 z-20">
                    <div className="flex gap-2 w-full">
                        <h3 className="text-md font-medium text-blue-500">Office Address:</h3>
                        <p className="text-gray-700">{officeAddress}</p>
                    </div>
                    <div className="flex gap-2 w-full">
                        <h3 className="text-md font-medium text-blue-500">Service Area:</h3>
                        <p className="text-gray-700">{serviceArea}</p>
                    </div>
                    <div className="flex gap-2 w-full">
                        <h3 className="text-md font-medium text-blue-500">Phone Number:</h3>
                        <p className="text-gray-700">{phoneNumber}</p>
                    </div>
                    <div className="flex gap-2 w-full">
                        <h3 className="text-md font-medium text-blue-500">Agency Name:</h3>
                        <p className="text-gray-700">{agencyName}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgentCard;
