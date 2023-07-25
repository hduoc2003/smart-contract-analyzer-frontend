import React from 'react'
import Layout from '../components/Layout'

import AssertionsAndProperty from '../components/Coverage/AssertionsAndProperty'
import BytecodeSafety from '../components/Coverage/BytecodeSafety'
import AuthorizationControl from '../components/Coverage/AuthorizationControl'

const coverage: React.FC = () => {
  return (
    <Layout title="Coverage | Tool">
    <div>
      <div className="h-auto min-h-screen bg-white">
        <div className="px-8 text-white sm:px-40 bg-slate-950 md:mb-8">
          <h2 className="pt-12 mb-12 text-4xl font-bold sm:pt-32 sm:text-8xl">Smart Contract Vulnerability Coverage</h2>
          <p className="pb-12 text-2xl duration-300 sm:pb-32 sm:text-3xl">
            MythX currently detects most SWCs found in the SWC Registry. Below you can find the types of vulnerabilities MythX covers.
          </p>
        </div>
        <div className="px-4 mx-4 sm:px-20">
          <AssertionsAndProperty />
          <BytecodeSafety />
          <AuthorizationControl />
        </div>
      </div>
    </div>
  </Layout>
  )
}

export default coverage