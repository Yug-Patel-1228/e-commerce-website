import { X } from 'lucide-react';
import { useState } from 'react';
import { siteConfig } from '../../data/site';

export function AnnouncementBar() {
  const [visible, setVisible] = useState(() => window.localStorage.getItem('vasira-announcement') !== 'hidden');
  if (!visible) return null;
  return (
    <div className="relative bg-ink px-10 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-canvas">
      {siteConfig.announcement}
      <button
        type="button"
        aria-label="Dismiss announcement"
        onClick={() => {
          window.localStorage.setItem('vasira-announcement', 'hidden');
          setVisible(false);
        }}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
      >
        <X size={14} />
      </button>
    </div>
  );
}
