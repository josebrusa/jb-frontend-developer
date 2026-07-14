"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import nodemailer from "nodemailer";

const contactAttempts = new Map<string, { count: number; resetAt: number }>();
const contactWindowMs = 10 * 60 * 1000;
const maxContactAttempts = 3;

function isRateLimited(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const current = contactAttempts.get(key);

  if (!current || current.resetAt <= now) {
    contactAttempts.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  current.count += 1;
  return current.count > limit;
}

async function getRequestKey(): Promise<string> {
  const headerStore = await headers();
  return (
    headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headerStore.get("x-real-ip") ||
    "unknown"
  );
}

function getValue(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function sendContactMessage(formData: FormData): Promise<void> {
  const requestKey = await getRequestKey();
  const honeypot = getValue(formData, "company");
  const name = getValue(formData, "name");
  const phone = getValue(formData, "phone");
  const email = getValue(formData, "email");
  const subject = getValue(formData, "subject") || "Nuevo mensaje desde el portfolio";
  const message = getValue(formData, "message");

  if (honeypot) {
    redirect("/?contact=sent#contact");
  }

  if (isRateLimited(requestKey, maxContactAttempts, contactWindowMs)) {
    redirect("/?contact=limited#contact");
  }

  if (!name || !email || !message) {
    redirect("/?contact=missing#contact");
  }

  if (
    name.length > 120 ||
    phone.length > 40 ||
    email.length > 254 ||
    subject.length > 160 ||
    message.length > 4000 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    redirect("/?contact=invalid#contact");
  }

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM;
  const to = process.env.CONTACT_EMAIL || from;

  if (!host || !user || !pass || !from || !to) {
    redirect("/?contact=config#contact");
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });

  try {
    await transporter.sendMail({
      from,
      to,
      replyTo: email,
      subject: `Portfolio: ${subject}`,
      text: [
        `Nombre: ${name}`,
        `Email: ${email}`,
        `Movil: ${phone || "No indicado"}`,
        `Asunto: ${subject}`,
        "",
        message,
      ].join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111">
          <h2>Nuevo mensaje desde el portfolio</h2>
          <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Movil:</strong> ${escapeHtml(phone || "No indicado")}</p>
          <p><strong>Asunto:</strong> ${escapeHtml(subject)}</p>
          <hr />
          <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
        </div>
      `,
    });
  } catch {
    redirect("/?contact=error#contact");
  }

  redirect("/?contact=sent#contact");
}
