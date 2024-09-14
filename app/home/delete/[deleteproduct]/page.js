"use client"
import Layout from '@/components/Layout'
import { redirect, usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const DeleteProduct = () => {
    const [goToProducts, setGoToProducts] = useState(false);
    const [productInfo, setProductInfo] = useState(null);
    const pathname = usePathname();
    const URLArr = pathname.split('/');
    const id = URLArr[URLArr.length-1];

    useEffect(()=>{
        if(!id){
            return;
        }
        axios.get(`https://wcb-server.vercel.app/home/get/${id}`)
        .then((res)=>{
            setProductInfo(res.data);
        })
    }, [id])

    if(goToProducts){
        return redirect('/home')
    }

    const deleteProduct = async ()=>{
        await axios.delete(`https://wcb-server.vercel.app/home/delete/${id}`);
        setGoToProducts(true)
    }
  return (
    <Layout>
        <h1 className='text-center'>Do you really want to delete &quot;{productInfo?.data?.bgUrl}&quot; ?</h1>
        <div className="flex justify-center gap-2">
        <button onClick={deleteProduct} className='btn-red'>Yes</button>
        <button onClick={()=>setGoToProducts(true)} className='btn-default'>No</button>
        </div>
    </Layout>
  )
}

export default DeleteProduct
