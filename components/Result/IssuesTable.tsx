import React, {useState} from 'react'
import Link from 'next/link'
import { Modal, Button, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ResultType } from '../../interfaces/results';
import InfoModal from './InfoModal';

const IssuesTable = (props) => {
    const {IssuesData, currSourceCode} = props;
    // const [open, setOpen] = useState<boolean>(false);
    // const [modalData, setModalData] = useState<ResultType>(IssuesData[0]);

    const columns: ColumnsType<ResultType> = [
        {
            title: 'Title',
            dataIndex: 'issue_title',
            key: 'issue_title',
        },
        {
            title: 'Severity',
            key: 'severity',
            dataIndex: 'severity',
            render: (severity) => {
                let color = severity.length > 5 ? 'orange' : 'yellow';
                if (severity === 'Informational' || severity === 'Optimization') color = 'blue'
                else if (severity === 'High') {
                    color = 'volcano';
                }
                return(
                    <Tag color={color} key={severity}>
                        {severity}
                    </Tag>
                )
            }
        },
        {
            title: 'SWC ID',    
            key:'swcID',
            render: (IssueData) => {
                return (
                    <Space size="middle">
                        <Link href={IssueData.swc_link}>{IssueData.swcID}</Link>
                    </Space>
                )
            }
        }
    ];

    return (
        <div style={{width:"30rem"}}>
            <Table className='mt-8 duration-500 animate__animated animate__fade' 
                    columns={columns} pagination={false} 
                    dataSource={IssuesData} rowKey={(IssueData) => IssueData[0]} bordered/>
            <h3 className='mt-4 font-semibold'>Description</h3>
            <p>{IssuesData[0].description}</p>
        </div>
    )
}

export default IssuesTable