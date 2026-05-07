import React, { useEffect, useState } from 'react'
import { Heart, ShoppingBag, Trash2 } from 'lucide-react'

const Wishlist = () => {

  const [items, setItems] = useState([])

  useEffect(() => {

    const data = JSON.parse(localStorage.getItem("wishlist")) || []

    setItems(data)

  }, [])

  // REMOVE ITEM
  const removeItem = (id) => {

    const updated = items.filter((item) => item._id !== id)

    setItems(updated)

    localStorage.setItem("wishlist", JSON.stringify(updated))
  }

  return (

    <div className='w-full px-6 sm:px-10 lg:px-16 py-10'>

      {/* TITLE */}
      <div className='flex items-center gap-3 mb-10'>

        <Heart
          size={28}
          className='fill-pink-500 text-pink-500'
        />

        <h2 className='text-3xl sm:text-4xl
        font-bold tracking-tight text-black'>

          My Wishlist

        </h2>

      </div>

      {/* EMPTY */}
      {items.length === 0 ? (

        <div className='flex flex-col items-center
        justify-center py-24 text-center'>

          <div className='w-24 h-24 rounded-full
          bg-pink-50 flex items-center justify-center mb-6'>

            <Heart
              size={42}
              className='text-pink-400'
            />

          </div>

          <h3 className='text-2xl font-semibold text-gray-800'>

            Your wishlist is empty

          </h3>

          <p className='text-gray-500 mt-3 max-w-[400px]'>

            Save your favorite fashion products here and shop later.

          </p>

        </div>

      ) : (

        <div className='grid
        grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
        gap-6'>

          {items.map((item) => (

            <div
              key={item._id}
              className='group bg-white rounded-[28px]
              overflow-hidden border border-gray-100
              hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]
              transition-all duration-500'
            >

              {/* IMAGE */}
              <div className='relative overflow-hidden'>

                <img
                  src={item.image[0]}
                  alt=""
                  className='w-full h-[280px] object-cover
                  group-hover:scale-105 transition duration-700'
                />

                {/* REMOVE BUTTON */}
                <button
                  onClick={() => removeItem(item._id)}
                  className='absolute top-4 right-4
                  w-10 h-10 rounded-full
                  bg-white/90 backdrop-blur-md
                  flex items-center justify-center
                  shadow-lg hover:bg-red-500
                  hover:text-white transition-all duration-300'
                >

                  <Trash2 size={18} />

                </button>

              </div>

              {/* CONTENT */}
              <div className='p-5'>

                <h3 className='font-semibold text-[17px]
                text-gray-900 line-clamp-1'>

                  {item.name}

                </h3>

                <p className='text-2xl font-bold
                text-black mt-3'>

                  ₹{item.price}

                </p>

                {/* BUTTONS */}
                <div className='flex gap-3 mt-5'>

                  <button
                    className='flex-1 bg-black text-white
                    py-3 rounded-full text-sm font-medium
                    hover:bg-gray-900 transition'
                  >

                    Buy Now

                  </button>

                  <button
                    className='w-12 h-12 rounded-full
                    border border-gray-200
                    flex items-center justify-center
                    hover:bg-black hover:text-white
                    transition-all duration-300'
                  >

                    <ShoppingBag size={18} />

                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  )
}

export default Wishlist