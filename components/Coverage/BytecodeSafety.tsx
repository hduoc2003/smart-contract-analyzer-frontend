import React from 'react'
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const dataSource = [
    {
        key: '1',
        detector: 'Solidity assert violation',
        analyses_type: 'Symbolic analysis, fuzzing (bytecode)',
        swc_id: 'SWC-110',
        swc_link: 'https://swcregistry.io/docs/SWC-110/',
    },
    {
        key: '2',
        detector: 'MythX assertion violation (AssertionFailed event)',
        analyses_type: 'Symbolic analysis, fuzzing (bytecode)',
        swc_id: 'SWC-110',
        swc_link: 'https://swcregistry.io/docs/SWC-110/',
    },
    {
        key: '3',
        detector: 'Solidity assert violation',
        analyses_type: 'Symbolic analysis, fuzzing (bytecode)',
        swc_id: 'SWC-110',
        swc_link: 'https://swcregistry.io/docs/SWC-110/',
    },
    {
        key: '4',
        detector: 'MythX assertion violation (AssertionFailed event)',
        analyses_type: 'Symbolic analysis, fuzzing (bytecode)',
        swc_id: 'SWC-110',
        swc_link: 'https://swcregistry.io/docs/SWC-110/',
    },
    {
        key: '5',
        detector: 'Solidity assert violation',
        analyses_type: 'Symbolic analysis, fuzzing (bytecode)',
        swc_id: 'SWC-110',
        swc_link: 'https://swcregistry.io/docs/SWC-110/',
    },
    {
        key: '6',
        detector: 'MythX assertion violation (AssertionFailed event)',
        analyses_type: 'Symbolic analysis, fuzzing (bytecode)',
        swc_id: 'SWC-110',
        swc_link: 'https://swcregistry.io/docs/SWC-110/',
    },
];

const columns = [
    {
        title: 'DETECTOR',
        dataIndex: 'detector',
        key: 'detector',
    },
    {
        title: 'ANALYSES TYPE',
        dataIndex: 'analyses_type',
        key: 'analyses_type',
    },
    {
        title: 'SWC-ID',
        dataIndex: 'swc_id',
        key: 'swc_id',
    },
];

const BytecodeSafety = () => {
    return (
        <div>
            <h3 className="pt-12 mt-6 mb-16 text-4xl font-bold sm:text-5xl">Byte-code Safety</h3>
            <Table dataSource={dataSource} columns={columns}/>;
        </div>
    )
}

export default BytecodeSafety