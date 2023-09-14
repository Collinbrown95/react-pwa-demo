import React from 'react';
import { Button, Form, Input, DatePicker } from 'antd';

import { theme, Typography, Layout } from 'antd';

const { Title } = Typography;

import { db } from '../models/db';

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
                    label="Date"
                    name="date"
                    rules={[{ required: true, message: 'Please input the date' }]}
                >
                    <DatePicker />
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