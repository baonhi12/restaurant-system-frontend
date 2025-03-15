import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/admincomponent/Navbar';
import '../../assets/css/Dashboard.css';
import '../../assets/css/MenuManagement.css';
import '../../assets/css/TableReservation.css';
import { IoIosSearch, IoMdNotifications, IoMdSettings, IoIosAdd } from "react-icons/io";
import { FcBusinessman } from "react-icons/fc";
import Badge from '@mui/material/Badge';
import Button from '../../components/admincomponent/Button';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';

function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
}
  
const rows = [
    {
        id: 1,
        Table: '001',
        Customer: 'John Doe',
        Contact: '0123456789',
        Date: '2021-10-10',
        Time: '12:00 AM - 2:00 PM',
        People: 4,
    },
];

const Report = () => {
    const navigate = useNavigate();

    const columns = [
        { field: 'Table', width: 85 }, 
        { field: 'Customer', width: 140 }, 
        { field: 'Contact', width: 130 }, 
        { field: 'Date', width: 110 }, 
        { field: 'Time', width: 160 }, 
        { field: 'People', width: 80 }, 
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
                        <h2>Statistical Report</h2>
                        <p>Here is our statistical report summary!</p>
                    </div>
                </div>

                <div className='table-reservation-content-table-order'>
                    <div style={{ height: 300, width: '100%' }}>
                        <DataGrid 
                            columns={columns} 
                            rows={rows}  
                            slots={{
                                toolbar: CustomToolbar,
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Report;