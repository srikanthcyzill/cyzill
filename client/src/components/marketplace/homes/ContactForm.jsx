import React, { useEffect, useState } from 'react';
import { Button, Input, Textarea } from "@nextui-org/react";
import { BASE_URL } from "../../../config";

const ContactForm = ({ onClose }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [location, setLocation] = useState('');
    const [messageSent, setMessageSent] = useState(false); // new state variable

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=YOUR_GOOGLE_MAPS_API_KEY`);
            const data = await response.json();
            if (data.results && data.results.length > 0) {
                setLocation(data.results[0].formatted_address);
            }
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const response = await fetch(`${BASE_URL}/api/admin/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ name, phone, message, location }),
        });

        if (response.ok) {
            console.log('Message sent successfully');
            setMessageSent(true);
            setName('');
            setPhone('');
            setMessage('');
            setLocation('');
            setTimeout(() => {
                setMessageSent(false);
                onClose();
            }, 3000);
        } else {
            console.error('Error sending message');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50" onClick={onClose}>
            <div className="bg-white rounded-lg px-2 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
                <div className="p-2 md:p-5 flex flex-col">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Contact Us
                        </h3>
                        <Button color="danger" variant="light" auto onPress={onClose}>
                            Close
                        </Button>
                    </div>
                    {messageSent ? (
                        <p className='text-success'>Message sent successfully!</p>
                    ) : (
                        <div className="w-auto">
                            <div className="">
                                <form className="p-2 xl:p-10 flex flex-col space-y-4" onSubmit={handleSubmit}>
                                    <Input required placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                                    <Input required type='tel' placeholder='Phone No.' value={phone} onChange={(e) => setPhone(e.target.value)} />
                                    <Input required placeholder='Location' value={location} onChange={(e) => setLocation(e.target.value)} /> {/* Add this line */}
                                    <Textarea required placeholder='Message' rows="6" value={message} onChange={(e) => setMessage(e.target.value)} />
                                    <Button color="primary" auto type="submit">
                                        Send Message
                                    </Button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContactForm;
