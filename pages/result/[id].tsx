import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import Layout from "../../components/Layout";
import { LoadingOutlined, CheckCircleOutlined, SyncOutlined } from '@ant-design/icons'
import { Badge, Descriptions, Space, Button, Modal, Spin, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { AnalysisIssue, AnalysisResult, ContractAnalysis } from '../../interfaces/analysisResult';


import { useSelector } from 'react-redux';
import { AppState } from '../../redux/store';
import { ResultType } from '../../interfaces/results';
import CodeModal from '../../components/Result/CodeModal';

const spinIcon = <LoadingOutlined className='ml-2' style={{fontSize: 12}} spin/>
const bigSpinIcon = <LoadingOutlined className='' style={{fontSize: 36}} spin/>

const result : React.FC = () => {
    const router = useRouter();
    const id = router.query.id;
    const [fileResult, setFileResult] = useState<ContractAnalysis | undefined>(undefined); // Specify the type for useState
    const [fetchDone, setFetchDone] = useState(false)
    const [counter, setCounter] = useState(1);

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
                    if(data.analysis){
                        setFetchDone(true);
                    } else {
                        // If the condition is not met, trigger the useEffect again after a delay.
                        setTimeout(() => {
                            fetchData();
                        }, 3000); // Adjust the delay as needed.
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            }
        };

        fetchData();
    }, [id]);

    useEffect(() =>{
        console.log("👾 done fetch")
    }, [fetchDone]);


    return (
        <Layout title={`Result | ${id !== undefined ? id : "loading.."}`}>
            {fileResult && (
                <div className='h-auto min-h-screen'>    
                    <div className="h-auto px-4 lg:mx-40">
                        <h2 className="pt-12 mb-6 text-2xl font-bold sm:text-3xl md:text-5xl">Result</h2>
                        <div className='flex items-center'>
                            <h2 className="text-2xl md:text-3xl">{fileResult.file_name}</h2>
                            <div className='items-center ml-4'>
                                {
                                    fetchDone ? (
                                            <Tag className='w-auto h-auto text-xl justify-center pb-2 flex' icon={<CheckCircleOutlined className='mt-2' />} color="success">
                                                Done
                                            </Tag>
                                        )
                                        : (
                                            <Tag className='w-auto h-auto text-xl justify-center pb-2 flex' icon={<SyncOutlined className='mt-2' spin />} color="processing">
                                                Analyzing
                                            </Tag>
                                        )
                                }
                            </div>
                        </div>
                    </div>
                    {
                        fetchDone 
                        ? (
                            <div className='mx-4 my-10 lg:mx-40 animate__animated animate__delay-fast animate__fadeIn'>
                                <Descriptions title="Infomation" bordered>
                                <Descriptions.Item label={<h1 className='text-lg font-monobold'>File ID</h1>} span={2}>
                                    {fileResult.file_id}
                                </Descriptions.Item>
                                <Descriptions.Item label={<h1 className='text-lg font-monobold'>Filename</h1>}>
                                    {fileResult.file_name}
                                </Descriptions.Item>
                                <Descriptions.Item label={<h1 className='text-lg font-monobold'>Duration</h1>} span={2}>
                                    {fileResult.duration}s
                                </Descriptions.Item>
                                <Descriptions.Item label={<h1 className='text-lg font-monobold'>Solidity version</h1>}>
                                    {fileResult.solc}
                                </Descriptions.Item>

                                    {/* <Descriptions.Item label="Status" span={1}>
                                        {
                                            fetchDone && (<Badge status="success" text="Done" />)
                                        }
                                    </Descriptions.Item> */}
                                </Descriptions>
                                <div>
                                    <div className='w-full'>
                                        <CodeModal IssuesData={fileResult.analysis[1].issues} parsedData={fileResult.source_code}/>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className='flex items-center justify-center my-48 animate__animated animate__delay-fast animate__fadeIn'>
                                <Spin indicator={bigSpinIcon}/>
                            </div>
                        )
                    }
                </div>
            )}
        </Layout>
    )
}

export default result  