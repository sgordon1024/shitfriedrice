/**
 * CartDrawer — Slides in from the right
 *
 * Shows everything in the cart with quantities,
 * a total, and a checkout button that creates a Stripe session.
 */

"use client";

import { useCartStore } from "@/lib/store";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { playBoingUp } from "@/lib/sounds";

export default function CartDrawer() {
  const { items, isCartOpen, closeCart, removeItem, updateQuantity, totalPrice } =
    useCartStore();
  const [isLoading, setIsLoading] = useState(false);

  // Send cart to our API route, which creates a Stripe checkout session
  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Checkout error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 z-[60]"
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            onAnimationComplete={(def) => {
              if (typeof def === "object" && "x" in def && def.x === 0) playBoingUp();
            }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-sfr-black border-l border-white/10 z-[70] flex flex-col"
            role="dialog"
            aria-label="Shopping cart"
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h2 className="font-[family-name:var(--font-bebas)] text-2xl text-sfr-cream">
                YOUR CART
              </h2>
              <button
                onClick={closeCart}
                className="p-2 text-sfr-cream/50 hover:text-sfr-cream transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Close cart"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Cart items */}
            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <p className="text-sfr-cream/50 text-lg mb-2">
                    Nothing here yet.
                  </p>
                  <p className="text-sfr-cream/30 text-sm">
                    Go find something weird in the shop.
                  </p>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="flex gap-4 border-dashed-sfr rounded-sm p-3"
                    >
                      {/* Thumbnail */}
                      <div className="relative w-20 h-20 rounded-sm overflow-hidden flex-shrink-0 bg-sfr-black">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-[family-name:var(--font-syne)] text-sfr-cream text-sm font-bold truncate">
                          {item.title}
                        </p>
                        <p className="font-[family-name:var(--font-syne-mono)] text-sfr-green text-sm mt-1">
                          ${item.price.toFixed(2)}
                        </p>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-7 h-7 flex items-center justify-center border border-white/20 text-sfr-cream/60 hover:border-sfr-green hover:text-sfr-green transition-colors text-sm"
                            aria-label={`Decrease quantity of ${item.title}`}
                          >
                            -
                          </button>
                          <span className="font-[family-name:var(--font-syne-mono)] text-sfr-cream text-sm w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-7 h-7 flex items-center justify-center border border-white/20 text-sfr-cream/60 hover:border-sfr-green hover:text-sfr-green transition-colors text-sm"
                            aria-label={`Increase quantity of ${item.title}`}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-sfr-cream/30 hover:text-sfr-red transition-colors self-start p-1"
                        aria-label={`Remove ${item.title} from cart`}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        >
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer with total and checkout */}
            {items.length > 0 && (
              <div className="p-4 border-t border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-[family-name:var(--font-syne)] text-sfr-cream font-bold uppercase text-sm">
                    Total
                  </span>
                  <span className="font-[family-name:var(--font-syne-mono)] text-sfr-green text-lg font-bold">
                    ${totalPrice().toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="w-full py-3 bg-sfr-green text-sfr-black font-bold uppercase tracking-wider text-sm hover:bg-sfr-green-dark transition-colors disabled:opacity-50 cta-pulse min-h-[44px]"
                >
                  {isLoading ? "Loading..." : "Checkout"}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
