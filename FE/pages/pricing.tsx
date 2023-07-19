import React from "react";
import Layout from "../components/Layout";

import StandarPlan from "../components/Pricing/StandarPlan";
import DevPlan from "../components/Pricing/DevPlan";
import ProPlan from "../components/Pricing/ProPlan";

const pricing: React.FC = () => (
  <Layout title="Pricing | Tool">
    <div>
      
      <div className="h-screen bg-white">
        <div className="px-40 mx-4 h-36">
          <h2 className="pt-12 mb-6 text-2xl font-bold sm:text-3xl md:text-5xl">Plans and pricing</h2>
          <p className="pb-10 duration-300">
          MythX has flexible pricing options. Receive deeper analysis, comprehensive reporting, and enhanced security with our plans.
          </p>
        </div>
        <div className="grid grid-cols-3 px-32 mt-20">
          <div className="flex justify-center">
            <StandarPlan/>
          </div>
          <div className="flex justify-center">
            <DevPlan/>
          </div>
          <div className="flex justify-center">
            <ProPlan/>
          </div>
        </div>
        {/* <div className="mx-32 bg-pink-300 h-96">
          123
        </div> */}
      </div>
    </div>
  </Layout>
);
export default pricing;