import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const List = ({ token }) => {

  const [list, setList] = useState([])

  const fetchList = async () => {

    try {

      const response = await axios.get(
        backendUrl + '/api/product/list'
      )

      if (response.data.success) {

        setList(response.data.products.reverse())

      } else {

        toast.error(response.data.message)

      }

    } catch (error) {

      console.log(error)
      toast.error(error.message)

    }

  }

  const removeProduct = async (id) => {

    try {

      const response = await axios.post(
        backendUrl + '/api/product/remove',
        { id },
        { headers: { token } }
      )

      if (response.data.success) {

        toast.success(response.data.message)

        await fetchList()

      } else {

        toast.error(response.data.message)

      }

    } catch (error) {

      console.log(error)
      toast.error(error.message)

    }

  }

  useEffect(() => {

    fetchList()

  }, [])

  return (

    <div className='p-4 md:p-5 bg-[#f6f7fb]
    h-[calc(100vh-70px)] overflow-y-auto'>

      {/* HEADER */}
      <div className='mb-4'>

        <p className='text-[11px]
        tracking-[3px]
        uppercase text-gray-400 font-medium'>

          Cartify Admin

        </p>

        <h1 className='text-xl font-bold text-black mt-1'>

          Product Inventory

        </h1>

      </div>

      {/* TABLE */}
      <div className='bg-white rounded-[24px]
      border border-gray-100
      shadow-[0_6px_30px_rgba(0,0,0,0.04)]
      overflow-hidden'>

        {/* TABLE HEADER */}
        <div className='hidden md:grid
        grid-cols-[0.7fr_2.5fr_1fr_1fr_0.7fr]
        items-center
        px-5 py-4
        border-b border-gray-100
        text-xs uppercase tracking-[2px]
        text-gray-400 font-semibold'>

          <p>Image</p>
          <p>Name</p>
          <p>Category</p>
          <p>Price</p>
          <p className='text-center'>Remove</p>

        </div>

        {/* PRODUCT LIST */}
        <div className='flex flex-col'>

          {list.map((item, index) => (

            <div
              key={index}
              className='grid
              grid-cols-[0.7fr_2fr_1fr]
              md:grid-cols-[0.7fr_2.5fr_1fr_1fr_0.7fr]
              items-center gap-3
              px-4 md:px-5 py-4
              border-b border-gray-100
              hover:bg-[#fafafa]
              transition-all duration-300'
            >

              {/* IMAGE */}
              <div>

                <div className='w-14 h-14
                rounded-xl overflow-hidden
                border border-gray-100 bg-[#f6f7fb]'>

                  <img
                    className='w-full h-full object-cover'
                    src={item.image[0]}
                    alt=""
                  />

                </div>

              </div>

              {/* NAME */}
              <div>

                <p className='text-sm font-semibold text-black'>

                  {item.name}

                </p>

                <p className='text-xs text-gray-400 mt-1 md:hidden'>

                  {item.category}

                </p>

              </div>

              {/* CATEGORY */}
              <p className='hidden md:block
              text-sm text-gray-600 font-medium'>

                {item.category}

              </p>

              {/* PRICE */}
              <p className='text-sm font-semibold text-black'>

                {currency}{item.price}

              </p>

              {/* REMOVE */}
              <div className='flex justify-center'>

                <button
                  onClick={() => removeProduct(item._id)}
                  className='w-8 h-8 rounded-full
                  bg-red-50 hover:bg-red-500
                  text-red-500 hover:text-white
                  text-sm font-bold
                  transition-all duration-300'
                >

                  ✕

                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  )
}

export default List