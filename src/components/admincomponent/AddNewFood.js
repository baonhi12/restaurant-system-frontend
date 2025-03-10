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

const AddNewFood = ({ open, handleClose }) => {
    const [foodName, setFoodName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [images, setImages] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý dữ liệu form, ví dụ gọi API hay cập nhật state
        console.log({ foodName, description, price, images });
        // Reset lại form (nếu cần) và đóng modal
        setFoodName('');
        setDescription('');
        setPrice('');
        setImages('');
        handleClose();
    };
    
    const [file, setFile] = useState(null);
    const handleChange = (file) => {
        setFile(file);
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
                    <h3 className=''>Add New Food</h3>
                </div>
                <form onSubmit={handleSubmit} className='form-add-food'>
                    <TextField
                        required
                        id="outlined-required"
                        label="Food Name"
                        type="text"
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
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="Description"
                        multiline
                        rows={3}
                    />
                    <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
                    <div className='form-add-food-button'>
                        <Button type="submit">Submit</Button>
                    </div>
                </form>
            </Box>
        </Modal>
    );
}

export default AddNewFood;
    