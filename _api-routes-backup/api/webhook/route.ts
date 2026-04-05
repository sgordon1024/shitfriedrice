/**
 * Stripe Webhook Handler
 *
 * Stripe sends events here when things happen (payment completed,
 * payment failed, etc.). We verify the webhook signature to make
 * sure it's really from Stripe, then handle the event.
 *
 * POST /api/webhook
 *
 * To set up:
 * 1. In Stripe Dashboard → Webhooks, add endpoint: https://yoursite.com/api/webhook
 * 2. Select events: checkout.session.completed
 * 3. Copy the webhook signing secret to STRIPE_WEBHOOK_SECRET in .env.local
 *
 * For local testing:
 * stripe listen --forward-to localhost:3000/api/webhook
 */

import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("✅ Payment successful!", {
        sessionId: session.id,
        customerEmail: session.customer_details?.email,
        amountTotal: session.amount_total,
      });

      // TODO: Add order fulfillment logic here:
      // - Send confirmation email to customer
      // - Update inventory in Sanity
      // - Notify Lydia of new order
      // - Create shipping label
      break;
    }

    case "checkout.session.expired": {
      console.log("⏰ Checkout session expired");
      break;
    }

    default: {
      console.log(`Unhandled event type: ${event.type}`);
    }
  }

  return NextResponse.json({ received: true });
}
