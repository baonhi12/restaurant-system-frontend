// src/components/ReservationPageComponents/ReservationSection.js
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import food01 from '../../../assets/images/01.svg';
import food03 from '../../../assets/images/03.svg';
import food06 from '../../../assets/images/06.svg';
import { height, width } from '@mui/system';

function ReservationSection() {
  // STEP 1: Thời gian & số khách
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [countGuests, setCountGuests] = useState('');

  // STEP 2: Danh sách bàn & ID bàn chọn
  const [availableTables, setAvailableTables] = useState([]);
  const [selectedTableId, setSelectedTableId] = useState(null);

  // STEP 3: Thông tin khách
  const [tempCustomerName, setTempCustomerName] = useState('');
  const [tempCustomerPhone, setTempCustomerPhone] = useState('');
  const [note, setNote] = useState('');

  // Quản lý bước
  const [step, setStep] = useState(1);

  const navigate = useNavigate();

  // =========================
  // STEP 1: CHECK AVAILABILITY
  // =========================
  const handleCheckAvailability = async (e) => {
    e.preventDefault();

    if (!startDate || !endDate || !countGuests) {
      Swal.fire('Error', 'Please fill all fields: Start time, End time, Number of guests', 'error');
      return;
    }
    if (new Date(startDate) >= new Date(endDate)) {
      Swal.fire('Error', 'End time must be after Start time', 'error');
      return;
    }
    if (parseInt(countGuests) <= 0) {
      Swal.fire('Error', 'Number of guests must be > 0', 'error');
      return;
    }

    try {
      const isoStart = new Date(startDate).toISOString();
      const isoEnd = new Date(endDate).toISOString();

      // Lưu ý: Check availability dùng "resEndDate" thay vì "resEndTime"
      const body = {
        resDate: isoStart,
        resEndDate: isoEnd,
        resNumber: parseInt(countGuests),
      };

      const res = await axios.post('https://localhost:7115/api/Reservation/check-availability', body);

      if (res.data.statusCode !== 'Success') {
        Swal.fire('Error', res.data.message || 'Cannot get available tables', 'error');
        return;
      }

      // Theo log Swagger, response: { data: { success: true, data: [ { tbiId, tbiTableNumber } ] } }
      const tables = res.data.data?.data;
      if (!tables || (Array.isArray(tables) && tables.length === 0)) {
        Swal.fire('No tables', 'No tables available for this time', 'info');
        return;
      }

      const arrTables = Array.isArray(tables) ? tables : [tables];
      setAvailableTables(arrTables);
      setStep(2);
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Error checking table availability', 'error');
    }
  };

  // =========================
  // STEP 2: CHOOSE TABLE
  // =========================
  const handleSelectTable = (table) => {
    console.log('Selected table:', table);
    setSelectedTableId(table.tbiId); // hoặc table.tblId nếu server trả về như vậy
    setStep(3);
  };

  // =========================
  // STEP 3: CREATE RESERVATION
  // =========================
  const handleCreateReservation = async (e) => {
    e.preventDefault();

    if (!/^[A-Za-z\s]+$/.test(tempCustomerName)) {
      Swal.fire('Error', 'Name must only contain letters.', 'error');
      return;
    }
    const formattedName = tempCustomerName.trim().split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');

    if (!/^[0-9]{10}$/.test(tempCustomerPhone)) {
      Swal.fire('Error', 'Phone number must be exactly 10 digits', 'error');
      return;
    }

    console.log('Selected table ID:', selectedTableId);

    try {
      const isoStart = new Date(startDate).toISOString();
      const isoEnd = new Date(endDate).toISOString();

      // Note: create-reservation sử dụng "resEndTime"
      const body = {
        tempCustomerName: formattedName,
        tempCustomerPhone,
        tbiId: selectedTableId,
        resDate: isoStart,
        resEndTime: isoEnd,
        resNumber: parseInt(countGuests),
        // note: note, // gửi nếu cần
      };

      const res = await axios.post('https://localhost:7115/api/Reservation/create-reservation', body);

      if (res.data.statusCode === 'Success' || res.data.data?.success === true) {
        Swal.fire({
          title: 'Success!',
          text: 'Reservation created successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          navigate('/thank-you');
        });

        // Reset form (nếu cần)
        setStep(1);
        setSelectedTableId(null);
        setAvailableTables([]);
        setTempCustomerName('');
        setTempCustomerPhone('');
        setNote('');
        setStartDate('');
        setEndDate('');
        setCountGuests('');
      } else {
        Swal.fire('Error', res.data.message || 'Cannot create reservation', 'error');
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Error creating reservation', 'error');
    }
  };

  // =========================
  // RENDER
  // =========================
  return (
    <section id="reservationSection" style={styles.section}>
      <div style={styles.container}>
        <div style={styles.headingWrapper}>
          <p style={styles.smallTitle}>GET IN TOUCH</p>
          <h2 style={styles.mainTitle}>Reservation Table &amp; Enjoy Dinner</h2>
        </div>

        <div style={styles.contentRow}>
          <div style={styles.leftCol}>
            <img src={food01} alt="Food 1" style={styles.foodImageSide} />
            <img src={food03} alt="Food 2" style={styles.foodImageMiddle} />
            <img src={food06} alt="Food 3" style={styles.foodImageSide} />
          </div>

          <div style={styles.rightCol}>
            {step === 1 && ( 
              <form onSubmit={handleCheckAvailability} style={styles.form}>
                <input
                  type="datetime-local"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  style={styles.input}
                  required
                />
                <input
                  type="datetime-local"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  style={styles.input}
                  required
                />
                <input
                  type="number"
                  placeholder="Number of guests"
                  value={countGuests}
                  onChange={(e) => setCountGuests(e.target.value)}
                  style={styles.input}
                  required
                />
                <button type="submit" style={styles.button}>
                  CHECK AVAILABILITY
                </button>
              </form>
            )}

            {step === 2 && (
              <div style={{ ...styles.form, ...styles.tableList }}>
                {availableTables.map((table, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectTable(table)}
                    style={styles.tableButton}
                  >
                    Table {table.tbiTableNumber}
                  </button>
                ))}
              </div>
            )}

            {step === 3 && (
              <form onSubmit={handleCreateReservation} style={styles.form}>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={tempCustomerName}
                  onChange={(e) => setTempCustomerName(e.target.value)}
                  style={styles.input}
                  required
                />
                <input
                  type="text"
                  placeholder="Phone No"
                  value={tempCustomerPhone}
                  onChange={(e) => setTempCustomerPhone(e.target.value)}
                  style={styles.input}
                  required
                />
                <textarea
                  placeholder="Note"
                  rows={3}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  style={{ ...styles.input, ...styles.textarea }}
                />
                <button type="submit" style={styles.button}>
                  BOOK NOW
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReservationSection;

/* ---------- Styles ---------- */
const styles = {
  section: {
    backgroundColor: '#FFEFC7',
    padding: '3rem 2rem',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  headingWrapper: {
    marginBottom: '2rem',
    textAlign: 'left',
  },
  smallTitle: {
    color: '#FF5B5B',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },
  mainTitle: {
    fontSize: '30px',
    fontWeight: 'bold',
    color: '#333',
    textTransform: 'uppercase',
  },
  contentRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2rem',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  leftCol: {
    display: 'flex',
    flex: '1 1 0',
    minWidth: '300px',
    gap: '1rem',
  },
  foodImageMiddle: {
    width: '250px',
    height: '250px',
    objectFit: 'cover',
    borderRadius: '20px',
  },
  foodImageSide: {
    width: '250px',
    height: '250px',
    objectFit: 'cover',
    borderRadius: '20px',
    marginTop: '120px',
  },
  rightCol: {
    flex: '1',
    minWidth: '300px',
    display: 'flex',
    justifyContent: 'center',
  },
  form: {
    width: '20rem',
    maxWidth: '500px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gridTemplateColumns: '1fr 1fr',
    columnGap: '2rem',
    rowGap: '2rem',
  },
  input: {
    padding: '1rem',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#fff',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    fontSize: '1rem',
    outline: 'none',
    width: '15rem',
  },
  textarea: {
    gridColumn: '1 / 3',
    resize: 'none',
  },
  button: {
    backgroundColor: '#FF5B5B',
    width: '15rem',
    height: '3rem',
    color: '#FFFFFF',
    border: 'none',
    padding: '5px',
    borderRadius: '13px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '1rem',
    textTransform: 'uppercase',
  },
  tableList: {
    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
    columnGap: '1rem',
    rowGap: '1rem',
  },
  tableButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: '13px',
    border: '1px solid #FF5B5B',
    padding: '1rem',
    fontSize: '15px',
    cursor: 'pointer',
    width: '8rem',
    height: '3rem',
    fontWeight: '600',
    color: '#FF5B5B',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
};
