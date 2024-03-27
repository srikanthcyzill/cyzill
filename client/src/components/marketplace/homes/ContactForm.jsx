import React, { useState } from 'react';
import { Button, Input, Textarea } from "@nextui-org/react";
import { BASE_URL } from "../../../config";

const ContactForm = ({ onClose }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [messageSent, setMessageSent] = useState(false); // new state variable

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const response = await fetch(`${BASE_URL}/api/admin/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ name, phone, message }),
        });

        if (response.ok) {
            console.log('Message sent successfully');
            setMessageSent(true);
            setName('');
            setPhone('');
            setMessage('');
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
