import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useRef, useState } from 'react'
import { Carousel } from 'antd';

// import { data } from '@/data/home';

import { AiTwotoneStar } from "react-icons/ai"
import { BsFillCartPlusFill } from "react-icons/bs"
import { CiShoppingTag } from 'react-icons/ci'
import { getAllProducts } from './api/product';
import { useRouter } from 'next/router';


const inter = Inter({ subsets: ['latin'] })



export default function Home() {

  const ref = useRef()
  const router = useRouter()

  // From database
  const [banner, setBanner] = useState([
    {
      image: "/banners/1.png"
    },
    {
      image: "/banners/2.png"
    },
    {
      image: "/banners/3.png"
    },
  ])

  const [buyNow, setBuyNow] = useState([])


  // Local states
  const [tags, setTags] = useState([
    {
      image: '/banners/1.png',
      title: "Special Offers",
      link: ""
    },

    {
      image: '/banners/2.png',
      title: "New Arrivals",
      link: ""
    },

    {
      image: '/banners/3.png',
      title: "Flash Deals",
      link: ""
    },

    {
      image: '/banners/1.png',
      title: "Most Bought",
      link: ""
    },

    {
      image: '/banners/2.png',
      title: "Trending",
      link: ""
    },

    {
      image: '/banners/3.png',
      title: "Pre-Order",
      link: ""
    },

    {
      image: '/banners/1.png',
      title: "Affordable & Discounts",
      link: ""
    }
  ])

  useEffect(() => {
    async function getProducts(){
      let buynow = await getAllProducts()
      if (buynow) {
        setBuyNow(buynow)
        console.log(buynow);
      }
    }

    getProducts()

  }, [])

  return (
    <main className="mb-2 flex w-screen min-h-screen flex-col items-center justify-between bg-slate-300">

      {/* Banner */}
      <div className='px-10 py-5 flexRowCenter w-full h-100 bg-gradient-to-b from-third via-second to-transparent cursor-pointer'>

        <span
          className=' w-16 h-full flexRowCenter hover:border-1 border-slate-400 rounded-lg text-8xl'
          onClick={() => { ref.current.prev() }}
        >
          &#8249;
        </span>

        <span className='mx-2 flexRowCenter h-full rounded-lg '>

          <Carousel
            autoplay
            dotPosition='top'
            arrows={true}
            ref={ref}
            className='flex flex-row w-[1200px] h-full rounded-lg'
          >
            {
              banner.map((value, index) => (
                <div key={index} className='flexRowCenter w-full h-80 rounded-lg'>
                  <img className='w-full h-80  rounded-lg' src={value.image} />
                  {/* hello */}
                </div>
              ))
            }

          </Carousel>
        </span>

        <span
          className='w-16 h-full flexRowCenter hover:border-1 border-slate-400 rounded-lg text-8xl'
          onClick={() => { ref.current.next() }}
        >
          &#8250;
        </span>

      </div>

      {/* menu */}
      <div className=' z-10 px-10 gap-8 -mt-28 mb-28 lg:w-[1400px]  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>

        {
          tags.map((value, index) => (
            <span key={index} className='p-3 w-72 shadow-left shadow-third/40 rounded-md bg-white flexColCenter hover:text-second cursor-default'>
              <span className='w-full justify-start text-xl font-semibold underline'>{value.title}</span>
              <img className='my-2 w-full h-72 rounded-lg' src={value.image} />
            </span>
          ))
        }

      </div>

      {/* buy now */}
      <div className='px-28 mb-10 flexColCenter gap-5 w-full'>
        <span className='flex flex-row w-full text-2xl font-semibold underline'>Buy Now</span>

        <div className='gap-5 lg:w-[1400px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>

          {
            buyNow.map((value, index) => {
              const base64string = btoa(String.fromCharCode(...new Uint8Array(value.image.data.data)))
              return (
                <span 
                  key={index} 
                  className='relative group w-full shadow-left shadow-third/40 rounded-md bg-white flexColCenter cursor-default overflow-hidden'
                  onClick={()=>{router.push(`/products/${value.ProductID}`)}}  
                >
                  <img className='w-full h-56 rounded-t-lg' src={`data:image/png;base64,${base64string}`} alt='buy now image' />
                  {
                    value.name.length > 50
                      ?
                      <span className='w-full px-2 font-medium'>{value.name.slice(0, 40) + "..."}</span>
                      :
                      <span className='w-full px-2 font-medium'>{value.name}</span>

                  }

                  <span className='p-2 flex flex-row w-full justify-between'>

                    {
                      value.discount != 0
                        ?
                        <span className='w-full gap-2 flex flex-row items-end font-medium'>
                          <span className='text-xl font-bold text-fourth '>&#36;{value.discount}</span>
                          <span className='text-sm line-through'>&#36;{value.price}</span>
                        </span>

                        :
                        <span className='w-full px-2 text-xl font-bold text-fourth '>&#36;{value.price}</span>

                    }

                    <span className='flex flex-row items-center gap-1 text-sm'>
                      <AiTwotoneStar className='text-yellow-500 text-lg' />
                      <span>{value.rating}/5</span>
                      <span>({value.sold})</span>
                    </span>

                  </span>

                  {/* Hover elements */}
                  <span
                    className='z-20 absolute top-2 right-2 flexColCenter w-10 gap-5 text-xl 
                    translate-x-12 group-hover:translate-x-0 transition-all ease-in-out duration-500'

                  >

                    <span className='border-2 border-white bg-white p-2 rounded-full cursor-pointer text-third'><BsFillCartPlusFill /></span>
                    <span className='border-2 border-white bg-white p-2 rounded-full cursor-pointer text-first'><CiShoppingTag /></span>

                  </span>

                </span>
              )
            })
          }

        </div>

      </div>

    </main>
  )
}
