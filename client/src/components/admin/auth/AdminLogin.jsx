import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../../redux/admin/adminSlice';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from '@nextui-org/react';
import { EyeFilledIcon, EyeSlashFilledIcon } from '@nextui-org/shared-icons';
import { BASE_URL } from '../../../config';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${BASE_URL}/api/admin/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Failed to login');
            }

            const data = await response.json();
            dispatch(loginSuccess(data));

            navigate('/admin/dashboard/');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-black">
            <div className="w-full max-w-sm space-y-6 text-white px-2 sm:px-8 text-center">
                <h2 className="text-2xl font-bold">Admin Login</h2>
                <form onSubmit={handleSubmit} className="space-y-2">
                    <Input
                        type="text"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        className="w-full"
                    />
                    <Input
                        type={isVisible ? "text" : "password"}
                        placeholder="Password"
                        endContent={
                            <button type="button" onClick={toggleVisibility}>
                                {isVisible ? <EyeSlashFilledIcon /> : <EyeFilledIcon />}
                            </button>
                        }
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className="w-full"
                    />
                    <Button type="submit" color="primary" className="w-full">Login</Button>
                </form>
                {error && <p className="text-red-500">{error}</p>}
            </div>
        </div>
    );
};

export default AdminLogin;
