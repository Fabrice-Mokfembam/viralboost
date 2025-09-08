import { ChevronLeft } from 'lucide-react'
import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

const SinglePageLayout: React.FC = () => {
    const location = useLocation()
    const navigate = useNavigate()
  return (
    <div className='bg-gray-800 min-h-screen flex flex-col '>
      <div className='bg-gray-900 h-[80px] flex items-center'>
        <header className="w-full bg-gray-900 fixed top-0 z-50 flex items-center justify-center px-6 py-3">
          <div onClick={()=>navigate(-1)} className="text-cyan-500 font-bold text-xl absolute left-5">
            <ChevronLeft/>
          </div>
         <div className="text-white font-bold text-xl"><div>{location.pathname.split('/')[2]}</div></div>
        </header>
      </div>
       <div className='flex-grow w-full max-w-3xl md:mx-auto bg-gray-900 pt-6 pb-20 px-4 min-h-screen' >
            <Outlet/>
        </div>
    </div>
  )
}

export default SinglePageLayout