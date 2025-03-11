import React, { useState } from 'react';
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

const steps = ['Checkout', 'Payment', 'Complete'];

function getStepContent(step, paymentMethod, setPaymentMethod) {
    switch (step) {
        case 0:
            return (
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
                </div>
            );
        case 1:
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
                                    row
                                >
                                    <FormControlLabel value="card" control={<Radio />} label="Credit Card" />
                                    <FormControlLabel value="ewallet" control={<Radio />} label="E-Wallet" />
                                    <FormControlLabel value="cash" control={<Radio />} label="Cash" />
                                </RadioGroup>
                            </FormControl>
                        {paymentMethod === 'card' && (
                            <Box>
                                <TextField
                                    label="Card Number"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="Expiry Date"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="CVV"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                />
                            </Box>
                        )}
                        {paymentMethod === 'ewallet' && (
                            <Box>
                                <TextField
                                    label="E-Wallet ID"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                />
                            </Box>
                        )}
                        {paymentMethod === 'cash' && (
                            <Box>
                                <Typography>Please prepare the exact cash amount.</Typography>
                            </Box>
                        )}
                    </Box>
                </div>
            );
        case 2:
            return (
            <Box textAlign="center">
                <Typography variant="h5" gutterBottom> Payment Successful! </Typography>
                <Typography variant="body1"> Thank you for your payment.</Typography>
            </Box>
            );
        default:
            return 'Unknown step';
    }
}

const Payment = () => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [paymentMethod, setPaymentMethod] = React.useState('card');

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
        setPaymentMethod('card');
    };

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
                        <h2>Payment</h2>
                        <p>Here is our payment screen summary!</p>
                    </div>
                </div>

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
                            {getStepContent(activeStep, paymentMethod, setPaymentMethod)}
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            > Back </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            {activeStep === steps.length - 1 ? (
                                <Button onClick={handleReset}>Reset</Button>
                            ) : (
                                <Button onClick={handleNext}>
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            )}
                        </Box>
                    </Box>
                </div>
            </div>
        </div>
    );
}

export default Payment;