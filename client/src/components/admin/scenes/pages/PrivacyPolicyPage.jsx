import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../../../config';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const PrivacyPolicyPage = () => {
    const [content, setContent] = useState('');
    const token = localStorage.getItem('token');
    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/admin/content`);
                const data = await response.json();
                setContent(data.body);
            } catch (err) {
                console.error('Failed to fetch privacy policy content:', err);
            }
        };

        fetchContent();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${BASE_URL}/api/admin/content/privacy-policy`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ body: content }),
            });


            if (!response.ok) {
                throw new Error('Failed to update Privacy Policy');
            }

            alert('Privacy Policy updated successfully!');
        } catch (err) {
            alert('An error occurred while updating the Privacy Policy.');
        }
    };

    const handleCreate = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/admin/content`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: 'Privacy Policy',
                    author: 'Admin',
                    identifier: 'privacy-policy',
                    body: content
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create initial content');
            }

            alert('Initial content created successfully!');
        } catch (err) {
            alert('An error occurred while creating the initial content.');
        }
    };


    return (
        <div>
            <h2>Edit Privacy Policy</h2>
            <form onSubmit={handleSubmit}>
                <ReactQuill value={content} onChange={setContent} />
                <button type="submit">Save Changes</button>
            </form>
            <button onClick={handleCreate}>Create Initial Content</button>
        </div>
    );
};

export default PrivacyPolicyPage;
