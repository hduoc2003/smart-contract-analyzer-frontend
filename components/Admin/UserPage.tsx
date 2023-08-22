import React, { useEffect, useState } from 'react'
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { handleGetAllUser } from '../../services/AdminService';
import { Userdata } from '../../interfaces';
import DeleteUserButton from './Userpage/DeleteUserButton';

const UserPage : React.FC = (props) => {
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
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (role) => {
                if(role === 'User') return (
                    <Tag color="blue">{role}</Tag>
                )
                else if(role === 'Admin') return (
                    <Tag color="magenta">{role}</Tag>
                )
                else return (
                    <Tag color="grey">NaN</Tag>
                )
            },
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, userData) => (
                <Space size="middle">
                    <a>Update</a>
                    <a><DeleteUserButton userData={userData} onUserDeleted={handleUserDeleted}/></a>
                </Space>
            ),
        },
    ];

    const fetchData = () => {
        handleGetAllUser()
            .then((response) => {
                setUserData(response);
            })
            .catch((err) => {
                console.error(err);
            });
    };
    
    const [userData, setUserData] = useState<Userdata[]>([])
    useEffect(() => {
        fetchData();
    }, []);
    useEffect(() => {
    }, [])

    const handleUserDeleted = () => {
        fetchData();
    };

    return (
        <Table columns={columns} dataSource={userData} rowKey={(UserData) => UserData._id}/>
    )
}

export default UserPage