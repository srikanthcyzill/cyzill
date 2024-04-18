import React, { useState, useEffect } from 'react';
import './Hero.css';
import RentProperties from './RentProperties/RentProperties';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
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

    return (
        <>
            <div className="hero-container">
                <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log('slide change')}
                >
                    {media.map((file, index) => (
                        <SwiperSlide key={index}>
                            {file.filename.endsWith('.mp4') ? (
                                <video src={file.firebaseUrl} alt="" className="w-full h-96 object-cover" autoPlay loop muted />
                            ) : (
                                <img src={file.firebaseUrl} alt="" className="w-full h-96 object-cover" />
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>
                <RentProperties />
            </div>
        </>
    );
};

export default Hero;
