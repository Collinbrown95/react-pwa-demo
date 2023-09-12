// Import necessary dependencies
import React, { useEffect, useState } from 'react';
import { Table } from 'antd';

import MyWorker from '../worker?worker&inline'

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
const MyDataTable = () => {

    const [data, setData] = useState([]);

    const worker = new MyWorker();

    worker.addEventListener("message", async event => {
        if (event.data.type === "sqliteworkerResponse") {
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