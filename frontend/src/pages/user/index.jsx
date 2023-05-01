import React, { useState } from 'react'

const User = () => {

    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [updateId, setUpdateId] = useState("")
    const [updateUsername, setUpdateUsername] = useState("")

    const adduser = async () => {
        console.log("Clickeds");
        try {
            let adduser = await fetch("http://localhost:3001/api/users/adduser",
                {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "name": name,
                        "username": username,
                        "password": password
                    })
                }
            )

            if (adduser.status == "ok") {

            }

        } catch (error) {
            console.log("Error while adding user in FE " + error.message);
        }

    }

    const updateUser = async()=>{
        try {
            let updateuser = await fetch("http://localhost:3001/api/users/updateUser",
                {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "UserID": updateId,
                        "username": updateUsername,
                    })
                }
            )

            if (updateuser.status == "ok") {

            }

        } catch (error) {
            console.log("Error while updating user in FE " + error.message);
        }
    }

    return (
        <div className='flex gap-40'>
            <div className='flex flex-col gap-2'>
                <h1>Add user</h1>
                <span className='flex gap-2'>
                    Name: <input type='text' className='border-2 border-black' onChange={(event) => { setName(event.target.value) }} />
                    {name}
                </span>

                <span className='flex gap-2'>
                    username: <input type='text' className='border-2 border-black' onChange={(event) => { setUsername(event.target.value) }} />
                    {username}
                </span>

                <span className='flex gap-2'>
                    password: <input type='text' className='border-2 border-black' onChange={(event) => { setPassword(event.target.value) }} />
                    {password}
                </span>

                <button className='w-32 h-12 bg-blue-300' onClick={() => adduser()}>Add user</button>
            </div>

            <div className='flex flex-col gap-2'>
                <h1>Update user</h1>
                <span className='flex flex-col gap-2'>
                    <span>
                        user id: <input type='text' className='border-2 border-black' onChange={(event) => { setUpdateId(event.target.value) }} />
                        {updateId}
                    </span>

                    <span>
                        update username: <input type='text' className='border-2 border-black' onChange={(event) => { setUpdateUsername(event.target.value) }} />
                    </span>
                    <button className='w-32 h-8 bg-green-500' onClick={()=>updateUser()}>Update</button>
                </span>


            </div>


        </div>
    )
}

export default User