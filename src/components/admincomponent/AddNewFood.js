// src/components/admincomponent/AddNewFood.js
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from './Button';
import Modal from '@mui/material/Modal';
import { IoIosClose } from "react-icons/io";
import { FileUploader } from "react-drag-drop-files";
import '../../assets/css/MenuManagement.css';

const fileTypes = ["JPG", "PNG"];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
};

const AddNewFood = ({ open, handleClose, onSuccess }) => {
  const [foodName, setFoodName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Xử lý file uploader: lấy file object
  const handleChange = (file) => {
    setFile(file);
  };

  // Validate đầu vào trước khi submit
  const validateInput = () => {
    if (!foodName.trim()) {
      setError("Food name is required");
      return false;
    }
    if (!description.trim()) {
      setError("Description is required");
      return false;
    }
    if (!price || Number(price) <= 0) {
      setError("Price must be greater than 0");
      return false;
    }
    return true;
  };

  // Khi submit form, gọi API POST tới backend để thêm món ăn
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Kiểm tra các trường bắt buộc
    if (!validateInput()) {
      return;
    }

    setLoading(true);

    // Chuẩn bị dữ liệu gửi đi, thêm mnuStatus mặc định là "Active"
    const newFoodData = {
      mnuName: foodName,
      mnuDescription: description,
      mnuPrice: Number(price),
      mnuStatus: "Active",
      // Nếu có file, gửi tên file; nếu không, backend có thể sử dụng ảnh mặc định
      mnuImage: file ? file.name : ''
    };

    try {
      const response = await fetch('https://localhost:7115/api/Menu/add_item_to_menu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newFoodData)
      });

      if (!response.ok) {
        throw new Error('Failed to add new food');
      }

      const result = await response.json();
      console.log('New food added:', result);
      // Reset form và đóng modal
      setFoodName('');
      setDescription('');
      setPrice('');
      setFile(null);
      handleClose();
      // Gọi callback để refresh danh sách món ăn nếu có
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="add-new-food-modal-title"
      aria-describedby="add-new-food-modal-description"
    >
      <Box component="form" sx={style} noValidate autoComplete="off" onSubmit={handleSubmit}>
        <div className='header-form-add-food-close-icon'>
          <IoIosClose onClick={handleClose} />
        </div>
        <div className='header-form-add-food-title'>
          <h3>Add New Food</h3>
        </div>
        <TextField
          required
          id="food-name"
          label="Food Name"
          type="text"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          id="food-price"
          label="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
          margin="normal"
          InputProps={{ inputProps: { min: 1, max: 100000 } }}
        />
        <TextField
          id="food-description"
          label="Description"
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
        />
        <div style={{ margin: '1rem 0' }}>
          <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className='form-add-food-button'>
          <Button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default AddNewFood;
