import React from 'react'

const StatisticCard = ({ icon: IconComponent, text: title, data:data }) => {
  return (
    <li className='flex items-center w-1/4 h-32 rounded-lg shadow-lg'>
      <div className=''>
        <div className='flex justify-center p-4'>
          <IconComponent className='text-5xl text-blue-500'/>
          <div>
            <h1 className='px-4 text-4xl font-bold '> {data} </h1>
            <h2 className='self-center ml-4 font-thin text-md'>{title}</h2>
          </div>
        </div>
      </div>
    </li>
  )
}

export default StatisticCard