import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const CategoryView = () => {
  const router = useRouter()

  const [filter, setFilter] = useState(null)

  useEffect(() => {
    
    let category = router.query.category
    let subcategory = router.query.subcategory
    
    if(category != undefined){
      setFilter(category)
    }else if (subcategory != undefined){
      setFilter(subcategory)
    }

  }, [router.query.category, router.query.subcategory])
  

  return (
    <div className='flex flex-col bg-green-500'>This is the {filter} section</div>
  )
}

export default CategoryView