
import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';


import { Layout, Menu, Button, theme } from 'antd';
import AdminNavbar from './adminNav';
import { Input } from '@material-tailwind/react';

const { Header, Sider, Content } = Layout;


const sideItems1 = [
    {
        key: '1',
        icon: <UserOutlined />,
        label: 'Dashboard',
    },
    {
        key: '2',
        icon: <VideoCameraOutlined />,
        label: 'nav 2',
    },
    {
        key: '3',
        icon: <UploadOutlined />,
        label: 'Settings',
    },

]



export default function Admin({ child }: { child: React.ReactNode }) {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout>
            <Sider style={{ backgroundColor: 'white', borderWidth: 3 }} trigger={null} collapsible collapsed={collapsed}>


                <div className='w-full h-16 flex justify-center items-center'>
                    <p className={`text-black text-lg items-center ${collapsed && 'hidden'}`}>Talixora</p>
                </div>


                <Menu
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={sideItems1}

                />

                <div className='w-full absolute h-16 bottom-0 inset-x-0'>
                    <p className='w-full text-ellipsis text-black text-xs flex items-center justify-center'>© {new Date().getFullYear()} Talixora</p>
                </div>


            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <div className='w-full flex'>
                        <div>
                            <Button
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                onClick={() => setCollapsed(!collapsed)}
                                style={{
                                    fontSize: '16px',
                                    width: 64,
                                    height: 64,
                                }}
                            />
                        </div>

                        <div className='w-full '>
                            <AdminNavbar />
                        </div>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '8px 6px',
                        padding: 6,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    {child}
                </Content>
            </Layout>
        </Layout>
    );
};