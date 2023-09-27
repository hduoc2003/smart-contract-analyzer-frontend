import React from 'react'
import { ResultType } from '../../interfaces/results';
import { Tag, Descriptions, Popover } from 'antd';
import hljs from 'highlight.js';
import mockIssueData from './mockIssueData.json'
import mockSourceCode from './mockSrcCode.json'
import IssuesTable from './IssuesTable';

import Highlighter from '../../utils/Highlighter';
interface CodeModalProps {
    parsedData: String; // Replace 'any' with the actual type of 'modalData' if possible
    IssuesData: any;
}

const content = (
    <div>
        <IssuesTable IssuesData={mockIssueData}/>
    </div>
);

const CodeModal : React.FC<CodeModalProps> = (props) => {
    const { IssuesData, parsedData } = props;
    console.log("🚀 ~ file: CodeModal.tsx:40 ~ IssuesData:", IssuesData)
    const normalizeErrors = () => {
        const errorData = IssuesData;
        
        // Create a map to store errors by line number
        const errorMap = new Map();
        
        // Iterate through the errorData and populate the errorMap
        errorData.forEach((error) => {
            error.line_no.forEach((lineNumber) => {
                if (!errorMap.has(lineNumber)) {
                    errorMap.set(lineNumber, []);
                }
                    errorMap.get(lineNumber).push(error);
            });
        });
    
        const ErrorIndexs = Array.from(errorMap.keys()); // Extract line numbers as ErrorIndexs
        const ErrorMap = Object.fromEntries(errorMap); // Convert the Map to an object
    
        // Return an object containing both ErrorIndexs and ErrorMap
        return {
            ErrorIndexs,
            ErrorMap,
        };
    };

        // Call the function to get the results
    const { ErrorIndexs, ErrorMap } = normalizeErrors();
    console.log("ErrorIndexs:", ErrorIndexs);
    console.log("ErrorMap:", ErrorMap);
                

    const highlightCode = () => {
    const code = JSON.parse(parsedData as string);
    const highlightedCode = hljs.highlightAuto(code).value;
    // Split the highlighted code into lines
    const lines = highlightedCode.split('\n');

    return lines.map((line, index) => {
        const isErrorLine = ErrorIndexs.includes(index);
        return isErrorLine ? (
            <Popover content={content} placement='right' title="Title" trigger="click">
                <span
                    key={index}
                    className='bg-red-100 rounded hover:bg-red-200 hover:cursor-pointer'
                    onClick={() => {
                        console.log(ErrorMap[index]);
                    }}
                    dangerouslySetInnerHTML={{ __html: line }}
                ></span>
            </Popover>
        ) : (
            <span
                key={index}
                className=''
                dangerouslySetInnerHTML={{ __html: line }}
            ></span>
        );
        })
    };

    return (
    <div className='mt-4'>
        <Descriptions title="Code submitted" bordered>
        {/* LINE 1 */}
            <Descriptions.Item label="Code" span={3}>
                <pre>
                {highlightCode()}
                </pre>
            </Descriptions.Item>
        </Descriptions>
    </div>
    )
}

export default CodeModal