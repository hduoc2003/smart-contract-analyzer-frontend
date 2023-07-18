import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

import LoginImg from "../assets/images/1.jpg";
import { BiLogoGithub } from "react-icons/bi";

interface LoginFormState {
  username: string;
  password: string;
}

const login: React.FC = () => {
  const [formState, setFormState] = useState<LoginFormState>({
    username: "",
    password: "",
  });

  return (
    <>
      <Head>
        <title>Tool | Login</title>
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
            src={LoginImg}
            alt="Description of the image"
            layout="fill"
            objectFit="cover"
            className="rounded-3xl"
          ></Image>
        </div>
        <div className="flex justify-center w-full m-10 duration-500 bg-white">
          <div className="flex items-center justify-center object-none object-center w-full h-full p-20 px-40 duration-500 bg-white">
            <div className="w-full">
              <h2 className="self-center mb-8 text-2xl font-bold duration-500 text-start text-slate-950">
                Sign in to Tool
              </h2>
              <div>
                <button
                  className="flex items-center justify-center w-full gap-2 px-4 py-2 mb-8 font-bold border rounded-md border-slate-950 text-slate-950 hover:shadow-sm focus:outline-none"
                  type="button"
                >
                  <BiLogoGithub />
                  Sign in with Github
                </button>
              </div>
              <hr className="h-px my-8 bg-gray-400 border-0"></hr>
              <div>
                <form className="pt-6 mb-4 bg-white">
                  <div className="mb-4">
                    <label className="block mb-2 font-bold text-gray-700 text-md">
                      Username
                    </label>
                    <input
                      className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md shadow appearance-none focus:shadow-outline focus:outline-none"
                      id="username"
                      type="text"
                      placeholder="Username"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block mb-2 font-bold text-gray-700 text-md">
                      Password
                      <p
                        className="text-xs italic font-normal text-blue-400"
                        style={{
                          position: "relative",
                          top: "6px",
                          float: "right",
                        }}
                      >
                        <Link href="./signup">Forgot?</Link>
                      </p>
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-2 leading-tight text-gray-700 border border-red-500 rounded-md shadow appearance-none focus:shadow-outline focus:outline-none"
                      id="password"
                      type="password"
                      placeholder="******************"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-between">
                    <button
                      className="w-full px-8 py-4 mb-4 font-bold text-white rounded-md focus:shadow-outline bg-slate-950 hover:bg-slate-700 focus:outline-none"
                      type="button"
                    >
                      Sign In
                    </button>
                    <p>
                      Don't have a account?{" "}
                      <a
                        className="inline-block text-sm text-blue-400 underline align-baseline hover:text-slate-900"
                        href="#"
                      >
                        Sign up
                      </a>
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

export default login;
