import { useEffect, useState } from "react";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="flex-col items-center text-white duration-300">
      <div className="grid w-full bg-slate-950 px-10 py-20 duration-300 sm:grid-cols-2 sm:px-20 md:grid-cols-4 md:space-x-4 lg:px-40 ">
        <a href="#123" className="w-full">
          TOOL
        </a>
        <ul className="w-full">
          <li className="text mb-4 font-semibold">SITE MAP</li>
          <li className="mb-2">About</li>
          <li className="mb-2">Tools</li>
          <li className="mb-2">Pricing</li>
          <li className="mb-2">Team</li>
        </ul>
        <ul className="w-full">
          <li className="mb-4 font-semibold">THE SERVICE</li>
          <li className="mb-2">What we detect</li>
          <li className="mb-2">Scan Modes</li>
        </ul>
        <div className="w-full">
          <button className="mb-2 w-full rounded border-2 px-4 py-2 ">
            Signup for more
          </button>
          <p className="mb-2">Follow us</p>
          <a href="1">123</a>
        </div>
      </div>
      <div className="flex w-full items-center bg-slate-950 px-10 py-10 duration-300 sm:px-20 lg:px-40">
        <ul className="w-full bg-slate-950 md:flex md:space-x-4">
          <li className="mb-2 text-start font-semibold md:w-full">
            COPYRIGHT 2023
          </li>
          <li className="text-start font-semibold md:w-full md:text-center">
            TERMS OF SERVICE
          </li>
          <li className="text-start font-semibold md:w-full md:text-end">
            PRIVACY POLICY
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
