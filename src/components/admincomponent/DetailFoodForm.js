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

const DetailFoodForm = ({ open, handleClose, mode, initialData }) => {
    const isEditable = mode === 'edit';

    const [foodName, setFoodName] = useState(initialData?.foodName || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [price, setPrice] = useState(initialData?.price || '');
    const [images, setImages] = useState(initialData?.images || '');
    const [file, setFile] = useState(null);

    useEffect(() => {
        if (initialData) {
          setFoodName(initialData.foodName);
          setDescription(initialData.description);
          setPrice(initialData.price);
          setImages(initialData.images);
        }
    }, [initialData]);

    const handleChange = (file) => {
        setFile(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditable) {
          // Xử lý dữ liệu form khi sửa, ví dụ gọi API cập nhật
          console.log({ foodName, description, price, images });
        }
        handleClose();
    };

    return (
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="add-new-food-modal-title"
        aria-describedby="add-new-food-modal-description"
        >
            <Box 
                component="form"
                sx={style}
                noValidate
                autoComplete="off"
            >
                <div className='header-form-add-food-close-icon'>
                    <IoIosClose onClick={handleClose}  />
                </div>
                <div className='header-form-add-food-title'>
                    <h3 className=''>{mode === 'view' ? 'Food Details' : 'Edit Food'}</h3>
                </div>
                <form onSubmit={handleSubmit} className='form-add-food'>
                    <TextField
                        required
                        id="outlined-required"
                        label="Food Name"
                        type="text"
                        value={foodName}
                        onChange={(e) => setFoodName(e.target.value)}
                        disabled={!isEditable}
                    />
                    <TextField
                        id="outlined-number"
                        label="Price"
                        type="number"
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            },
                            input: { min: 10, max: 100000 },
                        }}     
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        disabled={!isEditable}        
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="Description"
                        multiline
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        disabled={!isEditable}
                    />
                    {isEditable && (
                        <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
                    )}
                    {isEditable && (
                        <div className='form-add-food-button'>
                            <Button type="submit">Save</Button>
                        </div>
                    )}
                </form>
            </Box>
        </Modal>
    );
}

export default DetailFoodForm;