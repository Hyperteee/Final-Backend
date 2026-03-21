import React from 'react'
import { Outlet } from 'react-router'


import NavigationBar from '../Navbar/Navbar'
import ChatBot from '../ChatBot/ChatBot'
// import PoppularDoc from '../PopularDoc/PoppularDoc'
import PackagePart from '../PackagePart/Package'
import Footer from '../Footer/Footer'
import Queue4 from '../Hospital-Search/Queue4'

export default function Layout() {
  return (
    <div>
        <NavigationBar />
        <Outlet />
    </div>
  )
}
