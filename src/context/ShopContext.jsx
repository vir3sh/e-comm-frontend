import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const [product, setProduct] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const delivery_fee = 100;
  const getProducts = async () => {
    try {
      // console.log("Request URL:", `${backendUrl}/api/products/list`);

      const response = await axios.get(`${backendUrl}/api/products/list`);
      setProduct(response.data.products);
    } catch (error) {
      console.log("API ERROR:", error);
    }
  };

  const getUserCart = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/get`,
        {},
        {
          withCredentials: true,
        },
      );

      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please add size");
      return;
    }

    const cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
    toast.success("Product added");

    try {
      await axios.post(
        backendUrl + "/api/cart/add",
        { itemId, size },
        { withCredentials: true },
      );
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const checkAuth = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/user/me`, {
        withCredentials: true,
      });

      if (response.data.success) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      setIsLoggedIn(false);
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;

    setCartItems(cartData);

    try {
      await axios.post(
        backendUrl + "/api/cart/update",
        { itemId, size, quantity },
        { withCredentials: true },
      );
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;

    for (const items in cartItems) {
      const itemInfo = product.find((product) => product._id === items);

      if (!itemInfo) {
        console.log("Product not found:", items);
        continue;
      }

      for (const item in cartItems[items]) {
        const quantity = cartItems[items][item];

        if (quantity > 0) {
          totalAmount += itemInfo.price * quantity;
        }
      }
    }

    return totalAmount;
  };

  const removeFromCart = async (itemId, size) => {
    const cartData = structuredClone(cartItems);

    delete cartData[itemId][size];

    if (Object.keys(cartData[itemId]).length === 0) {
      delete cartData[itemId];
    }

    setCartItems(cartData);
    toast.success("Product Removed");

    try {
      await axios.post(
        backendUrl + "/api/cart/remove",
        { itemId, size },
        { withCredentials: true },
      );
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getUserCart();
    // addToCart();
    getProducts();
    checkAuth();
    getCartCount();
  }, []);

  const currency = "₹";
  const value = {
    product,
    currency,
    cartItems,
    setCartItems,
    addToCart,
    getProducts,
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    getCartCount,
    updateQuantity,
    removeFromCart,
    getCartAmount,
    delivery_fee,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
