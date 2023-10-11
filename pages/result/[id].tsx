import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import Layout from "../../components/Layout";
import { LoadingOutlined } from '@ant-design/icons'
import { Badge, Descriptions, Space, Button, Modal, Spin } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { useSelector } from 'react-redux';
import { AppState } from '../../redux/store';
import { ResultType } from '../../interfaces/results';
import CodeModal from '../../components/Result/CodeModal';

const spinIcon = <LoadingOutlined className='ml-2' style={{fontSize: 16}} spin/>
const result : React.FC = () => {
    const router = useRouter();
    const id = router.query.id;
    const [fileResult, setFileResult] = useState();

    useEffect(() => {
        console.log("👾👾", id);

        const fetchData = () => {
            if (id) {
                const serverBaseURL = `http://127.0.0.1:5000/api/v1/client/tool/handle_file_id?id=${id}`;
                fetch(serverBaseURL, { credentials: 'include' })
                .then(async (response) => {
                    console.log("👁️👁️", response);

                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json(); // You may want to parse the response as JSON
                })
                .then((data) => {
                    // Handle the data received from the API
                    console.log("Data from the API:", data);
                    setFileResult(data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            }
        };

        // Fetch data initially
        fetchData();

        // // Set up an interval to fetch data every 3 seconds (adjust the interval as needed)
        // const intervalId = setInterval(() => {
        // console.log("⚠️⚠️", fileResult);
        //     if (fileResult) {
        //         clearInterval(intervalId);
        //     } else {
        //         fetchData();
        //     }
        // }, 3000);
        // // Clean up the interval when the component unmounts or when the 'id' prop changes
        // return () => {
        // clearInterval(intervalId);
        // };
    }, [id]);


    return (
        <Layout title="Result | Tool">
            {fileResult && fileResult.file_status === "Completed" && (
            <div className='h-auto'>    
                <div className="h-auto px-4 lg:mx-40">
                    <h2 className="pt-12 mb-6 text-2xl font-bold sm:text-3xl md:text-5xl">Result</h2>
                    <h2 className="mb-6 text-2xl md:text-3xl">{fileResult.file_name}</h2>
                    <p className="pb-10 mb-8 duration-300">
                        Tool
                    </p>
                </div>
                <div className='mx-4 my-20 lg:mx-40'>
                    <Descriptions title="Submitted file's result" bordered>
                        <Descriptions.Item label="File ID" span={2}>{fileResult.file_id}</Descriptions.Item>
                        <Descriptions.Item label="Filename">{fileResult.file_name ? fileResult.file_name : "NOT GIVEN"}</Descriptions.Item>
                        <Descriptions.Item label="Tool" span={2}>{fileResult.tool_name}</Descriptions.Item>
                        <Descriptions.Item label="Duration">{fileResult.duration}s</Descriptions.Item>
                        <Descriptions.Item label="Solidity version" span={2}>{fileResult.solc}</Descriptions.Item>
                        <Descriptions.Item label="Status" span={1}>
                            {
                                <Badge status="success" text="Done" />
                            }
                        </Descriptions.Item>
                    </Descriptions>
                    <div>
                        <div className='w-full'>
                            {false || <CodeModal IssuesData={fileResult.analysis[1].issues} parsedData={fileResult.source_code}/>}
                        </div>
                    </div>
                </div>
            </div>)}
        </Layout>
    )
}

export default result