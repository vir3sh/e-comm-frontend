import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const ProductItem = ({ id, slug, name, price, image }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link
      onClick={() => scrollTo(0, 0)}
      to={`/products/${slug}`}
      className="group block w-full"
    >
      {/* Product Image */}
      <div className="relative mb-4 aspect-[3/4] w-full overflow-hidden bg-[#f7f7f7]">
        {/* Image */}
        <img
          src={image?.[0]}
          alt={name}
          className="h-full w-full object-contain p-3 transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Wishlist */}
        {/* <button
          onClick={(e) => e.preventDefault()}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-500 shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-black hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733C11.285 4.876 9.623 3.75 7.688 3.75 5.099 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        </button> */}

        {/* Hover View Product */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full bg-black/90 px-4 py-3 text-center text-xs font-medium uppercase tracking-widest text-white transition-transform duration-300 group-hover:translate-y-0">
          View Product
        </div>
      </div>

      {/* Product Details */}
      <div className="px-0.5">
        {/* Product Name */}
        <h3 className="line-clamp-2 text-sm font-medium leading-relaxed text-gray-800 transition-colors duration-200 group-hover:text-black sm:text-[15px]">
          {name}
        </h3>

        {/* Price */}
        <div className="mt-2 flex items-center justify-between">
          <p className="text-sm font-semibold text-gray-900 sm:text-[15px]">
            {currency}
            {price}
          </p>

          {/* Arrow */}
          <span className="translate-x-0 text-gray-400 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
            →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
