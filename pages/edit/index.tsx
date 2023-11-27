import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Segmented, Select, Button, Popconfirm, message } from 'antd';
import Layout from '../../components/Layout'
import EditorDiff from '../../components/Edit/EditorDiff';
import EditorMain from '../../components/Edit/EditorMain';
import { ContractAnalysis } from '../../interfaces/analysisResult';
import { editor } from "monaco-editor/esm/vs/editor/editor.api";
import axios from 'axios';

const bigSpinIcon = <LoadingOutlined className='' style={{ fontSize: 36 }} spin />

interface ResubmitResponse {
    submit_id: string
    // new_file_id: string
}

const Edit = () => {
    const router = useRouter();
    const fileId = router.query.id;
    const [fileSrcCode, setFileSrcCode] = useState<string>("");
    const [editorCode, setEditorCode] = useState<string>("")
    const [showDiff, setShowDiff] = useState(false)
    const [ableToSubmit, setAbleToSubmit] = useState<boolean>(false)
    const [showEditor, setShowEditor] = useState(true)
    const [theme, setTheme] = useState('MerbivoreSoft')
    const editorRef = useRef<editor.IStandaloneCodeEditor>(null)
    let fileName = useRef('');
    let [cntResubmit] = useState(0);
    console.log('rerender')
    useEffect(() => {
        const fetchData = () => {
            if (fileId) {
                // console.log('fetching')
                const serverBaseURL = `${process.env.SERVER_BASE_API}/client/tool/file/get-analyze-result?id=${fileId}`;
                // console.log(serverBaseURL);
                fetch(serverBaseURL, { credentials: 'include' })
                    .then(async (response) => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                        return response.json(); // You may want to parse the response as JSON
                    })
                    .then((data: ContractAnalysis) => {
                        // console.log(data.source_code)
                        setFileSrcCode(data.source_code);
                        setEditorCode(data.source_code);
                        fileName.current = data.file_name;
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            }
        };
        fetchData();
    }, [fileId]);

    const handleEditorChange = (newCode) => {
        if(fileSrcCode !== newCode) {
            setAbleToSubmit(true);
        }
        else {
            setAbleToSubmit(false);
        }
    }

    useEffect(() => {
    }, [ableToSubmit, editorCode]);

    const handleRestore = () => {
        setEditorCode(fileSrcCode);
    }

    const handleReSubmit = async () => {
        ++cntResubmit;
        const {data, status}: {data: ResubmitResponse, status: number} =
        await axios.post(`${process.env.SERVER_BASE_API}/client/tool/submit/resubmit`, {
            old_file_id: fileId,
            new_file_name: `${fileName.current} (${cntResubmit})`,
            source_code: editorRef.current.getValue(),
            user_id: '@@@@duoc'
        })
        router.push({
            pathname: '/submit',
            query: {
                id: data.submit_id,
            }
        });
    }

    return (
        <Layout title={`Edit | ${fileId !== undefined ? fileId : "loading.."}`}>
            <div className='h-auto min-h-screen'>
                <div className="h-auto lg:mx-40 sm:mx-4">
                    <h2 className="pt-12 mb-6 text-2xl font-bold sm:text-3xl md:text-5xl">Edit</h2>
                    <div className='flex items-center'>
                        <h2 className="text-2xl md:text-3xl">{fileId}</h2>
                    </div>
                </div>

                <div className='mx-4 my-10 lg:mx-40'>
                    <div className='flex justify-between'>
                        <div>
                            <Select
                                className='mr-2'
                                defaultValue="Light"
                                style={{ width: 120 }}
                                onChange={(value) => setTheme(value)}
                                options={[
                                    { value: 'light', label: 'Light' },
                                    { value: 'vs-dark', label: 'Dark' },
                                ]}
                            />
                            <Segmented
                                className='mb-2'
                                options={[
                                    {
                                        label: 'Editor',
                                        value: 0,
                                    },
                                    {
                                        label: 'Diff editor',
                                        value: 1,
                                    },
                                    {
                                        label: 'Both editor',
                                        value: 2,
                                    }
                                ]}
                                onChange={(value) => {
                                    if (value === 2) { setShowDiff(true); setShowEditor(true) }
                                    else if (value === 1) { setShowDiff(true); setShowEditor(false) }
                                    else { setShowDiff(false); setShowEditor(true) }
                                }}
                            />
                        </div>
                        <div>
                            {
                                ableToSubmit ? (
                                    <Popconfirm
                                        title="Restore code"
                                        description="Are you sure to discard all changes?"
                                        onConfirm={handleRestore}
                                        okText="Yes"
                                        cancelText="No"
                                        okType='default'
                                    >
                                        <Button className='mr-2 hover:text-white'>Restore</Button>
                                    </Popconfirm>
                                )
                                :
                                (
                                    <Button className='mr-2' disabled>Restore</Button>
                                )
                            }
                            {
                                ableToSubmit ? (
                                    <Button onClick={handleReSubmit} className='hover:text-white'>
                                        Re-submit
                                    </Button>
                                ) : (
                                    <Button onClick={handleReSubmit} disabled>Re-submit</Button>
                                )
                            }
                        </div>
                    </div>

                    {/* //TODO: update lại EditorDiff, tránh mỗi lần đổi source_code lại re-render */}
                    {showDiff && <EditorDiff initCode={fileSrcCode} updatedCode={editorCode} updateCode={setEditorCode} theme={theme} />}
                    {showEditor && <EditorMain fileSrcCode={editorCode} editorRef={editorRef} theme={theme} onChange={handleEditorChange} updateCode={setEditorCode}/>}
                </div>
            </div>
        </Layout>
    )
}

export default Edit
