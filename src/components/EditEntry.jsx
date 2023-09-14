// EditData.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Button, Layout } from 'antd';

const EditData = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/');
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div>
                <Button style={{ flex: '20%' }} type="primary" onClick={handleButtonClick}>
                    Back
                </Button>
            </div>
            <div>Edit Data Entry {id}</div>
        </div>
    )
};

export default EditData;

