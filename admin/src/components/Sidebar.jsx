import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {

    const navItems = [
        {
            path: "/add",
            icon: assets.add_icon,
            label: "Add Items"
        },

        {
            path: "/list",
            icon: assets.order_icon,
            label: "List Items"
        },

        {
            path: "/orders",
            icon: assets.order_icon,
            label: "Orders"
        }
    ]

    return (

        <div className='w-[18%] min-h-screen
        bg-white border-r border-gray-200
        shadow-[4px_0_30px_rgba(0,0,0,0.03)]'>

            {/* SIDEBAR TOP */}
            <div className='px-6 pt-8 pb-4'>

                <p className='text-xs uppercase
                tracking-[4px]
                text-gray-400 font-semibold'>

                    Navigation

                </p>

                <h2 className='text-2xl font-bold
                text-black mt-2'>

                    Dashboard

                </h2>

            </div>

            {/* NAVIGATION */}
            <div className='flex flex-col gap-2 px-4'>

                {navItems.map((item, index) => (

                    <NavLink
                        key={index}
                        to={item.path}
                        className={({ isActive }) =>

                            `group flex items-center gap-4
                            px-4 py-4 rounded-2xl
                            transition-all duration-300
                            border

                            ${isActive
                                ? 'bg-black text-white border-black shadow-lg'
                                : 'bg-white text-gray-700 border-gray-100 hover:bg-black hover:text-white hover:shadow-lg'
                            }`
                        }
                    >

                        {/* ICON */}
                        <div className='w-10 h-10
                        rounded-xl bg-white/10
                        flex items-center justify-center'>

                            <img
                                className='w-5 h-5 object-contain'
                                src={item.icon}
                                alt=""
                            />

                        </div>

                        {/* LABEL */}
                        <p className='hidden md:block
                        font-medium text-[15px]'>

                            {item.label}

                        </p>

                    </NavLink>

                ))}

            </div>

        </div>
    )
}

export default Sidebar