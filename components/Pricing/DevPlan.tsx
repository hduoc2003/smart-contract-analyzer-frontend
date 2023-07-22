import React, { useState } from 'react'
import { Radio } from 'antd'

const DevPlan: React.FC = () => {
    const [plan, setPlan] = useState<string>("month");

    return (
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-2xl shadow-cyan-500/50 sm:p-8 ">
            <h5 className="mb-4 text-xl font-medium text-gray-500 ">Developer plan</h5>
            <div className="flex items-baseline text-gray-900">
                <span className="text-3xl font-semibold">$</span>
                <span className="duration-500 text-5xl font-extrabold tracking-tight">{plan==="month" ? "149" : "1499"}</span>
                <span className="duration-500 ml-1 text-xl font-normal text-gray-500 ">/{plan}</span>
            </div>
            <ul role="list" className="space-y-5 my-7">
                <li className="flex items-center space-x-3">
                    <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 ">2 team members</span>
                </li>
                <li className="flex space-x-3">
                    <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 ">20GB Cloud storage</span>
                </li>
                <li className="flex space-x-3">
                    <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 ">Integration help</span>
                </li>
                <li className="flex space-x-3">
                    <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 ">Sketch Files</span>
                </li>
                <li className="flex space-x-3">
                    <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 ">API Access</span>
                </li>
                <li className="flex space-x-3 line-through decoration-gray-500">
                    <svg className="flex-shrink-0 w-4 h-4 text-gray-400 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500">Complete documentation</span>
                </li>
                <li className="flex space-x-3 line-through decoration-gray-500">
                    <svg className="flex-shrink-0 w-4 h-4 text-gray-400 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500">24×7 phone & email support</span>
                </li>
            </ul>
            <div className='w-full mt-8'>
                <Radio.Group value={plan} className='w-full duration-500' onChange={(e) => setPlan(e.target.value)}>
                    <Radio.Button className='w-1/2 text-center' value="month">Month</Radio.Button>
                    <Radio.Button className='w-1/2 text-center' value="year">Year</Radio.Button>
                </Radio.Group>
            </div>
        </div>
    )
}

export default DevPlan