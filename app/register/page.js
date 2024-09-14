import RegisterForm from '@/components/RegisterForm'
import React from 'react'

const RegisterPage = () => {
  return (
    <div className='h-screen w-screen bg-[#eee] flex justify-center items-center'>
      {/* <DivWrapper className={'border py-10 max-w-[600px] mx-auto shadow-md rounded-lg'} title={'Welcome to E-WasteMart'}> */}
      <div className='border p-8 rounded-2xl bg-white'>
        <h1 className='mb-8 text-primary'>Register to Sloth Bear Conservation.</h1>
        <RegisterForm />
      </div>
    </div>
  )
}

export default RegisterPage