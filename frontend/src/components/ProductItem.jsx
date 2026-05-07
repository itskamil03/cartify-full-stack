import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, image, name, price }) => {

  const { currency } = useContext(ShopContext)

  const [liked, setLiked] = useState(false)

  // CHECK IF PRODUCT ALREADY IN WISHLIST
  useEffect(() => {

    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || []

    const exists = wishlist.find(item => item._id === id)

    if (exists) setLiked(true)

  }, [id])

  // TOGGLE WISHLIST
  const toggleWishlist = (e) => {

    e.preventDefault()

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || []

    const exists = wishlist.find(item => item._id === id)

    if (exists) {

      wishlist = wishlist.filter(item => item._id !== id)

      setLiked(false)

    } else {

      wishlist.push({
        _id: id,
        name,
        price,
        image: image || []
      })

      setLiked(true)
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist))
  }

  return (

    <Link
      onClick={() => window.scrollTo(0, 0)}
      className='group block'
      to={`/product/${id}`}
    >

      {/* PRODUCT CARD */}
      <div className='relative bg-white rounded-3xl overflow-hidden
      hover:shadow-2xl transition-all duration-500'>

        {/* DISCOUNT BADGE */}
        <div className='absolute top-4 left-4 z-20 bg-black text-white
        text-[11px] px-3 py-1 rounded-full tracking-wide'>

          SALE

        </div>

        {/* WISHLIST BUTTON */}
        <button
          onClick={toggleWishlist}
          className='absolute top-4 right-4 z-20 w-10 h-10 rounded-full
          bg-white/90 backdrop-blur-md flex items-center justify-center
          shadow-lg hover:scale-110 transition duration-300 text-lg'
        >

          {liked ? "❤️" : "🤍"}

        </button>

        {/* PRODUCT IMAGE */}
        <div className='overflow-hidden bg-[#f8f8f8]'>

          <img
            className='w-full h-[320px] object-cover
            group-hover:scale-110 transition-all duration-700'
            src={image && image.length > 0 ? image[0] : ''}
            alt={name}
          />

        </div>

        {/* PRODUCT DETAILS */}
        <div className='p-5'>

          {/* PRODUCT NAME */}
          <p className='text-[15px] font-medium text-gray-800
          line-clamp-1 group-hover:text-black transition'>

            {name}

          </p>

          {/* RATING */}
          <div className='flex items-center gap-1 mt-2 text-yellow-500 text-sm'>

            ★★★★★

            <span className='text-gray-500 text-xs ml-1'>
              (4.9)
            </span>

          </div>

          {/* PRICE SECTION */}
          <div className='flex items-center gap-3 mt-3'>

            <p className='text-lg font-bold text-black'>

              {currency}{price}

            </p>

            <p className='text-sm text-gray-400 line-through'>

              {currency}{Math.floor(price + 500)}

            </p>

          </div>

          {/* BUTTON */}
          <button
            className='w-full mt-5 bg-black text-white py-3 rounded-full
            text-sm font-medium hover:bg-gray-900
            transition-all duration-300'
          >

            Add To Cart

          </button>

        </div>

      </div>

    </Link>

  )
}

export default ProductItem