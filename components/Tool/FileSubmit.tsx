import React, {useState} from "react";
import axios from "axios";
import { useRouter } from 'next/dist/client/router';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps, UploadFile } from 'antd';
import { message, Upload } from 'antd';
const { Dragger } = Upload;

// interface submitProps {
//     _id: string,
//     userId: string,
//     submittedDate: string,
//     status: string
// }

const FileSubmit : React.FC = () => {
    const router = useRouter();
    const [messageApi, contextHolder] = message.useMessage();
    const [submitDisable, setSubmitDisable] = useState<boolean>(true);
    const [submittedFiles, setSubmittedFiles] = useState<UploadFile[]>([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        submittedFiles.forEach((file, index) => {
            formData.append(`file${index + 1}`, file.originFileObj);
        });
        setSubmitDisable(false);
        messageApi
            .open({
                type: 'loading',
                content: 'Processing your submitted file...',
                duration: 0, // Set duration to 0 to keep it open until explicitly closed
            });
        axios
            .post('http://127.0.0.1:5000/api/v1/client/tool/handle_files', formData, {
                headers: {
                'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            })
            .then((response) => {
                messageApi.success('Loading finished', 0.5);
                console.log(response.data.uuid);
                router.push(
                    {
                        pathname: '/submit/[id]',
                        query: {
                            id: response.data.uuid,
                        },
                    }
                );
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
                    // The content of the file is available in event.target.result
                    const currFileContent = event.target.result.toString(); // Convert to string
                    // You can do something with currFileContent here
                    console.log(typeof currFileContent)
                    console.log('File content:', currFileContent);
                };
                reader.readAsText(file); // Read the file as text
            }
            return isSol || Upload.LIST_IGNORE;
        },
        onChange(info) {
            // AFTER UPLOAD
            const { status } = info.file;
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
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