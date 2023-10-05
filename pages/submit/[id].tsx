import React, { useEffect, useState } from 'react'
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
  const { id, filelist, idList } = router.query;
  const parsed_idList = JSON.parse(idList as string);
  const parsed_fileList = JSON.parse(filelist as string).map((item, index) => ({
    ...item,
    key: index + 1,
    status: "Analyzing"
  }));
  const resultData = parsed_fileList.map(item => {
    const fileName = item.name;
    if (parsed_idList[fileName]) item.file_id = parsed_idList[fileName];
    return item;
  });
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [fileInfo, setFileInfo] = useState(parsed_fileList);
  const viewFile = (record) => {
    router.push(
        {
            pathname: '/result/' + record.key,
            query: {
                key: record.key,
                path: record.name,
                file_result: JSON.stringify(record),
                ref: 'Tung',
            },
        }, '/result/' + record.key
    );
  }

  useEffect(() => {
    const streamId = id;
    const serverBaseURL = (`http://127.0.0.1:5000/api/v1/client/tool/handle_results?id=${streamId}`);
    // const eventSource = new EventSource(`/api/v1/client/tool/handle_results?id=${streamId}`);
    let fetchingData = true;
    let currFileResult = fileInfo;
    fetchingData && fetch(serverBaseURL, {credentials:'include', method: "POST"},)
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
          try {
            const parsedData = JSON.parse(res);
            const result_filename = parsedData.file_name;
            console.log(currFileResult)
            console.log(parsedData)

            console.log("→ UPDATE STATUS");
            const updatedFileResult = currFileResult.map((file) => {
              if (file.name === result_filename) {
                return { ...file, status: 'Done', result: parsedData};
              }
              return file;
            });

            currFileResult = updatedFileResult;
            setFileInfo(updatedFileResult);
            localStorage.setItem('lastResults', JSON.stringify(updatedFileResult));
          } catch (error) {
            console.error('Error parsing JSON:', error);
          }
        }
      })
      .catch((error) => {
          console.error('Error:', error);
        }
      );
  }, [])

  useEffect(() => {
    console.log("😊UPDATE STATUS");
    console.log(fileInfo);
  }, [fileInfo]);

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
            {fileInfo[record.key as number -1] === undefined ? (
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
                    MythX has flexible pricing options. 
                    Receive deeper analysis, comprehensive reporting, 
                    and enhanced security with our plans.
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