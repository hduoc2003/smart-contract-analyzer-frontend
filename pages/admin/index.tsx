import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import Homepage from '../../components/Admin/Homepage';
import UserPage from '../../components/Admin/UserPage';

const { Header, Content, Footer, Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

const getItem = (
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem => {
    return {
        label,
        key,
        icon,
        children,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Homepage', '1', <DesktopOutlined/>),
    getItem('Analyze', '2', <PieChartOutlined />),
    getItem('User', '3', <UserOutlined />),
    getItem('Team', 'sub2', <TeamOutlined />, [
        getItem('Team 1', '6'), 
        getItem('Team 2', '7'), 
        getItem('Team 3', '8')
    ]),
    getItem('Files', '9', <FileOutlined />),
];

const MyContent: React.FC<{ selectedKey: string | null }> = ({ selectedKey }) => {
    // Define your components to render based on the selectedKey
    const renderComponent = () => {
        switch (selectedKey) {
            case '1':
                return <Homepage/>
            case '2':
                return <div>Analyze Content</div>;
            case '3':
                return <UserPage/>;
            case '6':
                return <div>Team 1 Content</div>;
            case '7':
                return <div>Team 2 Content</div>;
            case '8':
                return <div>Team 3 Content</div>;
            case '9':
                return <div>Files Content</div>;
            default:
                return <Homepage/> // No content to display by default
        }
    };

    return <Content style={{ padding: '20px' }}>{renderComponent()}</Content>;
};

const index : React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedKey, setSelectedKey] = useState("");
    const [label, setLabel] = useState("");
    
    const {
      token: { colorBgContainer },
    } = theme.useToken();

    const handleSelect = (key) => {
        setSelectedKey(key);
    };
  
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" onClick={({ key }) => handleSelect(key)} defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
            <Layout>
            <Content className='m-4'>
                <div className='p-4 bg-white'>
                    <MyContent selectedKey={selectedKey}/>
                </div>
            </Content>
            <Footer className='text-center'>Ant Design ©2023 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    );
};

export default index