import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Select, Dropdown } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { setUserDetials, clearUserDetails } from '@/redux/userDetailsSlice'
import { clearCart, editCart } from '@/redux/cartSlice'

const inter = Inter({ subsets: ['latin'] })

// icons
import { DownOutlined } from '@ant-design/icons';
import { ImLocation2 } from 'react-icons/im'
import { FaUserAlt } from 'react-icons/fa'
import { CiUser, CiLogout, CiMenuKebab } from "react-icons/ci"
import { BiPurchaseTag } from "react-icons/bi"
import { RiNotification3Fill } from "react-icons/ri"
import { BsCart4, BsSearch, BsCaretRight } from "react-icons/bs"
import { GrAddCircle, GrSubtractCircle, GrClose } from "react-icons/gr"


export default function Header() {

    const router = useRouter()
    const dispatch = useDispatch()

    const flag = [
        {
            label: <span className='flex flex-row text-sm gap-2 items-center'><img src='/flag/bangladesh.png' alt='flag' className=' w-6 h-5' /> <span className='flex'>Bangladesh</span></span>,
            value: "bangladesh"
        },

        {
            label: <span className='flex flex-row text-sm gap-2 items-center' ><img src='/flag/canada.png' className=' w-6 h-5' /> <span className='flex'>Canada</span></span>,
            value: "Canada"
        },

        {
            label: <span className='flex flex-row text-sm gap-2 items-center'><img src='/flag/norway.png' className=' w-6 h-5' /> <span className='flex'>Norway</span></span>,
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
                <span
                    className='flexRowCenter gap-2 '
                    onClick={() => { dispatch(clearUserDetails()) }}
                >
                    <CiLogout className='w-5 h-5' />
                    <span>Logout</span>
                </span>
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
            category: { name: "All", link: "/products/category" },
            subCategory: []
        },

        {
            category: { name: "Clothings", link: "/products/category?category=clothing" },
            subCategory: [
                { name: "Mens", link: "/products/category?tags=men" },
                { name: "Womens", link: "/products/category?tags=women" },
                { name: "Fashion", link: "/products/category?tags=fashion" },
                { name: "Kids", link: "/products/category?tags=kid" },
            ]
        },

        {
            category: { name: "Electronics", link: "/products/category?category=electronics" },
            subCategory: [
                { name: "Accessories", link: "/products/category?tags=accessories" },
                { name: "Laptop", link: "/products/category?tags=laptop" },
                { name: "Phones", link: "/products/category?tags=phone" },
            ]
        },

        {
            category: { name: "Gifts", link: "/products/category?category=gifts" },
            subCategory: [
                { name: "Gifts", link: "/products/category?tags=gift" },
                { name: "Cards", link: "/products/category?tags=card" },
            ]
        },

        {
            category: { name: "Others", link: "" + router.pathname },
            subCategory: [
                { name: "Special Offers", link: "/products/category?tags=special offer" },
                { name: "New Arrivals", link: "/products/category?tags=new arrival" },
                { name: "Trending", link: "/products/category?tags=trending" },
                { name: "Most Bought", link: "/products/category?tags=most bought" },
                { name: "Flash Deals", link: "/products/category?tags=flash deal" },
                { name: "Pre-Order", link: "/products/category?tags=pre order" },
                { name: "Affordable & Discounts", link: "/products/category?tags=discount" },
            ]
        },
    ]

    // Global states from redux
    // const [loggedIn, setLoggedIn] = useState(true)
    // const [cart, setCart] = useState([
    //     {
    //         id: "1",
    //         name: "PS5 Grand extended with 50% discount on 3 games",
    //         image: "/product.png",
    //         qunatity: 2,
    //         cost: 400,
    //         discount: 300,
    //         price: 600
    //     },
    //     {
    //         id: "1",
    //         name: "PS5 Grand extended with 50% discount on 3 games",
    //         image: "/product.png",
    //         qunatity: 2,
    //         cost: 400,
    //         discount: 300,
    //         price: 600
    //     },


    // ])
    const userDetails = useSelector((state) => state.userDetails)
    const cart = useSelector((state) => state.cartDetails)



    // Header states 
    const [location, setLocation] = useState("bangladesh")
    const [showCart, setShowCart] = useState(false)
    const [showMenu, setShowMenu] = useState(false)

    const onDeliveryChange = (value) => {
        console.log(`selected ${value}`);
        setLocation(value)
    };

    const increaseQuantityCart = (index) => {
        // let x = [...cart]
        // console.log(x);
        // let product = x[index]
        // product['quantity'] += 1
        // x[index] = product
        dispatch(editCart({ index: index, increase: true }))

    }

    const decreaseQuantityCart = (index) => {
        dispatch(editCart({ index: index, increase: false }))
    }


    return (
        (
            <div className='flex flex-row shrink w-screen h-16 p-2 items-center  bg-first'>

                {/* Logo */}
                <span className='flex w-[180px] md:w-1/6 h-full bg-white justify-center items-center'
                    onClick={() => { router.push("/") }}
                >
                    <img src='/bali.png' alt='logo' className='w-full h-full' />
                </span>

                {/* Delivery locatiokn */}
                <span className='hidden md:flex flex-row gap-1 ml-3'>
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
                        className=' flexRowCenter sm:p-2 sm:w-20 h-9 rounded-lg bg-blue-200 hover:border-2 hover:border-second hover:cursor-pointer'
                        onClick={() => { setShowMenu(!showMenu) }}
                    >
                        <CiMenuKebab className='w-7 h-full' />
                        <span className='hidden sm:flex'>Menu</span>
                    </span>

                    <div
                        className='z-30 absolute w-56 py-2 h-100 top-12 flex-col bg-blue-200'
                        style={{
                            display: showMenu ? "flex" : "none"
                        }}
                    >
                        {
                            menu.map((item, index) => (

                                <span key={index} className="group w-full px-5 h-10 flexRowCenter text-sm font-semibold justify-between hover:bg-first cursor-pointer">
                                    <span
                                        onClick={() => { router.push(item.category.link); setShowMenu(false) }}
                                        className='hover:text-third'
                                    >
                                        {item.category.name}
                                    </span>

                                    <span><BsCaretRight /></span>

                                    <span
                                        className="absolute hidden top-0 py-2 w-56 h-full gap-2 left-full flex-col group-hover:flex bg-first"
                                    >
                                        {
                                            item.subCategory.map((subItem, index2) => (
                                                <span key={index2} className='px-5 mx-5 h-10 flexRowCenter justify-between rounded-lg border-2 border-second text-white'

                                                >
                                                    <span
                                                        onClick={() => { router.push(subItem.link); setShowMenu(false) }}
                                                        className='hover:text-third'
                                                    >
                                                        {subItem.name}
                                                    </span>
                                                </span>)
                                            )
                                        }
                                    </span>
                                </span>

                            ))
                        }




                    </div>


                </span>



                {/* Big Search */}
                <span className='flexRowCenter sm:mx-3 w-3/5 md:w-2/5 h-full bg-blue-200 rounded-lg'>
                    <input type='text' placeholder='search products' className='w-full h-full rounded-l-lg px-2 focus:outline-none' />
                    <span className='w-12 h-full flexRowCenter text-xl'><BsSearch /></span>
                </span>

                {/* User */}

                {
                    userDetails ?
                        <Dropdown
                            className='hover:cursor-pointer'
                            menu={{
                                items: userDropdown
                            }}
                            trigger={['click']}
                        >
                            <span
                                className='hidden md:flex flex-row w-36 h-full items-center gap-3'
                                onClick={(e) => { e.preventDefault() }}
                            >
                                <FaUserAlt className='w-1/4 h-full' />
                                <span className='hidden md:flex w-3/4 h-full text-sm font-semibold flexRowCenter justify-start'>{userDetails.name}</span>
                                <DownOutlined className='hidden md:flex w-6 h-6' />
                            </span>

                        </Dropdown>
                        :
                        <span
                            className='hidden md:flex flex-row justify-center items-center w-32 h-full gap-3 hover:text-red-700 hover:cursor-pointer'
                            onClick={(e) => { router.push("/user/login") }}
                        >
                            <FaUserAlt className='w-1/4 h-full' />
                            <span className='hidden md:flex w-3/4 h-full text-sm font-semibold flexRowCenter justify-start'>Guest</span>
                        </span>
                }


                {/* Notification */}
                <span className='hidden lg:flex'>
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
                </span>



                {/* Cart */}
                <span className=' relative flex flex-row px-3 h-full justify-end items-center'>
                    <BsCart4 className='w-8 h-8 justify-end cursor-pointer' onClick={() => { setShowCart(!showCart) }} />

                    <div className='z-20 absolute flex-col justify-start  top-14 right-0 w-64 h-110 items-start rounded-lg bg-white border-black border-2'
                        style={{ display: showCart ? "flex" : "none" }}
                    >
                        <span className='absolute w-5 h-5 bg-second -top-3 right-4 rotate-45 border-t-2 border-l-2 border-black'></span>

                        <span className='w-full h-10 flexRowCenter justify-between p-2 bg-second rounded-t-md'>
                            <span className='flexRowCenter'>
                                <span className='text-lg font-serif mx-2'>Items </span>
                                <span className='w-5 h-5 rounded-full flexRowCenter font-bold bg-white'>{cart.length}</span>
                            </span>

                            <span className='p-1 px-2 rounded-md  font-bold bg-white text-sm  cursor-pointer hover:bg-red-500 hover:text-white'
                                onClick={() => { dispatch(clearCart()) }}
                            >
                                Clear
                            </span>
                            <span className='p-1 rounded-full  font-bold bg-white text-sm  cursor-pointer' onClick={() => { setShowCart(false) }}><GrClose /></span>

                        </span>

                        <div className='w-full h-96 overflow-auto gap-1'>
                            {
                                cart.map((item, index) => {
                                    const base64string = btoa(String.fromCharCode(...new Uint8Array(item.image.data.data)))

                                    return (
                                        <div key={index} className='w-full p-2 flex flex-col justify-start border-b-2 border-third'>

                                            <span className='flex flex-row font-semibold gap-1'>
                                                <img src={`data:image/png;base64,${base64string}`} className='w-11 h-11 rounded-md' />
                                                <span>
                                                    {
                                                        item.name.length > 30 ?
                                                            <div>{item.name.slice(0, 25) + "..."}</div>

                                                            :
                                                            <div>{item.name}</div>
                                                    }

                                                    <div className='text-sm font-bold text-fourth'>Quantity : {item.purchaseQuantity}</div>
                                                </span>

                                            </span>

                                            <span className='flex flex-row items-center justify-between'>
                                                {
                                                    item.discount != 0 ?
                                                        <span className='flex flex-row items-end gap-1'>
                                                            <span className='text-xl text-fourth font-bold'>&#36;{item.discount}</span>
                                                            <span className='text-sm line-through text-slate-500 font-medium'>&#36;{item.price}</span>
                                                        </span>
                                                        :
                                                        <span>
                                                            <span className='text-xl text-fourth font-bold'>&#36;{item.price}</span>
                                                        </span>
                                                }

                                                <span className='flexRowCenter gap-3'>
                                                    <GrAddCircle
                                                        className='w-6 h-6 text-fourth'
                                                        onClick={() => { increaseQuantityCart(index) }}
                                                    />
                                                    <GrSubtractCircle
                                                        className='w-6 h-6 text-fourth'
                                                        onClick={() => { decreaseQuantityCart(index) }}
                                                    />
                                                </span>

                                            </span>



                                        </div>
                                    )
                                }
                                )
                            }
                        </div>

                        <span className='flexRowCenter justify-end w-full h-9'>
                            <span className='w-full mx-0.5 my-0.5 h-8 flexRowCenter bg-first text-white font-semibold rounded-md'>Proceed to checkout</span>

                        </span>

                    </div>
                </span>

            </div>
        )
    )
}