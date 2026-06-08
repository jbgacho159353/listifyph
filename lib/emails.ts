import { Resend } from "resend";

const FROM = "onboarding@resend.dev";
const REPLY_TO = "joelgacho.ffseo@gmail.com";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://listifyph.vercel.app";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY ?? "placeholder");
}

export async function sendWelcomeEmail(to: string, name: string) {
  const resend = getResend();
  await resend.emails.send({
    from: FROM,
    replyTo: REPLY_TO,
    to,
    subject: "Welcome to ListifyPH!",
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
        <div style="background: #0F172A; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 32px;">
          <h1 style="color: white; font-size: 24px; margin: 0;">ListifyPH</h1>
          <p style="color: rgba(255,255,255,0.6); margin: 8px 0 0;">Write less. Sell more.</p>
        </div>
        <h2 style="color: #0F172A; font-size: 22px;">Welcome, ${name}!</h2>
        <p style="color: #64748B; line-height: 1.6;">
          You have joined thousands of Filipino real estate agents who generate professional listings in seconds.
        </p>
        <p style="color: #64748B; line-height: 1.6;">
          You have <strong>3 free generations this month</strong>. Use them to create:
        </p>
        <ul style="color: #64748B; line-height: 2;">
          <li>SEO-optimised listing descriptions</li>
          <li>Facebook posts ready to copy-paste</li>
          <li>Facebook Ad copy variations</li>
          <li>Instagram captions with hashtags</li>
        </ul>
        <a href="${APP_URL}/generate" style="display: inline-block; background: #3B82F6; color: white; padding: 14px 28px; border-radius: 10px; text-decoration: none; font-weight: 600; margin-top: 16px;">
          Generate your first listing
        </a>
        <hr style="border: none; border-top: 1px solid #E2E8F0; margin: 32px 0;" />
        <p style="color: #64748B; font-size: 13px;">ListifyPH - Write less. Sell more.</p>
      </div>
    `,
  });
}

export async function sendProUpgradeEmail(to: string, name: string) {
  const resend = getResend();
  await resend.emails.send({
    from: FROM,
    replyTo: REPLY_TO,
    to,
    subject: "Your Pro plan is now active!",
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
        <div style="background: #0F172A; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 32px;">
          <h1 style="color: white; font-size: 24px; margin: 0;">ListifyPH Pro</h1>
          <p style="color: rgba(255,255,255,0.6); margin: 8px 0 0;">Unlimited generations unlocked</p>
        </div>
        <h2 style="color: #0F172A; font-size: 22px;">You are on Pro, ${name}!</h2>
        <p style="color: #64748B; line-height: 1.6;">
          Your Pro plan is now active. Here is what you have unlocked:
        </p>
        <ul style="color: #64748B; line-height: 2;">
          <li>Unlimited generations</li>
          <li>All 4 content types</li>
          <li>English + Filipino</li>
          <li>All ad styles (Storytelling, Direct, FOMO, Investment)</li>
          <li>Full listing history</li>
        </ul>
        <a href="${APP_URL}/generate" style="display: inline-block; background: #3B82F6; color: white; padding: 14px 28px; border-radius: 10px; text-decoration: none; font-weight: 600; margin-top: 16px;">
          Start generating
        </a>
        <hr style="border: none; border-top: 1px solid #E2E8F0; margin: 32px 0;" />
        <p style="color: #64748B; font-size: 13px;">Questions? Reply to this email and we will help you out.</p>
      </div>
    `,
  });
}