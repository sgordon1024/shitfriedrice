/**
 * Commission Form API Route
 *
 * When someone fills out the commission form, this sends
 * an email to Lydia via Resend.
 *
 * POST /api/commission
 * Body: { name, email, description, budget, timeline, howFound, anythingElse }
 */

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Lazy init so the build doesn't crash without env vars
let _resend: Resend | null = null;
function getResend(): Resend {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY || "");
  }
  return _resend;
}

interface CommissionForm {
  name: string;
  email: string;
  description: string;
  budget?: string;
  timeline?: string;
  howFound?: string;
  anythingElse?: string;
}

export async function POST(req: NextRequest) {
  try {
    const data = (await req.json()) as CommissionForm;

    // Basic validation
    if (!data.name || !data.email || !data.description) {
      return NextResponse.json(
        { error: "Name, email, and description are required" },
        { status: 400 }
      );
    }

    const toEmail = process.env.COMMISSION_EMAIL_TO || "lydia@shitfriedrice.com";

    // Send the email via Resend
    await getResend().emails.send({
      from: "Shitfriedrice Commission Form <commissions@shitfriedrice.com>",
      to: [toEmail],
      replyTo: data.email,
      subject: `New Commission Request from ${data.name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px;">
          <h1 style="color: #7ec84c; font-size: 24px;">New Commission Request</h1>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #666; vertical-align: top; width: 140px;">Name</td>
              <td style="padding: 8px 0;">${escapeHtml(data.name)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #666; vertical-align: top;">Email</td>
              <td style="padding: 8px 0;"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #666; vertical-align: top;">What they want</td>
              <td style="padding: 8px 0;">${escapeHtml(data.description)}</td>
            </tr>
            ${data.budget ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #666; vertical-align: top;">Budget</td>
              <td style="padding: 8px 0;">${escapeHtml(data.budget)}</td>
            </tr>` : ""}
            ${data.timeline ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #666; vertical-align: top;">Timeline</td>
              <td style="padding: 8px 0;">${escapeHtml(data.timeline)}</td>
            </tr>` : ""}
            ${data.howFound ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #666; vertical-align: top;">How they found us</td>
              <td style="padding: 8px 0;">${escapeHtml(data.howFound)}</td>
            </tr>` : ""}
            ${data.anythingElse ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #666; vertical-align: top;">Anything else</td>
              <td style="padding: 8px 0;">${escapeHtml(data.anythingElse)}</td>
            </tr>` : ""}
          </table>

          <hr style="margin: 20px 0; border: none; border-top: 1px dashed #ccc;" />
          <p style="color: #999; font-size: 12px;">
            Sent from the Shitfriedrice commission form.
            Reply directly to this email to respond to ${escapeHtml(data.name)}.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Commission email error:", err);
    return NextResponse.json(
      { error: "Failed to send commission request" },
      { status: 500 }
    );
  }
}

// Simple HTML escaping to prevent XSS in emails
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
