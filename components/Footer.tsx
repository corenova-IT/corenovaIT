import Link from "next/link";

const CONTACT_EMAIL = "contact@corenovait.com.au";

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-top">
          <div className="foot-col">
            <h4>Company</h4>
            <ul>
              <li><Link href="/process">Process</Link></li>
              <li><Link href="/partners">For Partners</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/contact">Start a Project</Link></li>
            </ul>
          </div>

          <div className="foot-col">
            <h4>Services</h4>
            <ul>
              <li><Link href="/services">Web Development</Link></li>
              <li><Link href="/services">Graphic Design</Link></li>
              <li><Link href="/services">Digital Marketing</Link></li>
              <li><Link href="/ai">AI Integrations</Link></li>
              <li><Link href="/platforms">Platforms</Link></li>
            </ul>
          </div>

          <div className="foot-col">
            <h4>Connect</h4>
            <ul>
              <li><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></li>
              <li><Link href="/contact">Start a Conversation</Link></li>
            </ul>
          </div>
        </div>

        <div className="foot-wordmark">
          <Link className="brand" href="/">
            <img
              src="/brand/logo-full-black.svg"
              alt="CoreNovaIT"
              width={428}
              height={76}
            />
          </Link>
          <p>Build. Design. Grow. Automate. A white-label partner for agencies that don&apos;t build in-house.</p>
        </div>

        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} CoreNovaIT. All rights reserved.</span>
          <div className="foot-legal">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
