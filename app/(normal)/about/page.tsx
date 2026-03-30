import React from 'react'

import AboutBanner from './AboutBanner'
import AboutPage from './AboutPage'
import Vision from './Vision'
import ReadyDifferenceBanner from './ReadyDifferenceBanner'
import WhyChooseSection from './WhyChooseSection'
import SustainabilitySection from './SustainabilitySection'

const page = () => {
  return (
    <div>
      <AboutBanner />
      <AboutPage />
      <Vision />
      <SustainabilitySection />
      <WhyChooseSection />
      <ReadyDifferenceBanner />
    </div>
  )
}

export default page