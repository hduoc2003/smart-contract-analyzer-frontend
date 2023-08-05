import React from "react";
import Link from "next/link";

import Image from "next/image";
import CoverImg from "../../assets/images/3.jpg";
import Typewriter from 'typewriter-effect';

const Cover: React.FC = () => {
  return (
    <section className="relative z-10 grid h-screen grid-cols-1 text-white duration-300 bg-blue-500 md:grid-cols-2">
      <div className="flex w-full h-screen px-4 py-20 duration-300 md:mt-0 md:px-10 xl:px-40 animate__fadeInUp animate_animated">
        <div className="self-center">
          <div className="flex items-center gap-8">
            <h1 className="pb-5 text-5xl font-bold duration-300 animate__animated animate__fadeInUp">TOOL</h1>
            <div className='text-2xl italic font-extralight'>
              <Typewriter
                  options={{
                      strings: ['Efficent', 'Secure', 'Reliable'],
                      autoStart: true,
                      loop: true,
                  }}
              />
            </div>
          </div>
          <p className="pb-10 duration-300 animate__animated animate__fadeInUp animate__delay-faster">
            Introducing a cutting-edge smart contract checking tool,
            revolutionizing the verification process. Our tool utilizes advanced
            algorithms to analyze smart contracts, ensuring security, integrity,
            and compliance. With real-time feedback and comprehensive reports,
            it empowers developers and auditors to identify vulnerabilities,
            mitigate risks, and build robust decentralized applications with
            confidence.
          </p>
          <div className="grid md:grid-cols-2">
            <button className="block px-6 py-4 duration-300 border border-white animate__animated animate__fadeInUp animate__delay-fast bg-blue-500 hover:bg-white hover:text-blue-500">
              <Link href="./login">Get Started</Link>
            </button>
            <div className="pt-2 align-bottom duration-300 animate__animated animate__fadeInUp animate__delay-1s md:self-end md:pl-4 md:pt-0">
              <Link className="underline" href="./about">
                Read about us
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="content-center justify-center hidden w-full h-full duration-300 bg-blue-500 md:flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="items-center self-center w-3/6 duration-300 h-3/6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"
          />
        </svg>
      </div>
    </section>
  );
};

export default Cover;
