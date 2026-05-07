import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Orders = ({ token }) => {

  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {

    if (!token) {
      return null
    }

    try {

      const response = await axios.post(
        backendUrl + '/api/order/list',
        {},
        { headers: { token } }
      )

      if (response.data.success) {

        setOrders(response.data.orders.reverse())

      } else {

        toast.error(response.data.message)

      }

    } catch (error) {

      toast.error(error.message)

    }

  }

  const statusHandler = async (event, orderId) => {

    try {

      const response = await axios.post(
        backendUrl + '/api/order/status',
        {
          orderId,
          status: event.target.value
        },
        {
          headers: { token }
        }
      )

      if (response.data.success) {

        await fetchAllOrders()

      }

    } catch (error) {

      console.log(error)
      toast.error(error.message)

    }

  }

  useEffect(() => {

    fetchAllOrders()

  }, [token])

  return (

    <div className='p-5 md:p-7 bg-[#f6f7fb] min-h-screen'>

      {/* HEADER */}
      <div className='mb-7'>

        <p className='text-[11px]
        tracking-[3px]
        uppercase text-gray-400 font-medium'>

          Cartify Admin

        </p>

        <h1 className='text-2xl font-bold text-black mt-1'>

          Orders Management

        </h1>

      </div>

      {/* ORDERS */}
      <div className='flex flex-col gap-4'>

        {orders.map((order, index) => (

          <div
            key={index}
            className='bg-white rounded-[24px]
            border border-gray-100
            shadow-[0_6px_30px_rgba(0,0,0,0.04)]
            hover:shadow-[0_10px_35px_rgba(0,0,0,0.06)]
            transition-all duration-300
            p-5'
          >

            <div className='grid
            grid-cols-1
            lg:grid-cols-[0.4fr_2fr_1fr_0.7fr_1fr]
            gap-5 items-start'>

              {/* ICON */}
              <div className='flex justify-center lg:justify-start'>

                <div className='w-12 h-12
                rounded-xl bg-[#f6f7fb]
                flex items-center justify-center'>

                  <img
                    className='w-7'
                    src={assets.parcel_icon}
                    alt=""
                  />

                </div>

              </div>

              {/* ORDER INFO */}
              <div>

                {/* ITEMS */}
                <div className='space-y-1'>

                  {order.items.map((item, index) => (

                    <p
                      key={index}
                      className='text-sm
                      text-gray-700 font-medium'
                    >

                      {item.name}

                      <span className='text-gray-400 mx-1'>
                        x
                      </span>

                      {item.quantity}

                      <span className='ml-2
                      text-[10px] bg-black text-white
                      px-2 py-1 rounded-full'>

                        {item.size}

                      </span>

                    </p>

                  ))}

                </div>

                {/* CUSTOMER */}
                <div className='mt-4'>

                  <p className='text-base font-semibold text-black'>

                    {order.address.firstName} {order.address.lastName}

                  </p>

                  <div className='mt-1 text-sm text-gray-500 leading-6'>

                    <p>{order.address.street}</p>

                    <p>

                      {order.address.city},
                      {' '}
                      {order.address.state},
                      {' '}
                      {order.address.country},
                      {' '}
                      {order.address.zipcode}

                    </p>

                    <p className='font-medium text-black mt-1'>

                      {order.address.phone}

                    </p>

                  </div>

                </div>

              </div>

              {/* PAYMENT */}
              <div className='space-y-3 text-sm'>

                <div>

                  <p className='text-gray-400 text-xs'>

                    Total Items

                  </p>

                  <h3 className='text-lg font-bold text-black'>

                    {order.items.length}

                  </h3>

                </div>

                <div>

                  <p className='text-gray-400 text-xs'>

                    Payment Method

                  </p>

                  <h3 className='font-semibold text-black text-sm'>

                    {order.paymentMethod}

                  </h3>

                </div>

                <div>

                  <p className='text-gray-400 text-xs'>

                    Payment Status

                  </p>

                  <span className={`inline-block mt-1
                  px-3 py-1 rounded-full text-[11px] font-semibold

                  ${order.payment
                      ? 'bg-green-100 text-green-700'
                      : 'bg-orange-100 text-orange-700'
                    }`}>

                    {order.payment ? 'Paid' : 'Pending'}

                  </span>

                </div>

                <div>

                  <p className='text-gray-400 text-xs'>

                    Order Date

                  </p>

                  <p className='font-medium text-black text-sm'>

                    {new Date(order.date).toLocaleDateString()}

                  </p>

                </div>

              </div>

              {/* AMOUNT */}
              <div>

                <p className='text-gray-400 text-xs'>

                  Total Amount

                </p>

                <h2 className='text-2xl font-bold text-black mt-1'>

                  {currency}{order.amount}

                </h2>

              </div>

              {/* STATUS */}
              <div>

                <p className='text-gray-400 text-xs mb-2'>

                  Order Status

                </p>

                <select
                  onChange={(event) =>
                    statusHandler(event, order._id)
                  }
                  value={order.status}
                  className='w-full bg-[#f6f7fb]
                  border border-gray-200
                  rounded-xl px-3 py-2.5
                  text-sm font-medium text-gray-700
                  outline-none focus:border-black
                  transition-all duration-300'
                >

                  <option value="Order Placed">
                    Order Placed
                  </option>

                  <option value="Packing">
                    Packing
                  </option>

                  <option value="Shipped">
                    Shipped
                  </option>

                  <option value="Out for delivery">
                    Out for delivery
                  </option>

                  <option value="Delivered">
                    Delivered
                  </option>

                </select>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  )
}

export default Orders