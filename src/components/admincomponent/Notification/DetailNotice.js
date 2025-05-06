import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { MdCheckCircle, MdWarning, MdError } from 'react-icons/md';
import { FaArrowDown  } from "react-icons/fa";

const initialRows = [
    // Reservation Notifications
    { id: "RN01", tableid: 'Table 1', title: 'No-show alert', content: 'Reservation #R1001 missed by customer after 15 mins.', time: '2023-10-01 18:15', priority: 'High', type: 'Read', category: 'reserve' },
    { id: "RN02", tableid: 'Table 2', title: 'Last-minute cancellation', content: 'Reservation #R1002 was canceled 10 minutes before scheduled time.', time: '2023-10-01 18:50', priority: 'Medium', type: 'Unread', category: 'reserve' },

    // Order Notifications
    { id: "ON01", tableid: 'Table 3', title: 'Delayed order', content: 'Order #O2001 is 10 minutes overdue from standard preparation time.', time: '2023-10-01 12:45', priority: 'High', type: 'Read', category: 'order' },
    { id: "ON02", tableid: 'Table 1', title: 'Ingredient unavailable', content: 'Cheddar cheese is out of stock for Order #O2002.', time: '2023-10-01 13:05', priority: 'Medium', type: 'Unread', category: 'order' },

    // Checkout & Payment Notifications
    { id: "CPN01", tableid: 'Table 6', title: 'Payment mismatch', content: 'Amount paid for Order #O3001 differs from system record.', time: '2023-10-01 15:00', priority: 'Medium', type: 'Unread', category: 'payment' },
    { id: "CPN02", tableid: 'Table 2', title: 'Refund requested', content: 'Customer requested refund for Order #O3002 due to wrong dish.', time: '2023-10-01 15:30', priority: 'High', type: 'Read', category: 'payment' },
    { id: "CPN03", tableid: 'Table 7', title: 'Card declined', content: 'Card declined during payment for Order #O3003.', time: '2023-10-01 16:00', priority: 'Medium', type: 'Unread', category: 'payment' },

    // Statistics Report Notifications
    { id: "SRN01", tableid: 'N/A', title: 'Revenue drop alert', content: 'Revenue for 2023-10-01 dropped 45% compared to average.', time: '2023-10-01 23:00', priority: 'Medium', type: 'Read', category: 'statistics' },
    { id: "SRN02", tableid: 'N/A', title: 'Order surge detected', content: 'Spike in order volume — 30 orders in last 10 minutes.', time: '2023-10-01 12:00', priority: 'High', type: 'Read', category: 'statistics' },
    { id: "SRN03", tableid: 'N/A', title: 'Low customer traffic', content: 'Customer visits fell below threshold today.', time: '2023-10-01 21:00', priority: 'Low', type: 'Unread', category: 'statistics' },

    // System & Maintenance Notifications
    { id: "SMN01", tableid: 'N/A', title: 'Payment API error', content: 'VNPay API failed to respond after 5 attempts.', time: '2023-10-01 11:50', priority: 'High', type: 'Unread', category: 'system' },
    { id: "SMN02", tableid: 'N/A', title: 'Database connection lost', content: 'Temporary loss of database access detected.', time: '2023-10-01 11:55', priority: 'High', type: 'Read', category: 'system' },
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
            <AccordionSummary aria-controls="panel1-content" id="panel1-header" expandIcon={<FaArrowDown  />}>
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
