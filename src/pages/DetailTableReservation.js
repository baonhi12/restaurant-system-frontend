import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../assets/css/Dashboard.css';
import '../assets/css/MenuManagement.css';
import '../assets/css/TableReservation.css';
import { IoIosSearch, IoMdNotifications, IoMdSettings } from "react-icons/io";
import { FcBusinessman } from "react-icons/fc";
import Badge from '@mui/material/Badge';
import Button from '../components/Button';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { MdOutlineNavigateNext } from "react-icons/md";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const DetailTableReservation = () => {
    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" component={RouterLink} to="/admin-reservation" >
            Admin Reservation
        </Link>,
        <Typography key="3" sx={{ color: 'text.primary' }}>
            #0012343
        </Typography>,
    ];

    const [datevalue, setDateValue] = React.useState(dayjs('2022-04-17'));
    const [timevalue, setTimeValue] = React.useState(dayjs('2022-04-17T15:30'));

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
      setAge(event.target.value);
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
                    <Stack spacing={2}>
                        <div className='dashboard-title-content'>
                            <h2>Detail Table Reservation</h2>
                        </div>
                        <Breadcrumbs
                            separator={<MdOutlineNavigateNext fontSize="small" />}
                            aria-label="breadcrumb"
                        >
                            {breadcrumbs}
                        </Breadcrumbs>
                    </Stack>
                </div>

                <div className='detail-table-reservation-content'>
                    <div className='detail-table-reservation-content-form'>
                        <div className='detail-table-reservation-content-customer'>
                            <h4 className='detail-table-reservation-content-title'>Customer Name</h4>
                            <div className='detail-table-reservation-content-input'>
                                <Box
                                    component="form"
                                    sx={{ '& .MuiTextField-root': { m: 1, width: '23ch' } }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField
                                        label="Customer Name"
                                        id="outlined-size-small"
                                        // defaultValue="Small"
                                        size="small"
                                    />
                                </Box>
                            </div>
                        </div>

                        <div className='detail-table-reservation-content-customer'>
                            <h4 className='detail-table-reservation-content-title'>Contact</h4>
                            <div className='detail-table-reservation-content-input'>
                                <Box
                                    component="form"
                                    sx={{ '& .MuiTextField-root': { m: 1, width: '23ch' } }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField
                                        label="Contact"
                                        id="outlined-size-small"
                                        // defaultValue="Small"
                                        size="small"
                                    />
                                </Box>
                            </div>
                        </div>

                        <div className='detail-table-reservation-content-customer'>
                            <h4 className='detail-table-reservation-content-title'>Date</h4>
                            <div className='detail-table-reservation-content-input'>
                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <DemoContainer components={['DateTimeField', 'DateTimeField']} >
                                        <DateField
                                            label="Date"
                                            value={datevalue}
                                            onChange={(newValue) => setDateValue(newValue)}
                                            size='small'
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>   
                            </div>                     
                        </div>

                        <div className='detail-table-reservation-content-customer'>
                            <h4 className='detail-table-reservation-content-title'>Checkin Time</h4>
                            <div className='detail-table-reservation-content-input'>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['TimeField', 'TimeField']}>
                                        <TimeField
                                            label="Checkin Time"
                                            value={timevalue}
                                            onChange={(newValue) => setTimeValue(newValue)}
                                            size='small'
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </div>
                        </div>

                        <div className='detail-table-reservation-content-customer'>
                            <h4 className='detail-table-reservation-content-title'>Checkout Time</h4>
                            <div className='detail-table-reservation-content-input'>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['TimeField', 'TimeField']}>
                                        <TimeField
                                            label="Checkout Time"
                                            value={timevalue}
                                            onChange={(newValue) => setTimeValue(newValue)}
                                            size='small'
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </div>
                        </div>

                        <div className='detail-table-reservation-content-customer'>
                            <h4 className='detail-table-reservation-content-title'>Number of People</h4>
                            <div className='detail-table-reservation-content-input'>
                                <Box
                                    component="form"
                                    sx={{ '& .MuiTextField-root': { m: 1, width: '23ch' } }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField
                                        id="outlined-number"
                                        label="Number"
                                        type="number"
                                        slotProps={{
                                            inputLabel: {
                                                shrink: true,
                                            },
                                        }}
                                        size='small'
                                    />
                                </Box>
                            </div>
                        </div>

                        <div className='detail-table-reservation-content-customer'>
                            <h4 className='detail-table-reservation-content-title'>Table</h4>
                            <div className='detail-table-reservation-content-input'>
                                <Box
                                    component="form"
                                    sx={{ '& .MuiTextField-root': { m: 1, width: '23ch' } }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField
                                        id="outlined-number"
                                        label="Table"
                                        type="number"
                                        slotProps={{
                                            inputLabel: {
                                                shrink: true,
                                            },
                                        }}
                                        size='small'
                                    />
                                </Box>
                            </div>
                        </div>

                        <div className='detail-table-reservation-content-customer'>
                            <h4 className='detail-table-reservation-content-title'>Table State</h4>
                            <div className='detail-table-reservation-content-input'>
                                <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                                    <InputLabel id="demo-select-small-label">Age</InputLabel>
                                    <Select
                                        labelId="demo-select-small-label"
                                        id="demo-select-small"
                                        value={age}
                                        label="Age"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="">
                                        <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>

                        <div className='detail-table-reservation-content-customer'>
                            <Button> Submit </Button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailTableReservation;