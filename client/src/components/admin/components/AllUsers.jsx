import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { FaDownload } from "react-icons/fa";
import { DataGrid } from '@mui/x-data-grid';
import { BASE_URL } from '../../../config';

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/user`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                // Map the data to include an 'id' property
                const mappedData = data.map(user => ({ ...user, id: user._id }));
                setUsers(mappedData);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();

        const intervalId = setInterval(fetchUsers, 5000);

        return () => clearInterval(intervalId);
    }, []);

    const generateCSVData = () => {
        let csvContent = 'data:text/csv;charset=utf-8,';
        csvContent += 'Username,Phone Number,Email\n';
        users.forEach(user => {
            const formattedPhoneNumber = user.phoneNumber ? `+91 ${user.phoneNumber.slice(0, 5)} ${user.phoneNumber.slice(5)}` : '';
            csvContent += `${user.username},"${formattedPhoneNumber}",${user.email || ''}\n`;
        });
        return encodeURI(csvContent);
    };

    const handleDownloadCSV = () => {
        const csvData = generateCSVData();
        const link = document.createElement('a');
        link.setAttribute('href', csvData);
        link.setAttribute('download', 'users.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const columns = [
        { field: 'username', headerName: 'Username', width: 150 },
        { field: 'phoneNumber', headerName: 'Phone Number', width: 150 },
        { field: 'email', headerName: 'Email', width: 200 },
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            <Button onClick={handleDownloadCSV} variant="contained" color="primary">
                Download CSV <FaDownload />
            </Button>
            <DataGrid
                rows={users}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
            />
        </div>
    );
};

export default AllUsers;
