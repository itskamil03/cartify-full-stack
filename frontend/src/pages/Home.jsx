import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'
import Sidebar from '../components/Sidebar'

const Home = () => {
  return (

    <div className="bg-[#f1f3f6] min-h-screen">

      <div className="flex">

        {/* LEFT SIDEBAR */}
        <Sidebar />

        {/* MAIN CONTENT */}
        <div className="flex-1">

          <div className="px-4 sm:px-8 lg:px-10">

            <Hero />

            <div className="mt-14">
              <LatestCollection />
            </div>

            <div className="mt-14">
              <BestSeller />
            </div>

            <div className="mt-14">
              <OurPolicy />
            </div>

            <div className="mt-14 pb-10">
              <NewsletterBox />
            </div>

          </div>

        </div>

      </div>

    </div>

  )
}

export default Home