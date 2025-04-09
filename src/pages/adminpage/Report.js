// src/pages/adminpage/Report.js
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/admincomponent/Navbar';
import '../../assets/css/Dashboard.css';
import '../../assets/css/MenuManagement.css';
import '../../assets/css/TableReservation.css';
import { IoIosSearch, IoMdNotifications, IoMdSettings } from "react-icons/io";
import { FcBusinessman } from "react-icons/fc";
import Badge from '@mui/material/Badge';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import { MdOutlineNavigateNext } from "react-icons/md";
import axios from 'axios';
import { Box, TextField, Breadcrumbs, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';


// Custom Toolbar cho DataGrid (để sử dụng nút Export)
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const Report = () => {
  // State để lưu dữ liệu báo cáo (rows) và phân trang
  const [rows, setRows] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Hàm fetch report từ API
  const fetchReports = async () => {
    try {
      const requestBody = {
        pageIndex: pageIndex,
        pageSize: 10,
        filterColumns: [],
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
      };

      const response = await axios.post(
        'https://localhost:7115/api/Dashboard/get-all-report',
        requestBody
      );
      
      if(response.data) {
        const reportItems = response.data.items;
        // Chuyển đổi dữ liệu trả về thành rows cho DataGrid:
        const newRows = reportItems.map((item, index) => ({
          id: index + 1,
          Year: item.reportYear,
          Month: item.reportMonth,
          Day: item.reportDay,
          Revenue: item.totalRevenue,
          Customer: item.totalCustomers,
          Reservation: item.totalReservations,
          Dishes: item.totalDishesSold,
          Best: item.bestSellingDish
        }));
        setRows(newRows);
        setTotalPages(response.data.totalPages || 1);
      }
    } catch (error) {
      console.error("Error fetching reports: ", error);
    }
  };

  // Fetch report ngay khi component mount hoặc pageIndex thay đổi
  useEffect(() => {
    fetchReports();
  }, [pageIndex]);

  // Định nghĩa cột cho DataGrid
  const columns = [
    { field: 'Year', headerName: 'Year', width: 70 },
    { field: 'Month', headerName: 'Month', width: 70 },
    { field: 'Day', headerName: 'Day', width: 70 },
    { field: 'Revenue', headerName: 'Total Revenue ($)', width: 145 },
    { field: 'Customer', headerName: 'Total Customer', width: 145 },
    { field: 'Reservation', headerName: 'Total Table Reservation', width: 170 },
    { field: 'Dishes', headerName: 'Total Dishes Sold', width: 145 },
    { field: 'Best', headerName: 'Best-Selling Dish', width: 140 }
  ];

  // Breadcrumbs
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" component={RouterLink} to="/admin-reservation">
      Back
    </Link>,
    <Typography key="2" color="textPrimary">Statistical Report</Typography>,
  ];

  // Xử lý phân trang của DataGrid (nếu muốn cho nút phân trang ngoài)
  const handlePageChange = (event, value) => {
    setPageIndex(value);
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
            />
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
            <h2>Statistical Report</h2>
            <p>Here is our statistical report summary!</p>
          </div>
        </div>

        {/* Breadcrumbs */}
        <div className="customer-order-content-breadcrumbs">
          <Breadcrumbs separator={<MdOutlineNavigateNext fontSize="small" />} aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </div>

        {/* DataGrid hiển thị báo cáo */}
        <div className="table-reservation-content-table-order">
          <div style={{ height: 500, width: '100%' }}>
            <DataGrid 
              columns={columns} 
              rows={rows}
              components={{
                Toolbar: CustomToolbar,
              }}
            />
          </div>
        </div>

        {/* Phân trang (nếu muốn hiển thị ở ngoài DataGrid) */}
        <div className="dashboard-content-food-list-pagination">
          <Stack spacing={2}>
            <Pagination
              count={totalPages}
              page={pageIndex}
              onChange={handlePageChange}
              showFirstButton
              showLastButton
              color="primary"
            />
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default Report;
