import React from "react";
import Layout from "../components/Layout";

import StandarPlan from "../components/Pricing/StandarPlan";
import DevPlan from "../components/Pricing/DevPlan";
import ProPlan from "../components/Pricing/ProPlan";

const pricing: React.FC = () => (
  <Layout title="Pricing | Tool">
    <div>
      <div className="h-auto min-h-screen bg-white animate__animated animate__fadeIn">
        <div className="px-8 text-white sm:px-40 bg-slate-950 md:mb-8">
          <h2 className="pt-12 mb-12 text-4xl font-bold sm:pt-32 sm:text-8xl">Plans and pricing</h2>
          <p className="pb-12 text-2xl duration-300 sm:pb-32 sm:text-3xl">
          MythX has flexible pricing options. Receive deeper analysis, comprehensive reporting, and enhanced security with our plans.
          </p>
        </div>
        <div className="grid gap-4 px-4 mt-20 mb-40 xl:grid-cols-3 xl:gap-2 sm:px-20">
          <div className="flex justify-center w-full">
            <StandarPlan/>
          </div>
          <div className="flex justify-center w-full">
            <DevPlan/>
          </div>
          <div className="flex justify-center w-full">
            <ProPlan/>
          </div>
        </div>
      </div>
    </div>
  </Layout>
);
export default pricing;
