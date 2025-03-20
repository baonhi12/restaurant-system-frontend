import React from 'react';
import Navbar from '../../components/admincomponent/Navbar';
import '../../assets/css/Dashboard.css';
import '../../assets/css/MenuManagement.css';
import '../../assets/css/TableReservation.css';
import { IoIosSearch, IoMdNotifications, IoMdSettings } from "react-icons/io";
import { FcBusinessman } from "react-icons/fc";
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { DataGrid } from '@mui/x-data-grid';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import avatar_1 from '../../assets/images/cate_pizza.png';
import { MdOutlineNavigateNext } from "react-icons/md";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Button from '../../components/admincomponent/Button';

const rows = [
    {
        id: 1,
        Image: '',
        FoodName: 'Pizza Margherita',
        Amount: '1',
        Price: '$30',
    },
    {
        id: 2,
        Image: '',
        FoodName: 'Burger Cheese',
        Amount: '2',
        Price: '$20',
    }, 
    {
        id: 3,
        Image: '',
        FoodName: 'Spaghetti Bolognese',
        Amount: '1',
        Price: '$50',
    }, 
    {
        id: 4,
        Image: '',
        FoodName: 'Pizza Margherita',
        Amount: '1',
        Price: '$30',
    },
    {
        id: 5,
        Image: '',
        FoodName: 'Burger Cheese',
        Amount: '2',
        Price: '$20',
    }, 
    {
        id: 6,
        Image: '',
        FoodName: 'Spaghetti Bolognese',
        Amount: '1',
        Price: '$50',
    }, 
    {
        id: 7,
        Image: '',
        FoodName: 'Pizza Margherita',
        Amount: '1',
        Price: '$30',
    },
    {
        id: 8,
        Image: '',
        FoodName: 'Burger Cheese',
        Amount: '2',
        Price: '$20',
    }, 
    {
        id: 9,
        Image: '',
        FoodName: 'Spaghetti Bolognese',
        Amount: '1',
        Price: '$50',
    }
];

const CustomerOrder = () => {
    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" component={RouterLink} to="/admin-reservation" >
            Back
        </Link>,
        <Typography key="2" color="textPrimary">Customer Order</Typography>,
    ];

    const columns = [
        { 
            field: 'Image', 
            width: 140,
            renderCell: (params) => (
                <Stack direction="row" spacing={2}>
                  <Avatar src={avatar_1} />
                </Stack>
            ),
        }, 
        { field: 'FoodName', width: 200 }, 
        { field: 'Amount', width: 100 }, 
        { field: 'Price', width: 100 }, 
    ];

    const navigate = useNavigate();

    const handlePaymentClick = () => {
        navigate('/payment/id'); // navigate to the payment page
    };

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
                        <h2>Customer Order</h2>
                        <p>Here is our customer order summary!</p>
                    </div>
                    <div class="table-reservation-filter-search">
                        <input type="search" class="form-control rounded" placeholder="Search customer ..." aria-label="Search" aria-describedby="search-addon" />
                        <span class="input-group-text border-0" id="search-addon">
                            <IoIosSearch />
                        </span>
                    </div>
                </div>

                <div className='customer-order-content-breadcrumbs'>
                    <Breadcrumbs
                        separator={<MdOutlineNavigateNext fontSize="small" />}
                        aria-label="breadcrumb"
                    >
                        {breadcrumbs}
                    </Breadcrumbs>
                </div>

                <div className='customer-order-content'>
                    <div className='customer-order-content-table-order-info'>
                        <Box
                            component="form"
                            sx={{ '& .MuiTextField-root': { m: 1, width: '20ch' } }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField 
                                id="standard-read-only-input"
                                label="Customer Name"
                                defaultValue="John Doe"
                                variant="standard"
                                slotProps={{
                                    input: {
                                    readOnly: true,
                                    },
                                }}
                                size='small'
                            />

                            <TextField 
                                id="standard-read-only-input"
                                label="Date"
                                defaultValue="2024-10-10"
                                variant="standard"
                                slotProps={{
                                    input: {
                                    readOnly: true,
                                    },
                                }}
                                size='small'
                            />
                            <TextField 
                                id="standard-read-only-input"
                                label="Time"
                                defaultValue="10:00 AM - 12:00 AM"
                                variant="standard"
                                slotProps={{
                                    input: {
                                    readOnly: true,
                                    },
                                }}
                                size='small'
                            />
                            <TextField 
                                id="standard-read-only-input"
                                label="Table Number"
                                defaultValue="001"
                                variant="standard"
                                slotProps={{
                                    input: {
                                    readOnly: true,
                                    },
                                }}
                                size='small'
                            />

                            <TextField 
                                id="standard-read-only-input"
                                label="Total Price"
                                defaultValue="$100"
                                variant="standard"
                                slotProps={{
                                    input: {
                                    readOnly: true,
                                    },
                                }}
                                size='small'
                            />
                        </Box>
                        <Button className='payment-btn' onClick={handlePaymentClick}>Payment</Button>
                    </div>

                    <div className='customer-order-content-table-order-list'>
                        <div style={{ height: '100%', width: '100%' }}>
                            <DataGrid columns={columns} rows={rows} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomerOrder;