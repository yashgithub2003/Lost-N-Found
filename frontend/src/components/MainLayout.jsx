import React from 'react'
import { Outlet } from 'react-router-dom'
import LeftSidebar from './LeftSidebar'

const MainLayout = () => {
  return (
    <div className='bg-[#151e32] h-full w-full'>
      <LeftSidebar />
      <div className="">
      
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout