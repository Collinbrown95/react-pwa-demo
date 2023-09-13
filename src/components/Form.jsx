import React from 'react';
import { Button, Form, Input, DatePicker } from 'antd';

import { theme, Typography, Layout } from 'antd';

const { Title } = Typography;

const CustomForm = ({ worker }) => {
    const onFinish = (values) => {
        console.log(`[Form.jsx]:
        
Form submission successful.`);
        handleButtonClick(
            values.case_id,
            values.date.$d,
            values.status,
        )
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleButtonClick = function (caseId, date, caseStatus) {
        console.log(`[Form.jsx]:
        
Sending insertRow message to web worker with the following values:

{
    case_id: ${caseId},
    date: ${date},
    status: ${status}
}`);
        worker.postMessage(
            {
                type: 'insertRow',
                caseId,
                date,
                status: caseStatus,
            });
    }

    worker.addEventListener("message", async event => {
        if (event.data.type === "sqliteworkerResponse") {
            console.log(`[Form.jsx]:
            
Received ${event.data.payload} message from web worker, indicating form submission was saved in tb_cases.sqlite3`);
        }
    })
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
                    label="Case ID"
                    name="case_id"
                    rules={[{ required: true, message: 'Please input the Case ID' }]}
                >
                    <Input />
                </Form.Item>

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