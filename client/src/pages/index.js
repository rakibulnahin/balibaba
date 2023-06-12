import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useRef, useState } from 'react'
import { Carousel } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router';
import { addToCart, clearCart } from '@/redux/cartSlice'

// import { data } from '@/data/home';

import { AiTwotoneStar } from "react-icons/ai"
import { BsFillCartPlusFill } from "react-icons/bs"
import { CiShoppingTag } from 'react-icons/ci'
import { getAllProducts } from './api/product';


const inter = Inter({ subsets: ['latin'] })

import demo_product from '@/data/demo_product';


export default function Home() {

  const ref = useRef()
  const router = useRouter()
  const dispatch = useDispatch()

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

  const [buyNow, setBuyNow] = useState(demo_product)

  // Global States

  // Local states
  const [tags, setTags] = useState([
    {
      image: '/banners/1.png',
      title: "Special Offers",
      link: "/products/category?tags=special offer"
    },

    {
      image: '/banners/2.png',
      title: "New Arrivals",
      link: "/products/category?tags=new arrival"
    },

    {
      image: '/banners/3.png',
      title: "Flash Deals",
      link: "/products/category?tags=trending"
    },

    {
      image: '/banners/1.png',
      title: "Most Bought",
      link: "/products/category?tags=most bought"
    },

    {
      image: '/banners/2.png',
      title: "Trending",
      link: "/products/category?tags=flash deal"
    },

    {
      image: '/banners/3.png',
      title: "Pre-Order",
      link: "/products/category?tags=pre order"
    },

    {
      image: '/banners/1.png',
      title: "Affordable & Discounts",
      link: "/products/category?tags=discount"
    }
  ])

  useEffect(() => {
    async function getProducts() {
      let buynow = await getAllProducts()
      if (buynow) {
        setBuyNow(buynow)
        // console.log(buynow);
      }
    }

    getProducts()

  }, [])

  const handleAddToCart = (value) => {
    console.log(
      value
    );
    dispatch(addToCart(value))
    // value
  }

  const BannerView = () => (
    <div className='relative py-5 flexRowCenter w-screen h-100 xl:h-110 bg-gradient-to-b from-third via-second to-transparent cursor-pointer'>

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
              <div key={index} className='flexRowCenter w-full h-96 xl:h-110 rounded-lg object-fill'>

                <img className='w-full h-full rounded-lg object-fill' src={value.image} />
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
          <span key={index}
            className='p-3 w-60 lg:w-72 shadow-left shadow-third/40 rounded-md bg-white flexColCenter hover:text-second cursor-default'
            onClick={() => { router.push(value.link) }}
          >
            <span className='w-full justify-start text-xl font-semibold underline'>{value.title}</span>
            <img className='my-2 w-full h-60 lg:h-72 rounded-lg' src={value.image} />
          </span>
        ))
      }

    </div>
  )

  const BuynowView = () => (
    <div className='px-10 xl:px-28 mb-10 w-full flexColCenter xl:items-start gap-5'>
      <span className='flex flex-row text-2xl font-semibold underline'>Buy Now</span>

      <div className='w-full gap-5 flex flex-row max-lg:justify-center flex-wrap'>

        {
          buyNow.map((value, index) => {
            const base64string = btoa(String.fromCharCode(...new Uint8Array(value.image.data.data)))
            return (
              <span
                key={index}
                className='relative group w-60 min-w-[230px] shadow-left shadow-third/40 rounded-md bg-white flexColCenter cursor-default overflow-hidden'
                
              >
                <div className='w-full'
                  onClick={() => { router.push(`/products/${value.ProductID}`) }}
                >
                  <img className='w-full h-56 rounded-t-lg' src={`data:image/png;base64,${base64string}`} alt='Sorry I guess the server stopped' />
                  {
                    value.name.length > 50
                      ?
                      <span className='flex w-full px-2 font-medium'>{value.name.slice(0, 40) + "..."}</span>
                      :
                      <span className='w-full flex px-2 font-medium'>{value.name}</span>

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
                </div>

                {/* Hover elements */}
                <span
                  className='z-20 absolute top-2 right-2 flexColCenter w-10 gap-5 text-xl 
                    translate-x-12 group-hover:translate-x-0 transition-all ease-in-out duration-500'

                >

                  <span className='border-2 border-white bg-white p-2 rounded-full cursor-pointer text-third'
                    onClick={() => { handleAddToCart({...value, quantity: 1}) }}
                  >
                    <BsFillCartPlusFill />
                  </span>
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
      <MenuView />

      {/* buy now */}
      <BuynowView />

    </main>
  )
}
