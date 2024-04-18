import React, { useEffect, useState } from 'react';
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaRegUser, FaShareAlt, FaEye, FaMapPin } from 'react-icons/fa';
import ImageGallery from './ImageGallery';
import { useLocation, useParams } from 'react-router-dom';
import { BASE_URL } from '../../../config';
import WithLoading from '../../common/Loading/WithLoading.jsx';
import { Chip, ScrollShadow, Button, Avatar, } from "@nextui-org/react";
import { PiSquaresFour } from "react-icons/pi";
import useCurrencyFormatter from '../../../utils/useCurrencyFormatter';
import PropertyInfo from './PropertyInfo.jsx';
import AgentDetails from './AgentDetails.jsx';
import PropertyImages from './PropertyImages.jsx';

const PropertyDetails = () => {
    const [activeImage, setActiveImage] = useState(0);
    const [showGallery, setShowGallery] = useState(false);
    const [, setShowModal] = useState(false);
    const [property, setProperty] = useState(null);
    const { propertyId } = useParams();
    const location = useLocation();
    const currencyFormatter = useCurrencyFormatter();

    const handleImageClick = (index) => {
        setActiveImage(index);
        setShowGallery(true);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/property/properties/${propertyId}`);
                const data = await response.json();
                setProperty(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData();
    }, [propertyId]);

    useEffect(() => {
        if (property) {
            setShowModal(location.state?.showModal || false);
        }
    }, [property, location.state]);

    return (
        <ScrollShadow>
            {property ? (
                <div className="h-full bg-white pt-8 pb-8 flex flex-col justify-center items-center overflow-x-hidden">
                    <div className="property-details-modal overflow-y-auto">
                        <div className="flex-1 overflow-y-auto">
                            <div className="property-card-details flex gap-2 cursor-pointer">
                                <div className="w-1/2 relative h-[400px]">
                                    <img className="h-full w-full object-cover cursor-pointer rounded-lg" src={property.photos[activeImage]} alt={`Property ${property._id}`} onClick={() => handleImageClick(activeImage)} />
                                    <div className="absolute inset-0 bg-black opacity-0 hover:opacity-20 transition-opacity duration-300" />
                                </div>
                                <PropertyImages photos={property.photos} handleImageClick={handleImageClick} />
                            </div>
                        </div>
                        <div className="buttons mt-4 flex gap-2 justify-end">
                            <Button color="primary" auto onClick={() => navigator.clipboard.writeText(`https://cyzill.com/property-details/${property._id}`)}>
                                <FaShareAlt className="mr-2" /> Share
                            </Button>
                            <Button color="primary" auto onClick={() => alert(property.location.address)}>
                                <FaMapPin className="mr-2" /> Location
                            </Button>
                        </div>
                        <div className="flex">
                            <div className="w-3/4 p-4">
                                <PropertyInfo property={property} currencyFormatter={currencyFormatter} />
                            </div>
                            <div className="w-1/4 p-4">
                                <AgentDetails property={property} />
                            </div>
                        </div>
                    </div>
                    {showGallery && (
                        <ImageGallery images={property.photos} activeImage={activeImage} setActiveImage={setActiveImage} setShowGallery={setShowGallery} />
                    )}
                </div>
            ) : null}
        </ScrollShadow>
    );

};

export default WithLoading(PropertyDetails);
