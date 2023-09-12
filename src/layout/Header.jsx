// Header.tsx
import React from 'react';
import { theme } from 'antd';

import { Layout } from 'antd';
const { Header } = Layout;

const CustomHeader = () => {
    const { token: { colorBgContainer } } = theme.useToken();
    return (
        <Header style={{ background: colorBgContainer }}>
            TB PWA
        </Header>
    );
};

export default CustomHeader;