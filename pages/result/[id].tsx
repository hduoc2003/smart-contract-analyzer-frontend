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
    const [open, setOpen] = useState<boolean>(false);
    const [analyzeState, setAnalyzeState] = useState<boolean>(true);
    const [srcCode, setSrcCode] = useState()
    const [currSourceCode, setCurrSourceCode] = useState();
    // let fileID="1" //! INIT FOR TEST
    const fileID = router.query.key;
    const file_result = router.query.file_result;
    const parsed_fileResult = JSON.parse(file_result as string);
    // const parsed_fileResult = mockData; //! FOR TEST
    console.log(parsed_fileResult);
    // const parsedData = JSON.parse(fileContent as string);
    let newCurrSourceCode;

    const reduxLastSubmitData = useSelector((state : AppState) => state.lastSubmit.lastSubmitData)
    console.log("✨✨✨❤️ ~ file: [id].tsx:38 ~ reduxLastSubmitData:", JSON.parse(reduxLastSubmitData))
    if (typeof window !== 'undefined') {
        // Perform localStorage action
        const localCodeData = localStorage.getItem('codeData');
        const sourceCodeArr = JSON.parse(localCodeData);
        const ID = parseInt(fileID as string);
        console.log("ID: ", ID);
        newCurrSourceCode = sourceCodeArr[ID - 1];
    }
    setTimeout(() => {
        setCurrSourceCode(newCurrSourceCode);
        setAnalyzeState(false);
    },1000)
    useEffect(()=>{
    }, [analyzeState])
    
    const IssuesData : ResultType[] = parsed_fileResult.result.analysis.issues;

    return (
        <Layout title="Result | Tool">
            <div className='h-auto'>    
                <div className="h-auto px-4 lg:mx-40">
                    <h2 className="pt-12 mb-6 text-2xl font-bold sm:text-3xl md:text-5xl">Result</h2>
                    <h2 className="mb-6 text-2xl md:text-3xl">{parsed_fileResult.name}</h2>
                    <p className="pb-10 mb-8 duration-300">
                        Tool
                    </p>
                </div>
                <div className='mx-4 my-20 lg:mx-40'>
                    <Descriptions title="Submitted file's result" bordered>
                        <Descriptions.Item label="Filename">{parsed_fileResult.name ? parsed_fileResult.name : "NOT GIVEN"}</Descriptions.Item>
                        <Descriptions.Item label="Tool">{parsed_fileResult.result.tool_name}</Descriptions.Item>
                        <Descriptions.Item label="Duration">{parsed_fileResult.result.duration}s</Descriptions.Item>

                        <Descriptions.Item label="Last modified date" span={2}>{parsed_fileResult.lastModifiedDate}</Descriptions.Item>
                        <Descriptions.Item label="Solidity version">{parsed_fileResult.result.solc}</Descriptions.Item>

                        <Descriptions.Item label="Size">{parsed_fileResult.size}</Descriptions.Item>
                        <Descriptions.Item label="Status" span={3}>
                            {
                                <Badge status="success" text="Done" />
                            }
                        </Descriptions.Item>
                    </Descriptions>
                    <div>
                        <div className='w-full'>
                            {analyzeState || <CodeModal IssuesData={IssuesData} parsedData={JSON.stringify(currSourceCode)}/>}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default result