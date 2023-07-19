import React, {useState} from "react";
import Layout from "../components/Layout";

import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
const { Dragger } = Upload;

const props: UploadProps = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

const tool: React.FC = () => { 
  const [messageApi, contextHolder] = message.useMessage();
  const [submitDisable, setSubmitDisable] = useState<boolean>(false);
  const handleSubmit = () => {
    setSubmitDisable(true);
    messageApi
      .open({
        type: 'loading',
        content: 'TEST SCANNING..',
        duration: 2.5,
      })
      .then(() => message.success('Loading finished', 2.5))
      .then(() => message.error('Loading finished', 2.5))
      .then(() => message.info('Loading finished', 2.5));
    setTimeout(() => {
      setSubmitDisable(false);
    }, 2500)
  }
  
  return (
    <Layout title="Tool | Tool">
      <div className="h-auto p-10 bg-white ">
        <div className="h-auto p-8 m-40 border border-gray-200 rounded shadow-md">
          <div className="h-auto min-w-full">
            <Dragger {...props}>
              <p className="ant-upload-drag-icon ">
                <InboxOutlined/>
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                banned files.
              </p>
            </Dragger>
          </div>
          <div className="flex justify-end mt-12">
            {contextHolder}
            <button
              className={`w-full px-8 py-4 mb-4 font-bold text-white rounded-md focus:shadow-outline bg-slate-950  focus:outline-none ${submitDisable ? "disabled disabled:opacity-75" : "hover:bg-slate-800"} `}
              type="button"
              onClick={handleSubmit}
              disabled={submitDisable}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default tool;
