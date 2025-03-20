import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/admincomponent/Navbar';
import '../../assets/css/Dashboard.css';
import '../../assets/css/MenuManagement.css';
import '../../assets/css/TableReservation.css';
import { IoIosSearch, IoMdNotifications, IoMdSettings } from "react-icons/io";
import { FcBusinessman } from "react-icons/fc";
import Badge from '@mui/material/Badge';
import Button from '../../components/admincomponent/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import axios from 'axios';
import Swal from 'sweetalert2';

const NewReservation = () => {
  const navigate = useNavigate();

  // Thông tin khách
  const [customerName, setCustomerName] = useState('');
  const [contact, setContact] = useState('');

  // Ngày & giờ
  const [dateValue, setDateValue] = useState(dayjs());
  const [checkinTime, setCheckinTime] = useState(dayjs().hour(15).minute(30));
  const [checkoutTime, setCheckoutTime] = useState(dayjs().hour(17).minute(30));

  // Số khách
  const [people, setPeople] = useState('');

  // Bàn trống
  const [tableValue, setTableValue] = useState('');
  const [availableTables, setAvailableTables] = useState([]);

  // Table state
  const [tableState, setTableState] = useState('');

  // 1) Hủy
  const handleCancelClick = () => {
    navigate('/admin-reservation');
  };

  // 2) Tạo ISO DateTime
  const getISODateTime = () => {
    const dateStr = dateValue.format('YYYY-MM-DD');
    const startStr = checkinTime.format('HH:mm:ss');
    const endStr = checkoutTime.format('HH:mm:ss');
    const isoStart = dayjs(`${dateStr}T${startStr}`).toISOString();
    const isoEnd = dayjs(`${dateStr}T${endStr}`).toISOString();
    return { isoStart, isoEnd };
  };

  // 3) Mở dropdown -> check-availability
  const handleTableDropdownOpen = async () => {
    if (!people) {
      Swal.fire('Warning', 'Please enter number of people before selecting table!', 'warning');
      return;
    }
    try {
      const { isoStart, isoEnd } = getISODateTime();
      const body = {
        resDate: isoStart,
        resEndDate: isoEnd,
        resNumber: parseInt(people),
      };
      const res = await axios.post('https://localhost:7115/api/Reservation/check-availability', body);
      if (res.data.statusCode !== 'Success') {
        Swal.fire('Error', res.data.message || 'Cannot get available tables', 'error');
        setAvailableTables([]);
        return;
      }
      const tables = res.data.data?.data;
      if (!tables || tables.length === 0) {
        Swal.fire('No tables', 'No tables available for this time', 'info');
        setAvailableTables([]);
        return;
      }
      setAvailableTables(tables);
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Error checking table availability', 'error');
    }
  };

  // 4) Chọn bàn
  const handleTableChange = (event) => {
    setTableValue(event.target.value);
  };

  // 5) Chọn trạng thái
  const handleTableStateChange = (event) => {
    setTableState(event.target.value);
  };

  // 6) Bấm Add -> create reservation (có kiểm tra)
  const handleSaveClick = async () => {
    try {
      // --- Kiểm tra các trường cơ bản ---
      if (!customerName || !contact || !people || !tableValue) {
        Swal.fire('Error', 'Please fill all required fields (Name, Phone, People, Table)', 'error');
        return;
      }

      // --- Kiểm tra số người 1–12 ---
      const numPeople = parseInt(people);
      if (numPeople < 1 || numPeople > 12) {
        Swal.fire('Error', 'Number of people must be between 1 and 12', 'error');
        return;
      }

      // --- Kiểm tra SĐT 10 chữ số ---
      if (!/^[0-9]{10}$/.test(contact)) {
        Swal.fire('Error', 'Phone number must be 10 digits', 'error');
        return;
      }

      // --- Kiểm tra tên chỉ chứa chữ (kể cả dấu) & khoảng trắng ---
      // \p{L} cho phép tất cả ký tự chữ (kể cả Unicode)
      // \s cho phép khoảng trắng
      // Dấu ?u để kích hoạt Unicode mode
      const namePattern = /^[\p{L}\s]+$/u;
      if (!namePattern.test(customerName.trim())) {
        Swal.fire('Error', 'Name must contain only letters (with or without diacritics) and spaces', 'error');
        return;
      }

      // --- Viết hoa chữ cái đầu của mỗi từ, còn lại thường ---
      const formattedName = customerName
        .trim()
        .split(/\s+/) // tách theo khoảng trắng
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');

      // Tạo ISO
      const { isoStart, isoEnd } = getISODateTime();

      // Gửi top-level (theo backend)
      const body = {
        TempCustomerName: formattedName,
        TempCustomerPhone: contact,
        tbiId: tableValue,
        resDate: isoStart,
        resEndTime: isoEnd,
        resNumber: numPeople,
        // status: tableState, // Nếu backend cho phép
      };

      // Gọi API
      const res = await axios.post('https://localhost:7115/api/Reservation/create-reservation', body);
      if (res.data.statusCode === 'Success') {
        Swal.fire('Success', res.data.data.message || 'Reservation created successfully!', 'success')
          .then(() => {
            navigate('/admin-reservation');
          });
      } else {
        Swal.fire('Error', res.data.message || 'Cannot create reservation', 'error');
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Error creating reservation', 'error');
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

        {/* Title */}
        <div className="dashboard-title">
          <h2>New Table Reservation</h2>
        </div>

        {/* Form */}
        <div className="detail-table-reservation-content">
          <div className="detail-table-reservation-content-form">
            <h3 className="detail-table-reservation-content-title">Reservation Information</h3>

            {/* Row 1: Customer Name + Contact */}
            <div className="detail-table-reservation-content-customer-container">
              <div className="detail-table-reservation-content-customer">
                <h4 className="detail-table-reservation-content-title">Customer Name</h4>
                <Box component="form" noValidate autoComplete="off">
                  <TextField
                    label="Customer Name"
                    size="small"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                </Box>
              </div>
              <div className="detail-table-reservation-content-customer">
                <h4 className="detail-table-reservation-content-title">Contact</h4>
                <Box component="form" noValidate autoComplete="off">
                  <TextField
                    label="Contact"
                    size="small"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                  />
                </Box>
              </div>
            </div>

            {/* Row 2: Date + People */}
            <div className="detail-table-reservation-content-customer-container">
              <div className="detail-table-reservation-content-customer">
                <h4 className="detail-table-reservation-content-title">Date</h4>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DateField']}>
                    <DateField
                      label="Date"
                      value={dateValue}
                      onChange={(newValue) => setDateValue(newValue)}
                      size="small"
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div className="detail-table-reservation-content-customer">
                <h4 className="detail-table-reservation-content-title">Number of People</h4>
                <Box component="form" noValidate autoComplete="off">
                  <TextField
                    label="Number"
                    type="number"
                    size="small"
                    value={people}
                    onChange={(e) => setPeople(e.target.value)}
                  />
                </Box>
              </div>
            </div>

            {/* Row 3: Checkin + Checkout */}
            <div className="detail-table-reservation-content-customer-container">
              <div className="detail-table-reservation-content-customer">
                <h4 className="detail-table-reservation-content-title">Checkin Time</h4>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['TimeField']}>
                    <TimeField
                      label="Checkin Time"
                      value={checkinTime}
                      onChange={(newValue) => setCheckinTime(newValue)}
                      size="small"
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div className="detail-table-reservation-content-customer">
                <h4 className="detail-table-reservation-content-title">Checkout Time</h4>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['TimeField']}>
                    <TimeField
                      label="Checkout Time"
                      value={checkoutTime}
                      onChange={(newValue) => setCheckoutTime(newValue)}
                      size="small"
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
            </div>

            {/* Row 4: Table + Table State */}
            <div className="detail-table-reservation-content-customer-container">
              <div className="detail-table-reservation-content-customer">
                <h4 className="detail-table-reservation-content-title">Table</h4>
                <FormControl sx={{ minWidth: 200 }} size="small">
                  <InputLabel id="table-label">Table</InputLabel>
                  <Select
                    labelId="table-label"
                    id="table-select"
                    onOpen={handleTableDropdownOpen}
                    value={tableValue}
                    label="Table"
                    onChange={handleTableChange}
                  >
                    {availableTables.length === 0 && (
                      <MenuItem value="">
                        <em>-- No table --</em>
                      </MenuItem>
                    )}
                    {availableTables.map((tbl) => (
                      <MenuItem key={tbl.tbiId} value={tbl.tbiId}>
                        Table {tbl.tbiTableNumber}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              {/* <div className="detail-table-reservation-content-customer">
                <h4 className="detail-table-reservation-content-title">Table State</h4>
                <FormControl sx={{ minWidth: 200 }} size="small">
                  <InputLabel id="state-label">Table State</InputLabel>
                  <Select
                    labelId="state-label"
                    id="state-select"
                    value={tableState}
                    label="Table State"
                    onChange={handleTableStateChange}
                  >
                    <MenuItem value=""><em>None</em></MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Serving">Serving</MenuItem>
                    <MenuItem value="Finished">Finished</MenuItem>
                    <MenuItem value="Cancelled">Cancelled</MenuItem>
                  </Select>
                </FormControl>
              </div> */}
            </div>

            {/* Row 5: Buttons */}
            <div className="detail-table-reservation-content-customer-container content-btn">
              <Button className="table-reservation-btn" onClick={handleCancelClick}>
                Cancel
              </Button>
              <Button className="table-reservation-btn" onClick={handleSaveClick}>
                Add
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewReservation;
