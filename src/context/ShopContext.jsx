import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const [product, setProduct] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const delivery_fee = 100;

  // ---------------------------------------
  // GET PRODUCTS
  // ---------------------------------------

  const getProducts = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/products/list`);

      if (response.data.success) {
        setProduct(response.data.products);
      } else {
        toast.error(response.data.message || "Failed to get products");
      }
    } catch (error) {
      console.log("PRODUCT API ERROR:", error);

      toast.error(error.response?.data?.message || "Failed to get products");
    }
  };

  // ---------------------------------------
  // GET USER CART
  // ---------------------------------------

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
      // Guests (401) simply have no cart - never show a toast on page load
      if (error.response?.status !== 401) {
        console.log("GET CART ERROR:", error);
        toast.error(error.response?.data?.message || "Failed to get cart");
      }
    }
  };

  // ---------------------------------------
  // ADD TO CART
  // ---------------------------------------

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please add size");
      return;
    }

    // Guests can browse freely - only block when they try to buy
    let loggedIn = isLoggedIn;
    if (!authChecked) {
      loggedIn = await checkAuth();
    }

    if (!loggedIn) {
      toast.error("Please login first");
      return false;
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

    // Update UI immediately
    setCartItems(cartData);

    toast.success("Product added");

    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/add`,
        {
          itemId,
          size,
        },
        {
          withCredentials: true,
        },
      );

      if (!response.data.success) {
        toast.error(response.data.message || "Failed to add product");
      }
    } catch (error) {
      console.log("ADD CART ERROR:", error);

      toast.error(error.response?.data?.message || "Failed to add product");
    }

    return true;
  };

  // ---------------------------------------
  // CHECK AUTH
  // ---------------------------------------

  const checkAuth = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/user/me`, {
        withCredentials: true,
      });

      const ok = Boolean(response.data.success);
      setIsLoggedIn(ok);
      return ok;
    } catch (error) {
      // 401 just means "not logged in" - not an error for the user
      setIsLoggedIn(false);
      return false;
    } finally {
      setAuthChecked(true);
    }
  };

  // ---------------------------------------
  // GET CART COUNT
  // ---------------------------------------

  const getCartCount = () => {
    let totalCount = 0;

    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }

    return totalCount;
  };

  // ---------------------------------------
  // UPDATE CART QUANTITY
  // ---------------------------------------

  const updateQuantity = async (itemId, size, quantity) => {
    const cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;

    // Update UI immediately
    setCartItems(cartData);

    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/update`,
        {
          itemId,
          size,
          quantity,
        },
        {
          withCredentials: true,
        },
      );

      if (!response.data.success) {
        toast.error(response.data.message || "Failed to update cart");
      }
    } catch (error) {
      console.log("UPDATE CART ERROR:", error);

      toast.error(error.response?.data?.message || "Failed to update cart");
    }
  };

  // ---------------------------------------
  // GET CART AMOUNT
  // ---------------------------------------

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

  // ---------------------------------------
  // REMOVE FROM CART
  // ---------------------------------------

  const removeFromCart = async (itemId, size) => {
    const cartData = structuredClone(cartItems);

    delete cartData[itemId][size];

    if (Object.keys(cartData[itemId]).length === 0) {
      delete cartData[itemId];
    }

    // Update UI immediately
    setCartItems(cartData);

    toast.success("Product Removed");

    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/remove`,
        {
          itemId,
          size,
        },
        {
          withCredentials: true,
        },
      );

      if (!response.data.success) {
        toast.error(response.data.message || "Failed to remove product");
      }
    } catch (error) {
      console.log("REMOVE CART ERROR:", error);

      toast.error(error.response?.data?.message || "Failed to remove product");
    }
  };

  // ---------------------------------------
  // INITIAL DATA
  // ---------------------------------------

  useEffect(() => {
    getProducts();
    checkAuth();
  }, []);

  // Load the cart only once we know the user is logged in
  // (also runs right after login); clear it on logout
  useEffect(() => {
    if (!authChecked) return;

    if (isLoggedIn) {
      getUserCart();
    } else {
      setCartItems({});
    }
  }, [isLoggedIn, authChecked]);

  // ---------------------------------------
  // CONTEXT VALUE
  // ---------------------------------------

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
    authChecked,
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
