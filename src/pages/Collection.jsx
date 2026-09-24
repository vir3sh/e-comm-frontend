import React, { useContext, useEffect, useMemo, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { product } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);

  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  const [sortType, setSortType] = useState("relevant");

  const [filterProducts, setFilterProducts] = useState([]);
  const [search, setSearch] = useState("");
  // Get unique categories from products
  const categories = useMemo(() => {
    return [...new Set(product.map((item) => item.category).filter(Boolean))];
  }, [product]);

  // Get unique subcategories from products
  const subCategories = useMemo(() => {
    return [
      ...new Set(product.map((item) => item.subCategory).filter(Boolean)),
    ];
  }, [product]);

  // Category checkbox
  const toggleCategory = (e) => {
    const value = e.target.value;

    if (category.includes(value)) {
      setCategory((prev) => prev.filter((item) => item !== value));
    } else {
      setCategory((prev) => [...prev, value]);
    }
  };

  // Subcategory checkbox
  const toggleSubCategory = (e) => {
    const value = e.target.value;

    if (subCategory.includes(value)) {
      setSubCategory((prev) => prev.filter((item) => item !== value));
    } else {
      setSubCategory((prev) => [...prev, value]);
    }
  };

  // Filter products
  useEffect(() => {
    let productsCopy = [...product];

    if (search.trim() !== "") {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      );
    }
    // Category filter
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category),
      );
    }

    // Subcategory filter
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory),
      );
    }

    // Sorting
    if (sortType === "low-high") {
      productsCopy.sort((a, b) => a.price - b.price);
    }

    if (sortType === "high-low") {
      productsCopy.sort((a, b) => b.price - a.price);
    }

    setFilterProducts(productsCopy);
  }, [product, category, subCategory, sortType, search]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
      {/* Page Header */}
      <div className="mb-8 border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">
          All Products
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Browse our complete collection
        </p>
      </div>

      {/* Mobile Filter Button */}
      <button
        onClick={() => setShowFilter(!showFilter)}
        className="mb-6 flex w-full items-center justify-between border border-gray-300 px-4 py-3 text-sm font-medium text-gray-800 sm:hidden"
      >
        <span>FILTERS</span>

        <span
          className={`text-lg transition-transform duration-300 ${
            showFilter ? "rotate-180" : ""
          }`}
        >
          ↓
        </span>
      </button>

      <div className="flex flex-col gap-8 sm:flex-row">
        {/* ================= FILTER SIDEBAR ================= */}
        <aside
          className={`w-full shrink-0 sm:block sm:w-56 ${
            showFilter ? "block" : "hidden"
          }`}
        >
          <div className="border border-gray-200">
            {/* Filter Heading */}
            <div className="border-b border-gray-200 px-5 py-4">
              <h2 className="text-sm font-semibold tracking-wide text-gray-900">
                FILTERS
              </h2>
            </div>

            {/* Categories */}
            <div className="border-b border-gray-200 px-5 py-5">
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Categories
              </h3>

              <div className="space-y-3">
                {categories.length > 0 ? (
                  categories.map((item) => (
                    <label
                      key={item}
                      className="flex cursor-pointer items-center gap-3 text-sm text-gray-700"
                    >
                      <input
                        type="checkbox"
                        value={item}
                        checked={category.includes(item)}
                        onChange={toggleCategory}
                        className="h-4 w-4 cursor-pointer accent-black"
                      />

                      <span className="capitalize">{item}</span>
                    </label>
                  ))
                ) : (
                  <p className="text-xs text-gray-400">No categories</p>
                )}
              </div>
            </div>

            {/* Sub Categories */}
            <div className="px-5 py-5">
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Sub Categories
              </h3>

              <div className="space-y-3">
                {subCategories.length > 0 ? (
                  subCategories.map((item) => (
                    <label
                      key={item}
                      className="flex cursor-pointer items-center gap-3 text-sm text-gray-700"
                    >
                      <input
                        type="checkbox"
                        value={item}
                        checked={subCategory.includes(item)}
                        onChange={toggleSubCategory}
                        className="h-4 w-4 cursor-pointer accent-black"
                      />

                      <span className="capitalize">{item}</span>
                    </label>
                  ))
                ) : (
                  <p className="text-xs text-gray-400">No sub categories</p>
                )}
              </div>
            </div>

            {/* Clear Filters */}
            {(category.length > 0 || subCategory.length > 0) && (
              <div className="border-t border-gray-200 px-5 py-4">
                <button
                  onClick={() => {
                    setCategory([]);
                    setSubCategory([]);
                  }}
                  className="text-xs font-medium uppercase tracking-wide text-gray-500 underline underline-offset-4 transition hover:text-black"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </aside>

        {/* ================= PRODUCTS ================= */}

        <main className="min-w-0 flex-1">
          {/* Top Bar */}

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative w-full">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full border border-gray-300 bg-white px-5 py-3.5 pr-12 text-sm text-gray-900 outline-none transition focus:border-gray-900"
              />

              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-lg text-gray-400 hover:text-gray-900"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* Product Count + Sort */}
          <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4">
            <p className="text-sm text-gray-500">
              {filterProducts.length}{" "}
              {filterProducts.length === 1 ? "Product" : "Products"}
            </p>

            <select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              className="cursor-pointer border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-black"
            >
              <option value="relevant">Sort: Relevant</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>

          {/* Product Grid */}

          {/* Product Grid */}
          {filterProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
              {filterProducts.map((item) => (
                <ProductItem
                  key={item._id}
                  name={item.name}
                  id={item._id}
                  slug={item.slug}
                  price={item.price}
                  image={item.image}
                />
              ))}
            </div>
          ) : (
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="text-center">
                <p className="text-lg font-medium text-gray-800">
                  No products found
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  Try changing your filters.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Collection;
