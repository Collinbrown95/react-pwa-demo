// Header.tsx
import React from 'react';
import { theme } from 'antd';
import { PhacSignature } from './Signature';

import { Layout } from 'antd';

const { Header } = Layout;


const CustomHeader = () => {
    const { token: { colorBgContainer } } = theme.useToken();
    return (
        <Header style={{
            background: colorBgContainer,
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
        }}
        >
            <PhacSignature />
        </Header>
    );
};

export default CustomHeader;