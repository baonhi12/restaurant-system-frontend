import React, { useState, useEffect } from 'react';
import Navbar from '../../components/admincomponent/Navbar';
import '../../assets/css/Dashboard.css';
import '../../assets/css/TableReservation.css';
import '../../assets/css/TableStatus.css';
import { IoIosSearch, IoMdNotifications, IoMdSettings } from "react-icons/io";
import { FcBusinessman } from "react-icons/fc";
import Badge from '@mui/material/Badge';
// import Button from '../../components/admincomponent/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { experimentalStyled as styled } from '@mui/material/styles';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
// import InputLabel from '@mui/material/InputLabel';
// import FormControl from '@mui/material/FormControl';
// import Modal from '@mui/material/Modal';

const Item = styled(Paper)(({ status }) => ({
    backgroundColor: status === 'empty' ? '#A5B68D' : 'gray',
    padding: 16,
    textAlign: 'center',
    color: 'white',
    cursor: 'pointer',
    width: '90px'
}));

// const modalStyle = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 380,
//     bgcolor: 'background.paper',
//     borderRadius: '8px',
//     boxShadow: 24,
//     p: 4,
// };

const TableStatus = () => {
    const [tables, setTables] = useState([]);

    useEffect(() => {
        const fetchTables = async () => {
            try {
                const response = await fetch('https://192.168.1.65:443/api/Table/get-all-table', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        pageIndex: 1,
                        pageSize: 20,
                        filterColumns: [
                            {
                                searchColumns: [],
                                searchTerms: [],
                                operator: 0
                            }
                        ],
                        sortColumnsDictionary: {},
                        filterRangeColumns: [],
                        filterOption: 0,
                        export: {
                            chosenColumnNameList: {
                                additionalProp1: "string",
                                additionalProp2: "string",
                                additionalProp3: "string"
                            },
                            pageName: "string"
                        }
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    const tableList = data.items
                        .map(item => ({
                            id: item.tbiTableNumber,
                            status: item.tbiStatus.toLowerCase()
                        }))
                        .sort((a, b) => a.id - b.id); // Sắp xếp theo thứ tự tăng dần

                    setTables(tableList);
                } else {
                    console.error('Lỗi khi fetch dữ liệu từ API');
                }
            } catch (error) {
                console.error('Error fetching tables:', error);
            }
        };

        fetchTables();
    }, []);

    // Lọc ra các bàn có trạng thái 'empty'
    const availableTables = tables.filter(table => table.status === 'empty');

    return (
        <div className="dashboard-container">
            <Navbar />

            <div className="dashboard-content">
                <div className="dashboard-header">
                    <div className="input-group rounded">
                        <input type="search" className="form-control rounded" placeholder="Search here ..." aria-label="Search" aria-describedby="search-addon" />
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

                <div className="dashboard-title">
                    <div className='dashboard-title-content'>
                        <h2>Table Status</h2>
                        <p>Here is our table status summary!</p>
                    </div>
                    <div className='table-reservation-available-seat'>
                        <p>{availableTables.length} Available Table{availableTables.length !== 1 && 's'}</p>
                    </div>
                </div>

                <div className='table-status-monitoring-content'>
                    <h3>Table Status Monitoring</h3>
                    <div className='table-status-monitoring-detail-content'> 
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={{ xs: 3, md: 4 }} columns={{ xs: 4, sm: 6, md: 10 }}>
                                {tables.map((table) => (
                                    <Grid key={table.id} xs={6} sm={5} md={3}>
                                        <div>
                                            <Item status={table.status}>Table {table.id}</Item>
                                        </div>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </div>
                </div>
            </div>

            {/* Modal cập nhật trạng thái bàn (chưa sử dụng) */}
            {/*
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <h3 id="update-table-status-modal">Update Table Status</h3>
                    <FormControl fullWidth>
                        <InputLabel id="table-status-label">Status</InputLabel>
                        <Select
                        labelId="table-status-label"
                        id="table-status-select"
                        value={newStatus}
                        label="Status"
                        onChange={(e) => setNewStatus(e.target.value)}
                        >
                            <MenuItem value="empty">Empty</MenuItem>
                            <MenuItem value="occupied">Occupied</MenuItem>
                        </Select>
                    </FormControl>
                    <Box mt={2} display="flex" justifyContent="space-evenly">
                        <Button onClick={handleCloseModal} sx={{ mr: 3 }}>
                            Cancel
                        </Button>
                        <Button variant="contained" onClick={handleUpdateStatus}>
                            Update
                        </Button>
                    </Box>
                </Box>
            </Modal>
            */}
        </div>
    );
}

export default TableStatus;
