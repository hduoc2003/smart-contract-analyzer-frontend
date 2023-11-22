import React, { useState } from "react";
import axios from "axios";
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/dist/client/router';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps, UploadFile } from 'antd';
import { message, Upload } from 'antd';
const { Dragger } = Upload;

interface SubmitResponse {
    submit_id: string
    files_info: {
        file_id: string
        file_name: string
    }[]
}

const FileSubmit: React.FC = () => {
    const dispatch: Dispatch = useDispatch();
    const router = useRouter();
    const [messageApi, contextHolder] = message.useMessage();
    const [submitDisable, setSubmitDisable] = useState<boolean>(true);
    const [submittedFiles, setSubmittedFiles] = useState<UploadFile[]>([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        submittedFiles.forEach((file, index) => {
            formData.append(file.originFileObj.name, file.originFileObj);
        });
        setSubmitDisable(false);
        messageApi
            .open({
                type: 'loading',
                content: 'Processing your submitted file...',
                duration: 0, // Set duration to 0 to keep it open until explicitly closed
            });
        axios
            .post(`${process.env.SERVER_BASE_API}/client/tool/submit`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            })
            .then((response) => {
                const data: SubmitResponse = JSON.parse(response.data)
                console.log(data);
                messageApi.success('Loading finished', 0.5);
                router.push({
                    pathname: '/submit',
                    query: {
                        id: data.submit_id,
                    }
                });
            })
            .catch((error) => {
                messageApi.error('Error occurred', 0.5);
                console.log(error);
            });
        setSubmittedFiles([]);
        setSubmitDisable(true);
    }

    const props: UploadProps = {
        name: 'file',
        multiple: true,
        beforeUpload: (file) => {
            const isSol = file.name.endsWith('.sol');
            if (!isSol) {
                message.error(`${file.name} is not a .sol file`);
            } else {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const currFileContent = event.target.result.toString(); // Convert to string
                };
                reader.readAsText(file); // Read the file as text
            }
            return isSol || Upload.LIST_IGNORE;
        },
        action: `${process.env.SERVER_BASE_API}/client/tool/submit/before-submit`,
        onChange(info) {
            // AFTER UPLOAD
            const { status } = info.file;
            if (status === 'done') {
                messageApi.success(`${info.file.name} file uploaded successfully.`);
                console.log("🚀 ~ file: FileSubmit.tsx:82 ~ onChange ~ info.fileList:", info.fileList)
                setSubmittedFiles(info.fileList)
                setSubmitDisable(false);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };


    return (
        <div className="h-auto p-8 border border-gray-200 rounded shadow-md md:mx-20 animate__animated animate__delay-fast animate__fadeInUp">
            <div className='grid grid-cols-2'>
                <h2 className='mb-8 text-xl font-bold '>
                    Upload files
                </h2>
            </div>
            <div className="h-auto min-w-full mb-8">
                <Dragger {...props}>
                    <p className="mt-8 ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="px-4 mb-8 ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                        banned files.
                    </p>
                </Dragger>
            </div>
            <div className="flex justify-end mt-4">
                {contextHolder}
                <button
                    className={`w-full px-8 py-4 mb-4 font-bold text-white rounded-md focus:shadow-outline bg-blue-500  focus:outline-none ${submitDisable ? "disabled disabled:opacity-75" : "hover:bg-blue-800"} `}
                    type="button"
                    onClick={handleSubmit}
                    disabled={submitDisable}
                >
                    Submit
                </button>
            </div>
        </div>
    )
}

export default FileSubmit
