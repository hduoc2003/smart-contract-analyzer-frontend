import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

import LoginImg from "../assets/images/2.jpg";
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

      <div className="submit-white flex h-screen bg-white duration-500">
        <div
          className="m-2 hidden w-full rounded-3xl bg-slate-950 duration-500 lg:block"
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
        <div className="m-10 flex w-full justify-center bg-white duration-500">
          <div className="flex h-full w-full items-center justify-center bg-white object-none object-center p-20 px-40 duration-500">
            <div className="w-full">
              <h2 className="mb-8 self-center text-start text-2xl font-bold text-slate-950 duration-500">
                Sign in to Tool
              </h2>
              <div>
                <button
                  className="mb-8 flex w-full items-center justify-center gap-2 rounded-md border border-slate-950 px-4 py-2 font-bold text-slate-950 hover:shadow-sm focus:outline-none"
                  type="button"
                >
                  <BiLogoGithub />
                  Sign in with Github
                </button>
              </div>
              <hr className="my-8 h-px border-0 bg-gray-400"></hr>
              <div>
                <form className="mb-4 bg-white pt-6">
                  <div className="mb-4">
                    <label className="text-md mb-2 block font-bold text-gray-700">
                      Username
                    </label>
                    <input
                      className="focus:shadow-outline w-full appearance-none rounded-md border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                      id="username"
                      type="text"
                      placeholder="Username"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="text-md mb-2 block font-bold text-gray-700">
                      Password
                      <p
                        className="text-xs font-normal italic text-blue-400"
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
                      className="focus:shadow-outline mb-2 w-full appearance-none rounded-md border border-red-500 px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                      id="password"
                      type="password"
                      placeholder="******************"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-between">
                    <button
                      className="focus:shadow-outline mb-4 w-full rounded-md bg-slate-950 px-8 py-4 font-bold text-white hover:bg-slate-700 focus:outline-none"
                      type="button"
                    >
                      Sign In
                    </button>
                    <p>
                      Don't have a account?{" "}
                      <a
                        className="inline-block align-baseline text-sm text-blue-400 underline hover:text-slate-900"
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
