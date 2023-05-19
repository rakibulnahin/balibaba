import React, { useState } from 'react'
import Image from 'next/image'
import axios from 'axios'

const Demo = () => {

    const [data, setData] = useState([])
    const [uploadFile, setUploadFile] = useState(null)
    const [previewUrl, setPreviewUrl] = useState('');

    const [name, setName] = useState("Nahin")
    const [category, setCategory] = useState("person")
    const [discount, setDiscount] = useState(0)
    const [price, setPrice] = useState(999)

    const getdata = async () => {
        try {
            let result = await fetch("http://localhost:3001/api/products/get_product")
            result = await result.json()
            console.log(result);
            setData(result)
            console.log(result[0].image.data.toString('base64'))
        } catch (error) {
            console.log("error " + error.message);
        }
    }

    // const postdata = async =()=>{

    // }


    const onFileUpload = () => {
        let file = event.target.files[0]
        setUploadFile(file)
        setPreviewUrl(URL.createObjectURL(file));
        console.log(URL.createObjectURL(file));
        console.log(file);
    }

    const onProductUpload = async () => {
        const formData = new FormData();

        formData.append("image", uploadFile)
        formData.append("name", name)
        formData.append("category", category)
        formData.append("discount", discount)
        formData.append("price", price)


        let response = axios.post("http://localhost:3001/api/products/upload_product",
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }
        )
    }

    return (
        <div className='max-w-screen min-h-screen grid gap-5 grid-cols-2'>

            <span className='flexColCenter px-10 gap-5'>
                <span>Post Product</span>

                <span className='flex flex-row gap-4'>
                    <span>Product name: <input className='w-32 h-12 border-2 border-black rounded-lg' onChange={(e) => { setName(e.target.value) }} /> </span>
                    <span>Product Category: <input className='w-32 h-12 border-2 border-black rounded-lg' onChange={(e) => { setCategory(e.target.value) }} /> </span>
                    <span>Product Discount: <input className='w-32 h-12 border-2 border-black rounded-lg' onChange={(e) => { setDiscount(e.target.value) }} /> </span>
                    <span>Product Price: <input className='w-32 h-12 border-2 border-black rounded-lg' onChange={(e) => { setPrice(e.target.value) }} /> </span>
                </span>


                <span>
                    {name}, {category}, {price}, {discount}
                </span>

                <input type="file" id="image" name="image" value="" required
                    onChange={(event) => { onFileUpload(event) }}
                />

                <button className='p-2 border-2 border-black rounded-lg' onClick={() => { onProductUpload() }}>Upload</button>

            </span>

            <span className='flexColCenter items-end px-10'>
                <span>Get Product</span>

                <span onClick={() => getdata()} className='border-2 border-black p-2 rounded-lg'>Click to get product data</span>

                {
                    data.map((value, index) => {
                        const base64string = btoa(String.fromCharCode(...new Uint8Array(value.image.data.data)));
                        return (
                            <div className='flex flex-col flex-wrap' key={index}>

                                <span>{value.name}</span>
                                <img src={`data:image/png;base64,${base64string}`}
                                    width={100} height={100} alt='image'
                                />
                                <span>
                                    

                                </span>
                            </div>
                        )
                    })
                }
            </span>


        </div>
    )
}

export default Demo
