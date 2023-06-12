import React from 'react'
import { useSelector } from 'react-redux'

export const verfiyUser = () => {
  const user = useSelector((state) => state.userDetails)
  if(user != (null || undefined)){
    console.log("verifying user", user);
    return true
  }else{
    return false
  }
}

