import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import Layout from "../../components/Layout";
import { LoadingOutlined } from '@ant-design/icons'
import { Badge, Descriptions, Space, Button, Modal, Spin } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import final_result from '../../utils/results/final_result.json';
import { ResultType } from '../../interfaces/results';
import IssuesTable from '../../components/Result/IssuesTable';
import CodeModal from '../../components/Result/CodeModal';
import { parse } from 'path';

const spinIcon = <LoadingOutlined className='ml-2' style={{fontSize: 16}} spin/>
const result : React.FC = () => {
    const router = useRouter();
    const [open, setOpen] = useState<boolean>(false);
    const [analyzeState, setAnalyzeState] = useState<boolean>(true)
    const [codeModalData, setCodeModalData] = useState<String>()
    const {filename, ref, path} = router.query;
    // const parsedData = JSON.parse(fileContent as string);

  // Now you have the array of submitted files
    // console.log("🚀 ~ file: [id].tsx:20 ~ fileContent:", fileContent);
    // const parsedData = fileContent
    // console.log("🚀 ~ file: [id].tsx:21 ~ parsedData:", parsedData);
    setTimeout(() => {
        setAnalyzeState(false)
    }, 2000)
    useEffect(()=>{}, [analyzeState])
    const IssuesData : ResultType[] = final_result.analysis.issues;

    return (
        <Layout title="Result | Tool">
            <div className='h-auto'>  
                <div className="h-auto px-4 lg:mx-40">
                    <h2 className="pt-12 mb-6 text-2xl font-bold sm:text-3xl md:text-5xl">Result</h2>
                    <h2 className="mb-6 text-2xl md:text-3xl">{filename}</h2>
                    <p className="pb-10 mb-8 duration-300">
                        MythX has flexible pricing options. 
                        Receive deeper analysis, comprehensive reporting, 
                        and enhanced security with our plans.
                    </p>
                </div>
                <div className='mx-4 my-20 lg:mx-40'>
                    <Descriptions title="Submitted file's result" bordered>
                        <Descriptions.Item label="Filename">{filename ? filename : "NOT GIVEN"}</Descriptions.Item>
                        <Descriptions.Item label="Tool">{final_result.tool_name}</Descriptions.Item>
                        <Descriptions.Item label="Duration">{final_result.duration}s</Descriptions.Item>
                        <Descriptions.Item label="Status" span={3}>
                            {
                                analyzeState ? 
                                    <>
                                        <Badge status="processing" text="Analyzing" />  
                                        <Spin indicator={spinIcon}/>
                                    </>
                                : <Badge status="success" text="Done" />
                            }
                        </Descriptions.Item>
                        <Descriptions.Item label="Code">
                            <Space size="middle">
                                {/* <Button  onClick={() => {setOpen(true), setCodeModalData(fileContent[0])}}>
                                    View more
                                </Button> */}
                                <Modal
                                    centered
                                    open={open}
                                    okType='default'
                                    onOk={() => setOpen(false)}
                                    onCancel={() => setOpen(false)}
                                    width={1000}
                                >
                                    {/* <CodeModal parsedData={parsedData as string}/> */}
                                </Modal>
                            </Space>
                        </Descriptions.Item>
                    </Descriptions>
                    <IssuesTable IssuesData={IssuesData}/>
                </div>
            </div>
        </Layout>
    )
}

export default result