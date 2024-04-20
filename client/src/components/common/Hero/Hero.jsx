import React, { useState, useEffect } from 'react';
import './Hero.css';
import RentProperties from './RentProperties/RentProperties';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { BASE_URL } from '../../../config';

const Hero = () => {
    const [media, setMedia] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            const response = await fetch(`${BASE_URL}/api/admin/files`);
            const data = await response.json();
            setMedia(data);
            setIsLoading(false);
        };
        fetchImages();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    var settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 10000,
        pauseOnHover: true
    };

    return (
        <>
            <div className="hero-container">
                <Slider {...settings}>
                    {media.map((file, index) => (
                        <div key={index}>
                            {file.filename.endsWith('.mp4') ? (
                                <video src={file.firebaseUrl} alt="" className="w-full h-96 object-cover" autoPlay loop muted />
                            ) : (
                                <img src={file.firebaseUrl} alt="" className="w-full h-96 object-cover" />
                            )}
                        </div>
                    ))}
                </Slider>
                <RentProperties />
            </div>
        </>
    );
};

export default Hero;
