import { useEffect, useState } from 'react';
import { Button } from '../components/common/Button';
import { siteConfig } from '../data/site';
import { setSeo } from '../utils/seo';

export function Contact() {
  const [sent, setSent] = useState(false);
  useEffect(() => setSeo('Contact | VASIRA', 'Contact the VASIRA demo studio.'), []);
  return (
    <section className="container-page grid gap-10 py-12 md:grid-cols-[0.8fr_1fr]">
      <div>
        <h1 className="serif text-6xl md:text-8xl">Contact</h1>
        <div className="mt-8 grid gap-3 leading-7 text-muted">
          <p>Email: {siteConfig.email}</p>
          <p>Phone: {siteConfig.phone}</p>
          <p>WhatsApp: {siteConfig.whatsapp}</p>
          <p>Instagram: @vasira.example</p>
        </div>
      </div>
      <form
        className="grid gap-4 border border-line bg-sand/40 p-6 md:p-8"
        onSubmit={(event) => {
          event.preventDefault();
          setSent(true);
        }}
      >
        <Input label="Name" type="text" />
        <Input label="Email" type="email" />
        <Input label="Phone" type="tel" />
        <label className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          Message
          <textarea required className="mt-2 min-h-36 w-full border border-line bg-canvas p-3 text-base normal-case tracking-normal text-ink" />
        </label>
        <Button>Send Message</Button>
        {sent ? <p className="text-sm text-muted">Thanks. This demo form did not send data anywhere.</p> : null}
      </form>
    </section>
  );
}

function Input({ label, type }: { label: string; type: string }) {
  return (
    <label className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
      {label}
      <input required type={type} className="mt-2 min-h-12 w-full border border-line bg-canvas px-3 text-base normal-case tracking-normal text-ink" />
    </label>
  );
}
