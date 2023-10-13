import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout';
import { Space, Table, Tag, Button, Badge, Spin } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { LoadingOutlined } from '@ant-design/icons'
import { useRouter } from 'next/dist/client/router';

const spinIcon = <LoadingOutlined className='ml-2' style={{fontSize: 12}} spin/>
const bigSpinIcon = <LoadingOutlined className='' style={{fontSize: 36}} spin/>

interface DataType {
    key: React.Key;
    name: string;
    size: number;
    status: string;
}

const submit : React.FC = () => {
  const router = useRouter();
  const id = router.query.id;
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [fileInfo, setFileInfo] = useState();
  const viewFile = (record) => {
    console.log("👾👾👾", record);
    router.push(
        {
            pathname: '/result/' + record.file_id,
            query: {
                id: record.file_id,
            },
        }, '/result/' + record.file_id
    );
  }

  useEffect(() => {
    console.log("👾👾", id);

    const fetchData = () => {
      if (id) {
        const serverBaseURL = `http://127.0.0.1:5000/api/v1/client/tool/handle_results?id=${id}`;
        console.log("🚀 ~ file: [id].tsx:38 ~ useEffect ~ serverBaseURL:", serverBaseURL);

        fetch(serverBaseURL, { credentials: 'include' })
          .then(async (response) => {
            console.log("👁️👁️", response);

            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return response.json(); // You may want to parse the response as JSON
          })
          .then((data) => {
            // Handle the data received from the API
            console.log("Data from the API:", data);
            setFileInfo(data);
            const allCompleted = data.every(item => item.file_status === 'Completed');
            if(allCompleted) {
              console.log("😊😊😊😊😊", data)
            }
            else {
              setTimeout(() => {
                fetchData();
              }, 3000); // Adjust the delay as needed.
            }
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }
    };

    // Fetch data initially
    fetchData();
  }, [id]);

  useEffect(() => {
    console.log("😊UPDATE STATUS");
    console.log(fileInfo);
  }, [fileInfo]);

  const columns: ColumnsType<DataType> = [
      {
        title: 'File id',
        key: 'file_id',
        render: (record) => <a onClick={() => viewFile(record)}>{record.file_id}</a>
      },
      {
        title: 'Name',
        key: 'file_name',
        render: (record) => <a onClick={() => viewFile(record)}>{record.file_name}</a>
      },
      {
        title: 'Status',
        dataIndex: 'file_status',
        key: 'file_status',
        render: (status) => {
          let color = 'geekblue';
          if (status === 'Completed') {
            color = 'green';
          }
          else status === 'analyzing'
          return (
            <Tag color={color} key={status}>
              {status.toUpperCase()}
              {status === 'Continue' ? 
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
        render: (record) => (
          <Space size="middle">
            {record.file_status !== 'Completed' ? (
              <Button disabled>View</Button>
            ) : (
              <Button onClick={() => viewFile(record)}>View</Button>
            )}
          </Space>
        ),
      },
    ];
  
  return (
    <Layout title={`Result | ${id !== undefined ? id : "loading.."}`}>
        <div className='h-auto'>
            <div className="h-auto lg:mx-40">
                <h2 className="pt-12 mb-6 text-2xl font-bold sm:text-3xl md:text-5xl">Submit</h2>
                <h2 className="mb-6 text-2xl md:text-3xl">{id}</h2>
                <p className="pb-10 mb-8 duration-300">
                  Experience streamlined and efficient smart contract analysis with our cutting-edge Smart Contract Analyzer. Simply upload your file and let the system work its magic. While your file undergoes analysis, you can monitor the progress and view the results as soon as they become available. It's a hassle-free and time-saving solution for all your smart contract assessment needs.
                </p>
            </div>
            <div className='mx-4 my-10 lg:mx-40'>
                {fileInfo ? (<Table className='animate__animated animate__delay-fast animate__fadeIn' columns={columns} dataSource={fileInfo} />) :
                  (
                    <div className='flex items-center justify-center my-48 animate__animated animate__delay-fast animate__fadeIn'>
                      <Spin indicator={bigSpinIcon}/>
                    </div>
                  )
                }
            </div>
        </div>
    </Layout>
  )
}

export default submit;