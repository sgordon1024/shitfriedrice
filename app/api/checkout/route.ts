/**
 * Stripe Checkout API Route
 *
 * Creates a Stripe Checkout Session from the cart items.
 * The frontend sends the cart, we create line items,
 * and redirect the customer to Stripe's hosted checkout page.
 *
 * POST /api/checkout
 * Body: { items: [{ id, title, price, quantity, image }] }
 * Returns: { url: "https://checkout.stripe.com/..." }
 */

import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

export async function POST(req: NextRequest) {
  try {
    const { items } = (await req.json()) as { items: CartItem[] };

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty" },
        { status: 400 }
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    // Create line items for Stripe
    const line_items = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
          images: [item.image],
          metadata: {
            productId: item.id,
          },
        },
        unit_amount: Math.round(item.price * 100), // Stripe uses cents
      },
      quantity: item.quantity,
    }));

    // Create the checkout session
    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${siteUrl}/shop?success=true`,
      cancel_url: `${siteUrl}/shop?canceled=true`,
      // Collect shipping address
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
