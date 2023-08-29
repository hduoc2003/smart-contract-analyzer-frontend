import React from 'react'
import StatisticCard from './StatisticCard'
import {UserOutlined, CheckOutlined, ClockCircleOutlined, WarningOutlined} from '@ant-design/icons'

const Statistic : React.FC = () => {
  return (
    <section className='h-48'>
        <ul className='flex gap-4'>
          <StatisticCard icon={UserOutlined} text={'User'} data={123}/>
          <StatisticCard icon={CheckOutlined} text={'Success'} data={12}/>
          <StatisticCard icon={ClockCircleOutlined} text={'Waiting'} data={5}/>
          <StatisticCard icon={WarningOutlined} text={'Errors'} data={7}/>
        </ul>
    </section>
  )
}

export default Statistic