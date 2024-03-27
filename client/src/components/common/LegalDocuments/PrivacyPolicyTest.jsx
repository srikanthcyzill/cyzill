import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../../config';

const PrivacyPolicyTest = () => {
    const [content, setContent] = useState('');

    useEffect(() => {
        fetch(`${BASE_URL}/api/admin/content/privacy-policy`)
            .then(response => response.json())
            .then(data => {
                setContent(data.body);
            })
            .catch(error => {
                console.error('Failed to fetch privacy policy content:', error);
            });
    }, []);

    return (
        <div className="max-w-screen-lg mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    );
};

export default PrivacyPolicyTest;
