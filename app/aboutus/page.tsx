import React from 'react'
import BlogHeader from '../components/common/BlogHeader'
import Footer from '../components/common/Footer'
import AboutBanner from './AboutBanner'
import AboutPage from './AboutPage'
import Vision from './Vision'
import ReadyDifferenceBanner from './ReadyDifferenceBanner'
import WhyChooseSection from './WhyChooseSection'
import SustainabilitySection from './SustainabilitySection'

const page = () => {
  return (
    <div>
          <BlogHeader/>
         <AboutBanner/>
         <AboutPage/>
         <Vision/>
         <SustainabilitySection/>
         <WhyChooseSection/>
         <ReadyDifferenceBanner/>
         <Footer/>
    </div>
  )
}

export default page