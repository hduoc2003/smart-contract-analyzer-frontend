import React, {useEffect} from 'react'
import { ResultType } from '../../interfaces/results';
import { Tag, Descriptions, Popover } from 'antd';
import { InfoCircleOutlined, WarningOutlined, RiseOutlined } from '@ant-design/icons';
import hljs from 'highlight.js';
import { AnalysisIssue } from '../../interfaces/analysisResult';
import { AnalysisError, AnalysisErrorMsg } from '../../interfaces/analysisError';

// import mockSourceCode from './mockSrcCode.json'
// import mockIssueData from './mockIssueData.json'

import Highlighter from '../../utils/Highlighter';
import IssuesTable from './IssuesTable';
import ErrorTable from './ErrorTable';
interface CodeModalProps {
    ErrorsData: AnalysisErrorMsg[] | [];
    parsedData: String; // Replace 'any' with the actual type of 'modalData' if possible
    IssuesData: AnalysisIssue[];
    checkedList: any;
}


const CodeModal : React.FC<CodeModalProps> = (props) => {
    const { ErrorsData, IssuesData, parsedData, checkedList } = props;
    console.log("🚀 ~ file: CodeModal.tsx:24 ~ ErrorsData:", ErrorsData)
    console.log("🚀 ~ file: CodeModal.tsx:24 ~ IssuesData:", IssuesData)

    const normalizeIssues = () => {
        // Create a map to store errors by line number
        const tempIssuesMap = new Map();
        
        // Iterate through the IssuesData and populate the tempIssuesMap
        IssuesData.forEach((error) => {
            if (Array.isArray(error.line_no)) {
                error.line_no.forEach((lineNumber) => {
                    const adjustedLineNumber = lineNumber - 1; // Subtract 1 from the line number
                    if (!tempIssuesMap.has(adjustedLineNumber)) {
                        tempIssuesMap.set(adjustedLineNumber, []);
                    }
                    tempIssuesMap.get(adjustedLineNumber).push(error);
                });
            } else if (Number.isInteger(error.line_no)) {
                const adjustedLineNumber = error.line_no - 1; // Subtract 1 from the line number
                if (!tempIssuesMap.has(adjustedLineNumber)) {
                    tempIssuesMap.set(adjustedLineNumber, []);
                }
                tempIssuesMap.get(adjustedLineNumber).push(error);
            }
        });
        
        const IssuesIndexes = Array.from(tempIssuesMap.keys()); // Extract adjusted line numbers as IssuesIndexes
        const IssuesMap = Object.fromEntries(tempIssuesMap); // Convert the Map to an object
        // Return an object containing both IssuesIndexes and IssuesMap
        return {
            IssuesIndexes,
            IssuesMap,
        };
    };

    const normalizeErrors = () => {
        // Create a map to store errors by line number
        const tempErrorsMap = new Map;
      
        // Iterate through the ErrorsData and populate the tempErrorsMap
        ErrorsData.forEach((error) => {
          if (Array.isArray(error.line_no)) {
            error.line_no.forEach((lineNumber) => {
              const adjustedLineNumber = lineNumber - 1; // Subtract 1 from the line number
              if (!tempErrorsMap.has(adjustedLineNumber)) {
                tempErrorsMap.set(adjustedLineNumber, []);
              }
              tempErrorsMap.get(adjustedLineNumber)!.push(error); // Use non-null assertion (!) to tell TypeScript that tempErrorsMap.get(adjustedLineNumber) will never be undefined
            });
          } else if (Number.isInteger(error.line_no)) {
            const adjustedLineNumber = error.line_no - 1; // Subtract 1 from the line number
            if (!tempErrorsMap.has(adjustedLineNumber)) {
              tempErrorsMap.set(adjustedLineNumber, []);
            }
            tempErrorsMap.get(adjustedLineNumber)!.push(error);
          }
        });
      
        const ErrorsIndexes = Array.from(tempErrorsMap.keys()); // Extract adjusted line numbers as ErrorsIndexes
        const ErrorsMap = Object.fromEntries(tempErrorsMap); // Convert the Map to an object
        // Return an object containing both ErrorsIndexes and ErrorsMap
        return {
          ErrorsIndexes,
          ErrorsMap,
        };
      };
      

    useEffect(() => {
        console.log("🐲🐲 ~ file: CodeModal.tsx:57 ~ checkedList:", checkedList)
    }, [checkedList]);

    
    // Call the function to get the results
    const { IssuesIndexes, IssuesMap } = normalizeIssues();
    const { ErrorsIndexes, ErrorsMap } = normalizeErrors();
    console.log("ErrorsIndexes:", ErrorsIndexes);
    console.log("ErrorsMap:", ErrorsMap);

    
    const generateIssueContent = (index, severity) => (
        <div>
            <IssuesTable 
                className=""
                IssuesData={IssuesMap[index] && IssuesMap[index].filter((item) => item.severity === severity)} 
            />
        </div>
    );

    const generateErrorContent = (index, typeDetect) => (
        <div>
            <ErrorTable 
                className=""
                IssuesData={ErrorsMap[index] && ErrorsMap[index].filter((item) => item.typeDetect === typeDetect)} 
            />
        </div>
    )

    const highlightCode = () => {
        const code = (parsedData as string);
        const highlightedCode = hljs.highlightAuto(code).value;
        // Split the highlighted code into lines
        const lines = highlightedCode.split('\n');

        return lines.map((line, index) => {
            let isHighLine = false;
            let isMediumLine = false;
            let isInfoLine = false;
            let isLowLine = false;

            return (
                <>
                    <span className='inline-flex items-center w-24 align-middle'>
                        <span className='inline-flex items-center w-20 space-x-1 align-middle'>
                            {checkedList.includes('Optimization') && IssuesMap[index] && IssuesMap[index].some(item => item.severity === "Optimization") && (
                                (() => {
                                    isInfoLine = true;
                                    return (
                                        <Popover placement="bottomLeft" title={"Informational"} content={generateIssueContent(index, "Optimization")}>
                                            <RiseOutlined className='text-blue-600 animate__animated animate__fadeIn hover:text-blue-700 hover:cursor-pointer'/>
                                        </Popover>
                                    );
                                })()
                            )}

                            {checkedList.includes('Informational') && IssuesMap[index] && IssuesMap[index].some(item => item.severity === "Informational") && (
                                (() => {
                                    isInfoLine = true;
                                    return (
                                        <Popover placement="bottomLeft" title={"Informational"} content={generateIssueContent(index, "Informational")}>
                                            <InfoCircleOutlined className='text-blue-600 animate__animated animate__fadeIn hover:text-blue-700 hover:cursor-pointer none'/>
                                        </Popover>
                                    );
                                })()
                            )}

                            {checkedList.includes('Low') && IssuesMap[index] && IssuesMap[index].some(item => item.severity === "Low") && (
                                (() => {
                                    isLowLine = true;
                                    return (
                                        <Popover placement="bottomLeft" title={"Low risk"} content={generateIssueContent(index, "Low")}>
                                            <WarningOutlined className='text-yellow-600 hover:cursor-pointer animate__animated animate__fadeIn hover:text-yellow-700'/>
                                        </Popover>
                                    );
                                })()
                            )}

                            {checkedList.includes('Medium') && IssuesMap[index] && IssuesMap[index].some(item => item.severity === "Medium") && (
                                (() => {
                                    isMediumLine = true;
                                    return (
                                        <Popover placement="bottomLeft" title={"Medium risk"} content={generateIssueContent(index, "Medium")}>
                                            <WarningOutlined className='text-orange-600 hover:cursor-pointer animate__animated animate__fadeIn hover:text-orange-700'/>
                                        </Popover>
                                    );
                                })()
                            )}

                            {checkedList.includes('High') && IssuesMap[index] && IssuesMap[index].some(item => item.severity === "High") && (
                                (() => {
                                    isHighLine = true;
                                    return (
                                        <Popover placement="bottomLeft" title={"High risk"} content={generateIssueContent(index, "High")}>
                                            <WarningOutlined className='text-red-600 hover:cursor-pointer animate__animated animate__fadeIn hover:text-red-700 focus:bg-red-100'/>
                                        </Popover>
                                    );
                                })()
                            )}

                            {ErrorsMap[index] && ErrorsMap[index].some(item => item.typeDetect === "Warning") && (
                                (() => {
                                    isMediumLine = true;
                                    return (
                                        <Popover placement="bottomLeft" title={ErrorsMap[index].error_title} content={generateErrorContent(index, "Warning")}>
                                            <WarningOutlined className='text-orange-600 hover:cursor-pointer animate__animated animate__fadeIn hover:text-orange-700'/>
                                        </Popover>
                                    );
                                })()
                            )}
                            {ErrorsMap[index] && ErrorsMap[index].some(item => item.typeDetect === "Error") && (
                                (() => {
                                    isHighLine = true;
                                    return (
                                        <Popover placement="bottomLeft" title={ErrorsMap[index].error_title} content={generateErrorContent(index, "Error")}>
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
                            ${isHighLine ? "bg-red-200 rounded hover:bg-red-300 hover:cursor-pointer animate__animated animate__fadeIn" : 
                                isMediumLine ? "bg-orange-200 rounded hover:bg-orange-300 hover:cursor-pointer animate__animated animate__fadeIn" :
                                isLowLine ? "bg-yellow-200 rounded hover:bg-yellow-300 hover:cursor-pointer animate__animated animate__fadeIn" :
                                isInfoLine ? "bg-blue-200 rounded hover:bg-blue-300 hover:cursor-pointer animate__animated animate__fadeIn" : ""}
                            `}
                        onClick={() => {
                            // console.log(IssuesMap[index]);
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