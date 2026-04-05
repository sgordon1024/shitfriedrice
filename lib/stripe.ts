/**
 * Stripe Client
 *
 * Handles payments for the shop. Uses Stripe in test mode
 * during development — switch to live keys when you're ready
 * to take real money.
 *
 * Lydia: you don't need to touch this file. Just make sure
 * your Stripe keys are in .env.local.
 */

import Stripe from "stripe";

// Lazy-initialized Stripe client (avoids crashing at build time
// when env vars aren't set yet)
let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error(
        "STRIPE_SECRET_KEY is not set. Add it to .env.local — see .env.local.example for instructions."
      );
    }
    _stripe = new Stripe(key, {
      apiVersion: "2025-02-24.acacia",
      typescript: true,
    });
  }
  return _stripe;
}
