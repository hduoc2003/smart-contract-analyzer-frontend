import React from "react";
import Link from "next/link";
import Image from "next/image";

import AnchainLogo from "../../assets/images/logo_anchain.png"

const Partners: React.FC = () => {
  return (
    <section className="h-screen p-8 bg-white">
      <div className="w-full mb-8 md:mb-12 lg:w-3/4">
        <h2 className="mb-6 text-2xl font-bold duration-500 sm:text-3xl md:text-5xl">A Rich Ecosystem of Partners, Integrators, and Service Providers</h2>
      </div>
      <div className="grid grid-cols-2 gap-5 my-10 duration-500 md:grid-cols-4 md:gap-20 md:p-10 md:my-20">
        <div className="flex justify-center">
          <Link target="_blank" href="https://atchai.com">
          <Image src={AnchainLogo} alt="ATCHAI" width={140} height={60}/>
          </Link>
        </div>
        <div className="flex justify-center">
          <Link target="_blank" href="https://atchai.com">
          <Image src={AnchainLogo} alt="ATCHAI" width={140} height={60}/>
          </Link>
        </div>
        <div className="flex justify-center">
          <Link target="_blank" href="https://atchai.com">
          <Image src={AnchainLogo} alt="ATCHAI" width={140} height={60}/>
          </Link>
        </div>
        <div className="flex justify-center">
          <Link target="_blank" href="https://atchai.com">
          <Image src={AnchainLogo} alt="ATCHAI" width={140} height={60}/>
          </Link>
        </div>
        <div className="flex justify-center">
          <Link target="_blank" href="https://atchai.com">
          <Image src={AnchainLogo} alt="ATCHAI" width={140} height={60}/>
          </Link>
        </div>
        <div className="flex justify-center">
          <Link target="_blank" href="https://atchai.com">
          <Image src={AnchainLogo} alt="ATCHAI" width={140} height={60}/>
          </Link>
        </div>
        <div className="flex justify-center">
          <Link target="_blank" href="https://atchai.com">
          <Image src={AnchainLogo} alt="ATCHAI" width={140} height={60}/>
          </Link>
        </div>
        <div className="flex justify-center">
          <Link target="_blank" href="https://atchai.com">
          <Image src={AnchainLogo} alt="ATCHAI" width={140} height={60}/>
          </Link>
        </div>
        
      </div>
      <div className="flex justify-center mt-20 md:mt-20">
          <Link className="flex items-center p-2 duration-500 border rounded-lg text-semibold md:p-4 border-slate-950 hover:bg-slate-950 hover:text-white" href="/login">
              BECOME OUR PARTNER
          </Link>
      </div>
    </section>
  );
};

export default Partners;
