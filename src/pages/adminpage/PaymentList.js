import React, { useState } from 'react';
import Navbar from '../../components/admincomponent/Navbar';
import '../../assets/css/Dashboard.css';
import '../../assets/css/Payment.css';
import '../../assets/css/TableReservation.css';
import { FcBusinessman } from "react-icons/fc";
import { IoIosSearch, IoMdNotifications, IoMdSettings } from "react-icons/io";
import Badge from '@mui/material/Badge';
import { DataGrid } from '@mui/x-data-grid';

const rows = [
    {
        id: 1,
        Table: '001',
        Customer: 'John Doe',
        Contact: '0123456789',
        Date: '2021-10-10',
        Time: '12:00 AM - 2:00 PM',
        People: 4,
        TotalPrice: '$100',
        Method: 'card',
    },
    {
        id: 2,
        Table: '002',
        Customer: 'Jane Doe',
        Contact: '0123456789',
        Date: '2021-10-10',
        Time: '12:00 AM - 2:00 PM',
        People: 4,
        TotalPrice: '$100',
        Method: 'ewallet',
    }, 
    {
        id: 3,
        Table: '003',
        Customer: 'John Doe',
        Contact: '0123456789',
        Date: '2021-10-10',
        Time: '12:00 AM - 2:00 PM',
        People: 4,
        TotalPrice: '$100',
        Method: 'cash',
    }, 
    {
        id: 4,
        Table: '004',
        Customer: 'John Doe',
        Contact: '0123456789',
        Date: '2021-10-10',
        Time: '12:00 AM - 2:00 PM',
        People: 4,
        TotalPrice: '$100',
        Method: 'card',
    }, 
    {
        id: 5,
        Table: '005',
        Customer: 'John Doe',
        Contact: '0123456789',
        Date: '2021-10-10',
        Time: '12:00 AM - 2:00 PM',
        People: 4,
        TotalPrice: '$100',
        Method: 'ewallet',
    }, 
    {
        id: 6,
        Table: '006',
        Customer: 'John Doe',
        Contact: '0123456789',
        Date: '2021-10-10',
        Time: '12:00 AM - 2:00 PM',
        People: 4,
        TotalPrice: '$100',
        Method: 'cash',
    }, 
    {
        id: 7,
        Table: '007',
        Customer: 'John Doe',
        Contact: '0123456789',
        Date: '2021-10-10',
        Time: '12:00 AM - 2:00 PM',
        People: 4,
        TotalPrice: '$100',
        Method: 'card',
    }, 
    {
        id: 8,
        Table: '008',
        Customer: 'John Doe',
        Contact: '0123456789',
        Date: '2021-10-10',
        Time: '12:00 AM - 2:00 PM',
        People: 4,
        TotalPrice: '$100',
        Method: 'ewallet',
    }, 
    {
        id: 9,
        Table: '009',
        Customer: 'John Doe',
        Contact: '0123456789',
        Date: '2021-10-10',
        Time: '12:00 AM - 2:00 PM',
        People: 4,
        TotalPrice: '$100',
        Method: 'cash',
    },
];

const PaymentList = () => {    
    const columns = [
        { field: 'Table', width: 90, headerName: 'Table No.' }, 
        { field: 'Customer', width: 140, headerName: 'Customer Name' }, 
        { field: 'Contact', width: 110 }, 
        { field: 'Date', width: 100 }, 
        { field: 'Time', width: 160 }, 
        { field: 'People', width: 90 }, 
        { field: 'TotalPrice', width: 120, headerName: 'Total Price' }, 
        { 
            field: 'Method',
            headerName: 'Payment Method', 
            width: 140, 
            renderCell: (params) => {
                let bgColor = '';
                // Đổi màu background dựa theo giá trị status (đổi thành chữ thường để so sánh)
                switch (params.value.toLowerCase()) {
                    case 'card':
                        bgColor = '#FCB96B';
                        break;
                    case 'ewallet':
                        bgColor = '#2D9CDB';
                        break;
                    case 'cash':
                        bgColor = '#6A9C89';
                        break;
                    default:
                        bgColor = '#F3F2F7';
                }
                return (
                    <div
                        style={{
                        backgroundColor: bgColor,
                        color: '#F6F5F2',
                        borderRadius: '15px',
                        textAlign: 'center',
                        width: '100%',
                        }}
                    >
                        <p style={{
                            padding: '0',
                            margin: '-8px',
                        }}>{params.value}</p>
                    </div>
                );
            },
        }, 
    ];

    return (
        <div className="dashboard-container">
            <Navbar />

            <div className="dashboard-content">
                <div className="dashboard-header">
                    <div className="input-group rounded">
                        <input type="search" class="form-control rounded" placeholder="Search here ..." aria-label="Search" aria-describedby="search-addon" />
                        <span className="input-group-text border-0" id="search-addon">
                            <IoIosSearch />
                        </span>
                    </div>
                    <div className="header-center">
                        <Badge badgeContent={5} >
                            <IoMdSettings className="icon" />
                        </Badge>
                        <Badge badgeContent={3} >
                            <IoMdNotifications className="icon" />
                        </Badge>
                    </div>

                    <div className="header-right">
                        <p>Hello Manager</p>
                        <FcBusinessman className="icon" />
                    </div>
                </div>

                <div className="dashboard-title">
                    <div className='dashboard-title-content'>
                        <h2>Payment Invoice</h2>
                        <p>Here is our payment invoice screen summary!</p>
                    </div>
                    
                    <div className='payment-search-bar input-group rounded'>
                        <input type="search" class="form-control rounded" placeholder="Search here ..." aria-label="Search" aria-describedby="search-addon" />
                        <span className="input-group-text border-0" id="search-addon">
                            <IoIosSearch />
                        </span>
                    </div>
                </div>

                <div className='table-reservation-content-table-order'>
                    <div style={{ height: 550, width: '100%' }}>
                        <DataGrid columns={columns} rows={rows} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentList;