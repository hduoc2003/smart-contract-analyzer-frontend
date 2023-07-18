import React from "react";
import { BiSolidQuoteAltLeft, BiSolidQuoteAltRight } from "react-icons/bi";

const Feedback: React.FC = () => {
    return (
        <section className="h-screen p-8 bg-white">
            <h2 className="mb-16 text-5xl font-bold">What our Customers Say</h2>
            <div className="w-full mb-6 h-80 rounded-xl bg-slate-950 ">
                <div className="flex px-4 py-2 mb-4 md:mb-0 lg:mb-12 md:p-8">
                    <div className="flex items-start">
                        <BiSolidQuoteAltLeft className="w-12 text-lg text-white md:text-3xl"></BiSolidQuoteAltLeft>
                    </div>
                    <p className="mt-4 text-sm italic text-white md:px-4 lg:mt-10 sm:text-lg">
                        From the beginning the ConsenSys Diligence team made a great effort to contribute to the security of the Aave Protocol, providing knowledge that helped us grow our awareness and security-focused culture. Their technology will be extremely helpful to move Aave forward. Their MythX technology was used in this project to verify the correctness of the Aave smart contract system
                    </p>
                    <div className="flex items-end">
                        <BiSolidQuoteAltRight className="w-12 text-lg text-white md:text-3xl"></BiSolidQuoteAltRight>
                    </div>
                </div>
                <div className="flex justify-end mr-10">
                    <div className="flex self-end gap-4 text-sm text-white sm:text-lg">
                        <p className="font-bold">- Emilio Frangella {" "}</p>
                        <p className="hidden font-thin md:block">Fullstack Blockchain Developer at Aave</p>    
                    </div>
                </div>
            </div>
            <div className="w-full mb-6 h-80 rounded-xl bg-slate-950 ">
                <div className="flex px-4 py-2 mb-4 md:mb-0 lg:mb-12 md:p-8">
                    <div className="flex items-start">
                        <BiSolidQuoteAltLeft className="w-12 text-lg text-white md:text-3xl"></BiSolidQuoteAltLeft>
                    </div>
                    <p className="mt-4 text-sm italic text-white md:px-4 lg:mt-10 sm:text-lg">
                        Working with the MythX team solidified our perspective on the effectiveness of fuzz testing, and strengthened the trust in the audit report ConsenSys Diligence led on our v3.0 release.
                    </p>
                    <div className="flex items-end">
                        <BiSolidQuoteAltRight className="w-12 text-lg text-white md:text-3xl"></BiSolidQuoteAltRight>
                    </div>
                </div>
                <div className="flex justify-end mr-10">
                    <div className="flex self-end gap-4 text-sm text-white sm:text-lg">
                        <p className="font-bold">- 0x team  {" "}</p>
                        <p className="hidden font-thin md:block">Fullstack Blockchain Developer Team</p>    
                    </div>
                </div>
            </div>
            
        </section>
    );
};

export default Feedback;
