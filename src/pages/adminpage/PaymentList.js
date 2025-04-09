// src/pages/admin/PaymentList.js
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/admincomponent/Navbar';
import '../../assets/css/Dashboard.css';
import '../../assets/css/Payment.css';
import '../../assets/css/TableReservation.css';
import { FcBusinessman } from "react-icons/fc";
import { IoIosSearch, IoMdNotifications, IoMdSettings } from "react-icons/io";
import Badge from '@mui/material/Badge';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

const PaymentList = () => {    
  const [rows, setRows] = useState([]);
  
  // Hàm gọi API Invoice
  const fetchInvoices = async () => {
    try {
      const requestBody = {
        pageIndex: 1,
        pageSize: 1000,
        filterColumns: [],
        sortColumnsDictionary: {},
        filterRangeColumns: [],
        filterOption: 0,
        export: {
          chosenColumnNameList: {
            additionalProp1: "string",
            additionalProp2: "string",
            additionalProp3: "string"
          },
          pageName: "string"
        }
      };
      
      const response = await axios.post(
        'https://192.168.1.65:443/api/Invoice/get-invoice',
        requestBody
      );
      
      if(response.data.statusCode === "Success"){
        const apiItems = response.data.data.items || [];
        // Map dữ liệu invoice cho DataGrid
        const newRows = apiItems.map((item, index) => ({
          id: index + 1,
          Table: item.tableNumber,
          Customer: item.customerName,
          Contact: item.customerPhone,
          Date: item.date.split('T')[0],
          Timein: item.timeIn,
          Timeout: item.timeOut,
          People: item.people,
          TotalPrice: `$${item.totalPrice}`,
          Method: item.payMethod
        }));
        setRows(newRows);
      }
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  // Định nghĩa cột cho DataGrid
  const columns = [
    { field: 'Table', width: 110, headerName: 'Table No.' }, 
    { field: 'Customer', width: 150, headerName: 'Customer Name' }, 
    { field: 'Contact', width: 120 }, 
    { field: 'Date', width: 110 }, 
    { field: 'Timein', width: 110, headerName: 'Time-in' }, 
    { field: 'Timeout', width: 110, headerName: 'Time-out' }, 
    { field: 'People', width: 90 }, 
    { field: 'TotalPrice', width: 120, headerName: 'Total Price' }, 
    { 
      field: 'Method',
      headerName: 'Payment Method', 
      width: 140, 
      renderCell: (params) => {
        let bgColor = '';
        switch (params.value.toLowerCase()) {
          case 'credit card':
            bgColor = '#FCB96B';
            break;
          case 'mobile payment':
            bgColor = '#2D9CDB';
            break;
          case 'cash':
            bgColor = '#6A9C89';
            break;
          default:
            bgColor = '#F3F2F7';
        }
        return (
          <div style={{ backgroundColor: bgColor, color: '#F6F5F2', borderRadius: '15px', textAlign: 'center', width: '100%' }}>
            <p style={{ padding: '0', margin: '-8px' }}>{params.value}</p>
          </div>
        );
      },
    },
  ];

  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-content">
        {/* Header */}
        <div className="dashboard-header">
          <div className="input-group rounded">
            <input type="search" className="form-control rounded" placeholder="Search here ..." aria-label="Search" />
            <span className="input-group-text border-0" id="search-addon"><IoIosSearch /></span>
          </div>
          <div className="header-center">
            <Badge badgeContent={5}><IoMdSettings className="icon" /></Badge>
            <Badge badgeContent={3}><IoMdNotifications className="icon" /></Badge>
          </div>
          <div className="header-right">
            <p>Hello Manager</p>
            <FcBusinessman className="icon" />
          </div>
        </div>
        {/* Title */}
        <div className="dashboard-title">
          <div className='dashboard-title-content'>
            <h2>Payment Invoice</h2>
            <p>Here is our payment invoice screen summary!</p>
          </div>
          <div className='payment-search-bar input-group rounded'>
            <input type="search" className="form-control rounded" placeholder="Search here ..." aria-label="Search" />
            <span className="input-group-text border-0" id="search-addon"><IoIosSearch /></span>
          </div>
        </div>
        {/* DataGrid hiển thị invoice */}
        <div className='table-reservation-content-table-order'>
          <div style={{ height: 650, width: '100%' }}>
            <DataGrid columns={columns} rows={rows} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentList;
