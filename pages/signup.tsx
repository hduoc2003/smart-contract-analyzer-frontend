import React from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

import SignupImg from "../assets/images/1.jpg";
import { BiLogoGithub } from "react-icons/bi";
import { Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

const onCheckboxChange = (e: CheckboxChangeEvent) => {
  console.log(`checked = ${e.target.checked}`);
};

const signup = () => {
  return (
    <>
    <Head>
      <title>Tool | Sign up</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>

    <div className="flex h-screen duration-500 bg-white submit-white">
      <div
        className="hidden w-full m-2 duration-500 rounded-3xl bg-slate-950 lg:block"
        style={{
          position: "relative",
          width: "100%",
        }}
      >
        <Image
          src={SignupImg}
          alt="Description of the image"
          layout="fill"
          objectFit="cover"
          className="rounded-3xl"
        ></Image>
      </div>
      <div className="flex justify-center w-full m-4 duration-500 bg-white md:m-8 lg-m-10">
        <div className="flex items-center justify-center object-none object-center w-full h-full duration-500 bg-white xl:py-20 xl:px-24 2xl:px-36 md:p-20 sm:py-20 sm:px-10">
          <div className="w-full">
            <h2 className="self-center mb-8 text-2xl font-bold duration-500 text-start text-slate-950">
              Sign up to Tool
            </h2>
            <div>
              <button
                className="flex items-center justify-center w-full gap-2 px-4 py-2 mb-8 font-bold border rounded-md border-slate-950 text-slate-950 hover:shadow-sm focus:outline-none"
                type="button"
              >
                <BiLogoGithub />
                Sign up with Github
              </button>
            </div>
            <hr className="h-px my-8 bg-gray-400 border-0"></hr>
            <div>
              <form className="pt-6 mb-4 bg-white">
                <div className="grid sm:gap-2 sm:grid-cols-2">
                  <div className="mb-4">
                    <label className="block mb-2 font-bold text-gray-700 text-md">
                      Name
                    </label>
                    <input
                      className="w-full px-3 py-2 leading-8 text-gray-700 border border-gray-300 rounded appearance-none focus:outline-none focus:shadow-outline"
                      id="username"
                      type="text"
                      placeholder="Username"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 font-bold text-gray-700 text-md">
                      Username
                    </label>
                    <input
                      className="w-full px-3 py-2 leading-8 text-gray-700 border border-gray-300 rounded appearance-none focus:outline-none focus:shadow-outline"
                      id="username"
                      type="text"
                      placeholder="Username"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block mb-2 font-bold text-gray-700 text-md">
                    Username or email
                  </label>
                  <input
                    className="w-full px-3 py-2 leading-8 text-gray-700 border border-gray-300 rounded appearance-none focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="Username"
                  />
                </div>
                <div className="mb-2">
                  <label className="block mb-2 font-bold text-gray-700 text-md">
                    Password
                  </label>
                  <input
                    className="w-full px-3 py-2 leading-8 text-gray-700 border border-gray-300 rounded-md appearance-none focus:shadow-outline focus:outline-none"
                    id="password"
                    type="password"
                    placeholder="Password"
                  />
                </div>
                <div className="flex flex-col items-center justify-between">
                  <div className="w-full mb-6">
                  <Checkbox onChange={onCheckboxChange}>
                    <p className="text-xs">
                      By creating an account you agree with our{" "}
                      <Link className="inline-block text-xs underline align-baseline hover:text-slate-900" href="">Terms of Service</Link>
                      ,{" "}
                      <Link className="inline-block text-xs underline align-baseline hover:text-slate-900" href="">Privacy Policy</Link>
                      ,
                      and out default{" "}
                      <Link className="inline-block text-xs underline align-baseline hover:text-slate-900" href="">Notification Settings</Link>
                      ,{" "}
                    </p>
                  </Checkbox>
                  </div>
                  <button
                    className="w-full px-8 py-4 mb-4 font-bold text-white rounded-md focus:shadow-outline bg-slate-950 hover:bg-slate-700 focus:outline-none"
                    type="button"
                  >
                    Sign Up
                  </button>
                  <p className="mt-4">
                    Already have an account?{" "}
                    <Link className="inline-block text-sm underline align-baseline hover:text-slate-900" href="./login">Sign In</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default signup;
