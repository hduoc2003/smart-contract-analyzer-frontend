import React, {useState} from 'react'
import { Button, message, Popconfirm } from 'antd';
import { Userdata } from '../../../interfaces';
import { handleDeleteUserById } from '../../../services/AdminService';
import { QuestionCircleOutlined } from '@ant-design/icons';

interface DeleteUserButtonProps {
  userData: Userdata;
  onUserDeleted: () => void; // Add this prop for handling deletion completion
}

const confirm = (e: React.MouseEvent<HTMLElement>) => {
  console.log(e);
  message.success('Click on Yes');
};

const cancel = (e: React.MouseEvent<HTMLElement>) => {
  console.log(e);
  message.error('Click on No');
};

const DeleteUserButton : React.FC<DeleteUserButtonProps> = ({ userData, onUserDeleted } : DeleteUserButtonProps) => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const showPopconfirm = () => {
      setOpen(true);
    };

    const handleOk = () => {
      setConfirmLoading(true);

      const deleteUser = () => {
        handleDeleteUserById(userData._id)
          .then((response) => {
            console.log(response.data);
            setConfirmLoading(false);
            onUserDeleted();
          })
          .catch((err) => {
            console.error(err);
            setConfirmLoading(false);
          })
      }
      deleteUser();
    };

    const handleCancel = () => {
      console.log('Clicked cancel button');
      setOpen(false);
    };
    return (
      <Popconfirm
        title="Delete this user?"
        description="You can undo this behavior!"
        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
        open={open}
        okType='default'
        onConfirm={handleOk}
        okButtonProps={{ loading: confirmLoading }}
        onCancel={handleCancel}
      >
        <Button onClick={showPopconfirm}  danger>Delete</Button>
      </Popconfirm>
    )
}

export default DeleteUserButton