// Import necessary dependencies
import React, { useEffect, useState } from 'react';

import { theme, Typography } from 'antd';

import { Table } from 'antd';
import { Layout } from 'antd';

import { Button } from 'antd';

const { Title } = Typography;

// Placeholder event handler to simulate a user submitting censored/redacted data
const handleButtonClick = (event) => {
    const message = `Send Kafka event with a restricted subset of data, possibly with redaction/censoring applied.`;
    console.log(`[Table.jsx]:

${message}
`);
    alert(`
${message}

No data were actually sent in this demo; this alert is just for illustrative purposes.
    `);
};

// Define columns for the DataTable
const columns = [
    {
        title: 'Case ID',
        dataIndex: 'case_id',
        key: 'case_id',
    },
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
    },
];


// Create a functional component to render the DataTable
const MyDataTable = ({ worker }) => {

    const [data, setData] = useState([]);

    worker.addEventListener("message", async event => {
        // If we get a 'workerReady' event, need to send initial readRows message
        if (event.data.type === "workerReady") {
            console.log(`[Table.jsx]:
            
Received workerReady event from web worker.`);

            console.log(`[Table.jsx]:
            
Sending readRows message to web worker.`);
            worker.postMessage(
                {
                    type: 'readRows',
                });
        }
        // If we get a 'readRows' message, render the response to the UI
        else if (event.data.type === "sqliteworkerReadResponse") {
            console.log(`[Table.jsx]:
            
Received sqliteworkerReadResponse from web worker.`);

            console.log(`[Table.jsx]:
            
Rendering table using web worker response.`);
            // auto-incrementing key for react state
            let idCounter = 1;
            const myCases = event.data.payload.map(
                ([k1, k2, k3]) => (
                    {
                        key: idCounter++,
                        case_id: k1,
                        date: k2,
                        status: k3,
                    }
                )
            );
            setData(myCases);
        }
    })

    useEffect(() => {
        console.log(`[Table.jsx]:
        
Sending readRows message to web worker in useEffect hook.`);
        worker.postMessage(
            {
                type: 'readRows',
            });
    }, []);

    return (
        <Layout style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            flexWrap: 'wrap'
        }}>
            <Title>My Cases</Title>
            <Table
                dataSource={data}
                columns={columns}
            />
            <Button onClick={handleButtonClick} type="primary">Send to PHAC</Button>
        </Layout>
    );
};

export default MyDataTable;