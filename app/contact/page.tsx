import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = { title: "Start a Project" };

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;

  return (
    <section className="sec">
      <div className="wrap">
        <div className="eyebrow page-eyebrow">Start a project</div>
        <h1 className="page-h1">Tell us what you&apos;re building.</h1>
        <p className="page-intro">
          Send the details below — we&apos;ll route it to the right person
          and follow up as soon as we can.
        </p>

        <div style={{ marginTop: 40 }}>
          <ContactForm initialEmail={email ?? ""} />
        </div>
      </div>
    </section>
  );
}
