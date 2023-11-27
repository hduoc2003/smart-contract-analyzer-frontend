import React, { useEffect, useRef, useState } from 'react'
import Layout from '../../components/Layout';
import { Space, Table, Tag, Button, Badge, Spin } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { LoadingOutlined } from '@ant-design/icons'
import { useRouter } from 'next/dist/client/router';
import { AnalyzeStatus } from '../../interfaces/analysisResult';
import { Socket, io } from 'socket.io-client';

const spinIcon = <LoadingOutlined className='ml-2' style={{ fontSize: 12 }} spin />
const bigSpinIcon = <LoadingOutlined className='' style={{ fontSize: 36 }} spin />

interface TableData {
  file_id: string
  file_name: string
  status: AnalyzeStatus
}

const submit: React.FC = () => {
  const router = useRouter();
  const submitId = router.query.id;
  const [filesInfo, setFilesInfo] = useState<TableData[]>([]);
  const socket = useRef<Socket>(undefined)

  // console.log('rerender')
  const viewFile = (record: TableData) => {
    router.push({
      pathname: '/result',
      query: {
          id: record.file_id,
      }
  });
  }

  useEffect(() => {
    // console.log("👾👾", submitId);

    const fetchData = () => {
      if (submitId) {
        const serverBaseURL = `${process.env.SERVER_BASE_API}/client/tool/submit/get-analyze-status?id=${submitId}`;
        fetch(serverBaseURL)
          .then(res => res.json())
          .then((newFilesInfo: TableData[]) => {
            setFilesInfo(newFilesInfo)
            let analyzing_files_id: string[] = [];
            let cnt_analyzing = 0;
            newFilesInfo.forEach((tableData) => {
              if (tableData.status === 'Analyzing') {
                analyzing_files_id.push(tableData.file_id);
                ++cnt_analyzing;
              }
            });

            if (cnt_analyzing === 0) {
              socket.current?.close();
              return;
            }

            console.log('socket')
            socket.current = io(process.env.SERVER_BASE_URL);

            socket.current.emit('listen-analyze-status-change', {
              analyzing_files_id,
              cnt_analyzing
            });

            socket.current.on('close-listen-analyze-status-change', () => {
              // console.log('Socket closed')
              socket.current.close();
            });

            socket.current.on('send-analyze-status-change', (data: TableData) => {
              console.log(data)
              setFilesInfo((prevFilesInfo) => {
                let i = prevFilesInfo.findIndex((fileInfo: TableData) => fileInfo.file_id === data.file_id);
                if (i === -1)
                  return [...prevFilesInfo, data];
                return prevFilesInfo.map((fileInfo, idx) => idx === i ? data : fileInfo)
              })
            })

            return () => {
              socket.current?.close()
            }

          })
          .catch((error) => {
            console.error('Error:', error);
          });

      }
    };
    fetchData();
  }, [submitId]);

  const columns: ColumnsType<TableData> = [
    {
      title: 'File id',
      key: 'file_id',
      render: (_, record: TableData) => <a onClick={() => viewFile(record)}>{record.file_id}</a>
    },
    {
      title: 'Name',
      key: 'file_name',
      render: (_, record: TableData) => <a onClick={() => viewFile(record)}>{record.file_name}</a>
    },
    {
      title: 'Status',
      key: 'file_status',
      render: (_, record: TableData) => {
        let color: string;
        switch (record.status) {
          case 'Analyzing':
            color = 'geekblue';
            break;
          case 'Completed':
            color = 'green';
            break;
          case 'Error':
            color = 'red';
            break;
        }
        return (
          <Tag color={color} key={record.status}>
            {record.status.toUpperCase()}
            {record.status === 'Analyzing' ?
              <Spin indicator={spinIcon} />
              : <></>
            }
          </Tag>
        );
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record: TableData) => (
        <Space size="middle">
          <Button onClick={() => viewFile(record)}>View</Button>
        </Space>
      ),
    },
  ];

  return (
    <Layout title={`Submit | ${submitId !== undefined ? submitId : "loading.."}`}>
      <div className='h-auto'>
        <div className="h-auto lg:mx-40">
          <h2 className="pt-12 mb-6 text-2xl font-bold sm:text-3xl md:text-5xl">Submit</h2>
          <h2 className="mb-6 text-2xl md:text-3xl">{submitId}</h2>
          <p className="pb-10 mb-8 duration-300">
            Experience streamlined and efficient smart contract analysis with our cutting-edge Smart Contract Analyzer. Simply upload your file and let the system work its magic. While your file undergoes analysis, you can monitor the progress and view the results as soon as they become available. It's a hassle-free and time-saving solution for all your smart contract assessment needs.
          </p>
        </div>
        <div className='mx-4 my-10 lg:mx-40'>
          {
            filesInfo ?
              <Table
                className='animate__animated animate__delay-fast animate__fadeIn'
                columns={columns}
                dataSource={filesInfo}
                rowKey={(record) => record.file_id}
              />
              :
              (
                <div className='flex items-center justify-center my-48 animate__animated animate__delay-fast animate__fadeIn'>
                  <Spin indicator={bigSpinIcon} />
                </div>
              )
          }
        </div>
      </div>
    </Layout>
  )
}

export default submit;
