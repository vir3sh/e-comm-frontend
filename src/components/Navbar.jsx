import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const { isLoggedIn, setIsLoggedIn, backendUrl, getCartCount, cartItems } =
    useContext(ShopContext);

  // Cart count
  // const getCartCount = () => {
  //   let total = 0;

  //   for (const item in cartItems) {
  //     for (const size in cartItems[item]) {
  //       if (cartItems[item][size] > 0) {
  //         total += cartItems[item][size];
  //       }
  //     }
  //   }

  //   return total;
  // };

  const handleLogout = async () => {
    try {
      await axios.post(
        `${backendUrl}/api/user/logout`,
        {},
        { withCredentials: true },
      );

      setIsLoggedIn(false);
      setShowUserMenu(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" onClick={() => setIsOpen(false)}>
            <img className="h-auto w-16" src={logo} alt="Logo" />
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden items-center gap-10 md:flex">
            <li>
              <Link
                to="/"
                className="text-sm transition-colors hover:text-gray-500"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/collection"
                className="text-sm transition-colors hover:text-gray-500"
              >
                Collection
              </Link>
            </li>

            <li>
              <Link
                to="/contact"
                className="text-sm transition-colors hover:text-gray-500"
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* Right Icons */}
          <div className="flex items-center gap-5">
            {/* Search */}
            <button className="text-gray-700 transition hover:text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-4.2-4.2m0 0A7.5 7.5 0 1 0 6.2 6.2a7.5 7.5 0 0 0 10.6 10.6Z"
                />
              </svg>
            </button>

            {/* User */}
            <div className="relative hidden sm:block">
              {isLoggedIn ? (
                <>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="text-gray-700 transition hover:text-black"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.118a7.5 7.5 0 0 1 15 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.5-1.632Z"
                      />
                    </svg>
                  </button>

                  {/* Account Dropdown */}
                  {showUserMenu && (
                    <div className="absolute right-0 top-8 z-50 w-48 border border-gray-200 bg-white py-2 shadow-lg">
                      <div className="border-b border-gray-100 px-4 py-3">
                        <p className="text-sm font-medium text-gray-900">
                          My Account
                        </p>

                        <p className="mt-1 text-xs text-gray-500">Logged in</p>
                      </div>

                      <Link
                        to="/profile"
                        onClick={() => setShowUserMenu(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Profile
                      </Link>

                      <Link
                        to="/orders"
                        onClick={() => setShowUserMenu(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        My Orders
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to="/login"
                  className="text-sm text-gray-700 transition hover:text-black"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative text-gray-700 transition hover:text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25h9.75m-9.75 0a2.25 2.25 0 0 1-2.25-2.25V6.75h15.75l-1.5 7.5H7.5Zm0 0L6 18.75h11.25M9 21a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm9 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
                />
              </svg>

              {getCartCount() > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-1 text-[9px] text-white">
                  {getCartCount()}
                </span>
              )}
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-2xl md:hidden"
              aria-label="Toggle menu"
            >
              {isOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="border-t border-gray-100 pb-4 md:hidden">
            <ul className="flex flex-col gap-4 pt-4">
              <li>
                <Link
                  to="/"
                  onClick={() => setIsOpen(false)}
                  className="block text-sm"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/collection"
                  onClick={() => setIsOpen(false)}
                  className="block text-sm"
                >
                  Collection
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="block text-sm"
                >
                  Contact
                </Link>
              </li>

              <li>
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="text-sm text-gray-700"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="text-sm text-gray-700"
                  >
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
