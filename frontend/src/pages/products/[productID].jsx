import { useRouter } from 'next/router'
import React, { useEffect, useState, useLayoutEffect } from 'react'
import { getOneProduct } from '../api/product'

const ProductView = () => {

    const router = useRouter()

    // From database
    const [product, setProduct] = useState(null)

    useEffect(() => {
        async function getProduct() {
            let ProductID = router.query.productID
            console.log("this is product id",ProductID);
            let data = await getOneProduct(ProductID)
            setProduct(data[0])
        }
        getProduct()
    }, [router.isReady])

    const imgToBase64 = () => {
        let base64 = btoa(String.fromCharCode(...new Uint8Array(product.image.data.data)))
        return base64
    }

    const ShowView = ()=>(
        <div className='px-10 flex flex-col'>
            <span className='w-2/3 my-4 text-2xl font-semibold bg-red-500'>{product.name}</span>

            <div className='flex flex-col md:flex-row'>
                <img alt='product image' src={"data:image/png;base64," + imgToBase64()}
                    className='flex w-80 h-100 bg-red-600'
                />
                <span className='px-6 flex w-full h-100 border-2 border-blue-400'>

                    <span className='flex w-2/3 flex-col'>
                        <span className='w-full h-20 flex flex-row gap-2'>
                            <span className='text-2xl'>Price: </span>
                            {
                                product.discount == 0
                                    ?
                                    <span>
                                        <span className='text-lg font-medium line-through text-slate-400'>{product.price}</span>
                                    </span>
                                    :
                                    <>
                                        <span className='text-2xl font-semibold'>&#36;{product.discount}</span>
                                        <span className='text-lg font-medium line-through text-slate-400'>{product.price}</span>

                                    </>


                            }
                            <span className='ml-5 flex flex-col font-semibold'>
                                <li>Delivery fee within Dhaka is free for any purchase greater than 500tk.</li>
                                <li>Delivery Charge 16tk within Dhaka.</li>
                            </span>
                        </span>

                        <span className='flex flex-row gap-3'>
                            {
                                product.options.map((value, index) => (
                                    <span key={index} className='ml-5 flexRowCenter w-20 h-8 rounded-lg text-sm font-semibold border-2 border-blue-400 hover:bg-blue-400'>{value}</span>
                                ))
                            }
                        </span>



                    </span>

                    <div className='px-5 flex flex-col w-1/3 bg-green-500'>

                    </div>




                </span>
            </div>
        </div>
    )

    return (
        product != null
        ?
        <ShowView />
        :
        <span>Hello</span>

    )

}

export default ProductView