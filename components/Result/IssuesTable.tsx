import React, {useState} from 'react'
import Link from 'next/link'
import { Modal, Button, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ResultType } from '../../interfaces/results';
import InfoModal from './InfoModal';

const IssuesTable = (props) => {
    const {IssuesData} = props;
    const [open, setOpen] = useState<boolean>(false);
    const [modalData, setModalData] = useState<ResultType>(IssuesData[0]);

    const columns: ColumnsType<ResultType> = [
        {
            title: 'Title',
            dataIndex: 'swc_title',
            key: 'swc_title',
        },
        {
            title: 'Severity',
            key: 'severity',
            dataIndex: 'severity',
            render: (severity) => {
                let color = severity.length > 5 ? 'yellow' : 'green';
                if (severity === 'High') {
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
        },
        {
            title: 'Info',
            key: 'action',
            render: (IssueData) => (
                <Space size="middle">
                    <Button  onClick={() => {setOpen(true), setModalData(IssueData)}}>
                        View more
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Table className='duration-500 animate__animated animate__fade mt-8' columns={columns} 
                    dataSource={IssuesData} rowKey={(IssueData) => IssueData.id} bordered/>
            <Modal
                title={modalData.issue_title}
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={1000}
            >
                <InfoModal modalData={modalData}/>
            </Modal>
        </div>
    )
}

export default IssuesTable