import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

import Navbar from '../../components/admincomponent/Navbar';
import '../../assets/css/Dashboard.css';
import '../../assets/css/Payment.css';
import '../../assets/css/TableReservation.css';

import { FcBusinessman } from "react-icons/fc";
import { IoIosSearch, IoMdNotifications, IoMdSettings } from "react-icons/io";
import Badge from '@mui/material/Badge';
import Button from '../../components/admincomponent/Button';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import StepLabel from '@mui/material/StepLabel';
import { useNavigate } from 'react-router-dom';

const steps = ['Checkout', 'Payment', 'Complete'];

function Payment() {
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
  const totalPrice = searchParams.get('totalPrice') || '0';

  // Quản lý step
  const [activeStep, setActiveStep] = useState(0);
  // Quản lý phương thức thanh toán
  const [paymentMethod, setPaymentMethod] = useState('Cash');

  // Debug xem resId, ordId có rỗng ko
  useEffect(() => {
    console.log('Payment Page - resId:', resId, 'ordId:', ordId);
  }, [resId, ordId]);

  const handleNext = async () => {
    if (activeStep === 1) {
      try {
        // Kiểm tra resId
        if (!resId) {
          alert("resId đang rỗng, không thể thực hiện thanh toán!");
          return;
        }
        // Gọi API thanh toán
        const url = `https://192.168.1.65:443/api/Payment/checkout/${resId}?ordId=${ordId}`;
        console.log('Gọi API:', url, 'với body:', { payMethod: paymentMethod });
        await axios.post(url, { payMethod: paymentMethod });
        console.log('Thanh toán thành công!');
        setActiveStep(activeStep + 1);
      } catch (error) {
        console.error('Lỗi khi gọi API thanh toán:', error);
        alert('Thanh toán thất bại!');
      }
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  // Render nội dung cho mỗi step
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        // Hiển thị info khách
        return (
          <div className='customer-order-content-table-order-info'>
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
                size='small'
              />
              <TextField 
                label="Date"
                value={reservationDate}
                variant="standard"
                InputProps={{ readOnly: true }}
                size='small'
              />
              <TextField 
                label="Time"
                value={`${timeIn} - ${timeOut}`}
                variant="standard"
                InputProps={{ readOnly: true }}
                size='small'
              />
              <TextField 
                label="Table Number"
                value={tableNumber}
                variant="standard"
                InputProps={{ readOnly: true }}
                size='small'
              />
              <TextField 
                label="Contact Phone"
                value={contactPhone}
                variant="standard"
                InputProps={{ readOnly: true }}
                size='small'
              />
              <TextField 
                label="Total Price"
                value={`$${totalPrice}`}
                variant="standard"
                InputProps={{ readOnly: true }}
                size='small'
              />
            </Box>
          </div>
        );
      case 1:
        // Chọn phương thức thanh toán
        return (
          <div className='payment-content-payment-method'>
            <Box>
              <FormControl component="fieldset" fullWidth sx={{ mb: 2 }}>
                <FormLabel component="legend">Select Payment Method</FormLabel>
                <RadioGroup
                  aria-label="payment method"
                  name="paymentMethod"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <FormControlLabel value="Credit Card" control={<Radio />} label="Credit Card" />
                  <FormControlLabel value="Mobile Payment" control={<Radio />} label="Mobile Payment" />
                  <FormControlLabel value="Cash" control={<Radio />} label="Cash" />
                </RadioGroup>
              </FormControl>
            </Box>
          </div>
        );
      case 2:
        // Hoàn tất
        return (
          <Box textAlign="center">
            <Typography variant="h5" gutterBottom>Payment Successful!</Typography>
            <Typography variant="body1">Thank you for your payment.</Typography>
          </Box>
        );
      default:
        return '';
    }
  };

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

        {/* Title */}
        <div className="dashboard-title">
          <div className='dashboard-title-content'>
            <h2>Payment</h2>
            <p>Here is our payment screen summary!</p>
          </div>
        </div>

        {/* Nội dung Payment */}
        <div className='payment-content'>
          <Box sx={{ width: '95%', p: 3 }}>
            <Stepper activeStep={activeStep}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <Box sx={{ mt: 2, mb: 1, minHeight: 200 }}>
              {getStepContent(activeStep)}
            </Box>

            {/* Nút điều hướng step (trừ bước cuối) */}
            {activeStep < steps.length - 1 && (
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleNext}>
                  {activeStep === steps.length - 2 ? 'Finish' : 'Next'}
                </Button>
              </Box>
            )}
          </Box>
        </div>
      </div>
    </div>
  );
}

export default Payment;
