import React from 'react'
import Link from 'next/link'
import { aboutUs, services, money } from '@/data/footer'

import { BsFacebook, BsLinkedin, BsTwitter } from 'react-icons/bs'

const Footer = () => {
  return (
    <div className='px-48 py-10 w-screen grid md:grid-cols-2 lg:grid-cols-4 bg-first'>

        <span className='flex flex-col items-start'>
            <span className='text-lg font-semibold'>About Us</span>
            {
                aboutUs.map((item, index)=>(
                    <Link href={Object.values(item)[0]}>{Object.keys(item)[0]}</Link>
                ))
            }
        </span>

        <span className='flex flex-col items-start'>
            <span className='text-lg font-semibold'>Our Services</span>
            {
                services.map((item, index)=>(
                    <Link href={Object.values(item)[0]}>{Object.keys(item)[0]}</Link>
                ))
            }
        </span>

        <span className='flex flex-col items-start'>
            <span className='text-lg font-semibold'>Monitize yourself</span>
            {
                money.map((item, index)=>(
                    <Link href={Object.values(item)[0]}>{Object.keys(item)[0]}</Link>
                ))
            }
        </span>

        <span className='flex flex-col items-start gap-3'>
            <span className='text-lg font-semibold'>Follow Us</span>
            <span className='flex flex-row gap-2 justify-start items-center'><BsFacebook className='p-1 text-3xl text-blue-500 rounded-full bg-white'/> Facebook</span>
            <span className='flex flex-row gap-2 justify-start items-center'><BsLinkedin className='p-1 text-3xl text-blue-600 rounded-full bg-white'/> LinkedIn</span>
            <span className='flex flex-row gap-2 justify-start items-center'><BsTwitter className='p-1 text-3xl text-blue-500 rounded-full bg-white'/> Twitter</span>
        </span>

    </div>
  )
}

export default Footer