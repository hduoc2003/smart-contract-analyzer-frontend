import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout';
import { Space, Table, Tag, Button, Badge, Spin } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { LoadingOutlined } from '@ant-design/icons'
import { useRouter } from 'next/dist/client/router';

const spinIcon = <LoadingOutlined className='ml-2' style={{fontSize: 12}} spin/>

interface DataType {
    key: React.Key;
    name: string;
    size: number;
    status: string;
}
  
const areAllFilesCompleted = (resultArray) => {
  resultArray.forEach(element => {
    if(element.status === 'Continue') return false;
  });
  return true;
};

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
                key: record.key,
                file_id: record.file_id,
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
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }
    };

    // Fetch data initially
    fetchData();

    // Set up an interval to fetch data every 3 seconds (adjust the interval as needed)
    const intervalId = setInterval(() => {
      console.log("⚠️⚠️", fileInfo);
      if (fileInfo && areAllFilesCompleted(fileInfo)) {
        clearInterval(intervalId);
      } else {
        fetchData();
      }
    }, 3000);
    // Clean up the interval when the component unmounts or when the 'id' prop changes
    return () => {
      clearInterval(intervalId);
    };
  }, [id]);

  useEffect(() => {
    console.log("😊UPDATE STATUS");
    console.log(fileInfo);
  }, [fileInfo]);

  const columns: ColumnsType<DataType> = [
      {
        title: 'File id',
        dataIndex: 'file_id',
        key: 'file_id',
      },
      {
        title: 'Name',
        dataIndex: 'file_name',
        key: 'file_name',
        render: (text) => <a>{text}</a>,
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
              {status === 'analyzing' ? 
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
              <Button disabled>View more</Button>
            ) : (
              <Button onClick={() => viewFile(record)}>View more</Button>
            )}
          </Space>
        ),
      },
    ];
  
  return (
    <Layout title="Submit | Tool">
        <div className='h-auto'>
            <div className="h-auto px-4 lg:mx-40">
                <h2 className="pt-12 mb-6 text-2xl font-bold sm:text-3xl md:text-5xl">Submit</h2>
                <h2 className="mb-6 text-2xl md:text-3xl">SUBMIT no {id}</h2>
                <p className="pb-10 mb-8 duration-300">
                    Smart contract analyzer
                </p>
            </div>
            <div className='mx-4 my-20 lg:mx-40'>
                <Table columns={columns} dataSource={fileInfo} />
            </div>
        </div>
    </Layout>
  )
}

export default submit;