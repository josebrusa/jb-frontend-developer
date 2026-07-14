"use server";

import { redirect } from "next/navigation";
import nodemailer from "nodemailer";

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
  const name = getValue(formData, "name");
  const phone = getValue(formData, "phone");
  const email = getValue(formData, "email");
  const subject = getValue(formData, "subject") || "Nuevo mensaje desde el portfolio";
  const message = getValue(formData, "message");

  if (!name || !email || !message) {
    redirect("/?contact=missing#contact");
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
