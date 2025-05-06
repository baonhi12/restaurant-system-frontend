import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { MdCheckCircle, MdWarning, MdError } from 'react-icons/md';

const initialRows = [
    // Reservation Notifications
    { id: 1, tableid: 'Table 1', title: 'No-show alert', content: 'Reservation #R1001 missed by customer after 15 mins.', time: '2023-10-01 18:15', priority: 'High', type: 'Unread', category: 'reserve' },
    { id: 2, tableid: 'Table 2', title: 'Last-minute cancellation', content: 'Reservation #R1002 was canceled 10 minutes before scheduled time.', time: '2023-10-01 18:50', priority: 'Medium', type: 'Unread', category: 'reserve' },
    { id: 3, tableid: 'Table 3', title: 'Party size updated', content: 'Customer updated guest count from 4 to 6 for Reservation #R1003.', time: '2023-10-01 17:40', priority: 'Low', type: 'Unread', category: 'reserve' },
    { id: 4, tableid: 'Table 4', title: 'New table booking', content: 'New reservation #R1004 scheduled at 19:30.', time: '2023-10-01 16:00', priority: 'Low', type: 'Unread', category: 'reserve' },
    { id: 5, tableid: 'Table 5', title: 'Reservation conflict', content: 'Two overlapping bookings detected for Table 5 at 20:00.', time: '2023-10-01 17:00', priority: 'High', type: 'Unread', category: 'reserve' },

    // Order Notifications
    { id: 6, tableid: 'Table 3', title: 'Delayed order', content: 'Order #O2001 is 10 minutes overdue from standard preparation time.', time: '2023-10-01 12:45', priority: 'High', type: 'Unread', category: 'order' },
    { id: 7, tableid: 'Table 1', title: 'Ingredient unavailable', content: 'Cheddar cheese is out of stock for Order #O2002.', time: '2023-10-01 13:05', priority: 'Medium', type: 'Unread', category: 'order' },
    { id: 8, tableid: 'Table 2', title: 'Order cancellation by kitchen', content: 'Kitchen canceled Order #O2003 due to oven malfunction.', time: '2023-10-01 13:20', priority: 'High', type: 'Unread', category: 'order' },
    { id: 9, tableid: 'Table 4', title: 'New food order received', content: 'Order #O2004 with 3 pizzas submitted successfully.', time: '2023-10-01 14:00', priority: 'Low', type: 'Unread', category: 'order' },
    { id: 10, tableid: 'Table 5', title: 'Customer changed order', content: 'Item in Order #O2005 replaced with a vegetarian option.', time: '2023-10-01 14:30', priority: 'Low', type: 'Unread', category: 'order' },

    // Checkout & Payment Notifications
    { id: 11, tableid: 'Table 6', title: 'Payment mismatch', content: 'Amount paid for Order #O3001 differs from system record.', time: '2023-10-01 15:00', priority: 'Medium', type: 'Unread', category: 'payment' },
    { id: 12, tableid: 'Table 2', title: 'Refund requested', content: 'Customer requested refund for Order #O3002 due to wrong dish.', time: '2023-10-01 15:30', priority: 'High', type: 'Unread', category: 'payment' },
    { id: 13, tableid: 'Table 7', title: 'Card declined', content: 'Card declined during payment for Order #O3003.', time: '2023-10-01 16:00', priority: 'Medium', type: 'Unread', category: 'payment' },
    { id: 14, tableid: 'Table 3', title: 'Cash payment received', content: 'Cash payment confirmed for Order #O3004.', time: '2023-10-01 16:15', priority: 'Low', type: 'Unread', category: 'payment' },
    { id: 15, tableid: 'Table 5', title: 'Suspicious transaction', content: 'Multiple failed payment attempts detected for customer.', time: '2023-10-01 16:30', priority: 'High', type: 'Unread', category: 'payment' },

    // Statistics Report Notifications
    { id: 16, tableid: 'N/A', title: 'Revenue drop alert', content: 'Revenue for 2023-10-01 dropped 45% compared to average.', time: '2023-10-01 23:00', priority: 'Medium', type: 'Unread', category: 'statistics' },
    { id: 17, tableid: 'N/A', title: 'Order surge detected', content: 'Spike in order volume — 30 orders in last 10 minutes.', time: '2023-10-01 12:00', priority: 'High', type: 'Unread', category: 'statistics' },
    { id: 18, tableid: 'N/A', title: 'Low customer traffic', content: 'Customer visits fell below threshold today.', time: '2023-10-01 21:00', priority: 'Low', type: 'Unread', category: 'statistics' },
    { id: 19, tableid: 'N/A', title: 'Top-selling item', content: 'Pepperoni Pizza was the most ordered item today.', time: '2023-10-01 22:00', priority: 'Low', type: 'Unread', category: 'statistics' },
    { id: 20, tableid: 'N/A', title: 'Inventory usage report', content: 'Tomato sauce usage exceeded daily average by 30%.', time: '2023-10-01 20:30', priority: 'Medium', type: 'Unread', category: 'statistics' },

    // System & Maintenance Notifications
    { id: 21, tableid: 'N/A', title: 'Payment API error', content: 'VNPay API failed to respond after 5 attempts.', time: '2023-10-01 11:50', priority: 'High', type: 'Unread', category: 'system' },
    { id: 22, tableid: 'N/A', title: 'Database connection lost', content: 'Temporary loss of database access detected.', time: '2023-10-01 11:55', priority: 'High', type: 'Unread', category: 'system' },
    { id: 23, tableid: 'N/A', title: 'Scheduled maintenance', content: 'System will go under maintenance at 2:00 AM.', time: '2023-10-01 10:00', priority: 'Low', type: 'Unread', category: 'system' },
    { id: 24, tableid: 'N/A', title: 'New system update available', content: 'Version 1.2.0 ready for deployment.', time: '2023-10-01 09:00', priority: 'Low', type: 'Unread', category: 'system' },
    { id: 25, tableid: 'N/A', title: 'Suspicious activity detected', content: 'Unusual login pattern from admin panel.', time: '2023-10-01 08:30', priority: 'High', type: 'Unread', category: 'system' }, 
];

