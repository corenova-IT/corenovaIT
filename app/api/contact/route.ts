import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const NOTIFY_EMAIL = "contact@corenovait.com.au";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Saves a contact form submission to Supabase and emails a notification
 * via Resend. Requires NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY,
 * and RESEND_API_KEY in the environment (see .env.example) — this route
 * only runs server-side, so the service-role key is never exposed to the
 * browser.
 */
export async function POST(request: Request) {
  try {
    const { name, company, email, service, details } = await request.json();

    const trimmedName = String(name ?? "").trim();
    const trimmedEmail = String(email ?? "").trim();
    const trimmedDetails = String(details ?? "").trim();

    if (!trimmedName || !trimmedEmail || !trimmedDetails) {
      return NextResponse.json(
        { success: false, message: "Name, email, and project details are required." },
        { status: 400 }
      );
    }

    if (!EMAIL_PATTERN.test(trimmedEmail)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { error: dbError } = await supabase.from("contact_submissions").insert({
      name: trimmedName,
      company: company ? String(company).trim() : null,
      email: trimmedEmail,
      service: service ? String(service).trim() : null,
      details: trimmedDetails,
    });

    if (dbError) {
      console.error("Contact form error (Supabase):", dbError);
      return NextResponse.json(
        {
          success: false,
          message: `Something went wrong saving your message. Please email us directly at ${NOTIFY_EMAIL}.`,
        },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error: emailError } = await resend.emails.send({
      from: "CoreNovaIT Contact Form <no-reply@corenovait.com.au>",
      to: NOTIFY_EMAIL,
      replyTo: trimmedEmail,
      subject: `New project inquiry — ${service || "General"} (${trimmedName})`,
      text: [
        `Name: ${trimmedName}`,
        `Agency/Company: ${company || "—"}`,
        `Email: ${trimmedEmail}`,
        `Service needed: ${service || "—"}`,
        "",
        "Project details:",
        trimmedDetails,
      ].join("\n"),
    });

    if (emailError) {
      // The submission is already saved in Supabase — don't fail the
      // whole request just because the notification email didn't send.
      console.error("Contact form error (Resend):", emailError);
    }

    return NextResponse.json({
      success: true,
      message: "Thank you! Your message has been received.",
    });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
