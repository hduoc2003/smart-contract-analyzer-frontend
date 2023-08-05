import React, {useState} from "react";
import { useRouter } from 'next/dist/client/router';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps, UploadFile } from 'antd';
import { message, Upload } from 'antd';
const { Dragger } = Upload;

const FileSubmit = () => {
    const router = useRouter();
    const [messageApi, contextHolder] = message.useMessage();
    const [submitDisable, setSubmitDisable] = useState<boolean>(true);
    const [submittedFiles, setSubmittedFiles] = useState<UploadFile[]>([]);

    const handleSubmit = () => {
        setSubmitDisable(true);
        console.log("Các files đã submit thành công: ", submittedFiles);
        messageApi
        .open({
            type: 'loading',
            content: 'Processing your file...',
            duration: 2.5,
        })
        .then(() => message.success('Loading finished', 0.5))
        setTimeout(() => {
        setSubmitDisable(false);
        router.push({
            pathname: '/result/[path]',
            query: {
            path: submittedFiles[0].name,
            source_code : 1212351235123,
            filename: submittedFiles[0].name,
            ref: 'Tung',
            }
        });
        setSubmittedFiles([]);
        }, 3000)
    }

    const props: UploadProps = {
        name: 'file',
        multiple: true,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log("Trạng thái upload:", info)
            console.log("Các file đã upload:", info.fileList);
        }
    
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
            setSubmittedFiles([...submittedFiles, info.file]);
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
                <h2 className='mb-8 text-xl font-bold'>
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
                    className={`w-full px-8 py-4 mb-4 font-bold text-white rounded-md focus:shadow-outline bg-slate-950  focus:outline-none ${submitDisable ? "disabled disabled:opacity-75" : "hover:bg-slate-800"} `}
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