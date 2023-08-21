import React, { useEffect, useState } from 'react'
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { handleGetAllUser } from '../../services/AdminService';

interface Userdata {
    id: string
    name: string
    username: string
    role: string 
    email: string
}

const columns: ColumnsType<Userdata> = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a>View</a>
                <a>Update</a>
                <a>Delete</a>
            </Space>
        ),
    },
];

  
const data: Userdata[] = [
    {
        id: "user1_id",
        name: "User 1",
        username: "user1",
        role: "user",
        email: "user1@example.com"
    },
    {
        id: "user2_id",
        name: "User 2",
        username: "user2",
        role: "user",
        email: "user2@example.com"
    },
    {
        id: "user3_id",
        name: "User 3",
        username: "user3",
        role: "user",
        email: "user3@example.com"
    },
    {
        id: "user4_id",
        name: "User 4",
        username: "user4",
        role: "user",
        email: "user4@example.com"
    },
    {
        id: "user5_id",
        name: "User 5",
        username: "user5",
        role: "user",
        email: "user5@example.com"
    }
  ]
;

const UserPage : React.FC = (props) => {
    const [userData, setUserData] = useState<Userdata[]>([])
    useEffect(() => {
        const fetchData = () => {
            handleGetAllUser()
                .then((response) => {
                setUserData(response.data);
                })
                .catch((err) => {
                    console.error(err);
                });
        };
        
        fetchData();
    }, []);
    return (
        <Table columns={columns} dataSource={data}rowKey={(UserData) => UserData.id}/>
    )
}

export default UserPage