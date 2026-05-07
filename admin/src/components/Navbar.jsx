import React from 'react'

const Navbar = ({ setToken }) => {
  return (

    <div className='sticky top-0 z-50
    flex items-center justify-between
    px-5 sm:px-8 lg:px-12
    py-3
    bg-white/90 backdrop-blur-xl
    border-b border-gray-200
    shadow-[0_4px_20px_rgba(0,0,0,0.03)]'>

      {/* LEFT */}
      <div className='flex items-center gap-3'>

        {/* LOGO */}
        <div className='leading-none select-none'>

          <h1 className='text-[34px] sm:text-[40px]
          font-black tracking-[-3px]
          text-black leading-none'>

            CARTIFY

            <span className='text-pink-400'>.</span>

          </h1>

          <p className='text-[10px] sm:text-[11px]
          font-semibold tracking-[3px]
          text-pink-400 uppercase mt-0.5'>

            Admin Panel

          </p>

        </div>

      </div>

      {/* RIGHT */}
      <div className='flex items-center gap-4'>

        {/* STATUS */}
        <div className='hidden md:flex items-center gap-2
        bg-green-50 border border-green-100
        px-3 py-1.5 rounded-full'>

          <div className='w-2 h-2 rounded-full bg-green-500'></div>

          <p className='text-xs font-medium text-green-700'>

            Admin Active

          </p>

        </div>

        {/* LOGOUT BUTTON */}
        <button
          onClick={() => setToken('')}
          className='bg-black hover:bg-gray-900
          text-white px-5 py-2
          rounded-xl
          text-xs sm:text-sm font-semibold
          shadow-md hover:shadow-lg
          hover:scale-105
          transition-all duration-300'
        >

          Logout

        </button>

      </div>

    </div>

  )
}

export default Navbar