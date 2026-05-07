import React from 'react'

const Footer = () => {

  return (

    <footer className='mt-24'>

      <div className='bg-black text-white rounded-[36px] overflow-hidden'>

        <div className='grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-4
        gap-12
        px-8
        lg:px-16
        py-14'>

          {/* BRAND */}
          <div>

            <h1 className='text-4xl font-bold tracking-tight'>
              CARTIFY
              <span className='text-pink-400'>.</span>
            </h1>

            <p className='text-gray-400 leading-7 mt-6 text-sm'>
              Discover premium fashion collections crafted for modern lifestyles.
            </p>

            <div className='flex items-center gap-4 mt-8'>

              <div className='w-10 h-10 rounded-full bg-white/10 flex items-center justify-center'>
                IG
              </div>

              <div className='w-10 h-10 rounded-full bg-white/10 flex items-center justify-center'>
                FB
              </div>

              <div className='w-10 h-10 rounded-full bg-white/10 flex items-center justify-center'>
                TW
              </div>

              <div className='w-10 h-10 rounded-full bg-white/10 flex items-center justify-center'>
                YT
              </div>

            </div>

          </div>

          {/* SHOP */}
          <div>

            <h2 className='text-xl font-semibold mb-6'>
              SHOP
            </h2>

            <ul className='flex flex-col gap-4 text-gray-400 text-sm'>
              <li>Men Collection</li>
              <li>Women Collection</li>
              <li>New Arrivals</li>
              <li>Trending Products</li>
            </ul>

          </div>

          {/* COMPANY */}
          <div>

            <h2 className='text-xl font-semibold mb-6'>
              COMPANY
            </h2>

            <ul className='flex flex-col gap-4 text-gray-400 text-sm'>
              <li>About Us</li>
              <li>Contact</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>

          </div>

          {/* CONTACT */}
          <div>

            <h2 className='text-xl font-semibold mb-6'>
              CONTACT
            </h2>

            <div className='flex flex-col gap-5 text-gray-400 text-sm'>

              <p>📞 +91 9142836656</p>

              <p>📧 support@cartify.com</p>

              <p>📍 Mumbai, India</p>

            </div>

          </div>

        </div>

      </div>

      <div className='py-8 text-center text-sm text-gray-500'>
        © 2026 CARTIFY. All Rights Reserved.
      </div>

    </footer>

  )
}

export default Footer