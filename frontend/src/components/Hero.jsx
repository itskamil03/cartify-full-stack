import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const slides = [
    {
        image: "https://images.unsplash.com/photo-1503342394128-c104d54dba01?q=80&w=1800&auto=format&fit=crop",
        tag: "SUMMER",
        title: "Swimwear Collection",
        subtitle: "Minimal, bold and made for sunny escapes."
    },

    {
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1800&auto=format&fit=crop",
        tag: "TRENDING",
        title: "Women Collection",
        subtitle: "Elegant looks designed for everyday confidence."
    },

    {
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1800&auto=format&fit=crop",
        tag: "LATEST",
        title: "Street Style",
        subtitle: "Urban outfits inspired by global fashion trends."
    },

    {
        image: "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1800&auto=format&fit=crop",
        tag: "FORMAL",
        title: "Office Wear",
        subtitle: "Premium fashion crafted for modern professionals."
    }
]

const Hero = () => {

    const [current, setCurrent] = useState(0)

    const navigate = useNavigate()

    useEffect(() => {

        const interval = setInterval(() => {

            setCurrent((prev) => (prev + 1) % slides.length)

        }, 4000)

        return () => clearInterval(interval)

    }, [])

    return (

        <section className="w-full mt-3">

            <div className="w-full">

                {/* HERO SLIDER */}
                <div className="relative h-[380px] lg:h-[520px] overflow-hidden rounded-[32px]
                bg-black shadow-[0_20px_60px_rgba(0,0,0,0.12)]">

                    {slides.map((slide, index) => (

                        <div
                            key={index}
                            className={`absolute inset-0 transition-all duration-1000
                            ${index === current
                                    ? "opacity-100 scale-100 z-20"
                                    : "opacity-0 scale-105 z-10"
                                }`}
                        >

                            {/* IMAGE */}
                            <img
                                src={slide.image}
                                alt=""
                                className="w-full h-full object-cover"
                            />

                            {/* DARK OVERLAY */}
                            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-black/10"></div>

                            {/* CONTENT */}
                            <div className="absolute inset-0 flex items-center">

                                <div className="w-full px-8 md:px-14 lg:px-20">

                                    <div className="max-w-[680px] text-white">

                                        {/* TOP LABEL */}
                                        <div className="flex items-center gap-4 mb-5">

                                            <div className="w-14 h-[2px] bg-white"></div>

                                            <p className="tracking-[5px] uppercase text-xs sm:text-sm font-medium text-gray-200">

                                                {slide.tag}

                                            </p>

                                        </div>

                                        {/* TITLE */}
                                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6">

                                            {slide.title}

                                        </h1>

                                        {/* SUBTITLE */}
                                        <p className="text-gray-200 text-sm md:text-base lg:text-lg leading-8 max-w-[560px] mb-8">

                                            {slide.subtitle}

                                        </p>

                                        {/* BUTTONS */}
                                        <div className="flex flex-wrap gap-4">

                                            <button
                                                onClick={() => navigate('/collection')}
                                                className="px-8 py-3.5 bg-white text-black rounded-full font-semibold
                                                hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg"
                                            >

                                                Shop Now

                                            </button>

                                            <button
                                                onClick={() => navigate('/collection')}
                                                className="px-8 py-3.5 border border-white/40 text-white rounded-full font-semibold
                                                hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-md"
                                            >

                                                Explore Collection

                                            </button>

                                        </div>

                                        {/* STATS */}
                                        <div className="flex flex-wrap gap-10 mt-12">

                                            <div>

                                                <h2 className="text-3xl font-bold">
                                                    10K+
                                                </h2>

                                                <p className="text-gray-300 text-sm mt-1">
                                                    Happy Customers
                                                </p>

                                            </div>

                                            <div>

                                                <h2 className="text-3xl font-bold">
                                                    500+
                                                </h2>

                                                <p className="text-gray-300 text-sm mt-1">
                                                    Premium Products
                                                </p>

                                            </div>

                                            <div>

                                                <h2 className="text-3xl font-bold">
                                                    4.9★
                                                </h2>

                                                <p className="text-gray-300 text-sm mt-1">
                                                    Customer Rating
                                                </p>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                            {/* FLOATING GLASS CARD */}
                            <div className="hidden lg:flex absolute bottom-8 right-8
                            bg-white/10 backdrop-blur-xl border border-white/20
                            rounded-[28px] p-6 shadow-2xl">

                                <div className="text-white">

                                    <p className="text-xs tracking-[5px] uppercase text-gray-200">

                                        Trending Now

                                    </p>

                                    <h3 className="text-2xl font-semibold mt-3">

                                        New Season Drop

                                    </h3>

                                    <p className="text-gray-300 text-sm mt-3 leading-6 max-w-[220px]">

                                        Exclusive styles available now for modern fashion lovers.

                                    </p>

                                </div>

                            </div>

                        </div>

                    ))}

                    {/* SLIDER DOTS */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-30">

                        {slides.map((_, index) => (

                            <button
                                key={index}
                                onClick={() => setCurrent(index)}
                                className={`transition-all duration-300 rounded-full
                                ${index === current
                                        ? 'w-10 h-3 bg-white'
                                        : 'w-3 h-3 bg-white/50 hover:bg-white'
                                    }`}
                            ></button>

                        ))}

                    </div>

                </div>

            </div>

        </section>
    )
}

export default Hero