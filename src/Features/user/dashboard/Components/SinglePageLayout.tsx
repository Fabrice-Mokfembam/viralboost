import React from 'react'
import { Outlet } from 'react-router-dom'

const SinglePageLayout: React.FC = () => {
  return (
    <div className='bg-bg-secondary min-h-screen flex flex-col '>
       <div className='flex-grow w-full max-w-3xl md:mx-auto bg-bg-main pt-6 pb-20 px-4 min-h-screen' >
            <Outlet/>
        </div>
    </div>
  )
}

export default SinglePageLayout