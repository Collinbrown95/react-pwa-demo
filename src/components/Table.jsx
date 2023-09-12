// Import necessary dependencies
import React, { useEffect, useState } from 'react';
import { Table } from 'antd';

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
            worker.postMessage(
                {
                    type: 'readRows',
                });
        }
        // If we get a 'readRows' message, render the response to the UI
        else if (event.data.type === "sqliteworkerResponse") {
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
        worker.postMessage(
            {
                type: 'readRows',
            });
    }, []);

    return (
        <Table
            dataSource={data}
            columns={columns}
        />
    );
};

export default MyDataTable;