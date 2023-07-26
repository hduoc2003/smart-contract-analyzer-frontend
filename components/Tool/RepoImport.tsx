import React from 'react'
import { InfoCircleOutlined,  } from '@ant-design/icons';
import { BiGitBranch, BiLogoGithub, BiLogoGitlab, BiLogoGit } from 'react-icons/bi';
import { Input, Tooltip } from 'antd';

const RepoImport = () => {
    return (
        <div className="h-auto p-8 border border-gray-200 rounded shadow-md md:mx-20 md:mt-20 animate__animated animate__fadeInUp">
            <div className='grid grid-cols-2'>
                <h2 className='mb-8 font-bold text-md md:text-xl'>
                    Import a Third-Party Git Repository
                </h2>
                <ul className='items-end hidden gap-2 md:flex md:items-start md:justify-end md:flex-row'>
                    <li><BiLogoGit className='w-4 h-4 md:w-8 md:h-8'/></li> 
                    <li><BiLogoGithub className='w-4 h-4 md:w-8 md:h-8'/></li> 
                    <li><BiLogoGitlab className='w-4 h-4 md:w-8 md:h-8'/></li> 
                </ul>
            </div>
            <div>
                <Input
                    className='h-12'
                    placeholder="https://some-provider.com/some-organization/some-project"
                    prefix={<BiGitBranch/>}
                    suffix={
                        <Tooltip title="Enter the URL of a Git repository">
                            <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                        </Tooltip>
                    }
                />
            </div>
            <div className="flex justify-end mt-4">
                <button
                    className={`py-2 px-8 font-bold text-white rounded-md focus:shadow-outline bg-slate-950  focus:outline-none`}
                    type="button"
                >
                    Continue
                </button>
            </div>
        </div>
    )
}

export default RepoImport