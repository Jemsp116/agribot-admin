"use client"
import Layout from '@/components/Layout'
import { usePathname } from 'next/navigation'
import React from 'react'
import useProductData from '@/hooks/useProductData'
import Spinner from '@/components/Spinner'
import RobotsForm from '@/components/RobotsForm'

const EditProduct = () => {
    const pathname = usePathname()
    const URLArr = pathname.split('/')
    const id = URLArr[URLArr.length - 1]

    const { productInfo, loading, error } = useProductData(`/api/robot/${id}`)

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

    return (
        <Layout>
            <h1>Edit Research</h1>
            {productInfo && <RobotsForm {...productInfo} />}
        </Layout>
    )
}

export default EditProduct
