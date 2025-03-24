// src/pages/admin/TableReservation.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/admincomponent/Navbar';
import '../../assets/css/Dashboard.css';
import '../../assets/css/MenuManagement.css';
import '../../assets/css/TableReservation.css';
import { IoIosSearch, IoMdNotifications, IoMdSettings, IoIosAdd } from "react-icons/io";
import { FcBusinessman } from "react-icons/fc";
import Badge from '@mui/material/Badge';
import Button from '../../components/admincomponent/Button';
import { IoMdMore } from "react-icons/io";
import { DataGrid } from '@mui/x-data-grid';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { LuMapPinCheckInside } from "react-icons/lu";


const TableReservation = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);

  // Hàm fetch Reservations
  const fetchReservations = async () => {
    try {
      const requestBody = {
        pageIndex: 1,
        pageSize: 10,
        filterColumns: [
          {
            searchColumns: [],
            searchTerms: [],
            operator: 5
          }
        ],
        sortColumnsDictionary: {},
        filterRangeColumns: [],
        filterOption: 0,
        export: {
          chosenColumnNameList: {},
          pageName: "string"
        }
      };

      const response = await axios.post(
        'https://localhost:7115/api/Reservation/get-reservation',
        requestBody
      );
      console.log('API response:', response.data);

      if (response.data.statusCode === 'Success') {
        const apiItems = response.data.data.items || [];
        const newRows = apiItems.map((item) => ({
          // DataGrid bắt buộc phải có field "id", ta dùng resId
          id: item.resId,
          resId: item.resId,
          Table: item.tableNumber,
          Customer: item.customerName,
          Contact: item.contactPhone,
          Date: item.reservationDate?.split('T')[0],
          Timein: item.timeIn,
          Timeout: item.timeOut,
          People: item.numberOfPeople,
          Status: item.status
        }));
        setRows(newRows);
      }
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  // Hàm xử lý Check In
  const handleCheckIn = async (resId) => {
    try {
      await axios.put(`https://localhost:7115/api/Reservation/${resId}/check-in`);
      // Sau khi check in thành công, refetch để cập nhật lại bảng
      await fetchReservations();
      alert("Check-in thành công!");
    } catch (error) {
      console.error('Error checking in:', error);
      alert("Check-in thất bại!");
    }
  };

  // Định nghĩa cột cho DataGrid
  const columns = [
    { field: 'Table', width: 110 },
    { field: 'Customer', width: 160 },
    { field: 'Contact', width: 150 },
    { field: 'Date', width: 110 },
    { field: 'Timein', width: 110, headerName: 'Time-in' },
    { field: 'Timeout', width: 110, headerName: 'Time-out' },
    { field: 'People', width: 80 },
    {
      field: 'Status',
      width: 120,
      renderCell: (params) => {
        let bgColor = '';
        switch (params.value?.toLowerCase()) {
          case 'pending':
            bgColor = '#FCB96B';
            break;
          case 'serving':
            bgColor = '#2D9CDB';
            break;
          case 'finished':
            bgColor = '#6A9C89';
            break;
          case 'cancelled':
            bgColor = '#FF5B5B';
            break;
          default:
            bgColor = '#F3F2F7';
        }
        return (
          <div
            style={{
              backgroundColor: bgColor,
              color: '#F6F5F2',
              borderRadius: '15px',
              textAlign: 'center',
              width: '100%',
            }}
          >
            <p style={{ padding: '0', margin: '-8px' }}>{params.value}</p>
          </div>
        );
      },
    },
    {
      field: 'Action',
      width: 170,
      headerName: 'Actions',
      renderCell: (params) => {
        const { row } = params;
        const isPending = row.Status?.toLowerCase() === 'pending';

        return (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {/* Nút View */}
            <Button
              className='crud-icon'
              variant="contained"
              size="small"
              onClick={() =>
                navigate('/admin-reservation/detail-table-reservation', {
                  state: { resId: row.resId }
                })
              }
              style={{ marginRight: 8 }}
            >
              <MdOutlineRemoveRedEye />
            </Button>

            {/* Nút Check In - chỉ hiển thị khi pending */}
            {isPending && (
              <Button
                className='crud-icon'
                variant="contained"
                size="small"
                style={{
                  backgroundColor: '#FEC5D9',
                  color: 'black'
                }}
                onClick={() => handleCheckIn(row.resId)}
              >
                <LuMapPinCheckInside  />
              </Button>
            )}
          </div>
        );
      },
    },
    {
      field: 'detail',
      headerName: '',
      width: 40,
      renderCell: () => (
        <Link to="/admin-reservation/customer-order">
          <IoMdMore />
        </Link>
      ),
    }
  ];

  return (
    <div className="dashboard-container">
      <Navbar />

      <div className="dashboard-content">
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
            <h2>Table Reservation</h2>
            <p>Here is our reservation summary with graph view!</p>
          </div>
          <div className='dashboard-title-calendar'>
            {/* Nút dẫn đến trang NewReservation */}
            <Button onClick={() => navigate('/admin-reservation/new-table-reservation')}>
              <IoIosAdd className='dashboard-title-icon' />
              Add New
            </Button>
          </div>
        </div>

        <div className='table-reservation-content-table-order'>
          <div style={{ height: 550, width: '104%' }}>
            <DataGrid columns={columns} rows={rows} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableReservation;
