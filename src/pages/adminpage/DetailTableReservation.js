// src/pages/admin/DetailTableReservation.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../components/admincomponent/Navbar';
import '../../assets/css/Dashboard.css';
import '../../assets/css/MenuManagement.css';
import '../../assets/css/TableReservation.css';
import { IoIosSearch, IoMdNotifications, IoMdSettings } from "react-icons/io";
import { FcBusinessman } from "react-icons/fc";
import Badge from '@mui/material/Badge';
import Button from '../../components/admincomponent/Button';
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
import axios from 'axios';

const DetailTableReservation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Lấy resId từ location.state
  const { resId: reservationId } = location.state || {};

  const [isEditing, setIsEditing] = useState(false);

  // Dữ liệu Reservation
  const [customerName, setCustomerName] = useState('');
  const [contact, setContact] = useState('');
  const [dateValue, setDateValue] = useState(dayjs());
  const [people, setPeople] = useState(1);
  const [checkinTime, setCheckinTime] = useState(dayjs());
  const [checkoutTime, setCheckoutTime] = useState(dayjs());
  const [tableValue, setTableValue] = useState('');
  const [tableState, setTableState] = useState('');

  // Lấy chi tiết reservation khi có ID
  useEffect(() => {
    if (reservationId) {
      fetchReservationDetail(reservationId);
    }
  }, [reservationId]);

  const fetchReservationDetail = async (id) => {
    try {
      const response = await axios.get(`https://localhost:7115/api/Reservation/${id}`);
      const data = response.data;
      console.log('Reservation detail:', data);

      // Gán dữ liệu vào state
      setCustomerName(data.customerName || '');
      setContact(data.contactPhone || '');
      setPeople(data.numberOfPeople || 1);

      // Xử lý date/time => dayjs
      // reservationDate: "2025-03-20T00:00:00"
      // timeIn: "11:00:51", timeOut: "11:05:51"
      const datePart = data.reservationDate?.split('T')[0] || dayjs().format('YYYY-MM-DD');
      setDateValue(dayjs(data.reservationDate));
      setCheckinTime(dayjs(`${datePart}T${data.timeIn}`));
      setCheckoutTime(dayjs(`${datePart}T${data.timeOut}`));

      setTableValue(String(data.tableNumber || ''));
      setTableState(data.status || '');
    } catch (err) {
      console.error('Error fetching reservation detail:', err);
    }
  };

  // Breadcrumb
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" component={RouterLink} to="/admin-reservation" >
      Admin Reservation
    </Link>,
    <Typography key="3" sx={{ color: 'text.primary' }}>
      {reservationId || 'Reservation Detail'}
    </Typography>,
  ];

  // Xử lý edit/cancel/save
  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleCancelClick = () => {
    setIsEditing(false);
  };
  const handleSaveClick = async () => {
    // Gọi API update reservation (PUT /api/Reservation/{id}) tùy logic
    console.log({
      reservationId,
      customerName,
      contact,
      dateValue: dateValue.format('YYYY-MM-DD'),
      people,
      checkinTime: checkinTime.format('HH:mm:ss'),
      checkoutTime: checkoutTime.format('HH:mm:ss'),
      tableValue,
      tableState
    });
    setIsEditing(false);
  };

  // Xử lý thay đổi tableValue / tableState
  const handleTableChange = (event) => {
    setTableValue(event.target.value);
  };
  const handleTableStateChange = (event) => {
    setTableState(event.target.value);
  };

  return (
    <div className="dashboard-container">
      <Navbar />

      <div className="dashboard-content">
        {/* Header */}
        <div className="dashboard-header">
          <div className="input-group rounded">
            <input
              type="search"
              className="form-control rounded"
              placeholder="Search here ..."
              aria-label="Search"
            />
            <span className="input-group-text border-0" id="search-addon">
              <IoIosSearch />
            </span>
          </div>
          <div className="header-center">
            <Badge badgeContent={5}>
              <IoMdSettings className="icon" />
            </Badge>
            <Badge badgeContent={3}>
              <IoMdNotifications className="icon" />
            </Badge>
          </div>
          <div className="header-right">
            <p>Hello Manager</p>
            <FcBusinessman className="icon" />
          </div>
        </div>

        {/* Title */}
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
            <h3 className='detail-table-reservation-content-title'>Reservation Information</h3>
            
            {/* Customer + Contact */}
            <div className='detail-table-reservation-content-customer-container'>
              <div className='detail-table-reservation-content-customer'>
                <h4 className='detail-table-reservation-content-title'>Customer Name</h4>
                <Box
                  component="form"
                  sx={{ '& .MuiTextField-root': { m: 1, width: '23ch' } }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    label="Customer Name"
                    size="small"
                    disabled={!isEditing}
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                </Box>
              </div>

              <div className='detail-table-reservation-content-customer'>
                <h4 className='detail-table-reservation-content-title'>Contact</h4>
                <Box
                  component="form"
                  sx={{ '& .MuiTextField-root': { m: 1, width: '23ch' } }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    label="Contact"
                    size="small"
                    disabled={!isEditing}
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                  />
                </Box>
              </div>
            </div>
            
            {/* Date + People */}
            <div className='detail-table-reservation-content-customer-container'>
              <div className='detail-table-reservation-content-customer'>
                <h4 className='detail-table-reservation-content-title'>Date</h4>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DateField']}>
                    <DateField
                      label="Date"
                      value={dateValue}
                      onChange={(newValue) => setDateValue(newValue)}
                      size='small'
                      disabled={!isEditing}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>

              <div className='detail-table-reservation-content-customer'>
                <h4 className='detail-table-reservation-content-title'>Number of People</h4>
                <Box
                  component="form"
                  sx={{ '& .MuiTextField-root': { m: 1, width: '23ch' } }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    label="Number"
                    type="number"
                    size='small'
                    disabled={!isEditing}
                    value={people}
                    onChange={(e) => setPeople(e.target.value)}
                  />
                </Box>
              </div>
            </div>

            {/* TimeIn + TimeOut */}
            <div className='detail-table-reservation-content-customer-container'>
              <div className='detail-table-reservation-content-customer'>
                <h4 className='detail-table-reservation-content-title'>Checkin Time</h4>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['TimeField']}>
                    <TimeField
                      label="Checkin Time"
                      value={checkinTime}
                      onChange={(newValue) => setCheckinTime(newValue)}
                      size='small'
                      disabled={!isEditing}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>

              <div className='detail-table-reservation-content-customer'>
                <h4 className='detail-table-reservation-content-title'>Checkout Time</h4>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['TimeField']}>
                    <TimeField
                      label="Checkout Time"
                      value={checkoutTime}
                      onChange={(newValue) => setCheckoutTime(newValue)}
                      size='small'
                      disabled={!isEditing}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
            </div>

            {/* Table + TableState */}
            <div className='detail-table-reservation-content-customer-container'>
              <div className='detail-table-reservation-content-customer'>
                <h4 className='detail-table-reservation-content-title'>Table</h4>
                <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                  <InputLabel>Table</InputLabel>
                  <Select
                    value={tableValue}
                    label="Table"
                    onChange={(e) => setTableValue(e.target.value)}
                    disabled={!isEditing}
                  >
                    <MenuItem value=""><em>None</em></MenuItem>
                    <MenuItem value="1">Table 1</MenuItem>
                    <MenuItem value="2">Table 2</MenuItem>
                    <MenuItem value="3">Table 3</MenuItem>
                    <MenuItem value="4">Table 4</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className='detail-table-reservation-content-customer'>
                <h4 className='detail-table-reservation-content-title'>Status</h4>
                <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={tableState}
                    label="Status"
                    onChange={(e) => setTableState(e.target.value)}
                    disabled={!isEditing}
                  >
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Serving">Serving</MenuItem>
                    <MenuItem value="Finished">Finished</MenuItem>
                    <MenuItem value="Cancelled">Cancelled</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>

            {/* Nút Edit / Save / Cancel */}
            <div className='detail-table-reservation-content-customer-container content-btn'>
              {!isEditing ? (
                <Button className="table-reservation-btn" onClick={() => setIsEditing(true)}>
                  Edit
                </Button>
              ) : (
                <>
                  <Button className='table-reservation-btn' onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button className='table-reservation-btn' onClick={handleSaveClick}>
                    Save
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailTableReservation;
