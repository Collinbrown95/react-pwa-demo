import React from 'react';
import { Button, Form, Input, DatePicker } from 'antd';

import { Typography, Layout, Select } from 'antd';

import { db } from '../models/db';

const { Title } = Typography;

const { Option } = Select;

const CustomForm = () => {
    const onFinish = (values) => {
        handleButtonClick(
            values.date.$d,
            values.status,
        )
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleButtonClick = async function (date, caseStatus) {
        const id = await db.tb_cases.add({
            "date": date,
            "status": caseStatus,
        });
        console.log("created observation in IndexDB with id: ", id);
    }


    return (
        <Layout style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start'
        }}>
            <Title>Enter a Case</Title>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Date of Birth"
                    name="date"
                    rules={[{ required: true, message: 'Please input the date' }]}
                >
                    <DatePicker />
                </Form.Item>
                <Form.Item
                    name="gender"
                    label="Gender"
                    rules={[{ required: true, message: 'Please select gender!' }]}
                >
                    <Select placeholder="select your gender">
                        <Option value="male">Male</Option>
                        <Option value="female">Female</Option>
                        <Option value="other">Other</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Status"
                    name="status"
                    rules={[{ required: true, message: 'Please input the status' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Layout>
    )
};

export default CustomForm;