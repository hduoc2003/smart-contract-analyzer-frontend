import React, {useState} from 'react'
import Link from 'next/link'
import { Modal, Button, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ResultType } from '../../interfaces/results';
import InfoModal from './InfoModal';

const ErrorTable = (props) => {
    const {IssuesData, currSourceCode} = props;
    // const [open, setOpen] = useState<boolean>(false);
    // const [modalData, setModalData] = useState<ResultType>(IssuesData[0]);

    const columns: ColumnsType<ResultType> = [
        {
            title: 'Title',
            dataIndex: 'error_title',
            key: 'error_title',
        },
        {
            title: 'Type',
            key: 'typeDetect',
            dataIndex: 'typeDetect',
            render: (typeDetect) => {
                let color = typeDetect.length <= 5 ? 'volcano' : 'orange';
                return(
                    <Tag color={color} key={typeDetect}>
                        {typeDetect}
                    </Tag>
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

export default ErrorTable