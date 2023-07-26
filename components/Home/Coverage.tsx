import React from "react";
import Link from "next/link";

const Coverage: React.FC = () => {
    return (
        <section className="h-screen p-8 bg-white lg:px-32">
            <div className="w-full mb-8 md:mb-12 lg:w-1/2">
                <h2 className="mb-6 text-2xl font-bold sm:text-3xl md:text-5xl">See our current coverage</h2>
                <p>
                    The <Link href="https://swcregistry.io" className="align-baseline inline-blockunderline text-md hover:text-slate-900">SWC Registry</Link> is Link community catalog of known smart contract vulnerabilities with detailed descriptions, code samples, and remediations. MythX uses the SWC Registry as its database when scanning smart contracts for security issues.
                </p>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                <Link href="https://swcregistry.io/docs/SWC-101">
                    <div className="w-full h-20 p-2 text-center text-white duration-500 border rounded shadow-xl md:px-4 md:h-full md:py-12 bg-slate-950 hover:bg-white hover:text-slate-950 border-slate-950">
                            <span className="flex flex-col justify-center">
                                <span className="text-lg font-bold">SWC-101</span>
                                <span className="text-sm font-thin">Integer Overflow</span>
                            </span>
                    </div>
                </Link>
                <Link href="https://swcregistry.io/docs/SWC-101">
                    <div className="w-full h-20 p-2 text-center text-white duration-500 border rounded shadow-xl md:px-4 md:h-full md:py-12 bg-slate-950 hover:bg-white hover:text-slate-950 border-slate-950">
                        <span className="flex flex-col justify-center">
                            <span className="text-lg font-bold">SWC-106</span>
                            <span className="text-sm font-thin">Unprotected Selfdestruct</span>
                        </span>
                    </div>
                </Link>
                <Link href="https://swcregistry.io/docs/SWC-101">
                    <div className="w-full h-20 p-2 text-center text-white duration-500 border rounded shadow-xl md:px-4 md:h-full md:py-12 bg-slate-950 hover:bg-white hover:text-slate-950 border-slate-950">
                        <span className="flex flex-col justify-center">
                            <span className="text-lg font-bold">SWC-105</span>
                            <span className="text-sm font-thin">Unprotected Ether Withdrawal</span>
                        </span>
                    </div>
                </Link>
                <Link href="https://swcregistry.io/docs/SWC-101">
                    <div className="w-full h-20 p-2 text-center text-white duration-500 border rounded shadow-xl md:px-4 md:h-full md:py-12 bg-slate-950 hover:bg-white hover:text-slate-950 border-slate-950">
                        <span className="flex flex-col justify-center">
                            <span className="text-lg font-bold">SWC-107</span>
                            <span className="text-sm font-thin">Reentrancy</span>
                        </span>
                    </div>
                </Link>
                <Link href="https://swcregistry.io/docs/SWC-101">
                    <div className="w-full h-20 p-2 text-center text-white duration-500 border rounded shadow-xl md:px-4 md:h-full md:py-12 bg-slate-950 hover:bg-white hover:text-slate-950 border-slate-950">
                        <span className="flex flex-col justify-center">
                            <span className="text-lg font-bold">SWC-120</span>
                            <span className="text-sm font-thin">Weak Randomness</span>
                        </span>
                    </div>
                </Link>
                <Link href="https://swcregistry.io/docs/SWC-101">
                    <div className="w-full h-20 p-2 text-center text-white duration-500 border rounded shadow-xl md:px-4 md:h-full md:py-12 bg-slate-950 hover:bg-white hover:text-slate-950 border-slate-950">
                        <span className="flex flex-col justify-center">
                            <span className="text-lg font-bold">SWC-110</span>
                            <span className="text-sm font-thin">Assert Violation</span>
                        </span>
                    </div>
                </Link>
                <Link href="https://swcregistry.io/docs/SWC-101">
                    <div className="w-full h-20 p-2 text-center text-white duration-500 border rounded shadow-xl md:px-4 md:h-full md:py-12 bg-slate-950 hover:bg-white hover:text-slate-950 border-slate-950">
                        <span className="flex flex-col justify-center">
                            <span className="text-lg font-bold">SWC-124</span>
                            <span className="text-sm font-thin">Write to Arbitrary Storage Loc</span>
                        </span>
                    </div>
                </Link>
                <Link href="https://swcregistry.io/docs/SWC-101">
                    <div className="w-full h-20 p-2 text-center text-white duration-500 border rounded shadow-xl md:px-4 md:h-full md:py-12 bg-slate-950 hover:bg-white hover:text-slate-950 border-slate-950">
                        <span className="flex flex-col justify-center">
                            <span className="text-lg font-bold">SWC-127</span>
                            <span className="text-sm font-thin">Jump to Arbitrary Destination</span>
                        </span>
                    </div>
                </Link>
                <Link href="https://swcregistry.io/docs/SWC-101">
                    <div className="w-full h-20 p-2 text-center text-white duration-500 border rounded shadow-xl md:px-4 md:h-full md:py-12 bg-slate-950 hover:bg-white hover:text-slate-950 border-slate-950">
                        <span className="flex flex-col justify-center">
                            <span className="text-lg font-bold">SWC-109</span>
                            <span className="text-sm font-thin">Uninitialized Storage Pointer</span>
                        </span>
                    </div>
                </Link>
            </div>
            <div className="flex justify-center mt-8 sm:mt-12 md:mt-16">
                <Link className="flex items-center p-2 duration-500 border rounded-lg md:p-4 border-slate-950 hover:bg-slate-950 hover:text-white" href="/detectors">
                    See our current coverage
                </Link>
            </div>
        </section>
    );
};

export default Coverage;
