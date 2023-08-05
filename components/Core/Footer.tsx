import Link from "next/link";
import React from "react";
import { BiLogoFacebook, BiLogoGithub, BiLogoGmail } from "react-icons/bi";

const Footer: React.FC = () => {
  return (
    <footer className="flex-col items-center text-blue-500 duration-300">
        <hr className="bg-blue-500 h-0.5"></hr>
      <div className="grid w-full px-10 py-20 duration-300 bg-white sm:grid-cols-2 sm:px-20 md:grid-cols-4 md:space-x-4 lg:px-40 ">
        <a href="#123" className="w-full mb-2 text-2xl md:text-4xl animate__animated animate__fadeInUp">
          TOOL
        </a>
        <ul className="flex flex-col w-full">
          <h2 className="mb-4 font-semibold text animate__animated animate__fadeInUp">SITE MAP</h2>
          <Link href="../about" className="mb-2 animate__animated animate__fadeInUp animate__delay-fast">About</Link>
          <Link href="../tool" className="mb-2 animate__animated animate__fadeInUp animate__delay-fast">Tools</Link>
          <Link href="../pricing" className="mb-2 animate__animated animate__fadeInUp animate__delay-fast">Pricing</Link>
          <Link href="../team" className="mb-2 animate__animated animate__fadeInUp animate__delay-fast">Team</Link>
        </ul>
        <ul className="flex flex-col w-full">
          <h2 className="mb-4 font-semibold animate__animated animate__fadeInUp">THE SERVICE</h2>
          <Link href="../coverage" className="mb-2 animate__animated animate__fadeInUp animate__delay-fast">Coverage</Link>
          <Link href="../pricing" className="mb-2 animate__animated animate__fadeInUp animate__delay-fast">Pricing</Link>
        </ul>
        <div className="w-full">
          <button className="w-full px-4 py-2 mb-4 border-2 rounded animate__animated animate__fadeInUp animate__delay-fast">
            <Link href="../signup">Sign up for more</Link>
          </button>
          <p className="mb-2 animate__animated animate__fadeInUp animate__delay-fast">Follow us</p>
          <div className="flex gap-4 mt-4">
            <Link className="p-2 duration-500 border hover:border-blue-500 border-white animate__animated animate__fadeInUp animate__delay-fast rounded-3xl" href="1"><BiLogoFacebook className="w-6 h-6"/></Link>
            <Link className="p-2 duration-500 border hover:border-blue-500 border-white animate__animated animate__fadeInUp animate__delay-fast rounded-3xl" href="1"><BiLogoGithub className="w-6 h-6"/></Link>
            <Link className="p-2 duration-500 border hover:border-blue-500 border-white animate__animated animate__fadeInUp animate__delay-fast rounded-3xl" href="1"><BiLogoGmail className="w-6 h-6"/></Link>
          </div>
        </div>
      </div>
      <div className="flex items-center w-full px-10 py-10 duration-300 bg-white sm:px-20 lg:px-40">
        <ul className="w-full gap-2 bg-white md:flex md:justify-between">
          <div>
            <p className="font-semibold text-start md:w-full animate__animated animate__delay-1s">
              COPYRIGHT 2023
            </p>
          </div>
          <div>
            <Link href="../" className="font-semibold text-start md:w-full md:text-center animate__animated animate__fadeInUp animate__delay-1s">
              TERMS OF SERVICE
            </Link>
          </div>
          <div>
            <Link href="../" className="font-semibold text-start md:w-full md:text-end animate__animated animate__fadeInUp animate__delay-1s">
              PRIVACY POLICY
            </Link>
          </div>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
