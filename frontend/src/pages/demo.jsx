import React, { useState } from 'react'
import Image from 'next/image'
import axios from 'axios'

const Demo = () => {

    var [demo, setDemo] = useState(0)

    const DemoView = () => {

        console.log("function", demo);
        return (
            <input type="text" value={demo} placeholder='text' onChange={e=>{setDemo(e.target.value)}} />

        )
    }

    // console.log("global", demo);

    return (
        <div className=''>
            {/* {console.log("main view ", demo)} */}
            {/* <input type="text" placeholder='text' value={demo} onChange={(event) => { setDemo(event.target.value) }} /> */}

            {DemoView()}
        </div>
    )
}

export default Demo
