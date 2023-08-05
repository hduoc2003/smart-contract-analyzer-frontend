import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";


import SignupImg from "../assets/images/1.jpg";
import { BiLogoGithub } from "react-icons/bi";
import { LoadingOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Input, Spin, message } from 'antd';
import { Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { SignupFormState } from "../interfaces";
import { handlePasswordCheck, handleEmailCheck, handleUsernameCheck } from "../utils/InputCheck";

type InputFormState = () => void;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;


const signup: React.FC<SignupFormState> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repassword, setRepassword] = useState<string>('');
  const [checked, setChecked] = useState<boolean>(false);
  const [formInfo, setFormInfo] = useState<SignupFormState>({name: '', username: '', password: '', email: ''})

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [repasswordVisible, setRepasswordVisible] = useState<boolean>(false);

  const [nameErr, setNameErr] = useState<boolean>(false);
  const [usernameErr, setUsernameErr] = useState<boolean>(false);
  const [emailErr, setEmailErr] = useState<boolean>(false);
  const [passwordErr, setPasswordErr] = useState<boolean>(false);
  const [repasswordErr, setRepasswordErr] = useState<boolean>(false);

  const handleNameFocus = () => { setNameErr(false); }
  const handleUsernameFocus = () => { setUsernameErr(false); }
  const handleEmailFocus = () => { setEmailErr(false); }
  const handlePasswordFocus = () => { setPasswordErr(false); }
  const handleRepasswordFocus = () => { setRepasswordErr(false); }
  const handleCheckboxChange = (e: CheckboxChangeEvent) => { setChecked(e.target.checked); };

  const handleSubmitForm: InputFormState = () => {
    // Perform form submission logic here
    if (!name) setNameErr(true);
    if (!handleUsernameCheck(username)) setUsernameErr(true);
    if (!handleEmailCheck(email)) setEmailErr(true);
    if (!handlePasswordCheck(password)) setPasswordErr(true);
    if (repassword !== password || repassword === "") setRepasswordErr(true);
    if (!checked){
      message.info("Please accept our Terms & Conditions");
    }
    
    if(handleUsernameCheck(username) && handlePasswordCheck(password) && repassword === password && repassword !== "" && checked){
      setLoading(true);
      
      setTimeout(() => {
        setFormInfo({name: name, username: username, password: password, email: email});
        console.log('Form submitted: ', formInfo);
        message.success("Submitted!");
        setLoading(false);
      }, 1000);
    }
    else {
      message.error("Please fill all the form");
    }
  };


  return (
    <>
    <Head>
      <title>Tool | Sign up</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>

    <div className="flex h-screen duration-500 bg-white submit-white">
      <div
        className="hidden w-full m-2 duration-500 rounded-3xl bg-blue-500 lg:block"
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
      <div className="flex justify-center w-full m-4 duration-500 bg-white md:m-8 lg-m-10 animate__animated animate__fadeIn">
        <div className="flex items-center justify-center object-none object-center w-full h-full duration-500 bg-white xl:py-20 xl:px-24 2xl:px-36 md:p-20 sm:py-20 sm:px-10">
          <div className="w-full">
            <h2 className="self-center mb-8 text-2xl font-bold duration-500 text-start text-slate-950">
              Sign up to Tool
            </h2>
            <div>
              <button
                className="flex items-center justify-center w-full gap-2 px-4 py-2 mb-8 font-bold border rounded-md border-blue-500 text-blue-500 hover:shadow-sm focus:outline-none"
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
                    <Input
                      status={nameErr ? "error" : ""}
                      onFocus={handleNameFocus}
                      className="w-full px-3 py-2"
                      placeholder="Enter your username" 
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 font-bold text-gray-700 text-md">
                      Username
                    </label>
                    <Input
                      status={usernameErr ? "error" : ""}
                      onFocus={handleUsernameFocus}
                      className="w-full px-3 py-2"
                      placeholder="Enter your username" 
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block mb-2 font-bold text-gray-700 text-md">
                    Email
                  </label>
                  <Input
                      status={emailErr ? "error" : ""}
                      onFocus={handleEmailFocus}
                      className="w-full px-3 py-2"
                      placeholder="Enter your username" 
                      onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-2">
                  <label className="block mb-2 font-bold text-gray-700 text-md">
                    Password
                  </label>
                  <Input.Password
                      status={passwordErr ? "error" : ""}
                      onFocus={handlePasswordFocus}
                      className="w-full px-3 py-2 mb-2 hover:border-blue-500"
                      placeholder="Enter your password"
                      onChange={(e) => setPassword(e.target.value)}
                      visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
                    />
                </div>
                <div className="mb-2">
                  <label className="block mb-2 font-bold text-gray-700 text-md">
                    Re-enter password
                  </label>
                  <Input.Password
                      status={repasswordErr ? "error" : ""}
                      onFocus={handleRepasswordFocus}
                      className="w-full px-3 py-2 mb-2 hover:border-blue-500"
                      placeholder="Enter your password"
                      onChange={(e) => setRepassword(e.target.value)}
                      visibilityToggle={{ visible: repasswordVisible, onVisibleChange: setRepasswordVisible }}
                    />
                </div>
                <div className="flex flex-col items-center justify-between">
                  <div className="w-full mb-6">
                    <Checkbox onChange={handleCheckboxChange}>
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
                    className="w-full px-8 py-4 mb-4 font-bold text-white rounded-md focus:shadow-outline bg-blue-500 hover:bg-slate-700 focus:outline-none"
                    type="button"
                    onClick={handleSubmitForm}
                  >
                    {loading ? <Spin indicator={antIcon} className="text-white" /> : 'Sign Up'}
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
