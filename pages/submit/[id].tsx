import React, { useEffect } from 'react'
import { useRouter } from 'next/dist/client/router';
import Layout from '../../components/Layout';
import { Space, Table, Tag, Button, Badge, Spin } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { LoadingOutlined } from '@ant-design/icons'

import { fetchEventSource } from "@microsoft/fetch-event-source";

const spinIcon = <LoadingOutlined className='ml-2' style={{fontSize: 12}} spin/>

interface DataType {
    key: React.Key;
    name: string;
    size: number;
    status: string;
}

const submit : React.FC = () => {
  const router = useRouter();
  const {id} = router.query;
  console.log("🚀 ~ file: [id].tsx:21 ~ id:", id)
  const viewFile = (record) => {
    router.push(
        {
            pathname: '/result/[path]',
            query: {
                path: record.name,
                filename: record.name,
                ref: 'Tung',
            },
        }
    );
  }

  useEffect(() => {
    const streamId = id;
    const serverBaseURL = (`http://127.0.0.1:5000/api/v1/client/tool/handle_results?id=${streamId}`);
    // const eventSource = new EventSource(`/api/v1/client/tool/handle_results?id=${streamId}`);

    // Tạo yêu cầu POST với phương thức 'POST' và thông tin yêu cầu
    const requestOptions = {
      method: 'POST',
    };

    // Gửi yêu cầu POST và nhận dữ liệu streaming
    fetch(serverBaseURL, {credentials:'include', method: "POST"},)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error();
        }

        console.log(response.body)
        // Xử lý dữ liệu streaming khi nhận được
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let done = false, value;
        while (!done) {
          ({done, value} = await reader.read());
          if (done)
            break;
          const res = decoder.decode(value);
          console.log(res);
          // console.log((decoder.decode(value)))
          // console.log(typeof value)
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      }
    );
  }, [])

  const columns: ColumnsType<DataType> = [
      {
          title: 'Key',
          dataIndex: 'key',
          key: 'key',
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Size',
        dataIndex: 'size',
        key: 'size',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (status) => {
          let color = status.length > 5 ? 'geekblue' : 'green';
          if (status === 'Error') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={status}>
              {status.toUpperCase()}
              {status === 'Analyzing' ? 
                  <>
                      <Spin indicator={spinIcon}/>
                  </> 
              : <></>
              }
            </Tag>
          );
        }
      },
      {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <Space size="middle">
            <Button onClick={() => viewFile(record)}>
              View more
            </Button>
          </Space>
        ),
      },
    ];
  
    const data: DataType[] = [
      {
        key: '1',
        name: 'File 1',
        size: 32,
        status: 'Done'
      },
      {
        key: '5', 
        name: 'Image 1',
        size: 128,
        status: 'Done'
      },
      {
        key: '2',
        name: 'File 2',
        size: 42,
        status: 'Analyzing'
      },
      {
        key: '3',
        name: 'Joe Black',
        size: 32,
        status: 'Pending'
      },
      {
        key: '4',
        name: 'Document 1',
        size: 64,
        status: 'Pending'
      },
      {
        key: '6',
        name: 'File 3',
        size: 72,
        status: 'Error'
      }
    ];
  return (
    <Layout title="Submit | Tool">
        <div className='h-auto'>
            <div className="h-auto px-4 lg:mx-40">
                <h2 className="pt-12 mb-6 text-2xl font-bold sm:text-3xl md:text-5xl">Submit</h2>
                <h2 className="mb-6 text-2xl md:text-3xl">SUBMIT no {id}</h2>
                <p className="pb-10 mb-8 duration-300">
                    MythX has flexible pricing options. 
                    Receive deeper analysis, comprehensive reporting, 
                    and enhanced security with our plans.
                </p>
            </div>
            <div className='mx-4 my-20 lg:mx-40'>
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    </Layout>
  )
}

export default submit;