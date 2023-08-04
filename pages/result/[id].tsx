import React from 'react'
import { useRouter } from 'next/router';
import Layout from "../../components/Layout";
import { Badge, Descriptions } from 'antd';

import mythril_result from '../../utils/results/mythril_result.json'
import handleTimeFormat from '../../utils/handleTimeFormat';
import handleDurationFormat from '../../utils/handleDurationFormat';

const result = () => {
    const router = useRouter();
    const {filename, ref} = router.query;
    console.log(filename, ref);

    return (
        <Layout title="Result | Tool">
            <div className='h-auto'>  
                <div className="px-4 lg:mx-40 h-36">
                    <h2 className="pt-12 mb-6 text-2xl font-bold sm:text-3xl md:text-5xl">Result</h2>
                    <h2 className="mb-6 text-2xl md:text-3xl">{filename}</h2>
                    <p className="pb-10 duration-300">
                        MythX has flexible pricing options. 
                        Receive deeper analysis, comprehensive reporting, 
                        and enhanced security with our plans.
                    </p>
                </div>
                <div className='mx-4 my-20 lg:mx-40'>
                    <Descriptions title="Submitted file's result" bordered>
                        <Descriptions.Item label="Contract">{mythril_result.contract}</Descriptions.Item>
                        <Descriptions.Item label="Tool">{mythril_result.tool}</Descriptions.Item>

                        <Descriptions.Item label="Time start">{handleTimeFormat(mythril_result.start)}</Descriptions.Item>
                        <Descriptions.Item label="Time end">{handleTimeFormat(mythril_result.end)}</Descriptions.Item>
                        <Descriptions.Item label="Duration" span={2}>{mythril_result.duration}s</Descriptions.Item>
                        <Descriptions.Item label="Status" span={3}>
                            <Badge status="processing" text="Analyzing" />
                        </Descriptions.Item>
                        {/* <Descriptions.Item label="Negotiated Amount">$80.00</Descriptions.Item>
                        <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
                        <Descriptions.Item label="Official Receipts">$60.00</Descriptions.Item> */}
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
                </div>
            </div>
        </Layout>
    )
}

export default result