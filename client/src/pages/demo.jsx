import React, { useState } from 'react'
import Image from 'next/image'
import axios from 'axios'

import { useSelector, useDispatch } from 'react-redux'
import { setUserDetails } from '@/redux/userDetailsSlice'

const Demo = () => {

    const userDetails = useSelector((state)=> state.userDetails)

    return (
        <div className=''>
            {userDetails.name}
        </div>
    )
}

export default Demo









