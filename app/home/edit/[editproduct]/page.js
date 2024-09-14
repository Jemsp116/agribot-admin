"use client"
import Layout from '@/components/Layout'
import { usePathname } from 'next/navigation'
import React from 'react'
import useProductData from '@/hooks/useProductData'
import HomeForm from '@/components/HomeForm'
import Spinner from '@/components/Spinner'

const EditProduct = () => {
    const pathname = usePathname()
    const URLArr = pathname.split('/')
    const id = URLArr[URLArr.length - 1]

    // console.log('ID:', id);

    const { productInfo, loading, error } = useProductData(`https://wcb-server.vercel.app/home/get/${id}`)

    if (!id) {
        return <p>Invalid product ID.</p>
    }

    if (loading) {
        return (
            <Layout>
                <div className='w-full h-full flex justify-center gap-2 items-center'>
                    <Spinner />
                    <p>Loading...</p>
                </div>
            </Layout>
        )
    }

    if (error) {
        return <p>Error loading product data: {error.message}</p>
    }

    // console.log('Product Info:', productInfo);

    return (
        <Layout>
            <h1>Edit Home Page</h1>
            {productInfo && <HomeForm {...productInfo.data} />}
        </Layout>
    )
}

export default EditProduct
