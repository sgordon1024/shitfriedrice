/**
 * AddToCart — Button that adds a product to the cart
 *
 * Used on product detail pages. Shows quantity selector
 * for products with quantity > 1.
 */

"use client";

import { useState } from "react";
import { useCartStore } from "@/lib/store";
import { playBoingBig } from "@/lib/sounds";

interface AddToCartProps {
  id: string;
  title: string;
  price: number;
  image: string;
  inStock: boolean;
  maxQuantity?: number;
}

export default function AddToCart({
  id,
  title,
  price,
  image,
  inStock,
  maxQuantity = 1,
}: AddToCartProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = () => {
    addItem({ id, title, price, image, quantity });
    playBoingBig();
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (!inStock) {
    return (
      <button
        disabled
        className="w-full py-3 bg-sfr-cream/10 text-sfr-cream/40 font-bold uppercase tracking-wider text-sm min-h-[44px] cursor-not-allowed"
      >
        Sold Out
      </button>
    );
  }

  return (
    <div className="space-y-3">
      {/* Quantity selector (only for products with more than 1 available) */}
      {maxQuantity > 1 && (
        <div className="flex items-center gap-3">
          <label
            htmlFor="quantity"
            className="font-[family-name:var(--font-syne)] text-sfr-cream/60 text-sm"
          >
            Qty:
          </label>
          <div className="flex items-center">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 flex items-center justify-center border border-white/20 text-sfr-cream hover:border-sfr-green transition-colors"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span
              id="quantity"
              className="w-12 h-10 flex items-center justify-center border-y border-white/20 text-sfr-cream font-[family-name:var(--font-syne-mono)]"
            >
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(Math.min(maxQuantity, quantity + 1))}
              className="w-10 h-10 flex items-center justify-center border border-white/20 text-sfr-cream hover:border-sfr-green transition-colors"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>
      )}

      <button
        onClick={handleAdd}
        className={`w-full py-3 font-bold uppercase tracking-wider text-sm min-h-[44px] transition-all duration-300 cta-pulse ${
          added
            ? "bg-sfr-green text-sfr-black"
            : "bg-sfr-green text-sfr-black hover:bg-sfr-green-dark"
        }`}
      >
        {added ? "Added!" : "Add to Cart"}
      </button>
    </div>
  );
}
