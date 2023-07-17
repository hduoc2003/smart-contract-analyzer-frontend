import React, { useState, useEffect } from "react";
import Link from "next/link";

const Header: React.FC = () => {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`pl-15 sticky top-0 z-20 flex px-4 py-4 text-white shadow-xl duration-500 md:px-10 xl:px-40 ${
        scroll ? "bg-white" : "bg-slate-950"
      }`}
    >
      <div className="w-full">
        <Link
          href="./"
          className={`text-bold text-2xl ${
            scroll ? "text-slate-950" : "text-white"
          }`}
        >
          TOOL
        </Link>
      </div>
      <div className="hidden w-full grid-cols-4 content-center duration-500 lg:grid">
        <Link
          href="./about"
          className={`text-md px-2 text-center duration-500 hover:opacity-90 ${
            scroll ? "text-slate-950" : "text-white"
          }`}
        >
          About
        </Link>
        <Link
          href="./pricing"
          className={`text-md px-2 text-center duration-500 hover:opacity-90 ${
            scroll ? "text-slate-950" : "text-white"
          }`}
        >
          Pricing
        </Link>
        <Link
          href="./tool"
          className={`text-md px-2 text-center duration-500 hover:opacity-90 ${
            scroll ? "text-slate-950" : "text-white"
          }`}
        >
          Tool
        </Link>
        <Link
          href="./contact"
          className={`text-md px-2 text-center duration-500 hover:opacity-90 ${
            scroll ? "text-slate-950" : "text-white"
          }`}
        >
          Contact
        </Link>
      </div>
      <div className="hidden w-full flex-col-reverse items-end lg:flex">
        <div>
          <button
            className={`mr-2 border px-6 py-1 duration-500 hover:text-slate-950 ${
              scroll
                ? "border-slate-950 text-slate-950 hover:bg-slate-950 hover:text-white"
                : "border-white hover:bg-white hover:text-slate-950"
            }`}
          >
            <Link href="./login">Login</Link>
          </button>
          <button
            className={`border px-6 py-1 duration-500 ${
              scroll
                ? "border-slate-950 bg-slate-950 text-white hover:bg-white hover:text-slate-950"
                : "bg-white text-slate-950 hover:bg-slate-950 hover:text-white"
            }`}
          >
            <Link href="./signup">Sign up</Link>
          </button>
        </div>
      </div>
      <button
        className={`mx-2 block duration-500 lg:hidden ${
          scroll ? "text-slate-950" : "text-white"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
    </header>
  );
};

export default Header;
