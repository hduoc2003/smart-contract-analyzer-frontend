import React, {useState, useEffect } from 'react';
import { Button, Modal, Form, Input } from 'antd';
import { Userdata } from '../../../interfaces';
import { SignupFormState } from '../../../interfaces';

interface UpdateUserButtonProps {
    userData: Userdata;
    onUserUpdated: () => void; // Add this prop for handling deletion completion
}

const UpdateUserButton : React.FC<UpdateUserButtonProps> = ({ userData, onUserUpdated } : UpdateUserButtonProps) => {
    const initUserData = userData;
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const [name, setName] = useState<string>(initUserData.name);
    const [password, setPassword] = useState<string>(initUserData.password)
    const [form, setForm] = useState<SignupFormState>(initUserData);

    useEffect(() => {
        setForm({...form, password: password});
    }, [password, name]);

    const showModal = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };
    const handleSubmit = () => {
        console.log("🚀 ~ file: UpdateUserButton.tsx:44 ~ handleSubmit ~ userData:", userData)
        setOpen(false);
    }
    
    return (
        <>
            <Button type="default" onClick={showModal}>
                Update
            </Button>
            <Modal
                title="Update user"
                centered
                open={open}
                okType='default'
                onOk={() => handleSubmit()}
                onCancel={() => setOpen(false)}
            >
                <Form
                    name="wrap"
                    labelCol={{ flex: '110px' }}
                    labelAlign="left"
                    labelWrap
                    wrapperCol={{ flex: 1 }}
                    colon={false}
                    style={{ maxWidth: 600 }}
                >
                    {/* NOT EDITABLE */}
                    <Form.Item label="User ID" name="userId">
                        <Input defaultValue={userData._id} disabled/>
                    </Form.Item>
                    <Form.Item label="Role" name="role">
                        <Input defaultValue={userData.role} disabled/>
                    </Form.Item>
                    <Form.Item label="Username" name="username">
                        <Input defaultValue={userData.username} disabled/>
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                        <Input defaultValue={userData.email} disabled/>
                    </Form.Item>

                    {/* EDITABLE */}
                    <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                        <Input defaultValue={userData.name}/>
                    </Form.Item>
                    <Form.Item label="Password" name="password" rules={[{ required: true }]}>
                        <Input defaultValue={userData.password}/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default UpdateUserButton