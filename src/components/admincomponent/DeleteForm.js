import * as React from 'react';
import Box from '@mui/material/Box';
import Button from './Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import '../../assets/css/MenuManagement.css';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    BorderRadius: 16,
    boxShadow: 24,
    p: 4,
};

const DeleteForm = ({ open, handleClose, onDelete }) => {
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h3">
                        Are you sure you want to delete this item?
                    </Typography>
                    <div className='modal-button-delete'>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={onDelete}>Delete</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default DeleteForm;