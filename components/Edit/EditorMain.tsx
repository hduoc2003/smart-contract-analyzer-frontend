'use client'
import Editor, { DiffEditor, useMonaco } from '@monaco-editor/react'
import { useEffect, useState } from 'react'

export default function EditorDiff({fileSrcCode, updateCode, theme}) {
    const [defaultCode, setDefaultCode] = useState(fileSrcCode)
    const [languages, setLanguages] = useState([])
    const [isDisabled, setIsDisabled] = useState(true)
    const monaco = useMonaco()
    useEffect(() => {
        setDefaultCode(fileSrcCode);
    }, [fileSrcCode])
    useEffect(() => {
    },[defaultCode])

    return (
        <>
            <div className="grid h-screen bg-black animate__animated animate__fadeIn">
                <div className="relative border">
                    <Editor
                        width="full"
                        height="100vh"
                        // @ts-ignore
                        defaultLanguage="sol"
                        theme={theme}
                        defaultValue={defaultCode}
                        value={defaultCode}
                        onChange={(code) => {
                            updateCode(code);
                        }}
                        options={{
                            minimap: {
                                enabled: true,
                            },
                            cursorBlinking: 'solid',
                        }}
                    />
                </div>
            </div>
        </>
    )
}