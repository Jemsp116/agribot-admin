"use client"
// import { useSession, signIn } from "next-auth/react"
import Nav from "@/components/Nav";
import { useState } from "react";
import Logo from "./Logo";
import Image from "next/image";

export default function Layout({ children }) {
  // const { data: session } = useSession();
  const [showNav, setShowNav] = useState(false);
  // if (!session) {
  //   return (
  //     <div className="bg-gray-200 flex items-center justify-center w-screen h-screen">
  //       <div className="text-lg bg-white text-black rounded-lg font-semibold ">
  //         <button onClick={() => { signIn('google') }} className="flex gap-4 py-4 px-6 ">
  //           <Image 
  //             src={'/google-logo.png'}
  //             width={25}
  //             height={25}
  //            />
  //           Sign in with Google
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }
  return (
    <div className="bg-bgGray min-h-screen">
      <div className="md:hidden flex justify-between items-center px-4 py-2">
        <Logo small />
        <button onClick={() => setShowNav(e => (!e))}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>

        </button>
      </div>
      <div className="flex">
        <div className="border-r-2 h-screen border-gray-300">
          <Nav show={showNav} />
        </div>
        <div className="flex-grow p-4">
          {children}
        </div>
      </div>
    </div>
  );
}
