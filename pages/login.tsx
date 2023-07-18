import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

import LoginImg from "../assets/images/2.jpg";
import { BiLogoGithub } from "react-icons/bi";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

interface LoginFormState {
  username: string;
  password: string;
}
type InputFormState = () => void;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const login: React.FC<InputFormState> = () => {
  const [loading, setLoading] = useState<Boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [formInfo, setFormInfo] = useState<LoginFormState>({ username: '', password: '' })

  useEffect(() => {
    setUsername(username);
    setFormInfo({...formInfo, 'username':username})
  }, [username]);
  useEffect(() => {
    setPassword(password);
    setFormInfo({...formInfo, 'password':password})
  }, [password]);

const handleSubmitForm: InputFormState = () => {
  // Perform form submission logic here
  setLoading(true);
  console.log('Submitting form with username:', username);
  console.log('Submitting form with password:', password);
  
  // Example: Send form data to an API
  // fetch('/api/login', {
  //   method: 'POST',
  //   body: JSON.stringify({ username, password }),
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // })
  //   .then(response => response.json())
  //   .then(data => {
  //     // Handle response from the server
  //     console.log('Form submission response:', data);
  //   })
  //   .catch(error => {
  //     // Handle any errors that occurred during form submission
  //     console.error('Form submission error:', error);
  //   });
  setTimeout(() => {
    setLoading(false);
  }, 500);
};

  return (
    <>
      <Head>
        <title>Tool | Sign in</title>
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
            className="duration-200 rounded-3xl"
          ></Image>
        </div>
        <div className="flex justify-center w-full m-4 duration-500 bg-white md:m-8 lg-m-10">
          <div className="flex items-center justify-center object-none object-center w-full h-full duration-500 bg-white xl:py-20 xl:px-24 2xl:px-36 md:p-20 sm:py-20 sm:px-10">
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
              <hr className="h-px my-8 bg-gray-400 border-0">
              </hr>
              <div>
                <form className="pt-6 mb-4 bg-white">
                  <div className="mb-4">
                    <label className="block mb-2 font-bold text-gray-700 text-md">
                      Username
                    </label>
                    <input
                      className="w-full px-3 py-2 leading-8 text-gray-700 border border-gray-300 rounded appearance-none focus:outline-none focus:shadow-outline"
                      id="username"
                      type="text"
                      placeholder="Username"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block mb-2 font-bold text-gray-700 text-md">
                      Password
                      <p
                        className="text-xs italic font-normal"
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
                      className="w-full px-3 py-2 mb-2 leading-8 text-gray-700 border border-gray-300 rounded-md appearance-none focus:shadow-outline focus:outline-none"
                      id="password"
                      type="password"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col items-center justify-between">
                    
                    <button
                      className="w-full px-8 py-4 mb-4 font-bold text-white rounded-md focus:shadow-outline bg-slate-950 hover:bg-slate-700 focus:outline-none"
                      type="button"
                      onClick={handleSubmitForm}
                    >
                      {loading ? <Spin indicator={antIcon} /> : 'Sign In'}
                    </button>
                    <p>
                      Don't have a account?{" "}
                        <Link className="inline-block text-sm underline align-baseline hover:text-slate-900" href="./signup">Sign up</Link>
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
