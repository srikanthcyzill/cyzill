import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { app } from '../../../../firebase.js';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { useSelector } from 'react-redux';
import { MediaItem } from './MediaItem.js';
import { MdOutlineCloudUpload } from "react-icons/md";


const Media = ({ formData, saveFormData }) => {
    const [media, setMedia] = useState([]);
    const { currentUser } = useSelector(state => state.user)
    const username = currentUser?.others?.username || currentUser?.username

    useEffect(() => {
        const urls = media.map(file => file.url);
        saveFormData({ ...formData, photos: urls });
    }, [media]);


    const onDrop = useCallback(async (acceptedFiles) => {
        const storage = getStorage(app);

        const filePromises = acceptedFiles.map(async (file) => {
            let folder = '';
            if (file.type.startsWith('image/')) {
                folder = 'images';
            } else if (file.type.startsWith('video/')) {
                folder = 'videos';
            }
            const filePath = `users/${username}/media/${folder}/${file.name}`;
            const storageRef = ref(storage, filePath);
            await uploadBytes(storageRef, file);
            const url = await getDownloadURL(storageRef);
            return { url, path: filePath, type: folder };
        });
        try {
            const files = await Promise.all(filePromises);
            setMedia((prevMedia) => [...prevMedia, ...files]);
        } catch (error) {
            console.error('Error uploading file:', error.message);
        }
    }, [media]);


    const removeFile = (index) => {
        const file = media[index];
        const storage = getStorage(app);
        const fileRef = ref(storage, file.path);
        deleteObject(fileRef).then(() => {
            console.log('File deleted successfully');
            const newMedia = [...media];
            newMedia.splice(index, 1);
            setMedia(newMedia);
        }).catch((error) => {
            console.error('Error deleting file:', error.message);
        });
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const images = media.filter(file => file.type === 'images');
    const videos = media.filter(file => file.type === 'videos');
    return (
        <div className="mx-auto p-6">
            <h2 className="text-2xl font-semibold mb-4 text-center w-full">Upload your files</h2>
            <div className="flex mb-4 justify-center">
                <div className="w-full md:w-1/2 pr-2">
                    <label className="block mb-1 font-medium">Upload Images</label>
                    <div {...getRootProps()} className="">
                        <input {...getInputProps()} accept="image/*" />
                        {isDragActive ? (
                            <p className="">Drop the images here ...</p>
                        ) : (
                            <div>
                                <MdOutlineCloudUpload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                                <p className="text-md text-gray-500">PNG, JPG, JPEG up to 20MB</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
                {images.map((file, index) => (
                    <MediaItem file={file} index={index} removeFile={removeFile} />
                ))}
            </div>
            <div className="flex mb-4 justify-center">
                <div className="w-full md:w-1/2 pl-2">
                    <label className="block mb-1 font-medium">Upload Videos</label>
                    <div {...getRootProps()} className="">
                        <input {...getInputProps()} accept="video/*" />
                        {isDragActive ? (
                            <p className="">Drop the videos here ...</p>
                        ) : (
                            <div>
                                <MdOutlineCloudUpload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                                <p className="text-md text-gray-500">MP4, WebM up to 20MB</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-4">
                {videos.map((file, index) => (
                    <MediaItem file={file} index={index} removeFile={removeFile} />
                ))}
            </div>
        </div>
    );
};

export default Media;