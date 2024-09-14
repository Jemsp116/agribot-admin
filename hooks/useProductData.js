import { useState, useEffect } from 'react'
import axios from 'axios'

const useProductData = (getLink) => {
    const [productInfo, setProductInfo] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!getLink) return;

        const fetchProduct = async () => {
            try {
                const response = await axios.get(getLink)
                setProductInfo(response.data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }

        fetchProduct()
    }, [getLink])

    return { productInfo, loading, error }
}

export default useProductData
