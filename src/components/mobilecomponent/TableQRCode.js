import React from 'react';
import { QRCodeSVG } from 'qrcode.react';


const TableQRCode = () => {
    const tableId = "f4a2222a-4202-4bb7-a6a2-f98e850eca2e";
    const host = process.env.REACT_APP_HOST;
    const port = process.env.REACT_APP_PORT;
    const url = `http://${host}:${port}/homescreen?tableId=${tableId}`;
    
    return (
        <div 
            style={{ 
                padding: '1rem', 
                background: '#fff', 
                display: 'flex', 
                alignItems: 'center', 
                borderRadius: '8px', 
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)', 
                justifyContent: 'center', 
                flexDirection: 'column', 
                width: 'fit-content' 
            }}
        >
            <QRCodeSVG value={url} size={128} />
            <p style={{ textAlign: 'center', marginTop: '0.5rem' }}>
                Welcome to our restaurant 
            </p>
        </div>
    )
}

export default TableQRCode;