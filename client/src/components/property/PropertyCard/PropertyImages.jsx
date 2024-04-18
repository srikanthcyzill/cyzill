import { Button } from '@nextui-org/react';
import React from 'react';
import { PiSquaresFour } from 'react-icons/pi';

const PropertyImages = ({ photos, handleImageClick }) => {
    return (
        <div className="w-1/2 grid grid-cols-2 gap-2">
            {photos.slice(1, 5).map((image, index) => (
                <div key={index} onClick={() => handleImageClick(index + 1)} className="relative h-[200px]">
                    <img className="h-full w-full object-cover cursor-pointer rounded-lg" src={image} alt={`Property ${index + 1}`} />
                    <div className="absolute inset-0 bg-black opacity-0 hover:opacity-20 transition-opacity duration-300" />
                    {index === 3 && (
                        <div className="absolute bottom-0 right-0 p-2 flex items-center space-x-2">
                            <Button color="primary" auto onClick={() => handleImageClick(4)}>
                                <PiSquaresFour className="text-white text-4xl font-medium" />
                                <span className="text-white text-2xl">More</span>
                            </Button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default PropertyImages;
