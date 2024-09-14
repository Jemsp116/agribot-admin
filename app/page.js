"use client"
import LoginForm from '@/components/LoginForm'
import React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const Home = () => {
  const { data: session } = useSession()
  const router = useRouter();

  if (session) {
    router.push('/home');
    return;
  }

  return (
    <div className='h-screen w-screen bg-[#eee] flex justify-center items-center'>
        {/* <DivWrapper className={'border py-10 max-w-[600px] mx-auto shadow-md rounded-lg'} title={'Login to E-WasteMart'}> */}
        <div className='border p-8 rounded-2xl bg-white'>
          <h1 className='mb-8 text-primary'>Login here to continue</h1>
            <LoginForm />
        </div>
        {/* </DivWrapper> */}
    </div>
  )
}

export default Home