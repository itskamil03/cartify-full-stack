import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {

  const policies = [
    {
      image: assets.exchange_icon,
      title: "Easy Exchange Policy",
      description: "Enjoy hassle-free exchanges with a smooth and simple replacement process."
    },

    {
      image: assets.quality_icon,
      title: "7 Days Return Policy",
      description: "Not satisfied? Return your products within 7 days with ease."
    },

    {
      image: assets.support_img,
      title: "24/7 Customer Support",
      description: "Our support team is always available to help you anytime."
    }
  ]

  return (

    <section className='my-20'>

      {/* TOP TITLE */}
      <div className='text-center mb-14'>

        <p className='text-sm uppercase tracking-[5px] text-gray-500 mb-3'>

          Why Choose Us

        </p>

        <h2 className='text-4xl font-bold text-black'>

          Premium Shopping Experience

        </h2>

        <p className='max-w-[650px] mx-auto text-gray-600 mt-5 leading-7'>

          We provide luxury-inspired shopping with fast delivery,
          secure payments and exceptional customer support.

        </p>

      </div>

      {/* POLICY CARDS */}
      <div className='grid
      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-3
      gap-8'>

        {policies.map((item, index) => (

          <div
            key={index}
            className='bg-white rounded-[32px] p-10 text-center
            hover:shadow-2xl transition-all duration-500
            border border-gray-100 group'
          >

            {/* ICON */}
            <div className='w-20 h-20 rounded-full bg-[#f5f5f5]
            flex items-center justify-center mx-auto
            group-hover:scale-110 transition duration-500'>

              <img
                src={item.image}
                className='w-10'
                alt=""
              />

            </div>

            {/* TITLE */}
            <h3 className='text-xl font-semibold mt-8 text-black'>

              {item.title}

            </h3>

            {/* DESCRIPTION */}
            <p className='text-gray-500 leading-7 mt-4 text-sm'>

              {item.description}

            </p>

          </div>

        ))}

      </div>

    </section>
  )
}

export default OurPolicy