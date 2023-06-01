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
    async function getProducts() {
      let buynow = await getAllProducts()
      if (buynow) {
        setBuyNow(buynow)
        console.log(buynow);
      }
    }

    getProducts()

  }, [])

  const BannerView = () => (
    <div className='relative py-5 flexRowCenter w-screen h-96 xl:h-100 bg-gradient-to-b from-third via-second to-transparent cursor-pointer'>

      <span
        className='max-xl:absolute max-xl:left-2 max-xl:z-10 ml-1 max-xl:pb-6 w-16 xl:h-full flexRowCenter max-xl:bg-fourth hover:border-1 border-white rounded-lg text-8xl'
        onClick={() => { ref.current.prev() }}
      >
        &#8249;
      </span>

      <span className="relative py-2 flexRowCenter w-full h-full overflow-hidden">
        <Carousel
          autoplay
          dotPosition='top'
          arrows={true}
          ref={ref}
          className='flex flex-row px-5 w-screen xl:w-[1300px] rounded-lg'
        >
          {
            banner.map((value, index) => (
              <div key={index} className='flexRowCenter w-full h-80 xl:h-96 rounded-lg'>
                <img className='w-full h-full  rounded-lg' src={value.image} />
                {/* hello */}
              </div>
            ))
          }

        </Carousel>
      </span>

      <span
        className='max-xl:absolute max-xl:right-2 max-xl:z-10 max-xl:pb-6 w-16 xl:h-full mr-1 flexRowCenter max-xl:bg-fourth hover:border-1 border-white rounded-lg text-8xl'
        onClick={() => { ref.current.next() }}
      >
        &#8250;
      </span>

    </div>
  )

  const MenuView = () => (
    <div className=' z-10 px-10 flexRowCenter flex-wrap gap-8 -mt-28 mb-28 lg:w-full'>

      {
        tags.map((value, index) => (
          <span key={index} className='p-3 w-60 lg:w-72 shadow-left shadow-third/40 rounded-md bg-white flexColCenter hover:text-second cursor-default'>
            <span className='w-full justify-start text-xl font-semibold underline'>{value.title}</span>
            <img className='my-2 w-full h-60 lg:h-72 rounded-lg' src={value.image} />
          </span>
        ))
      }

    </div>
  )

  const BuynowView = () => (
    <div className='px-10 lg:px-28 mb-10 w-full flexColCenter lg:items-start gap-5'>
      <span className='flex flex-row text-2xl font-semibold underline'>Buy Now</span>

      <div className='w-full gap-5 flex flex-row max-lg:justify-center flex-wrap'>

        {
          buyNow.map((value, index) => {
            const base64string = btoa(String.fromCharCode(...new Uint8Array(value.image.data.data)))
            return (
              <span
                key={index}
                className='relative group w-60 min-w-[230px] shadow-left shadow-third/40 rounded-md bg-white flexColCenter cursor-default overflow-hidden'
                onClick={() => { router.push(`/products/${value.ProductID}`) }}
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
  )

  return (
    <main className="mb-2 flex w-screen min-h-screen flex-col items-center justify-between bg-slate-300">

      {/* Banner */}
      <BannerView />


      {/* menu */}
      <MenuView/>

      {/* buy now */}
      <BuynowView />  

    </main>
  )
}