const paginationModel = { page: 0, pageSize: 5 };

const DetailNotice = ({ filter, title, category  }) => {
    // const [allRows, setAllRows] = useState(initialRows);
    const [allRows, setAllRows] = useState(
        initialRows.filter(r => r.category === category)
    );

    useEffect(() => {
        setAllRows(initialRows.filter(r => r.category === category));
    }, [category]);
      
    const [rowSelectionModel, setRowSelectionModel] = useState(
        allRows.filter(r => r.type === 'Read').map(r => r.id)
    );

    // derive filtered rows based on parent filter prop
    const [displayRows, setDisplayRows] = useState([]);
    useEffect(() => {
        let base = allRows;
        if (filter === 'read')   base = allRows.filter(r => r.type === 'Read');
        if (filter === 'unread') base = allRows.filter(r => r.type === 'Unread');
        setDisplayRows(base);
    }, [filter, allRows]);

    // Handle selection: mark Unread->Read
    const handleRowSelectionChange = newSelection => {
        setAllRows(prev =>
        prev.map(r =>
            newSelection.includes(r.id) && r.type === 'Unread'
            ? { ...r, type: 'Read' }
            : r
        )
        );
        setRowSelectionModel(newSelection);
    };

    const columns = [
        { field: 'id', headerName: 'ID', flex: 0.5, minWidth:  70 },
        { field: 'tableid', headerName: 'Table', flex: 0.8, minWidth: 70 },
        { field: 'title', headerName: 'Title', flex: 1.3, minWidth: 130 },
        { field: 'content', headerName: 'Content', flex: 2.3, minWidth: 130 },
        { field: 'time', headerName: 'Time', flex: 1.3, minWidth: 130 },
        { 
            field: 'priority', 
            headerName: 'Priority', 
            flex: 1.3, 
            minWidth: 130,
            renderCell: (params) => {
                let IconComponent, color;
                switch (params.value) {
                    case 'Low':
                        IconComponent = MdCheckCircle;
                        color = '#28a745'; // green
                        break;
                    case 'Medium':
                        IconComponent = MdWarning;
                        color = '#ffc107'; // amber
                        break;
                    case 'High':
                        IconComponent = MdError;
                        color = '#dc3545'; // red
                        break;
                    default:
                        IconComponent = MdWarning;
                        color = '#6c757d'; // gray
                }
                return (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <IconComponent size={24} style={{ color }} />
                        <span style={{ marginLeft: 8 }}>{params.value}</span>
                    </div>
                );
            },
        },
        {
            field: 'type',
            headerName: 'Read/Unread',
            flex: 1.3,
            minWidth: 130,
            renderCell: (params) => {
                const isRead = params.value === 'Read';
                const color = isRead ? '#6c757d' /* gray */ : '#dc3545' ;
                return (
                    <span style={{ color, fontWeight: 500 }}>
                        {params.value}
                    </span>
                );
            },
        },
    ]; 

    return (
        <Accordion>
            <AccordionSummary aria-controls="panel1-content" id="panel1-header">
                {/* <Typography component="span">Notice Table Reservation</Typography> */}
                <Typography component="span">{title}</Typography>
            </AccordionSummary>

            <div className='dashboard-notification-item-content'>
                <Paper sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={displayRows}
                        columns={columns}
                        checkboxSelection
                        isRowSelectable={(params) => params.row.type === 'Unread'}
                        rowSelectionModel={rowSelectionModel}
                        onRowSelectionModelChange={handleRowSelectionChange}
                        initialState={{ pagination: { paginationModel } }}
                        pageSizeOptions={[5, 10]}
                        sx={{ border: 0 }}
                    />
                </Paper>
            </div>
        </Accordion>
    );
}

DetailNotice.propTypes = {
    filter: PropTypes.oneOf(['all', 'read', 'unread']),
    title:  PropTypes.string,
    category: PropTypes.string.isRequired,
};

DetailNotice.defaultProps = {
    filter: 'all',
    title:  'Notice Table Reservation',
};

export default DetailNotice;
