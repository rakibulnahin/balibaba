import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import UserModal from '@/components/userModal'

import { FaRegUser, FaUserCircle } from "react-icons/fa"
import { RiLockPasswordLine, RiLockPasswordFill } from "react-icons/ri"

const Login = () => {

    const router = useRouter()

    const [modalText, setModalText] = useState("")
    const [modalOpen, setModalOpen] = useState(false)

    // login
    const [loginUsername, setLoginUsername] = useState("")
    const [loginPass, setLoginPass] = useState("")
    const [loggedIn, setLoggedIn] = useState(true)

    // register
    const [registerUser, setRegisterUser] = useState({
        name: "",
        username: "",
        password: "",
        confirmPass: ""
    })
    const [registerCheck, setRegisterCheck] = useState(false)

    const openModal = (text) => {
        setModalText(text)
        setModalOpen(true)
        console.log(modalText + modalOpen);
    }

    const userLogin = async () => {
        try {

            if ([loginUsername, loginPass].includes(undefined || "")) {
                openModal("please provide both credential")
                setLoggedIn(false)
            } else {
                let response = await axios.post("http://localhost:3001/api/users/getUserByID",
                    {
                        username: loginUsername,
                        password: loginPass
                    }
                )
                if (response.data) {
                    console.log(response.data);
                    router.push("/")
                } else {
                    console.log((response.data));
                    openModal("User not found/Wrong credentials")
                    setLoggedIn(false)
                }
            }


        } catch (error) {
            console.log("Error in login " + error.message);
        }

    }

    const addUser = async () => {
        let checkEmpty = Object.values(registerUser).every(value => (value != undefined && value != ""))

        if (!checkEmpty) {
            openModal("please provide all the details to register")
            setLoggedIn(false)

        } else {

            try {
                let result = await axios.post("http://localhost:3001/api/users/adduser", registerUser)
                if (result.data) {
                    setRegisterCheck(true)
                    setLoggedIn(true)
                    console.log("add user data " + result.data);
                    router.push("/")

                } else {
                    openModal("User not added")

                    setLoggedIn(false)

                }
            } catch (error) {
                console.log("Error adding user FE" + error.message);
                openModal("Error adding user " + error.message)
                setLoggedIn(false)
            }



        }
    }

    return (
        <div className='flex flex-col h-screen w-screen justify-center items-center bg-fourth'>

            <UserModal text={modalText} isOpen={modalOpen} setModalOpen={setModalOpen} />
            {/* {UserModal(modalText, modalOpen)} */}

            <div className='grid grid-cols-1 md:grid-cols-2 w-[800px] h-80 bg-third border-white rounded-md border-2'>

                {/* login */}
                <span className='flex flex-col justify-around items-center p-4 border-r-2'>
                    <span className='font-serif font-semibold text-xl text-slate-300'>Login</span>
                    <div className='flex flex-row w-full h-10 bg-white rounded-xl p-1'>
                        <span className='w-10 justify-center items-center'><FaRegUser className='w-full h-full' /> </span>
                        <input type="text" className='w-full text-center focus:outline-none' placeholder='username' onChange={(event) => { setLoginUsername(event.target.value) }} />
                    </div>

                    <div className='flex flex-row w-full h-10 bg-white rounded-xl p-1'>
                        <span className='w-10 justify-center items-center'><RiLockPasswordLine className='w-full h-full' /> </span>
                        <input type="password" className='w-full text-center focus:outline-none' placeholder='password' onChange={(event) => { setLoginPass(event.target.value) }} />
                    </div>

                    <span style={{ display: loggedIn == false ? "flex" : "none" }}>
                        {loggedIn == false ? "Wrong Credentials" : ""}
                    </span>

                    <button
                        className='w-32 h-10 rounded-xl text-white font-semibold bg-first border-4'
                        onClick={() => { userLogin() }}
                    >
                        Login
                    </button>
                </span>

                {/* register */}
                <span className='flex flex-col justify-around items-center p-4 border-r-2'>
                    <span style={{ display: registerCheck ? "none" : "flex" }}>
                        {registerCheck ? "Please fill all the details" : ""}
                    </span>
                    <span className='font-serif font-semibold text-xl text-slate-300'>Register</span>

                    <div className='flex flex-row w-full h-10 bg-white rounded-xl p-1'>
                        <span className='w-10 justify-center items-center'><FaUserCircle className='w-full h-full' /> </span>
                        <input type="text" className='w-full text-center  focus:outline-none' placeholder='full name'
                            onChange={(event) => { setRegisterUser({ ...registerUser, name: event.target.value }) }}
                        />
                    </div>

                    <div className='flex flex-row w-full h-10 bg-white rounded-xl p-1'>
                        <span className='w-10 justify-center items-center'><FaRegUser className='w-full h-full' /> </span>
                        <input type="text" className='w-full text-center  focus:outline-none' placeholder='username'
                            onChange={(event) => { setRegisterUser({ ...registerUser, username: event.target.value }) }}
                        />
                    </div>

                    <div className='flex flex-row w-full h-10 bg-white rounded-xl p-1'>
                        <span className='w-10 justify-center items-center'><RiLockPasswordLine className='w-full h-full' /> </span>
                        <input type="password" className='w-full text-center focus:outline-none' placeholder='password'
                            onChange={(event) => { setRegisterUser({ ...registerUser, password: event.target.value }) }}
                        />
                    </div>

                    <div className='flex flex-row w-full h-10 bg-white rounded-xl p-1'>
                        <span className='w-10 justify-center items-center'><RiLockPasswordFill className='w-full h-full' /> </span>
                        <input type="password" className='w-full text-center focus:outline-none' placeholder='confirm password'
                            onChange={(event) => { setRegisterUser({ ...registerUser, confirmPass: event.target.value }) }}
                        />
                    </div>

                    <button className='w-32 h-10 rounded-xl text-white font-semibold bg-first border-4'
                        onClick={() => addUser()}
                    >
                        Register
                    </button>
                </span>
            </div>

        </div>
    )
}

export default Login