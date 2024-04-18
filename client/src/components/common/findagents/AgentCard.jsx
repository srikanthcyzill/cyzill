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
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
            <div className="h-80 flex flex-col items-center justify-center bg-white shadow-lg rounded-lg relative">
                {officePhotos && officePhotos.length > 0 && (
                    <>
                        <img className="absolute w-full h-full object-cover rounded-lg" src={officePhotos[currentPhotoIndex]} alt="Office" />
                        <FaChevronLeft size={30} className="absolute left-2 top-1/2 text-black" onClick={handlePreviousClick} />
                        <FaChevronRight size={30} className="absolute right-2 top-1/2 text-black" onClick={handleNextClick} />

                    </>
                )}
                <Avatar src={photo} size="lg" />
                <h2 className="mt-4 text-xl my-8 font-semibold text-blue-500">{agentName}</h2>
                <div className="flex flex-col items-start w-full px-4">
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
