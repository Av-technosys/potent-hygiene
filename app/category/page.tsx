import React from 'react'
import FilterBar from '../components/common/category/filterTopBar'
import FiltersSidebar from '../components/common/category/filterSideBar'
import { Navbar } from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import CategoryProducts from '../components/common/category/categoryProduct'

const page = () => {

  return (

    <div>

      <Navbar />

      <FilterBar/>

      <div className="max-w-7xl mx-auto py-8 px-6 flex gap-8">

        <FiltersSidebar />

        <CategoryProducts />

      </div>

      <Footer/>

    </div>

  )

}

export default page