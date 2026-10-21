import React from "react";
import homeHero from "../assets/hero.jpeg";

const HomeHero = () => {
  return (
    <section className="relative flex h-[calc(100vh-64px)] min-h-[600px] w-full items-center justify-center overflow-hidden bg-neutral-900 ">
      <img
        src={homeHero}
        alt="Premium men's shirt collection"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      <div className="absolute inset-0 bg-black/40" />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Hero Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-5 text-center text-white">
        <p className="mb-6 text-xs font-medium uppercase tracking-[0.4em] sm:text-sm">
          Premium Shirts
        </p>

        <h1 className="font-serif text-5xl leading-[1.1] tracking-tight sm:text-6xl md:text-8xl">
          Wear Confidence
          <br />
          <span className="italic">Everyday.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/80 sm:text-base md:text-lg">
          Discover our latest collection of premium shirts designed for comfort,
          style, and every occasion.
        </p>

        <a
          href="/collections"
          className="mt-9 inline-flex items-center gap-4 bg-[#a27b54] px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] transition duration-300 hover:bg-white hover:text-black sm:px-10"
        >
          Shop Now <span className="text-lg">→</span>
        </a>
      </div>
    </section>
  );
};

export default HomeHero;
