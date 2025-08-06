import React from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import { Outlet } from 'react-router'

const HomeLayout = () => {
    return (
        <>
            <Navbar />
            <main className='container'>
                {/* The main content will be rendered here */}
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default HomeLayout
