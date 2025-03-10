import React, { useState } from 'react';
import '../../assets/css/Welcome.css';
import LoginForm from '../LoginForm';
import Button from '../../components/Button';

const Welcome = () => {
    const [showModal, setShowModal] = useState(false);

    const handleStart = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="welcome-container">
            <h1>Welcome to the Pizza Daay Restaurant Management System</h1>
            <Button onClick={handleStart}>Get Started</Button>
            {showModal && <LoginForm onClose={handleCloseModal} />}
        </div>
    )
}

export default Welcome;