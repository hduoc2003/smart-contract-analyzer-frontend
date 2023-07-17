import React from "react";
import Link from "next/link";

const signup = () => {
  return (
    <div className="bg-red-500 py-40 text-white">
      <h1 className="mb-10 text-2xl">SIGN UP</h1>
      <button>
        <Link href="./login" className="bg-slate-600 px-10 py-10">
          LOGIN
        </Link>
      </button>
    </div>
  );
};

export default signup;
