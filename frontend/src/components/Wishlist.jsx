import React, { useEffect, useState } from 'react'

const Wishlist = () => {

  const [items, setItems] = useState([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlist")) || []
    setItems(stored)
  }, [])

  return (
    <div className="container">
      <h2>My Wishlist ❤️</h2>

      {items.length === 0 ? (
        <p>No items in wishlist</p>
      ) : (
        items.map((item) => (
          <div key={item._id} style={{ marginBottom: "20px" }}>
            <img src={item.image[0]} width="100" />
            <h4>{item.name}</h4>
            <p>₹{item.price}</p>
          </div>
        ))
      )}
    </div>
  )
}

export default Wishlist