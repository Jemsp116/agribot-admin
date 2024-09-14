"use client";
import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Layout from '@/components/Layout';
import axios from 'axios';

const MessagePage = () => {
    const pathname = usePathname()
    const URLArr = pathname.split('/')
    const id = URLArr[URLArr.length - 1]
    const [productInfo, setProductInfo] = useState(null)

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`https://wcb-server.vercel.app/contactUs/get/${id}`).then((res) => {
            setProductInfo(res.data)
            // console.log("Data : ", res.data)
            // console.log("Id : ", id)
        }).catch((err) => {
            console.log("Error : ", err)
        })
    }, []);

    return (
        <Layout>
            <div>
                <div className='flex gap-5 mb-6 items-center'>
                    <h1 className='text-md font-bold m-0 p-0' >Name : </h1>
                    <p className='text-sm font-semibold text-gray-500'>{`${productInfo?.firstName || ''} ${productInfo?.lastName || ''}`}</p>
                </div>

                <div className='flex gap-6 mb-6 items-center'>
                    <h1 className='text-md font-bold m-0 p-0' >Email : </h1>
                    <p className='text-sm font-semibold text-gray-500'>{productInfo?.email}</p>
                </div>

                <div className='flex gap-6 items-center'>
                    <h1 className='text-md font-bold m-0 p-0' >Message : </h1>
                    <p className='text-sm font-semibold text-gray-500'>{productInfo?.message}</p>
                </div>

            </div>
        </Layout>
    )
}

export default MessagePage