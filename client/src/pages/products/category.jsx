import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { getFilteredProduct } from '../api/product'
import { AiTwotoneStar } from 'react-icons/ai'
import { BsFillCartPlusFill  } from 'react-icons/bs'
import { CiShoppingTag  } from 'react-icons/ci'


const CategoryView = () => {
  const router = useRouter()

  const [filter, setFilter] = useState([])

  useEffect(() => {

    let category = router.query.category
    let tags = router.query.tags

    getFilteredProduct(category, tags)
    .then((response)=>{
      setFilter(response)
    })

    // setFilter(response)
    // console.log("response here", response);


  }, [router.query.category, router.query.tags])

  const Results = () => (
    <div className='px-10 lg:px-28 mb-10 w-full flexColCenter lg:items-start gap-5'>
      <span className='flex flex-row text-2xl font-semibold underline uppercase'>{(router.query.category == undefined && router.query.tags == undefined)?"All Category":(router.query.category || router.query.tags)}</span>
      <div className='w-full gap-5 flex flex-row max-lg:justify-center flex-wrap'>

        {
          filter.map((value, index) => {
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
    filter.length != 0
      ?
      <div className='py-5 flexColCenter items-start w-full min-h-[440px] bg-slate-300'>
        <Results />
      </div>
      :
      <div className='flexColCenter w-full min-h-[440px]'>
        <span className='text-5xl'>Please wait a while or there is no product to see xD</span>
        <span className='flexRowCenter animate-spin w-10 h-10 bg-gradient-to-tr from-third to-fourth rounded-full'>
          <div className='w-7 h-7 bg-white rounded-full'></div>
        </span>
      </div>
  )
}

export default CategoryView