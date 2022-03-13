import React, { useMemo, useState } from "react";
import { Col, Row } from "antd";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const Display: React.FC<{ message: string }> = (props) => {
  const upload = {
    action: "http://www.localhost:3001/api/upload",
    onChange({ file, fileList }: { file: any; fileList: any }) {
      if (file.status !== "uploading") {
        console.log(file, fileList);
      }
    },
    accept: "pdf",
  };
  return (
    <Row>
      <Col>
        <Upload {...upload}>
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      </Col>
    </Row>
  );
};

export default Display;
