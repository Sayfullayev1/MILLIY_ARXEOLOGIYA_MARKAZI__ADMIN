import React from 'react'
import './dashboardLayout.scss'

import HeaderComponent from '../../components/layoutsComponents/headerComponent/HeaderComponent'
import { Outlet } from 'react-router-dom'
import FooterComponent from '../../components/layoutsComponents/footerComponent/FooterComponent'

export default function DashboardLayout() {
  return (
    <div className='container'>
        <HeaderComponent/>
            {/* <div className='outlet-container'> */}
            <Outlet/>
            {/* </div> */}
        {/* <FooterComponent/>  */}
    </div>
  )
}
