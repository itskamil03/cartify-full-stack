import React, { useEffect, useState } from "react";
import {
  Shirt,
  ShoppingBag,
  Sparkles,
  Flame
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const Sidebar = () => {

  const navigate = useNavigate();

  const categories = [
    {
      name: "Men",
      icon: <Shirt size={18} />,
      count: "120+",
      path: "/collection?category=Men"
    },

    {
      name: "Women",
      icon: <Sparkles size={18} />,
      count: "240+",
      path: "/collection?category=Women"
    },

    {
      name: "Kids",
      icon: <ShoppingBag size={18} />,
      count: "80+",
      path: "/collection?category=Kids"
    },

    {
      name: "New Arrivals",
      icon: <Flame size={18} />,
      count: "NEW",
      path: "/collection"
    },
  ];

  // ONLY 2 BANNERS NOW
  const banners = [
    "50% OFF",
    "NEW DROP"
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {

    const interval = setInterval(() => {

      setCurrent((prev) =>
        prev === banners.length - 1 ? 0 : prev + 1
      );

    }, 2500);

    return () => clearInterval(interval);

  }, []);

  return (

    <div className="hidden lg:block w-[250px] mt-3">

      <div className="sticky top-3">

        {/* MAIN SIDEBAR */}
        <div className="bg-[#111111] rounded-[30px] p-5 text-white">

          {/* LOGO */}
          <div className="mb-8">

            <p className="text-xs uppercase tracking-[4px] text-gray-400">

              Fashion Store

            </p>

            <h2 className="text-3xl font-bold mt-2">

              CARTIFY.

            </h2>

          </div>

          {/* MENU */}
          <div className="flex flex-col gap-3">

            {categories.map((item, index) => (

              <button
                key={index}
                onClick={() => navigate(item.path)}
                className="group flex items-center justify-between
                bg-white/5 hover:bg-white text-white
                hover:text-black transition-all duration-300
                px-4 py-4 rounded-2xl"
              >

                {/* LEFT */}
                <div className="flex items-center gap-4">

                  <div className="group-hover:scale-110 transition">

                    {item.icon}

                  </div>

                  <p className="font-medium text-sm">

                    {item.name}

                  </p>

                </div>

                {/* COUNT */}
                <span className="text-xs bg-white/10 group-hover:bg-black
                group-hover:text-white px-2 py-1 rounded-full transition">

                  {item.count}

                </span>

              </button>

            ))}

          </div>

          {/* MINI OFFER */}
          <div className="mt-8 bg-gradient-to-br from-pink-500 to-orange-400
          rounded-[24px] p-5 text-black">

            <p className="text-xs uppercase tracking-[3px] font-semibold">

              Exclusive

            </p>

            <h3 className="text-3xl font-bold mt-3 leading-tight">

              {banners[current]}

            </h3>

            <button
              onClick={() => navigate('/collection')}
              className="mt-5 bg-black text-white px-5 py-2
              rounded-full text-sm hover:scale-105 transition"
            >

              Shop Now

            </button>

          </div>

        </div>

      </div>

    </div>

  );
};

export default Sidebar;