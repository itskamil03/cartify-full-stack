import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '$';
    const delivery_fee = 10;

    // SAFE BACKEND URL
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);

    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);

    const [token, setToken] = useState(localStorage.getItem('token') || '');

    const [buyNowItem, setBuyNowItem] = useState(null);

    const navigate = useNavigate();

    // ================= ADD TO CART =================

    const addToCart = async (itemId, size) => {

        if (!size) {
            toast.error('Select Product Size');
            return;
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {

            cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

        } else {

            cartData[itemId] = { [size]: 1 };

        }

        setCartItems(cartData);

        // BACKEND SAFE CHECK
        if (token && backendUrl) {

            try {

                await axios.post(
                    backendUrl + '/api/cart/add',
                    { itemId, size },
                    { headers: { token } }
                );

            } catch (error) {

                console.log(error);
                toast.error(error.message);

            }

        }
    };

    // ================= CART COUNT =================

    const getCartCount = () => {

        let totalCount = 0;

        for (const items in cartItems) {

            for (const size in cartItems[items]) {

                if (cartItems[items][size] > 0) {

                    totalCount += cartItems[items][size];

                }
            }
        }

        return totalCount;
    };

    // ================= UPDATE QUANTITY =================

    const updateQuantity = async (itemId, size, quantity) => {

        let cartData = structuredClone(cartItems);

        if (!cartData[itemId]) return;

        cartData[itemId][size] = quantity;

        setCartItems(cartData);

        if (token && backendUrl) {

            try {

                await axios.post(
                    backendUrl + '/api/cart/update',
                    { itemId, size, quantity },
                    { headers: { token } }
                );

            } catch (error) {

                console.log(error);
                toast.error(error.message);

            }

        }
    };

    // ================= CART AMOUNT =================

    const getCartAmount = () => {

        let totalAmount = 0;

        for (const items in cartItems) {

            let itemInfo = products.find(
                (product) => product._id === items
            );

            // SAFE CHECK
            if (!itemInfo) continue;

            for (const size in cartItems[items]) {

                if (cartItems[items][size] > 0) {

                    totalAmount += itemInfo.price * cartItems[items][size];

                }
            }
        }

        return totalAmount;
    };

    // ================= GET PRODUCTS =================

    const getProductsData = async () => {

        try {

            // SAFE CHECK
            if (!backendUrl) {
                console.log("Backend URL Missing");
                return;
            }

            const response = await axios.get(
                backendUrl + '/api/product/list'
            );

            if (response.data.success) {

                setProducts(response.data.products.reverse());

            } else {

                toast.error(response.data.message);

            }

        } catch (error) {

            console.log("PRODUCT FETCH ERROR:", error);

            // DON'T CRASH APP
            setProducts([]);

        }
    };

    // ================= GET USER CART =================

    const getUserCart = async (token) => {

        try {

            const response = await axios.post(
                backendUrl + '/api/cart/get',
                {},
                { headers: { token } }
            );

            if (response.data.success) {

                setCartItems(response.data.cartData);

            }

        } catch (error) {

            console.log(error);

        }
    };

    // ================= EFFECTS =================

    useEffect(() => {

        getProductsData();

    }, []);

    useEffect(() => {

        if (token) {

            localStorage.setItem('token', token);

            getUserCart(token);

        }

    }, [token]);

    // ================= CONTEXT VALUE =================

    const value = {

        products,
        currency,
        delivery_fee,

        search,
        setSearch,
        showSearch,
        setShowSearch,

        cartItems,
        addToCart,
        setCartItems,
        getCartCount,
        updateQuantity,
        getCartAmount,

        navigate,
        backendUrl,

        token,
        setToken,

        buyNowItem,
        setBuyNowItem

    };

    return (

        <ShopContext.Provider value={value}>

            {props.children}

        </ShopContext.Provider>

    );
};

export default ShopContextProvider;