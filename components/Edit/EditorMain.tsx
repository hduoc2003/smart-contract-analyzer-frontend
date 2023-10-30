'use client'
import Editor, { DiffEditor, useMonaco } from '@monaco-editor/react'
import { useEffect, useRef, useState } from 'react'
// import { IStandaloneCodeEditor } from "monaco";
import { editor } from "monaco-editor/esm/vs/editor/editor.api";

export default function EditorMain({
    fileSrcCode,
    onChange,
    theme,
    editorRef: ref
} : {
    fileSrcCode: string
    onChange?: (value: string) => void
    theme?: string
    editorRef?: {
        current: editor.IStandaloneCodeEditor
    }
}) {
    const monaco = useMonaco()
    // console.log(fileSrcCode)

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
                        defaultValue={fileSrcCode}
                        onChange={onChange}
                        options={{
                            minimap: {
                                enabled: true,
                            },
                            cursorBlinking: 'solid',
                        }}
                        onMount={(editor) => {ref.current = editor}}
                    />
                </div>
            </div>
        </>
    )
}
