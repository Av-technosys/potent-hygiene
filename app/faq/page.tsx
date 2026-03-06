import React from 'react'
import BlogHeader from '../components/common/BlogHeader'
import Frequently from '../components/common/Frequently'
import Footer from '../components/common/Footer'
import { Navbar } from '../components/common/Navbar'

const page = () => {
  return (
    <div>
       <Navbar/>
         <Frequently />
         <Footer/>
    </div>
  )
}

export default page