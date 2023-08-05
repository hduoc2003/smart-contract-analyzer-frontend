import React from 'react'
import { useRouter } from 'next/router';
import Layout from "../../components/Layout";
import { Badge, Descriptions } from 'antd';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import final_result from '../../utils/results/final_result.json';
import { ResultType } from '../../interfaces/results';
import IssuesTable from '../../components/Result/IssuesTable';

const result : React.FC = () => {
    const router = useRouter();
    const {filename, source_code,  ref} = router.query;
    const IssuesData : ResultType[] = final_result.analysis.issues;
    console.log(source_code);

    return (
        <Layout title="Result | Tool">
            <div className='h-auto'>  
                <div className="px-4 lg:mx-40 h-auto">
                    <h2 className="pt-12 mb-6 text-2xl font-bold sm:text-3xl md:text-5xl">Result</h2>
                    <h2 className="mb-6 text-2xl md:text-3xl">{filename}</h2>
                    <p className="pb-10 duration-300 mb-8">
                        MythX has flexible pricing options. 
                        Receive deeper analysis, comprehensive reporting, 
                        and enhanced security with our plans.
                    </p>
                </div>
                <div className='mx-4 my-20 lg:mx-40'>
                    <Descriptions title="Submitted file's result" bordered>
                        <Descriptions.Item label="Filename">{final_result.file_name}</Descriptions.Item>
                        <Descriptions.Item label="Tool">{final_result.tool_name}</Descriptions.Item>
                        <Descriptions.Item label="Duration">{final_result.duration}s</Descriptions.Item>
                        <Descriptions.Item label="Status" span={3}>
                            <Badge status="processing" text="Analyzing" />
                        </Descriptions.Item>
                        <Descriptions.Item label="Config Info">
                            Data disk type: MongoDB
                            <br />
                            Database version: 3.4
                            <br />
                            Package: dds.mongo.mid
                            <br />
                            Storage space: 10 GB
                            <br />
                            Replication factor: 3
                            <br />
                            Region: East China 1
                            <br />
                        </Descriptions.Item>
                    </Descriptions>
                    <IssuesTable IssuesData={IssuesData}/>
                </div>
            </div>
        </Layout>
    )
}

export default result