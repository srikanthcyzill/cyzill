import React, { useState, useCallback } from 'react';
import { Paper, Typography, TextField, Button, Avatar, Switch } from '@material-ui/core';
import { useAddAgentMutation, useGetAgentsQuery, useRemoveAgentMutation, useUpdateAgentStatusMutation } from '../../state/api';
import { MdDeleteForever } from 'react-icons/md';
import { DataGrid } from '@mui/x-data-grid';
import { useDropzone } from 'react-dropzone';
import { app } from '../../../../firebase';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

const AddAgents = () => {
    const [agentName, setAgentName] = useState('');
    const [agencyName, setAgencyName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [officeAddress, setOfficeAddress] = useState('');
    const [pincode, setPincode] = useState('');
    const [serviceArea, setServiceArea] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [agentPhoto, setAgentPhoto] = useState(null);
    const [officePhotos, setOfficePhotos] = useState([]);
    const [addAgent] = useAddAgentMutation();
    const { data: agents, isLoading: isFetchingAgents, refetch } = useGetAgentsQuery();
    const [removeAgent] = useRemoveAgentMutation();
    const [updateAgentStatus] = useUpdateAgentStatusMutation();


    const { getRootProps: getAgentPhotoRootProps, getInputProps: getAgentPhotoInputProps, isDragActive: isAgentPhotoDragActive } = useDropzone({
        onDrop: (files) => onDrop(files, 'photo')
    });

    const { getRootProps: getOfficePhotosRootProps, getInputProps: getOfficePhotosInputProps, isDragActive: isOfficePhotosDragActive } = useDropzone({
        onDrop: (files) => onDrop(files, 'officePhotos')
    });

    const handleToggle = async (agent) => {
        const newStatus = agent.status === 'active' ? 'inactive' : 'active';
        await updateAgentStatus({ id: agent._id, status: newStatus });
        refetch();
    };

    const columns = [
        { field: 'agentName', headerName: 'Agent Name', flex: 1 },
        { field: 'agencyName', headerName: 'Agency Name', flex: 1 },
        { field: 'phoneNumber', headerName: 'Phone Number', flex: 1 },
        { field: 'officeAddress', headerName: 'Office Address', flex: 1 },
        { field: 'pincode', headerName: 'Pincode', flex: 1 },
        { field: 'serviceArea', headerName: 'Service Area', flex: 1 },
        {
            field: 'actions',
            headerName: 'Actions',
            renderCell: (params) => (
                <button onClick={() => removeAgent(params.row._id)}>
                    <MdDeleteForever className="text-red-500 text-2xl" />
                </button>
            ),
        },
        {
            field: 'status',
            headerName: 'Status',
            renderCell: (params) => (
                <Switch
                    checked={params.row.status === 'active'}
                    onChange={() => handleToggle(params.row)}
                    color="primary"
                />
            ),
        },
    ];
    const handleSave = async () => {
        setIsSaving(true);
        try {
            const response = await addAgent({
                agentName,
                agencyName,
                phoneNumber,
                officeAddress,
                pincode,
                serviceArea,
                photo: agentPhoto ? agentPhoto.url : null,
                officePhotos: officePhotos.map(file => file.url),
            });
            if (response.error) {
                throw new Error('Failed to add agent');
            }
            setStatusMessage('Agent added successfully!');
            refetch();
        } catch (err) {
            setStatusMessage('An error occurred while adding the agent.');
        } finally {
            setIsSaving(false);
        }
    };

    const onDrop = useCallback(async (acceptedFiles, type) => {
        const storage = getStorage(app);
        const filePromises = acceptedFiles.map(async (file) => {
            const filePath = `agents/${agentName}/${type}/${file.name}`;
            const storageRef = ref(storage, filePath);
            await uploadBytes(storageRef, file);
            const url = await getDownloadURL(storageRef);
            return { url, path: filePath };
        });
        const files = await Promise.all(filePromises);
        if (type === 'photo') {
            setAgentPhoto(files[0]);
        } else {
            setOfficePhotos(files);
        }
    }, [agentName]);

    const removeFile = (index, type) => {
        const file = type === 'photo' ? agentPhoto[index] : officePhotos[index];
        const storage = getStorage(app);
        const fileRef = ref(storage, file.path);
        deleteObject(fileRef).then(() => {
            console.log('File deleted successfully');
            if (type === 'photo') {
                const newMedia = [...agentPhoto];
                newMedia.splice(index, 1);
                setAgentPhoto(newMedia);
            } else {
                const newMedia = [...officePhotos];
                newMedia.splice(index, 1);
                setOfficePhotos(newMedia);
            }
        }).catch((error) => {
            console.error('Error deleting file:', error.message);
        });
    };

    return (

        <div className="h-screen flex flex-col justify-center items-center pt-20">
            <div className="w-full p-4 flex gap-8 ">
                <div className="w-1/2">
                    <div className=" flex justify-center items-center">
                        <Paper className="p-4 w-auto flex-col">
                            <Typography variant="h5" className="text-center">
                                Add Your Agents Here
                            </Typography>

                            <TextField
                                label="Agent Name"
                                fullWidth
                                style={{ marginBottom: '16px' }}
                                onChange={(e) => setAgentName(e.target.value)}
                            />
                            <TextField
                                label="Real Estate Agency Name"
                                fullWidth
                                style={{ marginBottom: '16px' }}
                                onChange={(e) => setAgencyName(e.target.value)}
                            />

                            <TextField
                                label="Phone Number"
                                fullWidth
                                style={{ marginBottom: '16px' }}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />

                            <TextField
                                label="Office Address"
                                fullWidth
                                style={{ marginBottom: '16px' }}
                                onChange={(e) => setOfficeAddress(e.target.value)}
                            />

                            <TextField
                                label="Pincode"
                                fullWidth
                                style={{ marginBottom: '16px' }}
                                onChange={(e) => setPincode(e.target.value)}
                            />

                            <TextField
                                label="Service Area"
                                fullWidth
                                style={{ marginBottom: '16px' }}
                                onChange={(e) => setServiceArea(e.target.value)}
                            />

                            <Button variant="contained" color="primary" onClick={handleSave} disabled={isSaving}>
                                Save
                            </Button>

                            <div>{statusMessage}</div>
                        </Paper>
                    </div>
                </div>
                <div className="w-1/2 mx-auto">
                    <div {...getAgentPhotoRootProps()} className="p-4 border-2 border-dashed border-gray-400 rounded-md">
                        <input {...getAgentPhotoInputProps()} />
                        {isAgentPhotoDragActive ? <p className='text-center text-gray-500'>Drop the agent photo here ...</p> : <p className='text-center text-gray-500'>Upload Agent Photo</p>}
                    </div>
                    <div className="image-container mt-4">
                        {agentPhoto && (
                            <div className="relative">
                                <Avatar src={agentPhoto.url} size={128} alt="Agent Photo" className="object-cover rounded-lg shadow-lg" />
                                <MdDeleteForever className="absolute top-0 right-0 m-1 cursor-pointer text-white bg-red-600 rounded-full" onClick={() => setAgentPhoto(null)} />
                            </div>
                        )}
                    </div>
                    <div {...getOfficePhotosRootProps()} className="p-4 border-2 border-dashed border-gray-400 rounded-md mt-4">
                        <input {...getOfficePhotosInputProps()} />
                        {isOfficePhotosDragActive ? <p className='text-center text-gray-500'>Drop the office photos here ...</p> : <p className='text-center text-gray-500'>Upload Office Photos Here</p>}
                    </div>
                    <div className="image-container mt-4 grid grid-cols-3 gap-4">
                        {officePhotos.map((photo, index) => (
                            <div key={index} className="relative">
                                <img src={photo.url} alt={`Office Photo ${index}`} className="w-full h-32 object-cover rounded-lg shadow-lg" />
                                <MdDeleteForever className="absolute top-0 right-0 m-1 cursor-pointer text-white bg-red-600 rounded-full" onClick={() => removeFile(index, 'officePhotos')} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="w-full p-4">
                <Typography variant="h5" className="text-center">
                    Listed Agents
                </Typography>
                {isFetchingAgents ? (
                    <>Loading...</>
                ) : (
                    <DataGrid rows={agents} columns={columns} getRowId={(row) => row._id} checkboxSelection />
                )}
            </div>

        </div>
    );
}

export default AddAgents;