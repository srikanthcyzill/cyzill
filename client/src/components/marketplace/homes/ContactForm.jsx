import React from 'react';
import { Button, Input, Textarea } from "@nextui-org/react";

const ContactForm = ({ onClose }) => {
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
                    <div className="w-auto">
                        <div className="">
                            <form className="p-2 xl:p-10 flex flex-col space-y-4">
                                <Input placeholder='Name' />
                                <Input type='tel' placeholder='Phone No.' />
                                <Textarea placeholder='Message' rows="6" />
                                <Button color="primary" auto>
                                    Send Message
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;
