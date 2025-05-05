import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/admincomponent/Navbar';
import '../../assets/css/Dashboard.css';
import '../../assets/css/MenuManagement.css';
import '../../assets/css/TableReservation.css';
import {
  IoIosSearch,
  IoMdNotifications,
  IoMdSettings,
  IoIosAdd,
  IoMdMore
} from "react-icons/io";
import { FcBusinessman } from "react-icons/fc";
import Badge from '@mui/material/Badge';
import Button from '../../components/admincomponent/Button';
import { DataGrid } from '@mui/x-data-grid';
import { MdOutlineRemoveRedEye, MdCancel } from "react-icons/md";
import { LuMapPinCheckInside } from "react-icons/lu";
import Swal from 'sweetalert2';

const TableReservation = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);

  // Hàm fetch Reservations
  const fetchReservations = async () => {
    try {
      const requestBody = {
        pageIndex: 1,
        pageSize: 1000,
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
        // Map dữ liệu cho DataGrid
        const newRows = apiItems.map((item) => ({
          id: item.resId, // DataGrid cần "id"
          resId: item.resId,
          ordId: item.ordId,
          Table: item.tableNumber,
          Customer: item.customerName,
          Contact: item.contactPhone,
          Date: item.reservationDate?.split('T')[0], // YYYY-MM-DD
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
      await fetchReservations();
      Swal.fire({
        title: 'Thành công!',
        text: 'Check-in thành công!',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (error) {
      console.error('Error checking in:', error);
      Swal.fire({
        title: 'Thất bại!',
        text: 'Check-in thất bại!',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  // Hàm xử lý Cancel Reservation
  const handleCancelReservation = async (resId) => {
    try {
      await axios.post(`https://localhost:7115/api/Reservation/${resId}/cancel-reservation`);
      await fetchReservations();
      Swal.fire({
        title: 'Thành công!',
        text: 'Hủy đặt bàn thành công!',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (error) {
      console.error('Error cancelling reservation:', error);
      Swal.fire({
        title: 'Thất bại!',
        text: 'Hủy đặt bàn thất bại!',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  // Cột cho DataGrid
  const columns = [
    { field: 'Table', headerName: 'Table', flex: 0.7, minWidth: 70 },
    { field: 'Customer', headerName: 'Customer', flex: 1.4, minWidth: 140 },
    { field: 'Contact', headerName: 'Contact', flex: 1.1, minWidth: 110 },
    { field: 'Date', headerName: 'Date', flex: 1.0, minWidth: 100 },
    { field: 'Timein', headerName: 'Time‐in', flex: 1.0, minWidth: 100 },
    { field: 'Timeout', headerName: 'Time‐out', flex: 1.0, minWidth: 100 },
    { field: 'People', headerName: 'People', flex: 0.8, minWidth: 80 },
    {
      field: 'Status',
      headerName: 'Status',
      flex: 1.2,
      minWidth: 120,
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
          case 'canceled':
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
      flex: 2.0,
      minWidth: 200,
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
                  state: { 
                    resId: row.resId,
                    // Truyền thêm status để bên trang DetailTableReservation
                    // có thể hiển thị nút Payment khi status = serving
                    status: row.Status 
                  }
                })
              }
              style={{ marginRight: 8 }}
            >
              <MdOutlineRemoveRedEye />
            </Button>

            {/* Nút Check In - chỉ hiển thị khi pending */}
            {isPending && (
              <>
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
                  <LuMapPinCheckInside />
                </Button>

                {/* Nút Cancel Reservation - chỉ hiển thị khi pending */}
                <Button
                  className='crud-icon'
                  variant="contained"
                  size="small"
                  style={{
                    backgroundColor: '#FF5B5B',
                    color: 'white'
                  }}
                  onClick={() => handleCancelReservation(row.resId)}
                >
                  <MdCancel />
                </Button>
              </>
            )}
          </div>
        );
      },
    },
    // Cột detail sang trang CustomerOrder
    {
      field: 'detail',
      headerName: '',
      flex: 0.4,
      minWidth: 40,
      renderCell: (params) => {
        const { row } = params;
        return (
          <RouterLink
            to={
              `/admin-reservation/customer-order?` +
              `resId=${encodeURIComponent(row.resId || '')}` +
              `&ordId=${encodeURIComponent(row.ordId || '')}` +
              `&customerName=${encodeURIComponent(row.Customer || '')}` +
              `&contactPhone=${encodeURIComponent(row.Contact || '')}` +
              `&tableNumber=${encodeURIComponent(row.Table || '')}` +
              `&reservationDate=${encodeURIComponent(row.Date || '')}` +
              `&timeIn=${encodeURIComponent(row.Timein || '')}` +
              `&timeOut=${encodeURIComponent(row.Timeout || '')}` + 
              `&status=${encodeURIComponent(row.Status || '')}`
            }
          >
            <IoMdMore />
          </RouterLink>
        );
      },
    },
  ];

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
            <IoMdSettings className="icon" />
            <IoMdNotifications 
              className="icon" 
              style={{ cursor: 'pointer' }} 
              onClick={() => navigate('/all-notification')} 
            />
          </div>

          <div className="header-right">
            <p>Hello Manager</p>
            <FcBusinessman className="icon" />
          </div>
        </div>

        {/* Title */}
        <div className="dashboard-title">
          <div className='dashboard-title-content'>
            <h2>Table Reservation</h2>
            <p>Here is our reservation summary with graph view!</p>
          </div>
          <div className='dashboard-title-calendar'>
            <Button onClick={() => navigate('/admin-reservation/new-table-reservation')}>
              <IoIosAdd className='dashboard-title-icon' />
              Add New
            </Button>
          </div>
        </div>

        {/* Bảng Reservation */}
        <div className='table-reservation-content-table-order'>
          <div style={{ height: 550, width: '100%' }}>
            <DataGrid columns={columns} rows={rows} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableReservation;
