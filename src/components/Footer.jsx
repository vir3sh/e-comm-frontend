import React from "react";
import logo from "../assets/logo.png";
const Footer = () => {
  return (
    <footer className="border-t mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-semibold">
              <img src={logo} className="w-19 h-auto" alt="logo" />
            </h2>

            <p className="text-gray-600 mt-4 max-w-sm">
              Discover quality products at great prices. Shop your favorite
              products with ease.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>

            <ul className="space-y-3 text-gray-600">
              <li>
                <a href="/" className="hover:text-black">
                  Home
                </a>
              </li>

              <li>
                <a href="/collection" className="hover:text-black">
                  Products
                </a>
              </li>

              <li>
                <a href="/about" className="hover:text-black">
                  About Us
                </a>
              </li>

              <li>
                <a href="/contact" className="hover:text-black">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Customer Service</h3>

            <ul className="space-y-3 text-gray-600">
              <li>
                <a href="/shipping" className="hover:text-black">
                  Shipping & Delivery
                </a>
              </li>

              <li>
                <a href="/returns" className="hover:text-black">
                  Returns
                </a>
              </li>

              <li>
                <a href="/privacy" className="hover:text-black">
                  Privacy Policy
                </a>
              </li>

              <li>
                <a href="/terms" className="hover:text-black">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>

            <div className="space-y-3 text-gray-600">
              <p>+91 98765 43210</p>
              <p>support@shoply.com</p>
              <p>Mumbai, Maharashtra, India</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t mt-10 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Shoply. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
