import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { getOneProduct } from '../api/product'

const ProductView = () => {

    const router = useRouter()

    useEffect(()=>{
        let ProductID = router.query.productID
        getOneProduct(ProductID)
    }, [])


    // local state
    const [product, setProduct] = useState(null)

    return (
        <div>ProductView</div>
    )
}

export default ProductView