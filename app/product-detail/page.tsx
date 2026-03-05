import React from 'react'
import Breadcrumb from '../components/common/Product-detail/breadcrumb'
import { Navbar } from '../components/common/Navbar'
import Product from '../components/common/Product-detail/product'
import TrustBadges from '../components/common/Product-detail/trustbadges'
import AboutProduct from '../components/common/Product-detail/aboutproduct'
import ProductReviews from '../components/common/Product-detail/productreview'
import Image from 'next/image'
import AboutHero from '../components/common/Product-detail/abouthero'
import JournalsSection from '../components/common/Product-detail/journal'
import RelatedProducts from '../components/common/Product-detail/alsolike'
import Footer from '../components/common/Footer'


const page = () => {
    return (
        <div >
            <Navbar />
            <Breadcrumb items={[
                { label: "Home", href: "/" },
                { label: "Products", href: "/products" },
                { label: "Product Detail" }
            ]} />
            <div className='px-10'>
                <Product />
                <TrustBadges />
                <AboutProduct />
                <ProductReviews />
                <div className='container mx-auto '>
                    <Image
                        src="/review.png"
                        alt="Product Detail"
                        width={800}
                        height={600}
                        className='onject-cover w-full h-auto my-8'
                    />
                </div>
                <AboutHero />
                <JournalsSection />
                <RelatedProducts />
            </div>
             <Footer/>

        </div>
    )
}

export default page