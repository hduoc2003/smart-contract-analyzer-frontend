import React from "react";
import Layout from "../components/Layout";
import { handleGetAllUser } from "../services/AdminService";

const about: React.FC = () => (
  <Layout title="About | Tool">
    <div>
      <div className="h-auto min-h-screen bg-white animate__animated animate__fadeIn">
        <div className="px-8 text-white bg-blue-500 sm:px-40 md:mb-8">
          <h2 className="pt-12 mb-12 text-4xl font-bold sm:pt-32 sm:text-8xl">About</h2>
          <p className="pb-12 text-2xl duration-300 sm:pb-32 sm:text-3xl">
            Introducing a cutting-edge smart contract checking tool, 
            revolutionizing the verification process. 
            Our tool utilizes advanced algorithms to analyze smart contracts, 
            ensuring security, integrity, and compliance. With real-time feedback 
            and comprehensive reports, it empowers developers and auditors to 
            identify vulnerabilities, mitigate risks, and build robust decentralized 
            applications with confidence.
          </p>
          <button onClick={handleGetAllUser}>GET ALL USER</button>
        </div>
      </div>
    </div>
  </Layout>
);

export default about;
