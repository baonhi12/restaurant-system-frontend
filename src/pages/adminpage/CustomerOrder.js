// src/pages/adminpage/CustomerOrder.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import {
  Box, TextField, Breadcrumbs, Typography, Link, Badge
} from '@mui/material';
import Navbar from '../../components/admincomponent/Navbar';
import Button from '../../components/admincomponent/Button';
import { IoIosSearch, IoMdNotifications, IoMdSettings } from "react-icons/io";
import { FcBusinessman } from "react-icons/fc";
import { MdOutlineNavigateNext } from "react-icons/md";
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import '../../assets/css/Dashboard.css';
import '../../assets/css/MenuManagement.css';
import '../../assets/css/TableReservation.css';

const CustomerOrder = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Lấy dữ liệu từ query string
  const resId = searchParams.get('resId') || '';
  const ordId = searchParams.get('ordId') || '';
  const customerName = searchParams.get('customerName') || '';
  const contactPhone = searchParams.get('contactPhone') || '';
  const tableNumber = searchParams.get('tableNumber') || '';
  const reservationDate = searchParams.get('reservationDate') || '';
  const timeIn = searchParams.get('timeIn') || '';
  const timeOut = searchParams.get('timeOut') || '';
  const status = searchParams.get('status') || '';

  // Định nghĩa cột cho DataGrid
  const columns = [
    {
      field: 'Image',
      headerName: 'Image',
      width: 140,
      // Lấy URL ảnh từ params.row.Image
      renderCell: (params) => (
        <Stack direction="row" spacing={2}>
          <Avatar src={params.row.Image} />
        </Stack>
      ),
    },
    { field: 'FoodName', headerName: 'Food Name', width: 200 },
    { field: 'Amount', headerName: 'Qty', width: 100 },
    { field: 'Price', headerName: 'Price', width: 100 },
  ];

  // State lưu danh sách món + tổng tiền
  const [orderRows, setOrderRows] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Nếu ordId != rỗng => Gọi API GET /api/Orders/{ordId}
  useEffect(() => {
    if (!ordId) return;
    axios.get(`https://localhost/api/Orders/${ordId}`)
      .then(res => {
        const items = res.data.items || [];
        // Tạo row + ảnh động
        const newRows = items.map((item, idx) => ({
          id: idx + 1,
          // Lấy ảnh từ item.mnuImage
          Image: item.mnuImage || "https://via.placeholder.com/100?text=No+Image",
          FoodName: item.mnuName,
          Amount: item.odtQuantity,
          Price: `$${item.mnuPrice}`
        }));
        setOrderRows(newRows);

        // Tính tổng
        let sum = 0;
        items.forEach(i => {
          sum += i.mnuPrice * i.odtQuantity;
        });
        setTotalPrice(sum);
      })
      .catch(err => {
        console.error("Error fetching order items:", err);
      });
  }, [ordId]);

  // Điều hướng sang Payment + query string
  const handlePaymentClick = () => {
    navigate(
      `/admin-reservation/payment` +
      `?resId=${resId}` +
      `&ordId=${ordId}` +
      `&customerName=${encodeURIComponent(customerName)}` +
      `&contactPhone=${encodeURIComponent(contactPhone)}` +
      `&tableNumber=${encodeURIComponent(tableNumber)}` +
      `&reservationDate=${encodeURIComponent(reservationDate)}` +
      `&timeIn=${encodeURIComponent(timeIn)}` +
      `&timeOut=${encodeURIComponent(timeOut)}` +
      `&totalPrice=${totalPrice}`
    );
  };

  // Breadcrumb
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" component={RouterLink} to="/admin-reservation">
      Back
    </Link>,
    <Typography key="2" color="textPrimary">Customer Order</Typography>,
  ];

  return (
    <div className="dashboard-container">
      <Navbar />

      <div className="dashboard-content">
        {/* Header */}
        <div className="dashboard-header">
          <div className="input-group rounded">
            <input type="search" className="form-control rounded" placeholder="Search here ..." />
            <span className="input-group-text border-0">
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

        {/* Tiêu đề */}
        <div className="dashboard-title">
          <div className="dashboard-title-content">
            <h2>Customer Order</h2>
            <p>Here is our customer order summary!</p>
          </div>
          <div className="table-reservation-filter-search">
            <input type="search" className="form-control rounded" placeholder="Search customer ..." />
            <span className="input-group-text border-0">
              <IoIosSearch />
            </span>
          </div>
        </div>

        {/* Breadcrumbs */}
        <div className="customer-order-content-breadcrumbs">
          <Breadcrumbs separator={<MdOutlineNavigateNext fontSize="small" />} aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </div>

        {/* Nội dung chính */}
        <div className="customer-order-content">
          <div className="customer-order-content-table-order-info">
            <Box
              component="form"
              sx={{ '& .MuiTextField-root': { m: 1, width: '20ch' } }}
              noValidate
              autoComplete="off"
            >
              <TextField
                label="Customer Name"
                value={customerName}
                variant="standard"
                InputProps={{ readOnly: true }}
                size="small"
              />
              <TextField
                label="Date"
                value={reservationDate}
                variant="standard"
                InputProps={{ readOnly: true }}
                size="small"
              />
              <TextField
                label="Time"
                value={`${timeIn} - ${timeOut}`}
                variant="standard"
                InputProps={{ readOnly: true }}
                size="small"
              />
              <TextField
                label="Table Number"
                value={tableNumber}
                variant="standard"
                InputProps={{ readOnly: true }}
                size="small"
              />
              <TextField
                label="Contact Phone"
                value={contactPhone}
                variant="standard"
                InputProps={{ readOnly: true }}
                size="small"
              />
              <TextField
                label="Total Price"
                value={`$${totalPrice}`}
                variant="standard"
                InputProps={{ readOnly: true }}
                size="small"
              />
            </Box>

            {/* Chỉ hiển thị nút Payment nếu status = serving */}
            {status.toLowerCase() === 'serving' && (
              <Button className="payment-btn" onClick={handlePaymentClick}>
                Payment
              </Button>
            )}
          </div>

          <div className="customer-order-content-table-order-list">
            <div style={{ height: '100%', width: '100%' }}>
              {/* DataGrid */}
              <DataGrid columns={columns} rows={orderRows} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerOrder;
