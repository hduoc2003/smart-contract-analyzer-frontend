import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

import LoginImg from "../assets/images/2.jpg";
import { BiLogoGithub } from "react-icons/bi";
import { LoadingOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Input, Spin } from 'antd';
import { LoginFormState } from "../interfaces";
import { handleUsernameCheck, handlePasswordCheck} from "../utils/InputCheck";

type InputFormState = () => void;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const login: React.FC<InputFormState> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [formInfo, setFormInfo] = useState<LoginFormState>({ username: '', password: '' })

  const [usernameErr, setUsernameErr] = useState<boolean>(false);
  const [passwordErr, setPasswordErr] = useState<boolean>(false);

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
    if (!handleUsernameCheck(username)) setUsernameErr(true);
    if (!handlePasswordCheck(password)) setPasswordErr(true);
    
    if (handleUsernameCheck(username) && handlePasswordCheck(password)){
      setLoading(true);
      console.log('Submitting form with username:', username);
      console.log('Submitting form with password:', password);
  
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const handleUsernameFocus = () => {
    setUsernameErr(false);
  }
  const handlePasswordFocus = () => {
    setPasswordErr(false);
  }

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
        <div className="flex justify-center w-full m-4 duration-500 bg-white md:m-8 lg-m-10 animate__animated animate__fadeIn">
          <div className="flex items-center justify-center object-none object-center w-full h-full duration-500 bg-white xl:py-20 xl:px-24 2xl:px-36 md:p-20 sm:py-20 sm:px-10">
            <div className="w-full">
              <h2 className="self-center mb-8 text-2xl font-bold duration-500 text-start text-slate-950">
                Sign in to Tool
              </h2>
              <div>
                <button
                  className="flex items-center justify-center w-full gap-2 px-4 py-2 mb-8 font-bold duration-500 border rounded-md border-slate-950 text-slate-950 hover:bg-slate-950 hover:text-white focus:outline-none"
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
                      Username or email
                    </label>
                    <Input
                      status={usernameErr ? "error" : ""}
                      onFocus={handleUsernameFocus}
                      className="w-full px-3 py-2"
                      placeholder="Enter your username" 
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
                    <Input.Password
                      status={passwordErr ? "error" : ""}
                      onFocus={handlePasswordFocus}
                      className="w-full px-3 py-2 mb-2 hover:border-slate-950"
                      placeholder="Enter your password"
                      onChange={(e) => setPassword(e.target.value)}
                      visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
                    />
                  </div>
                  <div className="flex flex-col items-center justify-between">
                    
                    <button
                      className="w-full px-12 py-6 mb-4 font-bold text-white rounded-lg focus:shadow-outline bg-slate-950 hover:bg-slate-700 focus:outline-none"
                      type="button"
                      onClick={handleSubmitForm}
                    >
                      {loading ? <Spin indicator={antIcon} className="text-white" /> : 'Sign In'}
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
