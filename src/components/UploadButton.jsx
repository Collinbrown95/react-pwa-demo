import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';

import { createWorker } from 'tesseract.js';

const UploadButton = () => {

    const beforeUpload = async function (file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        // Create file reader
        const reader = new FileReader();

        reader.onload = async (e) => {
            setLoading(true);
            const imageData = e.target.result;
            const worker = await createWorker({});
            await worker.loadLanguage('eng');
            await worker.initialize('eng');
            const data = await worker.recognize(imageData);
            console.log(data)
            setOcrData(data.data.text);
            await worker.terminate();
            setLoading(false);
        }
        reader.readAsDataURL(file);
        console.log()
        return false
    };

    const [loading, setLoading] = useState(false);
    const [ocrData, setOcrData] = useState("no ocr data");

    return (
        <>
            <Upload
                name="avatar"
                listType="picture-circle"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
            >
                <div>
                    {loading ? <LoadingOutlined /> : <PlusOutlined />}
                    <div style={{ marginTop: 8 }}>Upload</div>
                </div>
            </Upload>
            <span style={{ whiteSpace: "pre-line" }}>
                {ocrData}
            </span>
        </>
    );
};

export default UploadButton;