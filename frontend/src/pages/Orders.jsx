import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import axios from 'axios'

const Orders = () => {

  const { backendUrl, token, currency } = useContext(ShopContext)

  const [orderData, setOrderData] = useState([])

  // ================= LOAD ORDERS =================
  const loadOrderData = async () => {
    try {
      if (!token) return

      const response = await axios.post(
        backendUrl + '/api/order/userorders',
        {},
        { headers: { token } }
      )

      if (response.data.success) {

        let allOrdersItem = []

        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {

            allOrdersItem.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
              orderId: order._id,
              returnRequest: order.returnRequest || null
            })

          })
        })

        setOrderData(allOrdersItem.reverse())
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadOrderData()
  }, [token])


  // ================= RETURN FUNCTION =================
  const handleReturn = async (orderId) => {
    try {

      const type = prompt("Enter: return / exchange / refund")
      if (!type) return

      const reason = prompt("Enter reason")
      if (!reason) return

      const response = await axios.post(
        backendUrl + '/api/order/return',
        { orderId, type, reason },
        { headers: { token } }
      )

      if (response.data.success) {
        alert("Request Submitted ✅")
        loadOrderData()
      }

    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className='border-t pt-16'>

      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      {/* EMPTY STATE */}
      {orderData.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No orders yet 🛒
        </p>
      )}

      <div>
        {
          orderData.map((item, index) => (
            <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>

              {/* LEFT SIDE */}
              <div className='flex items-start gap-6 text-sm'>
                <img className='w-16 sm:w-20' src={item.image[0]} alt="" />

                <div>
                  <p className='sm:text-base font-medium'>{item.name}</p>

                  <div className='flex items-center gap-3 mt-1 text-base'>
                    <p>{currency}{item.price}</p>
                    <p>Qty: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>

                  <p className='mt-1'>
                    Date:
                    <span className='text-gray-400 ml-1'>
                      {new Date(item.date).toDateString()}
                    </span>
                  </p>

                  <p className='mt-1'>
                    Payment:
                    <span className='text-gray-400 ml-1'>
                      {item.paymentMethod}
                    </span>
                  </p>

                  {/* RETURN STATUS */}
                  {item.returnRequest?.type && (
                    <p className='mt-1 text-yellow-500 text-sm'>
                      {item.returnRequest.type.toUpperCase()} - {item.returnRequest.status}
                    </p>
                  )}

                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className='md:w-1/2 flex flex-col md:flex-row gap-3 justify-between items-center'>

                {/* ORDER STATUS */}
                <div className='flex items-center gap-2'>
                  <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                  <p>{item.status}</p>
                </div>

                {/* BUTTONS */}
                <div className='flex gap-2'>

                  <button
                    onClick={loadOrderData}
                    className='border px-4 py-2 text-sm rounded'
                  >
                    Track
                  </button>

                  {/* ✅ ALWAYS SHOW BUTTON */}
                  <button
                    onClick={() => handleReturn(item.orderId)}
                    className='bg-red-500 text-white px-4 py-2 text-sm rounded hover:bg-red-600'
                  >
                    Return / Exchange / Refund
                  </button>

                </div>

              </div>

            </div>
          ))
        }
      </div>

    </div>
  )
}

export default Orders