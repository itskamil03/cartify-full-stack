import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const BestSeller = () => {

    const { products } = useContext(ShopContext)

    const [bestSeller, setBestSeller] = useState([])

    useEffect(() => {

        const bestProduct = products.filter((item) => item.bestseller)

        setBestSeller(bestProduct.slice(0, 5))

    }, [products])

    return (

        <div className='my-16'>

            {/* TOP SECTION */}
            <div className='text-center mb-12'>

                {/* SMALL LABEL */}
                <p className='text-sm uppercase tracking-[5px] text-gray-500 mb-3'>

                    Trending Products

                </p>

                {/* TITLE */}
                <div className='text-3xl md:text-4xl font-bold'>

                    <Title text1={'BEST'} text2={'SELLERS'} />

                </div>

                {/* SUBTITLE */}
                <p className='max-w-[700px] mx-auto mt-5
                text-sm sm:text-base text-gray-600 leading-7'>

                    Discover our most loved fashion picks curated for modern lifestyles.
                    Premium quality, trending designs and timeless elegance — all in one place.

                </p>

            </div>

            {/* PRODUCT GRID */}
            <div className='grid
            grid-cols-2
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            gap-6'>

                {
                    bestSeller.map((item, index) => (

                        <ProductItem
                            key={index}
                            id={item._id}
                            name={item.name}
                            image={item.image}
                            price={item.price}
                        />

                    ))
                }

            </div>

            {/* OFFER BANNER */}
            <div className='mt-16 bg-black rounded-[32px] overflow-hidden'>

                <div className='flex flex-col lg:flex-row items-center justify-between
                px-8 lg:px-16 py-10 gap-8'>

                    {/* LEFT */}
                    <div className='text-white'>

                        <p className='text-sm uppercase tracking-[4px] text-gray-300 mb-3'>

                            Exclusive Offer

                        </p>

                        <h2 className='text-3xl md:text-5xl font-bold leading-tight'>

                            Get 30% OFF
                            <br />
                            On Premium Fashion

                        </h2>

                        <p className='text-gray-300 mt-5 max-w-[500px] leading-7'>

                            Upgrade your wardrobe with exclusive designer collections
                            crafted for modern style lovers.

                        </p>

                    </div>

                    {/* RIGHT BUTTON */}
                    <button className='bg-white text-black px-8 py-4 rounded-full
                    font-semibold hover:scale-105 transition-all duration-300'>

                        Shop Collection

                    </button>

                </div>

            </div>

        </div>
    )
}

export default BestSeller