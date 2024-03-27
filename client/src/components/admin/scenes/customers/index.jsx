import React from 'react';
import { Avatar, Button } from '@material-ui/core';
import { FaDownload } from "react-icons/fa";
import { DataGrid } from '@mui/x-data-grid';
import { useGetCustomersQuery } from "../../state/api";
import Header from "../../components/Header";
import { Box } from "@mui/material";

const Customers = () => {
  const { data: customers, isLoading } = useGetCustomersQuery();

  const generateCSVData = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'Username,Phone Number,Email\n';
    customers.forEach(customer => {
      const formattedPhoneNumber = customer.phoneNumber ? `+91 ${customer.phoneNumber.slice(0, 5)} ${customer.phoneNumber.slice(5)}` : '';
      csvContent += `${customer.username},"${formattedPhoneNumber}",${customer.email || ''}\n`;
    });
    return encodeURI(csvContent);
  };

  const handleDownloadCSV = () => {
    const csvData = generateCSVData();
    const link = document.createElement('a');
    link.setAttribute('href', csvData);
    link.setAttribute('download', 'customers.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phoneNumber", headerName: "Phone Number", flex: 0.5 },
    {
      field: "photo",
      headerName: "Profile",
      flex: 0.5,
      renderCell: (params) => (
        <Avatar alt="Profile Picture" src={params.value} />
      ),
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CUSTOMERS" subtitle="List of Customers" />
      <Button onClick={handleDownloadCSV} variant="contained" color="primary">
        Download CSV <FaDownload />
      </Button>
      <Box mt="40px" height="75vh">
        <DataGrid
          loading={isLoading || !customers}
          getRowId={(row) => row._id}
          rows={customers || []}
          columns={columns}
          checkboxSelection
        />

      </Box>
    </Box>
  );
};

export default Customers;
