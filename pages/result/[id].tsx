import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import Layout from "../../components/Layout";
import { LoadingOutlined, CheckCircleOutlined, SyncOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { Badge, Descriptions, Space, Button, Modal, Spin, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { AnalysisIssue, AnalysisResult, ContractAnalysis } from '../../interfaces/analysisResult';

import CodeModal from '../../components/Result/CodeModal';

const spinIcon = <LoadingOutlined className='ml-2' style={{ fontSize: 12 }} spin />
const bigSpinIcon = <LoadingOutlined className='' style={{ fontSize: 36 }} spin />

const result: React.FC = () => {
    const router = useRouter();
    const id = router.query.id;
    const [fileResult, setFileResult] = useState<ContractAnalysis | undefined>(undefined); // Specify the type for useState

    useEffect(() => {
        const fetchData = () => {
            if (id) {
                const serverBaseURL = `${process.env.SERVER_BASE_URL}/client/tool/file/get-analyze-result?id=${id}`;
                console.log(serverBaseURL);
                fetch(serverBaseURL)
                    .then(res => res.json())
                    .then((result: ContractAnalysis) => {
                        setFileResult(result)
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            }
        };
        fetchData();
    }, [id]);

    const handleEdit = () => {
        router.push(`/edit/${id}`)
    }

    return (
        <Layout title={`Result | ${id !== undefined ? id : "loading.."}`}>
            {fileResult && (
                <div className='h-auto min-h-screen'>
                    <div className="h-auto lg:mx-40">
                        <h2 className="pt-12 mb-6 text-2xl font-bold sm:text-3xl md:text-5xl">Result</h2>
                        <div className='flex items-center'>
                            <h2 className="text-2xl md:text-3xl">{fileResult.file_name}</h2>
                            <div className='items-center ml-4'>
                                {
                                    (() => {
                                        let color: string;
                                        let Icon;
                                        switch (fileResult.status) {
                                            case 'Analyzing':
                                                color = 'processing';
                                                Icon = SyncOutlined;
                                                break;
                                            case 'Completed':
                                                color = 'success';
                                                Icon = CheckCircleOutlined;
                                                break;
                                            case 'Error':
                                                color = 'error';
                                                Icon = CloseCircleOutlined;
                                                break;
                                        }
                                        return (
                                            <Tag
                                                className='flex items-center justify-center w-auto h-auto !p-[7px] text-xl'
                                                icon={<Icon spin={fileResult.status === 'Analyzing'}/>}
                                                color={color}
                                            >
                                                {fileResult.status}
                                            </Tag>
                                        )
                                    })()
                                    // : (
                                    //     <Tag className='flex justify-center w-auto h-auto pb-2 text-xl' icon={<SyncOutlined className='mt-2' spin />} color="processing">
                                    //         Analyzing
                                    //     </Tag>
                                    // )
                                }
                            </div>
                        </div>
                    </div>
                    {
                        (
                            <div className='mx-4 my-10 lg:mx-40 animate__animated animate__delay-fast animate__fadeIn'>
                                <Descriptions title="Infomation" bordered>
                                    <Descriptions.Item label={<h1 className='text-lg font-monobold'>File ID</h1>} span={2}>
                                        {fileResult._id}
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
                                        <div className='flex justify-between mt-4'>
                                            <h1 className='font-monobold'>Code submitted</h1>
                                            <Button onClick={() => handleEdit()}>Edit</Button>
                                        </div>
                                        <CodeModal IssuesData={fileResult.analysis.issues} parsedData={fileResult.source_code} />
                                    </div>
                                </div>
                            </div>
                        )
                        // : (
                        //     <div className='flex items-center justify-center my-48 animate__animated animate__delay-fast animate__fadeIn'>
                        //         <Spin indicator={bigSpinIcon}/>
                        //     </div>
                        // )
                    }
                </div>
            )}
        </Layout>
    )
}

export default result
