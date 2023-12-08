import React from 'react'
import { AnalysisError, AnalysisErrorMsg } from '../../interfaces/analysisError';
import { Alert } from 'antd';

interface CodeModalProps {
    ErrorsData: AnalysisErrorMsg[] | [];
}

const ErrorMessage = (props) => {
    const { ErrorsData } = props;
    return (
        <>
            {
                !Array.isArray(ErrorsData) && (
                    <Alert className='mt-2' message={ErrorsData} type="error" />
                )
            }
        </>
    )
}

export default ErrorMessage