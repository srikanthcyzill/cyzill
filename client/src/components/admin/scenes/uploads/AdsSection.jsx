import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from '../../../../firebase.js';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useAddFileMutation, useDeleteFileMutation, useGetFilesQuery } from '../../state/api';

const AdsSection = () => {
    const { data: adFiles, isLoading } = useGetFilesQuery();
    const [addAdFile] = useAddFileMutation();
    const [deleteAdFile] = useDeleteFileMutation();
    const [media, setMedia] = useState([]);


    useEffect(() => {
        if (adFiles) {
            setMedia(adFiles);
        }
    }, [adFiles]);
    useEffect(() => {
        const fetchImages = async () => {
            if (adFiles) {
                const storage = getStorage(app);
                const urlPromises = adFiles.map(async (file) => {
                    if (file.path) {
                        const fileRef = ref(storage, file.path);
                        const url = await getDownloadURL(fileRef);
                        console.log(`URL for file ${file._id}: ${url}`);
                        return { ...file, url };
                    }
                    return file;
                });
                const filesWithUrls = await Promise.all(urlPromises);
                setMedia(filesWithUrls);
            }
        };

        fetchImages();
    }, [adFiles]);


    useEffect(() => {
        const fetchUrls = async () => {
            const storage = getStorage(app);
            const urlPromises = adFiles.map(async (file) => {
                if (file.path) {
                    const fileRef = ref(storage, file.path);
                    const url = await getDownloadURL(fileRef);
                    console.log(`URL for file ${file._id}: ${url}`);
                    return { ...file, url };
                }
                return file;
            });
            const filesWithUrls = await Promise.all(urlPromises);
            setMedia(filesWithUrls);
        };
        if (adFiles) {
            fetchUrls();
        }
    }, [adFiles]);



    const onDrop = useCallback(async (acceptedFiles) => {
        const storage = getStorage(app);
        const filePromises = acceptedFiles.map(async (file) => {
            let folder = '';
            if (file.type.startsWith('image/')) {
                folder = 'images';
            } else if (file.type.startsWith('video/')) {
                folder = 'videos';
            }
            const filePath = `admin/ads/${folder}/${file.name}`;
            const storageRef = ref(storage, filePath);
            await uploadBytes(storageRef, file);
            const url = await getDownloadURL(storageRef);

            // Save the file data to MongoDB using your mutation
            await addAdFile({ filename: file.name, firebaseUrl: url });

            return { url, path: filePath, type: folder };
        });

        try {
            const files = await Promise.all(filePromises);
            setMedia((prevMedia) => [...prevMedia, ...files]);
        } catch (error) {
            console.error('Error uploading file:', error.message);
        }
    }, []);



    const removeFile = (index) => {
        const file = media[index];
        deleteAdFile(file._id).then(() => {
            console.log('File deleted successfully');
            const newMedia = [...media];
            newMedia.splice(index, 1);
            setMedia(newMedia);
        }).catch((error) => {
            console.error('Error deleting file:', error.message);
        });
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
    if (isLoading) {
        return <div>Loading...</div>;

    }

    return (
        <div className=" p-6">
            <h2 className="text-2xl font-semibold mb-4 text-center w-full">Upload your ads</h2>
            <div {...getRootProps()} className="flex flex-col items-center justify-center p-4 border-2 border-dashed">
                <input {...getInputProps()} accept="image/*,video/*" />
                <p className="text-md text-gray-500">PNG, JPG, JPEG, MP4, WebM up to 20MB</p>
            </div>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={50}
                slidesPerView={1} // Show only one image at a time
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                className="w-full h-auto"
                autoplay={{ delay: 7000 }} // Autoplay every 7 seconds
            >
                {media.map((file, index) => (
                    <SwiperSlide key={index} className="relative">
                        {file.filename.endsWith('.mp4') ? (
                            <video src={file.firebaseUrl} alt="" className="w-full h-96 object-cover" autoPlay loop muted />
                        ) : (
                            <img src={file.firebaseUrl} alt="" className="w-full h-96 object-cover" />
                        )}
                        <button onClick={() => removeFile(index)} className="absolute top-0 right-0 bg-red-500 text-white p-1">Remove</button>
                    </SwiperSlide>
                ))}
            </Swiper>

        </div>
    );

};

export default AdsSection;
