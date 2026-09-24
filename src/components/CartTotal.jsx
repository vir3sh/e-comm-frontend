import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const CartTotal = () => {
  const { currency, getCartAmount } = useContext(ShopContext);

  const subtotal = getCartAmount();
  const shipping = subtotal > 0 ? 50 : 0;
  const total = subtotal + shipping;

  return (
    <div className="w-full">
      <h2 className="mb-4 text-2xl font-medium">CART TOTALS</h2>

      <div className="flex flex-col gap-2 border-y py-4 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>
            {currency}
            {subtotal}
          </p>
        </div>

        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>
            {currency}
            {shipping}
          </p>
        </div>

        <div className="flex justify-between border-t pt-2 text-base font-medium">
          <p>Total</p>
          <p>
            {currency}
            {total}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
