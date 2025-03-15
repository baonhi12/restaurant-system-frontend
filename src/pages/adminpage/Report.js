import React, { useState } from 'react';
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
import { DataGridPro } from '@mui/x-data-grid-pro';
import Box from '@mui/material/Box';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { MdExpandMore, MdChevronRight  } from "react-icons/md";

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
        Year: 2021,
        Month: 'Jan',
        Day: 1,
        Revenue: 10000,
        Customer: 200,
        Reservation: 50,
        Dishes: 500,
        Best: 'Pizza',
    },

];

const Report = () => {
    const navigate = useNavigate();

    const columns = [
        { field: 'Year', width: 70, headerName: 'Year' },
        { field: 'Month', width: 70, headerName: 'Month' },
        { field: 'Day', width: 70, headerName: 'Day' }, 
        { field: 'Revenue', width: 145, headerName: 'Total Revenue ($)' }, 
        { field: 'Customer', width: 145, headerName: 'Total Customer' }, 
        { field: 'Reservation', width: 170, headerName: 'Total Table Reservation' },
        { field: 'Dishes', width: 145, headerName: 'Total Dishes Sold' }, 
        { field: 'Best', width: 140, headerName: 'Best-Selling Dish' }, 
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
                    <div style={{ height: 500, width: '100%' }}>
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