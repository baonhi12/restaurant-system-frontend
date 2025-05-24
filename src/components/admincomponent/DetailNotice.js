import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';

const initialRows = [
    // Reservation Notifications
    { id: 1, tableid: 'Table 1', title: 'No-show alert', content: 'Reservation #R1001 missed by customer after 15 mins.', time: '2023-10-01 18:15', type: 'Read' },
    { id: 2, tableid: 'Table 2', title: 'Last-minute cancellation', content: 'Reservation #R1002 was canceled 10 minutes before scheduled time.', time: '2023-10-01 18:50', type: 'Unread' },
];

const paginationModel = { page: 0, pageSize: 10 };

const DetailNotice = ({ filter }) => {
    const [allRows, setAllRows] = useState(initialRows);

    useEffect(() => {
        setAllRows(initialRows);
    }, []);
      
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
        <div className='dashboard-notification-item-content'>
            <Paper sx={{ height: 600, width: '100%' }}>
                <DataGrid
                    rows={displayRows}
                    columns={columns}
                    checkboxSelection
                    isRowSelectable={(params) => params.row.type === 'Unread'}
                    rowSelectionModel={rowSelectionModel}
                    onRowSelectionModelChange={handleRowSelectionChange}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[10, 15]}
                    sx={{ border: 0 }}
                />
            </Paper>
        </div>
    );
}

DetailNotice.propTypes = {
    filter: PropTypes.oneOf(['all', 'read', 'unread']),
};

DetailNotice.defaultProps = {
    filter: 'all',
};

export default DetailNotice;
