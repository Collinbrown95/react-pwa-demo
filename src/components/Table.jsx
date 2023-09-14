// Import necessary dependencies
import React, { useEffect, useState } from 'react';

import { theme, Typography } from 'antd';

import { Table } from 'antd';
import { Layout } from 'antd';

import { Button } from 'antd';

import { useLiveQuery } from 'dexie-react-hooks';

import { db } from '../models/db';

const { Title } = Typography;

// Placeholder event handler to simulate a user submitting censored/redacted data
const handleButtonClick = (event) => {
    const message = `Send Kafka event with a restricted subset of data, possibly with redaction/censoring applied.`;
    alert(`
${message}

No data were actually sent in this demo; this alert is just for illustrative purposes.
    `);
};

// Define columns for the DataTable
const columns = [
    {
        title: 'Case ID',
        dataIndex: 'key',
        key: 'key',
    },
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        render: (date, record) => {
            // TODO: render is deprecated, find a substitute for this
            return date.toString();
        }
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
    },
];


// Create a functional component to render the DataTable
const MyDataTable = () => {

    const tbData = useLiveQuery(() => db.tb_cases.toArray());

    return (
        <Layout style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            flexWrap: 'wrap'
        }}>
            <Title>My Cases</Title>
            <Table
                dataSource={tbData}
                columns={columns}
            />
            <Button onClick={handleButtonClick} type="primary">Send to PHAC</Button>
        </Layout>
    );
};

export default MyDataTable;