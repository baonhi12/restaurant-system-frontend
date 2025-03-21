// src/components/admincomponent/DetailFoodForm.js
import React, { useState, useEffect } from 'react';
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

const DetailFoodForm = ({ open, handleClose, mode, initialData, onSuccess }) => {
  const isEditable = (mode === 'edit');

  const [mnuId, setMnuId] = useState('');
  const [mnuName, setMnuName] = useState('');
  const [mnuPrice, setMnuPrice] = useState('');
  const [mnuDescription, setMnuDescription] = useState('');
  const [mnuImage, setMnuImage] = useState('');
  const [file, setFile] = useState(null);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Khi initialData thay đổi => cập nhật state
  useEffect(() => {
    if (initialData) {
      setMnuId(initialData.mnuId || '');
      setMnuName(initialData.mnuName || '');
      setMnuPrice(initialData.mnuPrice || '');
      setMnuDescription(initialData.mnuDescription || '');
      setMnuImage(initialData.mnuImage || '');
    }
  }, [initialData]);

  // Xử lý file upload
  const handleChange = (file) => {
    setFile(file);
  };

  // Validate
  const validateInput = () => {
    if (!mnuName.trim()) {
      setError("Food name is required");
      return false;
    }
    if (!mnuDescription.trim()) {
      setError("Description is required");
      return false;
    }
    if (!mnuPrice || Number(mnuPrice) <= 0) {
      setError("Price must be > 0");
      return false;
    }
    return true;
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Nếu chỉ view => đóng modal
    if (!isEditable) {
      handleClose();
      return;
    }

    // Kiểm tra input
    if (!validateInput()) {
      return;
    }

    setLoading(true);

    // Nếu có file upload mới => dùng file.name, không thì giữ mnuImage cũ
    const updatedImage = file ? file.name : mnuImage;

    // Dữ liệu update
    const updatedData = {
      mnuId: mnuId,
      mnuName: mnuName,
      mnuPrice: Number(mnuPrice),
      mnuStatus: "Active",
      mnuImage: updatedImage,
      mnuDescription: mnuDescription
    };

    try {
      // Gọi PUT /api/Menu/update/{mnuId}
      const response = await fetch(`https://localhost:7115/api/Menu/update/${mnuId}`, {
        method: 'PUT', // theo Swagger
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      });

      if (!response.ok) {
        throw new Error('Failed to edit food');
      }

      const result = await response.json();
      console.log('Edit success:', result);

      // Gọi callback refresh list
      if (onSuccess) {
        onSuccess();
      }
      handleClose();
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
      aria-labelledby="detail-food-form-modal-title"
      aria-describedby="detail-food-form-modal-description"
    >
      <Box 
        component="form"
        sx={style}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div className='header-form-add-food-close-icon'>
          <IoIosClose onClick={handleClose} />
        </div>
        <div className='header-form-add-food-title'>
          <h3>{isEditable ? 'Edit Food' : 'Food Details'}</h3>
        </div>

        <TextField
          required
          label="Food Name"
          type="text"
          value={mnuName}
          onChange={(e) => setMnuName(e.target.value)}
          fullWidth
          margin="normal"
          disabled={!isEditable}
        />
        <TextField
          label="Price"
          type="number"
          value={mnuPrice}
          onChange={(e) => setMnuPrice(e.target.value)}
          fullWidth
          margin="normal"
          disabled={!isEditable}
        />
        <TextField
          label="Description"
          multiline
          rows={3}
          value={mnuDescription}
          onChange={(e) => setMnuDescription(e.target.value)}
          fullWidth
          margin="normal"
          disabled={!isEditable}
        />

        {isEditable && (
          <div style={{ margin: '1rem 0' }}>
            <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
          </div>
        )}

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {isEditable && (
          <div className='form-add-food-button'>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </Button>
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default DetailFoodForm;
