import React, { useMemo, useState } from "react";
import { Col, message, Row } from "antd";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useUpload, useUploadActions } from "src/ducks/upload/actions/upload";
import axios from "axios";

const Display: React.FC<{ message: string }> = (props) => {
    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);

    const { uploadPDF } = useUploadActions();
    const test = useUpload();
    const upload = {
        onChange({ file, fileList }: { file: any; fileList: any }) {
            if (file.status !== "uploading") {
                setFileList(fileList);
                console.log(file, fileList);
            }
        },
        beforeUpload: (file: any) => {
            return false;
        },
        accept: "pdf",
    };

    console.log(test);

    const handleUpload = () => {
        const formData = new FormData();
        setUploading(true);
        fileList.forEach((file: any) => {
            formData.append("files[]", file.originFileObj, file.name);
        });
        uploadPDF(formData);
        setUploading(false);
    };
    return (
        <Row>
            <Col>
                <Upload {...upload}>
                    <Button icon={<UploadOutlined />}>Select File</Button>
                </Upload>
                <Button
                    type="primary"
                    onClick={handleUpload}
                    disabled={fileList.length === 0}
                    loading={uploading}
                    style={{ marginTop: 16 }}
                >
                    {uploading ? "Uploading" : "Start Upload"}
                </Button>
            </Col>
        </Row>
    );
};

export default Display;
