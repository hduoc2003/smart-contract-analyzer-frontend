import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/router';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Segmented, Select, Button } from 'antd';

import Layout from '../../components/Layout'
import EditorDiff from '../../components/Edit/EditorDiff';
import EditorMain from '../../components/Edit/EditorMain';
import { ContractAnalysis } from '../../interfaces/analysisResult';

const bigSpinIcon = <LoadingOutlined className='' style={{fontSize: 36}} spin/>

const Edit = () => {
    const router = useRouter();
    const id = router.query.id;
    console.log(id)
    const [fileSrcCode, setFileSrcCode] = useState<string>("");
    const [fetchDone, setFetchDone] = useState(false)
    const [editorCode, setEditorCode] = useState()
    const [showDiff, setShowDiff] = useState(false)
    const [showEditor, setShowEditor] = useState(true)
    const [theme, setTheme] = useState('MerbivoreSoft')

    useEffect(() => {
        const fetchData = () => {
            if (id) {
                const serverBaseURL = `${process.env.SERVER_BASE_URL}/client/tool/file/get-analyze-result?id=${id}`;
                console.log(serverBaseURL);
                fetch(serverBaseURL, { credentials: 'include' })
                .then(async (response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json(); // You may want to parse the response as JSON
                })
                .then((data) => {
                    // Handle the data received from the API
                    console.log("Data from the API:", data);
                    setFileSrcCode(data.source_code);
                    setEditorCode(data.source_code);
                    if(data.analysis){
                        console.log(fileSrcCode);
                        setFetchDone(true);
                    } else {
                        // If the condition is not met, trigger the useEffect again after a delay.
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
        fetchData();
    }, [id]);

    useEffect(() => {
        console.log(editorCode);
    }, [editorCode]);

    const handleReSubmit = () => {
        console.log("❤️‍🔥 RESUBMIT", editorCode);
    }

    return (
        <Layout title={`Edit | ${id !== undefined ? id : "loading.."}`}>
            <div className='h-auto min-h-screen'>
                <div className="h-auto lg:mx-40 sm:mx-4">
                    <h2 className="pt-12 mb-6 text-2xl font-bold sm:text-3xl md:text-5xl">Edit</h2>
                    <div className='flex items-center'>
                        <h2 className="text-2xl md:text-3xl">{id}</h2>
                    </div>
                </div>
                {fetchDone
                ? (
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
                                        if(value === 2) {setShowDiff(true); setShowEditor(true)}
                                        else if(value === 1) {setShowDiff(true); setShowEditor(false)}
                                        else {setShowDiff(false); setShowEditor(true)}
                                    }}
                                />
                            </div>
                            <Button onClick={handleReSubmit} className='hover:text-white'>Re-submit</Button>
                        </div>

                        {showDiff && <EditorDiff initCode = {fileSrcCode} updatedCode={editorCode} updateCode={setEditorCode} theme={theme}/>}
                        {showEditor && <EditorMain fileSrcCode = {editorCode} updateCode={setEditorCode} theme={theme}/>}
                    </div>
                ) : (
                    <div className='flex items-center justify-center my-48 animate__animated animate__delay-fast animate__fadeIn'>
                        <Spin indicator={bigSpinIcon}/>
                    </div>
                )}
            </div>
        </Layout>
    )
}

export default Edit
