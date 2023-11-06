'use client'
import Editor, { DiffEditor, useMonaco } from '@monaco-editor/react'
import { useEffect, useState } from 'react'

export default function EditorDiff({initCode, updatedCode, updateCode, theme}) {
  const [defaultCode, setDefaultCode] = useState(initCode)
  const [languages, setLanguages] = useState([])
  const [isDisabled, setIsDisabled] = useState(true)
  const monaco = useMonaco()
  useEffect(() => {}, [updatedCode])

  return (
    <>
      <div className="grid h-auto mb-2 bg-black animate__animated animate__fadeIn">
        <div className="relative border font-xs">
          <DiffEditor
            height="50vh"
            // @ts-ignore
            defaultLanguage="sol"
            theme={theme}
            original={defaultCode}
            modified={updatedCode}
            onChange={(modified) => {
              updateCode(modified);
            }}
            options={{
              selectOnLineNumbers: true,
              readOnly: true,
              minimap: {
                enabled: false,
              },
              domReadOnly: true,
              cursorBlinking: 'solid',
            }}
          />
        </div>
      </div>
    </>
  )
}