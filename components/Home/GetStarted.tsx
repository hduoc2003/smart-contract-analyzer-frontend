import React from 'react'
import Link from 'next/link';

const GetStarted: React.FC = () => {
  return (
    <section className="p-8 m-4 text-white bg-slate-950 rounded-xl h-96">
        <div className='h-52'>
            <div className="w-full mb-4 md:mb-12 md:w-3/4">
                <h2 className="text-2xl font-bold duration-500 sm:text-4xl md:text-5xl">Take control of your smart contract security today</h2>
            </div>
        </div>
        <div className="flex justify-start w-full mt-12 md:justify-end md:w-1/2 md:mt-20">
          <Link className="flex justify-center w-full px-8 py-2 text-sm font-semibold duration-500 bg-white border border-white rounded-lg text-slate-950 hover:bg-slate-950 hover:text-white" href="/login">
              GET STARTED
          </Link>
      </div>
    </section>
  )
}

export default GetStarted