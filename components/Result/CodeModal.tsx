import React, {useEffect} from 'react'
import { ResultType } from '../../interfaces/results';
import { Tag, Descriptions, Popover } from 'antd';
import { InfoCircleOutlined, WarningOutlined, RiseOutlined } from '@ant-design/icons';
import hljs from 'highlight.js';
import IssuesTable from './IssuesTable';
import { AnalysisIssue } from '../../interfaces/analysisResult';

// import mockSourceCode from './mockSrcCode.json'
// import mockIssueData from './mockIssueData.json'

import Highlighter from '../../utils/Highlighter';
interface CodeModalProps {
    parsedData: String; // Replace 'any' with the actual type of 'modalData' if possible
    IssuesData: AnalysisIssue[];
    checkedList: any;
}


const CodeModal : React.FC<CodeModalProps> = (props) => {
    const { IssuesData, parsedData, checkedList } = props;
    const normalizeErrors = () => {
        // Create a map to store errors by line number
        const issuesMap = new Map();
        
        // Iterate through the IssuesData and populate the issuesMap
        IssuesData.forEach((error) => {
            if (Array.isArray(error.line_no)) {
                error.line_no.forEach((lineNumber) => {
                    const adjustedLineNumber = lineNumber - 1; // Subtract 1 from the line number
                    if (!issuesMap.has(adjustedLineNumber)) {
                        issuesMap.set(adjustedLineNumber, []);
                    }
                    issuesMap.get(adjustedLineNumber).push(error);
                });
            } else if (Number.isInteger(error.line_no)) {
                const adjustedLineNumber = error.line_no - 1; // Subtract 1 from the line number
                if (!issuesMap.has(adjustedLineNumber)) {
                    issuesMap.set(adjustedLineNumber, []);
                }
                issuesMap.get(adjustedLineNumber).push(error);
            }
        });
        
        const IssuesIndexes = Array.from(issuesMap.keys()); // Extract adjusted line numbers as IssuesIndexes
        const ErrorMap = Object.fromEntries(issuesMap); // Convert the Map to an object
        // Return an object containing both IssuesIndexes and ErrorMap
        return {
            IssuesIndexes,
            ErrorMap,
        };
    };

    useEffect(() => {
        console.log("🐲🐲 ~ file: CodeModal.tsx:57 ~ checkedList:", checkedList)
    }, [checkedList]);

    
    // Call the function to get the results
    const { IssuesIndexes, ErrorMap } = normalizeErrors();
    
    const generateIssueContent = (index, severity) => (
        <div>
            {console.log(index)}
            <IssuesTable 
                className=""
                IssuesData={ErrorMap[index] && ErrorMap[index].filter((item) => item.severity === severity)} 
            />
        </div>
    );

    const highlightCode = () => {
        const code = (parsedData as string);
        const highlightedCode = hljs.highlightAuto(code).value;
        // Split the highlighted code into lines
        const lines = highlightedCode.split('\n');

        return lines.map((line, index) => {
            let isErrorLine = false;
            let isMediumLine = false;
            let isInfoLine = false;
            let isLowLine = false;

            return (
                <>
                    <span className='inline-flex items-center w-24 align-middle'>
                        <span className='inline-flex items-center w-20 space-x-1 align-middle'>
                            {checkedList.includes('Optimization') && ErrorMap[index] && ErrorMap[index].some(item => item.severity === "Optimization") && (
                                (() => {
                                    isInfoLine = true;
                                    return (
                                        <Popover placement="bottomLeft" title={"Informational"} content={generateIssueContent(index, "Optimization")}>
                                            <RiseOutlined className='text-blue-600 animate__animated animate__fadeIn hover:text-blue-700 hover:cursor-pointer'/>
                                        </Popover>
                                    );
                                })()
                            )}

                            {checkedList.includes('Informational') && ErrorMap[index] && ErrorMap[index].some(item => item.severity === "Informational") && (
                                (() => {
                                    isInfoLine = true;
                                    return (
                                        <Popover placement="bottomLeft" title={"Informational"} content={generateIssueContent(index, "Informational")}>
                                            <InfoCircleOutlined className='text-blue-600 animate__animated animate__fadeIn hover:text-blue-700 hover:cursor-pointer none'/>
                                        </Popover>
                                    );
                                })()
                            )}

                            {checkedList.includes('Low') && ErrorMap[index] && ErrorMap[index].some(item => item.severity === "Low") && (
                                (() => {
                                    isLowLine = true;
                                    return (
                                        <Popover placement="bottomLeft" title={"Low risk"} content={generateIssueContent(index, "Low")}>
                                            <WarningOutlined className='text-yellow-600 hover:cursor-pointer animate__animated animate__fadeIn hover:text-yellow-700'/>
                                        </Popover>
                                    );
                                })()
                            )}

                            {checkedList.includes('Medium') && ErrorMap[index] && ErrorMap[index].some(item => item.severity === "Medium") && (
                                (() => {
                                    isMediumLine = true;
                                    return (
                                        <Popover placement="bottomLeft" title={"Medium risk"} content={generateIssueContent(index, "Medium")}>
                                            <WarningOutlined className='text-orange-600 hover:cursor-pointer animate__animated animate__fadeIn hover:text-orange-700'/>
                                        </Popover>
                                    );
                                })()
                            )}

                            {checkedList.includes('High') && ErrorMap[index] && ErrorMap[index].some(item => item.severity === "High") && (
                                (() => {
                                    isErrorLine = true;
                                    return (
                                        <Popover placement="bottomLeft" title={"High risk"} content={generateIssueContent(index, "High")}>
                                            <WarningOutlined className='text-red-600 hover:cursor-pointer animate__animated animate__fadeIn hover:text-red-700 focus:bg-red-100'/>
                                        </Popover>
                                    );
                                })()
                            )}
                        </span>
                        <span className='items-end mr-2 text-gray-300'>
                            {index}
                        </span>
                    </span>
                    <span
                        key={index}
                        className={`    
                            ${isErrorLine ? "bg-red-200 rounded hover:bg-red-300 hover:cursor-pointer animate__animated animate__fadeIn" : 
                                isMediumLine ? "bg-orange-200 rounded hover:bg-orange-300 hover:cursor-pointer animate__animated animate__fadeIn" :
                                isLowLine ? "bg-yellow-200 rounded hover:bg-yellow-300 hover:cursor-pointer animate__animated animate__fadeIn" :
                                isInfoLine ? "bg-blue-200 rounded hover:bg-blue-300 hover:cursor-pointer animate__animated animate__fadeIn" : ""}
                            `}
                        onClick={() => {
                            // console.log(ErrorMap[index]);
                        }}
                        dangerouslySetInnerHTML={{ __html: line+"\n" }}
                    ></span>
                </>
            );
    })}

    return (
        <div className='mt-4'>
            <Descriptions bordered>
            {/* LINE 1 */}
                <Descriptions.Item span={3}>
                    <pre>
                    {highlightCode()}
                    </pre>
                </Descriptions.Item>
            </Descriptions>
        </div>
    )
}

export default CodeModal