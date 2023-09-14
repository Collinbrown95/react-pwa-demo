// Import necessary dependencies

import { Typography } from 'antd';

import { Link } from 'react-router-dom';
import { Table } from 'antd';
import { Layout } from 'antd';

import { Button } from 'antd';

import { useLiveQuery } from 'dexie-react-hooks';
import { Col, Divider, Row } from 'antd';
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
    {
        title: 'Actions',
        key: 'actions',
        render: (text, record) => (
            <div style={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <Row gutter={{ xs: 4, sm: 8, md: 12, lg: 16 }}>
                    <Col>
                        <Link to={`/edit/${record.key}`}>
                            <Button type="primary">Edit</Button>
                        </Link>
                    </Col>
                    <Col><Button type="primary" onClick={handleButtonClick}>Send to PHAC</Button>
                    </Col>
                </Row>
            </div>

        )
    }
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
            <Divider orientation="left">
                <Title>My Cases</Title>
            </Divider>
            <Table
                dataSource={tbData}
                columns={columns}
            />
        </Layout>
    );
};

export default MyDataTable;