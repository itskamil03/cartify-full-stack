import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({ token }) => {

  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("Men")
  const [subCategory, setSubCategory] = useState("Topwear")
  const [bestseller, setBestseller] = useState(false)
  const [sizes, setSizes] = useState([])

  const onSubmitHandler = async (e) => {

    e.preventDefault()

    try {

      const formData = new FormData()

      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("bestseller", bestseller)
      formData.append("sizes", JSON.stringify(sizes))

      image1 && formData.append("image1", image1)
      image2 && formData.append("image2", image2)
      image3 && formData.append("image3", image3)
      image4 && formData.append("image4", image4)

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      )

      if (response.data.success) {

        toast.success(response.data.message)

        setName('')
        setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice('')
        setSizes([])

      } else {

        toast.error(response.data.message)

      }

    } catch (error) {

      console.log(error)
      toast.error(error.message)

    }

  }

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

          Add New Product

        </h1>

      </div>

      {/* FORM */}
      <form
        onSubmit={onSubmitHandler}
        className='bg-white rounded-[24px]
        border border-gray-100
        shadow-[0_6px_30px_rgba(0,0,0,0.04)]
        p-4
        grid lg:grid-cols-2
        gap-x-10 gap-y-4'
      >

        {/* IMAGES */}
        <div>

          <p className='text-sm font-semibold text-black mb-3'>

            Upload Images

          </p>

          <div className='flex flex-wrap gap-3'>

            {[image1, image2, image3, image4].map((image, index) => (

              <label
                key={index}
                htmlFor={`image${index + 1}`}
                className='cursor-pointer'
              >

                <div className='w-20 h-20 rounded-2xl
                overflow-hidden border border-gray-200
                bg-[#f6f7fb] hover:border-black
                transition-all duration-300'>

                  <img
                    className='w-full h-full object-cover'
                    src={
                      !image
                        ? assets.upload_area
                        : URL.createObjectURL(image)
                    }
                    alt=""
                  />

                </div>

                <input
                  hidden
                  type="file"
                  id={`image${index + 1}`}
                  onChange={(e) => {

                    const file = e.target.files[0]

                    if (index === 0) setImage1(file)
                    if (index === 1) setImage2(file)
                    if (index === 2) setImage3(file)
                    if (index === 3) setImage4(file)

                  }}
                />

              </label>

            ))}

          </div>

        </div>

        {/* PRODUCT NAME */}
        <div>

          <p className='text-sm font-semibold text-black mb-2'>

            Product Name

          </p>

          <input
            type="text"
            required
            placeholder='Enter product name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='w-full
            rounded-xl border border-gray-200
            bg-[#f9fafb]
            px-3 py-2.5 text-sm
            outline-none focus:border-black
            transition-all duration-300'
          />

        </div>

        {/* DESCRIPTION */}
        <div className='lg:col-span-2'>

          <p className='text-sm font-semibold text-black mb-2'>

            Product Description

          </p>

          <textarea
            required
            rows={3}
            placeholder='Write product description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='w-full
            rounded-xl border border-gray-200
            bg-[#f9fafb]
            px-3 py-2.5 text-sm
            outline-none focus:border-black
            transition-all duration-300 resize-none'
          />

        </div>

        {/* CATEGORY */}
        <div className='flex flex-wrap gap-4'>

          {/* CATEGORY */}
          <div>

            <p className='text-sm font-semibold text-black mb-2'>

              Category

            </p>

            <select
              onChange={(e) => setCategory(e.target.value)}
              className='rounded-xl border border-gray-200
              bg-[#f9fafb]
              px-3 py-2.5 text-sm outline-none
              focus:border-black transition-all duration-300'
            >

              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>

            </select>

          </div>

          {/* SUBCATEGORY */}
          <div>

            <p className='text-sm font-semibold text-black mb-2'>

              Sub Category

            </p>

            <select
              onChange={(e) => setSubCategory(e.target.value)}
              className='rounded-xl border border-gray-200
              bg-[#f9fafb]
              px-3 py-2.5 text-sm outline-none
              focus:border-black transition-all duration-300'
            >

              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>

            </select>

          </div>

          {/* PRICE */}
          <div>

            <p className='text-sm font-semibold text-black mb-2'>

              Product Price

            </p>

            <input
              type="number"
              placeholder='₹999'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className='w-[130px]
              rounded-xl border border-gray-200
              bg-[#f9fafb]
              px-3 py-2.5 text-sm outline-none
              focus:border-black transition-all duration-300'
            />

          </div>

        </div>

        {/* SIZES */}
        <div>

          <p className='text-sm font-semibold text-black mb-2'>

            Product Sizes

          </p>

          <div className='flex flex-wrap gap-2'>

            {["S", "M", "L", "XL", "XXL"].map((item, index) => (

              <button
                type="button"
                key={index}
                onClick={() =>
                  setSizes(prev =>
                    prev.includes(item)
                      ? prev.filter(size => size !== item)
                      : [...prev, item]
                  )
                }
                className={`px-4 py-1.5 rounded-xl
                text-sm font-medium transition-all duration-300

                ${sizes.includes(item)
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >

                {item}

              </button>

            ))}

          </div>

        </div>

        {/* BESTSELLER */}
        <div className='flex items-center gap-3'>

          <input
            type="checkbox"
            id='bestseller'
            checked={bestseller}
            onChange={() => setBestseller(prev => !prev)}
            className='w-4 h-4 accent-black'
          />

          <label
            htmlFor="bestseller"
            className='text-sm font-medium text-gray-700 cursor-pointer'
          >

            Add to Bestseller

          </label>

        </div>

        {/* BUTTON */}
        <div className='lg:col-span-2 pt-1'>

          <button
            type="submit"
            className='w-fit bg-black hover:bg-gray-900
            text-white text-sm font-semibold
            px-7 py-2.5 rounded-2xl
            shadow-lg hover:shadow-xl
            hover:scale-[1.02]
            transition-all duration-300'
          >

            Add Product

          </button>

        </div>

      </form>

    </div>

  )
}

export default Add