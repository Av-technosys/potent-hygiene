import React from 'react'
import { Navbar } from '../components/common/Navbar'
import { Footer } from '../components/common/Footer'
import CategoryProducts from '../components/common/category/categoryProducts'
import FiltersSidebar from '../components/common/category/filterSideBar'

const page = () => {
    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto py-8 px-6 flex gap-8">
                <FiltersSidebar />
                <CategoryProducts />
            </div>
            <Footer />
        </div>
    )
}

export default page