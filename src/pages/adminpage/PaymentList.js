import React, { useState } from 'react';
import Navbar from '../../components/admincomponent/Navbar';
import '../../assets/css/Dashboard.css';
import '../../assets/css/Payment.css';
import '../../assets/css/TableReservation.css';
import { FcBusinessman } from "react-icons/fc";
import { IoIosSearch, IoMdNotifications, IoMdSettings } from "react-icons/io";
import Badge from '@mui/material/Badge';
import Button from '../../components/admincomponent/Button';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdMore } from "react-icons/io";
import { DataGrid } from '@mui/x-data-grid';
import { FaRegMoneyBillAlt } from "react-icons/fa";

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
    },
    {
        id: 4,
        Table: '004',
        Customer: 'Jane Doe',
        Contact: '0123456789',
        Date: '2021-10-10',
        Time: '12:00 AM - 2:00 PM',
        People: 4,
        TotalPrice: '$100',
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
    },
];

const PaymentList = () => {
    const navigate = useNavigate();
    
    const columns = [
        { field: 'Table', width: 90, headerName: 'Table No.' }, 
        { field: 'Customer', width: 150, headerName: 'Customer Name' }, 
        { field: 'Contact', width: 130 }, 
        { field: 'Date', width: 110 }, 
        { field: 'Time', width: 160 }, 
        { field: 'People', width: 90 }, 
        { field: 'TotalPrice', width: 120, headerName: 'Total Price' }, 
        { 
            field: 'Action', 
            width: 100, 
            renderCell: (params) => (
                <Button className='crud-icon'
                    variant="contained"
                    size="small"
                    onClick={() =>
                    navigate('/payment/id', { state: params.row })
                    }
                    style={{ marginRight: 8 }}
                > <FaRegMoneyBillAlt /></Button>
            ),
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
                        <h2>Payment Transaction List</h2>
                        <p>Here is our payment screen summary!</p>
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