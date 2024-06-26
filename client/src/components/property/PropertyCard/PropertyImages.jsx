import { Button } from '@nextui-org/react';
import React from 'react';
import { PiSquaresFour } from 'react-icons/pi';

const placeholderImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFGklEQVR4nO3dvUrDQBSF4cwLZ2QIq+gB/YDOz2Ca+gJdYAfeQIqsWYIkICgpMyE9A6Wk9KzOQNy29ZzUAPMzM/N2l5Wn5+FwoULFixoQIG9AH9/Cb9mHdEzfBMCP84/EeB6FDkGAuMBYMg7uAeDIDBwFg4gMHAYOxEBAwGA4gMHgGDIDBwFg4gMHAYDiAwcBg7EwFgyAwcFgOIDA4FgOIDA4FgOIDA4FgOM5sP7I9PvwLjx8En8/j8fu0xgCjYGDyHYcEGLMDYWBASwyA4uAwcJgOwMCFjEwDgYDALj4GBiwAIeJgO7wKBwFg2AwcFgOgOHw2A4FgOA7DwMCxMDA4FgOIDA4FgOIDA4FgOIDA4FgOA7HAg0/Ds/sB80fASAwDgYDoPDAYjMDAwGA4gMDgWA4gMDgWA4gMDgWA4gMDgWA4jFx5FGDgO4OCnwWCyAwcFgOA4XDRQeA4EgMHAYDiAwOBYDiAwOBYDiAwOBYDiAwOBYDiOwCgSEAwGA4jMAuDgMCiAwcFgOA4jDAqDgGA4gMHAYDiAwOBYDiAwOBYDiAwOBYDiAwOBYDiFhOCzXxZvdR4PlS5cuXKlTs/3QkUOHDiwYEGDBgwYMHD0P7vBgwePNgSMONkFZJZKJJpJUptFMp1f0OT3QfQPgIAAAAASUVORK5CYII=';

const PropertyImages = ({ photos, handleImageClick }) => {
    // If there are no photos, use the placeholder image
    const images = photos.length > 0 ? photos : [placeholderImage, placeholderImage, placeholderImage, placeholderImage];

    return (
        <div className="w-1/2 grid grid-cols-2 gap-2">
            {images.slice(1, 5).map((image, index) => (
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
