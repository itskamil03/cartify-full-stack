import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {

    const [visible, setVisible] = useState(false)

    const {
        setShowSearch,
        getCartCount,
        navigate,
        token,
        setToken,
        setCartItems
    } = useContext(ShopContext)

    const logout = () => {

        navigate('/login')

        localStorage.removeItem('token')

        setToken('')

        setCartItems({})
    }

    const navLinkClass = ({ isActive }) =>

        `relative text-[13px] tracking-[2px] uppercase
        font-semibold transition-all duration-300
        ${isActive
            ? 'text-black'
            : 'text-gray-500 hover:text-black'
        }`

    return (

        <>

            {/* FULL WIDTH TOP STRIP */}
            <div className='w-screen bg-black text-white
            fixed top-0 left-0 z-[60]'>

                <p className='text-center text-[11px]
                tracking-[2px] py-2 font-medium'>

                    FREE SHIPPING ON ORDERS OVER ₹999 • NEW COLLECTION LIVE NOW

                </p>

            </div>

            {/* SPACE FOR STRIP */}
            <div className='h-[32px]'></div>

            {/* MAIN NAVBAR */}
            <div className='w-full bg-[#f5f5f7]
            border-b border-gray-200 sticky top-[32px] z-50'>

                <div className='max-w-[1600px]
                mx-auto px-6 lg:px-12'>

                    <div className='flex items-center
                    justify-between h-[90px]'>

                        {/* LEFT SIDE */}
                        <div className='flex items-center gap-16'>

                            {/* LOGO */}
                            <Link
                                to='/'
                                className='leading-none'
                            >

                                <h1 className='text-[42px]
                                font-black tracking-[-3px]
                                text-black'>

                                    CARTIFY

                                    <span className='text-pink-400'>.</span>

                                </h1>

                            </Link>

                            {/* DESKTOP MENU */}
                            <ul className='hidden lg:flex
                            items-center gap-10'>

                                <NavLink to='/' className={navLinkClass}>
                                    HOME
                                </NavLink>

                                <NavLink to='/collection' className={navLinkClass}>
                                    COLLECTION
                                </NavLink>

                                <NavLink to='/about' className={navLinkClass}>
                                    ABOUT
                                </NavLink>

                                <NavLink to='/contact' className={navLinkClass}>
                                    CONTACT
                                </NavLink>

                                <NavLink to='/wishlist' className={navLinkClass}>
                                    WISHLIST
                                </NavLink>

                            </ul>

                        </div>

                        {/* RIGHT SIDE */}
                        <div className='flex items-center gap-6'>

                            {/* SEARCH */}
                            <button
                                onClick={() => {
                                    setShowSearch(true)
                                    navigate('/collection')
                                }}
                                className='group'
                            >

                                <img
                                    src={assets.search_icon}
                                    className='w-[22px]
                                    opacity-70 group-hover:opacity-100
                                    group-hover:scale-110
                                    transition-all duration-300'
                                    alt=""
                                />

                            </button>

                            {/* PROFILE */}
                            <div className='relative group'>

                                <img
                                    onClick={() => token ? null : navigate('/login')}
                                    className='w-[22px]
                                    cursor-pointer opacity-70
                                    hover:opacity-100 hover:scale-110
                                    transition-all duration-300'
                                    src={assets.profile_icon}
                                    alt=""
                                />

                                {/* DROPDOWN */}
                                {token &&
                                    <div className='absolute right-0 top-10 z-50
                                    invisible opacity-0
                                    group-hover:visible
                                    group-hover:opacity-100
                                    transition-all duration-300'>

                                        <div
                                            className='w-[240px]
                                            bg-white rounded-[24px]
                                            border border-gray-100
                                            shadow-[0_20px_60px_rgba(0,0,0,0.12)]
                                            overflow-hidden'
                                        >

                                            {/* TOP */}
                                            <div className='px-6 py-5
                                            border-b border-gray-100'>

                                                <p className='text-[11px]
                                                uppercase tracking-[4px]
                                                text-gray-400 mb-2'>

                                                    Welcome Back

                                                </p>

                                                <h3 className='text-lg
                                                font-bold text-black'>

                                                    CARTIFY USER

                                                </h3>

                                            </div>

                                            {/* MENU */}
                                            <div className='p-3'>

                                                <button
                                                    className='w-full text-left
                                                    px-4 py-3 rounded-2xl
                                                    hover:bg-black hover:text-white
                                                    text-sm font-medium
                                                    transition-all duration-300'
                                                >

                                                    My Profile

                                                </button>

                                                <button
                                                    onClick={() => navigate('/orders')}
                                                    className='w-full text-left
                                                    px-4 py-3 rounded-2xl
                                                    hover:bg-black hover:text-white
                                                    text-sm font-medium
                                                    transition-all duration-300'
                                                >

                                                    Orders

                                                </button>

                                                <button
                                                    onClick={logout}
                                                    className='w-full text-left
                                                    px-4 py-3 rounded-2xl
                                                    hover:bg-red-500 hover:text-white
                                                    text-sm font-medium
                                                    transition-all duration-300'
                                                >

                                                    Logout

                                                </button>

                                            </div>

                                        </div>

                                    </div>
                                }

                            </div>

                            {/* CART */}
                            <Link
                                to='/cart'
                                className='relative group'
                            >

                                <img
                                    src={assets.cart_icon}
                                    className='w-[22px] min-w-[22px]
                                    opacity-70 group-hover:opacity-100
                                    group-hover:scale-110
                                    transition-all duration-300'
                                    alt=""
                                />

                                <p className='absolute -right-2 -bottom-2
                                w-5 h-5 flex items-center justify-center
                                bg-black text-white rounded-full
                                text-[10px] font-semibold'>

                                    {getCartCount()}

                                </p>

                            </Link>

                            {/* MOBILE MENU */}
                            <img
                                onClick={() => setVisible(true)}
                                src={assets.menu_icon}
                                className='w-5 cursor-pointer lg:hidden'
                                alt=""
                            />

                        </div>

                    </div>

                </div>

            </div>

            {/* MOBILE SIDEBAR */}
            <div className={`fixed top-0 right-0 bottom-0
            bg-white z-[100]
            transition-all duration-500
            shadow-2xl overflow-hidden
            ${visible ? 'w-[280px]' : 'w-0'}`}>

                <div className='flex flex-col h-full'>

                    {/* TOP */}
                    <div
                        onClick={() => setVisible(false)}
                        className='flex items-center gap-4
                        p-5 cursor-pointer border-b'
                    >

                        <img
                            className='h-4 rotate-180'
                            src={assets.dropdown_icon}
                            alt=""
                        />

                        <p className='font-medium'>
                            Back
                        </p>

                    </div>

                    {/* LINKS */}
                    <div className='flex flex-col text-[15px]'>

                        {['/', '/collection', '/about', '/contact', '/wishlist']
                            .map((path, index) => {

                                const labels = [
                                    'HOME',
                                    'COLLECTION',
                                    'ABOUT',
                                    'CONTACT',
                                    'WISHLIST'
                                ]

                                return (

                                    <NavLink
                                        key={index}
                                        onClick={() => setVisible(false)}
                                        className='py-4 pl-6 border-b
                                        hover:bg-gray-50 transition'
                                        to={path}
                                    >

                                        {labels[index]}

                                    </NavLink>

                                )

                            })}

                    </div>

                </div>

            </div>

        </>
    )
}

export default Navbar