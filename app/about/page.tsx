import React from 'react'

import Footer from '../components/common/Footer'
import AboutBanner from './AboutBanner'
import AboutPage from './AboutPage'
import Vision from './Vision'
import ReadyDifferenceBanner from './ReadyDifferenceBanner'
import WhyChooseSection from './WhyChooseSection'
import SustainabilitySection from './SustainabilitySection'
import { Navbar } from '../components/common/Navbar'

const page = () => {
  return (
    <div>
          <Navbar/>
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