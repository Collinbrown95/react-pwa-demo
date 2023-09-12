// Sider.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FormOutlined, TableOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
const { Sider } = Layout;

const CustomSider = () => {
    return (
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
                console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
            }}
        >
            <div className="demo-logo-vertical" />
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['4']}
            >
                {/* Wrap Menu items with Link components */}
                <Menu.Item key="1" icon={<TableOutlined />}>
                    <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<FormOutlined />}>
                    <Link to="/page2">Create Case</Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
};

export default CustomSider;