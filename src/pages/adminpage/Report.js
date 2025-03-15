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
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
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
    {
        id: 2,
        Year: 2021,
        Month: 'Feb',
        Day: 2,
        Revenue: 12000,
        Customer: 250,
        Reservation: 60,
        Dishes: 600,
        Best: 'Burger',
    },
    {
        id: 3,
        Year: 2021,
        Month: 'Mar',
        Day: 3,
        Revenue: 15000,
        Customer: 300,
        Reservation: 70,
        Dishes: 700,
        Best: 'Pasta',
    },
    {
        id: 4,
        Year: 2021,
        Month: 'Apr',
        Day: 6,
        Revenue: 20000,
        Customer: 400,
        Reservation: 80,
        Dishes: 800,
        Best: 'Steak',
    },
    {
        id: 5,
        Year: 2021,
        Month: 'May',
        Day: 7,
        Revenue: 25000,
        Customer: 500,
        Reservation: 90,
        Dishes: 900,
        Best: 'Salad',
    },
    {
        id: 6,
        Year: 2021,
        Month: 'Jun',
        Day: 9,
        Revenue: 30000,
        Customer: 600,
        Reservation: 100,
        Dishes: 1000,
        Best: 'Soup',
    },
    {
        id: 7,
        Year: 2021,
        Month: 'Jul',
        Day: 12,
        Revenue: 35000,
        Customer: 700,
        Reservation: 110,
        Dishes: 1100,
        Best: 'Sandwich',
    },
    {
        id: 8,
        Year: 2021,
        Month: 'Aug',
        Day: 13,
        Revenue: 40000,
        Customer: 800,
        Reservation: 120,
        Dishes: 1200,
        Best: 'Fried Chicken',
    },
    {
        id: 9,
        Year: 2021,
        Month: 'Sep',
        Day: 17,
        Revenue: 45000,
        Customer: 900,
        Reservation: 130,
        Dishes: 1300,
        Best: 'Sushi',
    },
    { 
        id: 10,
        Year: 2022,
        Month: 'Jan',
        Day: 18,
        Revenue: 50000,
        Customer: 1000,
        Reservation: 140,
        Dishes: 1400,
        Best: 'Rice',
    }, 
    {
        id: 11,
        Year: 2022,
        Month: 'Feb',
        Day: 19,
        Revenue: 55000,
        Customer: 1100,
        Reservation: 150,
        Dishes: 1500,
        Best: 'Noodle',
    },
    {
        id: 12,
        Year: 2022,
        Month: 'Mar',
        Day: 21,
        Revenue: 60000,
        Customer: 1200,
        Reservation: 160,
        Dishes: 1600,
        Best: 'Taco',
    }, 
    {
        id: 13,
        Year: 2022,
        Month: 'Apr',
        Day: 25,
        Revenue: 65000,
        Customer: 1300,
        Reservation: 170,
        Dishes: 1700,
        Best: 'Hot Dog',
    }, 
    {
        id: 14,
        Year: 2022,
        Month: 'May',
        Day: 1,
        Revenue: 70000,
        Customer: 1400,
        Reservation: 180,
        Dishes: 1800,
        Best: 'Fish',
    }, 
    {
        id: 15,
        Year: 2022,
        Month: 'Jun',
        Day: 1,
        Revenue: 75000,
        Customer: 1500,
        Reservation: 190,
        Dishes: 1900,
        Best: 'Pancake',
    }, 
    {
        id: 16,
        Year: 2022,
        Month: 'Jul',
        Day: 1,
        Revenue: 80000,
        Customer: 1600,
        Reservation: 200,
        Dishes: 2000,
        Best: 'Waffle',
    }, 
    {
        id: 17,
        Year: 2022,
        Month: 'Aug',
        Day: 1,
        Revenue: 85000,
        Customer: 1700,
        Reservation: 210,
        Dishes: 2100,
        Best: 'Donut',
    }, 
    {
        id: 18,
        Year: 2022,
        Month: 'Sep',
        Day: 1,
        Revenue: 90000,
        Customer: 1800,
        Reservation: 220,
        Dishes: 2200,
        Best: 'Ice Cream',
    }, 
    {
        id: 19,
        Year: 2023,
        Month: 'Jan',
        Day: 1,
        Revenue: 95000,
        Customer: 1900,
        Reservation: 230,
        Dishes: 2300,
        Best: 'Cake',
    }, 
    {
        id: 20,
        Year: 2023,
        Month: 'Feb',
        Day: 1,
        Revenue: 100000,
        Customer: 2000,
        Reservation: 240,
        Dishes: 2400,
        Best: 'Cookie',
    },
    { 
        id : 21,
        Year: 2024,
        Month: 'Jan',
        Day: 1,
        Revenue: 105000,
        Customer: 2100,
        Reservation: 250,
        Dishes: 2500,
        Best: 'Bread',
    }, 
    {
        id: 22,
        Year: 2024,
        Month: 'Feb',
        Day: 1,
        Revenue: 110000,
        Customer: 2200,
        Reservation: 260,
        Dishes: 2600,
        Best: 'Pie',
    }, 
    {
        id: 23,
        Year: 2024,
        Month: 'Mar',
        Day: 1,
        Revenue: 115000,
        Customer: 2300,
        Reservation: 270,
        Dishes: 2700,
        Best: 'Muffin',
    }, 
    {
        id: 24,
        Year: 2024,
        Month: 'Apr',
        Day: 1,
        Revenue: 120000,
        Customer: 2400,
        Reservation: 280,
        Dishes: 2800,
        Best: 'Cupcake',
    }, 
    {
        id: 25,
        Year: 2024,
        Month: 'May',
        Day: 1,
        Revenue: 125000,
        Customer: 2500,
        Reservation: 290,
        Dishes: 2900,
        Best: 'Brownie',
    }, 
    {
        id: 26,
        Year: 2024,
        Month: 'Jun',
        Day: 1,
        Revenue: 130000,
        Customer: 2600,
        Reservation: 300,
        Dishes: 3000,
        Best: 'Cheesecake',
    }, 
    {
        id: 27,
        Year: 2024,
        Month: 'Jul',
        Day: 1,
        Revenue: 135000,
        Customer: 2700,
        Reservation: 310,
        Dishes: 3100,
        Best: 'Pudding',
    }, 
    {
        id: 28,
        Year: 2024,
        Month: 'Aug',
        Day: 1,
        Revenue: 140000,
        Customer: 2800,
        Reservation: 320,
        Dishes: 3200,
        Best: 'Jelly',
    }, 
    {
        id: 29,
        Year: 2024,
        Month: 'Sep',
        Day: 1,
        Revenue: 145000,
        Customer: 2900, 
        Reservation: 330,
        Dishes: 3300,
        Best: 'Candy',
    },
    {
        id: 30,
        Year: 2025,
        Month: 'Jan',
        Day: 1,
        Revenue: 150000,
        Customer: 3000,
        Reservation: 340,
        Dishes: 3400,
        Best: 'Chocolate',
    }, 
    {
        id: 31,
        Year: 2025,
        Month: 'Feb',
        Day: 1,
        Revenue: 155000,
        Customer: 3100,
        Reservation: 350,
        Dishes: 3500,
        Best: 'Lollipop',
    }, 
    {
        id: 32,
        Year: 2025,
        Month: 'Mar',
        Day: 1,
        Revenue: 160000,
        Customer: 3200,
        Reservation: 360,
        Dishes: 3600,
        Best: 'Gummy Bear',
    }, 
    {
        id: 33,
        Year: 2025,
        Month: 'Apr',
        Day: 1,
        Revenue: 165000,
        Customer: 3300,
        Reservation: 370,
        Dishes: 3700,
        Best: 'Cotton Candy',
    }, 
    {
        id: 34,
        Year: 2025,
        Month: 'May',
        Day: 1,
        Revenue: 170000,
        Customer: 3400,
        Reservation: 380,
        Dishes: 3800,
        Best: 'Toffee',
    }, 
    {
        id: 35,
        Year: 2025,
        Month: 'Jun',
        Day: 1,
        Revenue: 175000,
        Customer: 3500,
        Reservation: 390,
        Dishes: 3900,
        Best: 'Marshmallow',
    }, 
    {
        id: 36,
        Year: 2025,
        Month: 'Jul',
        Day: 1,
        Revenue: 180000,
        Customer: 3600,
        Reservation: 400,
        Dishes: 4000,
        Best: 'Licorice',
    }, 
];

const Report = () => {
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