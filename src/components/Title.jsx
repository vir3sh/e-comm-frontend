import React from "react";

const Title = ({ text1, text2 }) => {
  return (
    <div className="mb-4 inline-flex items-center gap-3">
      {/* Text */}
      <p className="text-sm font-light tracking-[0.2em] text-gray-500 sm:text-base">
        {text1}
        <span className="ml-1 font-semibold text-gray-900">{text2}</span>
      </p>

      {/* Line */}
      <span className="h-[2px] w-8 bg-gray-900 sm:w-12"></span>
    </div>
  );
};

export default Title;
