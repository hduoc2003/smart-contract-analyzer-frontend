import React, {useState} from 'react'
import PieChart from './PieChart'
import LineChart from './LineChart'
import { Data } from '../../../utils/MockData'

const Chart : React.FC = () => {
  console.log(Data)
  const [userData, setUserData] = useState({
    labels: Data.map((data) => data.year),
    datasets: [{
      labels: "USER GAINN",
      data: Data.map((data) => data.userGain)
    }]
  })
  return (
    <section className='flex h-auto gap-12'>
      <div className='w-3/4 p-4 shadow-2xl rounded-xl'>
      <h2 className="text-xl font-bold dark:text-white">
        ANALYZE RESULT CHART
      </h2>
        <LineChart />
      </div>
      <div className='flex flex-col items-center w-1/4 h-auto p-4 shadow-2xl rounded-xl'>
        <h2 className="text-xl font-bold dark:text-white">
          ANALYZE RESULT CHART
        </h2>
        <div className='flex items-center h-full'>
          <PieChart />
        </div>
      </div>
    </section>
  )
}

export default Chart