import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Select, Dropdown } from 'antd'

import { useState } from 'react'


const inter = Inter({ subsets: ['latin'] })

import { DownOutlined } from '@ant-design/icons';

import { ImLocation2 } from 'react-icons/im'
import { FaUserAlt } from 'react-icons/fa'
import { CiUser, CiLogout, CiMenuKebab } from "react-icons/ci"
import { BiPurchaseTag } from "react-icons/bi"
import { RiNotification3Fill } from "react-icons/ri"
import { BsCart4, BsSearch, BsCaretRight } from "react-icons/bs"
import { GrAddCircle, GrSubtractCircle, GrClose } from "react-icons/gr"
import { useRouter } from 'next/router'


export default function Header() {

    const router = useRouter()

    const flag = [
        {
            label: <span className='flex flex-row text-sm gap-2 items-center'><img src='/flag/bangladesh.png' alt='flag' className='lg:hidden w-6 h-5' /> <span className='hidden lg:flex'>Bangladesh</span></span>,
            value: "bangladesh"
        },

        {
            label: <span className='flex flex-row text-sm gap-2 items-center' ><img src='/flag/canada.png' className=' lg:hidden w-6 h-5' /> <span className='hidden lg:flex'>Canada</span></span>,
            value: "Canada"
        },

        {
            label: <span className='flex flex-row text-sm gap-2 items-center'><img src='/flag/norway.png' className=' lg:hidden w-6 h-5' /> <span className='hidden lg:flex'>Norway</span></span>,
            value: "norway"
        },
    ]

    const userDropdown = [
        {
            label: (
                <span className='flexRowCenter gap-2'> <CiUser className='w-5 h-5' /> <span>Profile</span> </span>
            ),
            key: '0'
        },

        {
            type: "divider"
        },

        {
            label: (
                <span className='flexRowCenter gap-2'> <BiPurchaseTag className='w-5 h-5' /> <span>History</span> </span>
            ),
            key: '1'
        },

        {
            type: "divider"
        },

        {
            label: (
                <span className='flexRowCenter gap-2 '> <CiLogout className='w-5 h-5' /> <span>Logout</span> </span>
            ),
            key: '2',
            type: "hidden"
        },

    ]

    const notificationDropdown = [
        {
            label: "Welcome to Bali Baba commerce",
            key: '0'
        },
    ]

    const menu = [
        {
            category: "Health Care & Medicine",
            subCategory: ["Pharmacy", "Health Kit", "Vision", "Health Center"]
        },

        {
            category: "Accessories",
            subCategory: ["Mobile Phones", "Laptop", "Charger & Headphones", "Appliences", "Components"]
        },

        {
            category: "Auto Care and Services",
            subCategory: ["Tires", "Oil & Mobile", "Modifications", "Repair"]
        },

        {
            category: "Home appliences",
            subCategory: []
        },

        {
            category: "Gifts & Cards",
            subCategory: ["Gifts", "Cards", "Wrappings", "Invitations"]
        },

        {
            category: "Financial & More",
            subCategory: []
        },

        {
            category: "Local Groceries",
            subCategory: []
        },
    ]

    // Global states from redux
    const [loggedIn, setLoggedIn] = useState(true)
    const [cart, setCart] = useState([
        {
            id: "1",
            name: "PS5 Grand extended with 50% discount on 3 games",
            image: "/product.png",
            qunatity: 2,
            cost: 400,
            discount: 300,
            price: 600
        },
        {
            id: "1",
            name: "PS5 Grand extended with 50% discount on 3 games",
            image: "/product.png",
            qunatity: 2,
            cost: 400,
            discount: 300,
            price: 600
        },


    ])


    // Header states 
    const [location, setLocation] = useState("bangladesh")
    const [showCart, setShowCart] = useState(false)
    const [showMenu, setShowMenu] = useState(false)

    const onDeliveryChange = (value) => {
        console.log(`selected ${value}`);
        setLocation(value)
    };


    return (
        (
            <div className='hidden lg:flex lg:flex-row shrink w-screen h-16 p-2 items-center  bg-first'>

                {/* Logo */}
                <span className='flex w-1/6 h-full bg-white justify-center items-center'
                    onClick={()=>{router.push("/")}}
                >
                    <img src='/bali.png' alt='logo' className='w-full h-full' />
                </span>

                {/* Delivery locatiokn */}
                <span className='flex flex-row gap-1 ml-3'>
                    <ImLocation2 className='w-7 h-7 text-fourth' />
                    <span className='flex flex-col lg:flex-row  justify-center items-center gap-2'>
                        <span className='hidden lg:flex text-sm font-semibold'>Delivery to :</span>
                        <span>

                            <Select
                                defaultValue={location}
                                onChange={onDeliveryChange}
                                options={flag}
                                style={{
                                    fontSize: "500px"
                                }}
                            />

                        </span>
                    </span>
                </span>

                {/* Menu */}

                <span className='relative mx-3'>

                    <span
                        className=' flexRowCenter p-2 w-20 h-9 rounded-lg bg-blue-200 hover:border-2 hover:border-second hover:cursor-pointer'
                        onClick={() => { setShowMenu(!showMenu) }}
                    >
                        <CiMenuKebab className='w-7 h-full' />
                        <span>Menu</span>
                    </span>

                    {/* <div className=' w-100 h-100 flex flex-row  bg-blue-200'>
        
        
                </div> */}

                    <div
                        className='z-30 absolute w-56 py-2 h-100 top-12 flex-col bg-blue-200'
                        style={{
                            display: showMenu ? "flex" : "none"
                        }}
                    >
                        {
                            menu.map((item, index) => (

                                <span key={index} className="group w-full px-5 h-10 flexRowCenter text-sm justify-between hover:bg-first">
                                    {item.category}
                                    <span><BsCaretRight /></span>

                                    <span
                                        className="absolute hidden top-0 py-2 w-56 h-full gap-2 left-full flex-col group-hover:flex bg-first"
                                    >
                                        {
                                            item.subCategory.map((subItem, index2) => (
                                                <span key={index2} className='px-5 mx-5 h-10 flexRowCenter justify-between rounded-lg border-2 border-second text-white cursor-pointer'>{subItem}</span>)
                                            )
                                        }
                                    </span>
                                </span>

                            ))
                        }




                    </div>


                </span>



                {/* Big GAP */}
                <span className='flexRowCenter mx-3 w-2/5 h-full bg-blue-200 rounded-lg'>
                    <input type='text' placeholder='search products' className='w-full h-full rounded-l-lg px-2 focus:outline-none' />
                    <span className='w-12 h-full flexRowCenter text-xl'><BsSearch /></span>
                </span>

                {/* User */}

                {
                    loggedIn ?
                        <Dropdown
                            className='hover:cursor-pointer'
                            menu={{
                                items: userDropdown
                            }}
                            trigger={['click']}
                        >
                            <span
                                className='flex flex-row w-36 h-full items-center gap-3'
                                onClick={(e) => { e.preventDefault() }}
                            >
                                <FaUserAlt className='w-1/4 h-full' />
                                <span className='w-3/4 h-full text-sm font-semibold flexRowCenter justify-start'>Rakibul Alam Nahin</span>
                                <DownOutlined className='w-6 h-6' />
                            </span>

                        </Dropdown>
                        :
                        <span
                            className='flex flex-row w-32 h-full items-center gap-3 hover:text-red-700 hover:cursor-pointer'
                            onClick={(e) => { e.preventDefault() }}
                        >
                            <FaUserAlt className='w-1/4 h-full' />
                            <span className='w-3/4 h-full text-sm font-semibold flexRowCenter justify-start'>Guest</span>
                        </span>
                }

                {/* Notification */}

                <Dropdown
                    menu={{
                        items: notificationDropdown
                    }}
                    trigger={['click']}
                    className='mx-3 hover:cursor-pointer'
                >
                    <span
                        className='relative flex flex-row items-center'
                        onClick={(e) => { e.preventDefault() }}
                    >
                        <RiNotification3Fill className='w-8 h-8' />
                        <span className='absolute text-red-500 text-4xl -top-4 right-0'>&#x2022;</span>
                    </span>

                </Dropdown>

                {/* Cart */}
                <span className=' relative flex flex-row px-3 h-full justify-end items-center'>
                    <BsCart4 className='w-8 h-8 justify-end cursor-pointer' onClick={() => { setShowCart(!showCart) }} />

                    <div className='z-20 absolute flex-col justify-start  top-14 right-0 w-60 h-100 items-start rounded-md bg-white border-black border-2'
                        style={{ display: showCart ? "flex" : "none" }}
                    >
                        <span className='absolute w-5 h-5 bg-second -top-3 right-4 rotate-45 border-t-2 border-l-2 border-black'></span>

                        <span className='w-full h-10 flexRowCenter justify-between p-2 bg-second rounded-t-md'>
                            <span className='flexRowCenter'>
                                <span className='text-lg font-serif mx-2'>Items </span>
                                <span className='w-5 h-5 rounded-full flexRowCenter font-bold bg-white'>{cart.length}</span>
                            </span>

                            <span className='p-1 rounded-full  font-bold bg-white text-sm  cursor-pointer' onClick={() => { setShowCart(false) }}><GrClose /></span>

                        </span>

                        <div className='w-full h-80 overflow-auto gap-1'>
                            {
                                cart.map((item, index) => (
                                    <div key={index} className='w-full p-2 h-24 flex flex-col justify-start border-b-2 border-third'>

                                        <span className='flex flex-row text-sm gap-1'>
                                            <img src={item.image} className='w-11 h-11 rounded-md' />
                                            <span>
                                                {
                                                    item.name.length > 30 ?
                                                        <div>{item.name.slice(0, 20) + "..."}</div>

                                                        :
                                                        <div>{item.name}</div>
                                                }

                                                <div className='text-xs font-bold text-fourth'>Quantity : {item.qunatity}</div>
                                            </span>

                                        </span>

                                        <span className='flex flex-row items-center justify-between'>
                                            {
                                                item.discount != 0 ?
                                                    <span className='flex flex-row items-end gap-1'>
                                                        <span className='text-xl text-fourth font-bold'>&#36;{item.discount}</span>
                                                        <span className='text-sm line-through text-slate-500 font-medium'>&#36;{item.cost}</span>
                                                    </span>
                                                    :
                                                    <span>
                                                        <span className='text-xl text-fourth font-bold'>&#36;{item.cost}</span>
                                                    </span>
                                            }

                                            <span className='flexRowCenter gap-3'>
                                                <GrAddCircle className='w-6 h-6 text-fourth' />
                                                <GrSubtractCircle className='w-6 h-6 text-fourth' />
                                            </span>

                                        </span>



                                    </div>
                                ))
                            }
                        </div>

                        <span className='flexRowCenter justify-end w-full h-9'>
                            <span className='w-full mx-1 h-8 flexRowCenter bg-first text-white font-semibold rounded-md'>Proceed to checkout</span>

                        </span>

                    </div>
                </span>

            </div>
        )
    )
}