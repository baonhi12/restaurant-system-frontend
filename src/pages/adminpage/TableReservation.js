import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/admincomponent/Navbar';
import '../../assets/css/Dashboard.css';
import '../../assets/css/MenuManagement.css';
import '../../assets/css/TableReservation.css';
import { IoIosSearch, IoMdNotifications, IoMdSettings } from "react-icons/io";
import { FcBusinessman } from "react-icons/fc";
import Badge from '@mui/material/Badge';
import Button from '../../components/admincomponent/Button';
import { IoMdMore } from "react-icons/io";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DataGrid } from '@mui/x-data-grid';
import DeleteForm from '../../components/admincomponent/DeleteForm';
import { MdDeleteOutline, MdOutlineRemoveRedEye } from "react-icons/md";

const rows = [
    {
        id: 1,
        ID: '#0012343',
        Customer: 'John Doe',
        Contact: '0123456789',
        Date: '2021-10-10',
        Time: '12:00 AM - 2:00 PM',
        People: 4,
        Status: 'Pending',
    },
    {
        id: 2,
        ID: '#0012344',
        Customer: 'Jane Doe',
        Contact: '0123456789',
        Date: '2021-10-10',
        Time: '12:00 AM - 2:00 PM',
        People: 4,
        Status: 'Serving',
    },
    {
        id: 3,
        ID: '#0012345',
        Customer: 'John Doe',
        Contact: '0123456789',
        Date: '2021-10-10',
        Time: '12:00 AM - 2:00 PM',
        People: 4,
        Status: 'Cancelled',
    },
    {
        id: 4,
        ID: '#0012346',
        Customer: 'John Doe',
        Contact: '0123456789',
        Date: '2021-10-10',
        Time: '12:00 AM - 2:00 PM',
        People: 4,
        Status: 'Pending',
    },
    {
        id: 5,
        ID: '#0012347',
        Customer: 'John Doe',
        Contact: '0123456789',
        Date: '2021-10-10',
        Time: '12:00 AM - 2:00 PM',
        People: 4,
        Status: 'Serving',
    },
    {
        id: 6,
        ID: '#0012348',
        Customer: 'John Doe',
        Contact: '0123456789',
        Date: '2021-10-10',
        Time: '12:00 AM - 2:00 PM',
        People: 4,
        Status: 'Pending',
    },
    {
        id: 7,
        ID: '#0012349',
        Customer: 'John Doe',
        Contact: '0123456789',
        Date: '2021-10-10',
        Time: '12:00 AM - 2:00 PM',
        People: 4,
        Status: 'Serving',
    },
    {
        id: 8,
        ID: '#0012350',
        Customer: 'John Doe',
        Contact: '0123456789',
        Date: '2021-10-10',
        Time: '12:00 AM - 2:00 PM',
        People: 4,
        Status: 'Cancelled',
    },
];

const TableReservation = () => {
    const navigate = useNavigate();
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const handleOpenDelete = (row) => {
        setSelectedRow(row);
        setOpenDeleteModal(true);
    };

    const handleCloseDelete = () => {
        setOpenDeleteModal(false);
    };

    const onDelete = () => {
        console.log("Deleting item:", selectedRow);
        setOpenDeleteModal(false);
    };

    const columns = [
        { field: 'ID', width: 85 }, 
        { field: 'Customer', width: 130 }, 
        { field: 'Contact', width: 120 }, 
        { field: 'Date', width: 110 }, 
        { field: 'Time', width: 160 }, 
        { field: 'People', width: 70 }, 
        { 
            field: 'Status', 
            width: 110,
            renderCell: (params) => {
                let bgColor = '';
                // Đổi màu background dựa theo giá trị status (đổi thành chữ thường để so sánh)
                switch (params.value.toLowerCase()) {
                    case 'pending':
                        bgColor = '#FCB96B';
                        break;
                    case 'serving':
                        bgColor = '#6A9C89';
                        break;
                    case 'cancelled':
                        bgColor = '#FF5B5B';
                        break;
                    default:
                        bgColor = '#FCB96B';
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
        { 
            field: 'Action', 
            width: 130, 
            renderCell: (params) => (
                <>
                    <Button className='crud-icon'
                        variant="contained"
                        size="small"
                        onClick={() =>
                        navigate('/detail-table-reservation', { state: params.row })
                        }
                        style={{ marginRight: 8 }}
                    > <MdOutlineRemoveRedEye /></Button>
                    <Button className='crud-icon'
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handleOpenDelete(params.row)}
                    > <MdDeleteOutline /></Button>
                </>
            ),
        }, 
        { 
            field: 'detail', 
            headerName: '', // Không hiển thị label
            width: 50,
            renderCell: () => (
                <IoMdMore />
            ),
        }
    ];

    return (
        <div className="dashboard-container">
            <Navbar />

            <div className="dashboard-content">
                <div className="dashboard-header">
                    <div class="input-group rounded">
                        <input type="search" class="form-control rounded" placeholder="Search here ..." aria-label="Search" aria-describedby="search-addon" />
                        <span class="input-group-text border-0" id="search-addon">
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
                        <h2>Table Reservation</h2>
                        <p>Here is our reservation summary with graph view!</p>
                    </div>
                    <div className='table-reservation-availaible-seat'>
                        <p>20 Available seat</p>
                    </div>
                </div>

                <div className='table-reservation-content-filter'> 
                    <div class="table-reservation-filter-search">
                        <input type="search" class="form-control rounded" placeholder="Search customer ..." aria-label="Search" aria-describedby="search-addon" />
                        <span class="input-group-text border-0" id="search-addon">
                            <IoIosSearch />
                        </span>
                    </div>

                    <div class="table-reservation-filter-date">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateTimePicker']}>
                                <DateTimePicker label="Search date time" />
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>
                </div>

                <DeleteForm open={openDeleteModal} handleClose={handleCloseDelete} onDelete={onDelete} />

                <div className='table-reservation-content-table-order'>
                    <div style={{ height: 550, width: '100%' }}>
                        <DataGrid columns={columns} rows={rows} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TableReservation;