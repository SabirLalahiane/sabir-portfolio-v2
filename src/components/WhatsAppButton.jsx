import { useState, useEffect } from 'react';
import './WhatsAppButton.css';

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  const message = encodeURIComponent("Hey Sabir! I'm interested in a free marketing audit for my business.");
  const phone = '212631297189';

  return (
    <a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float hover-target"
      aria-label="Chat on WhatsApp"
    >
      <div className="whatsapp-tooltip">
        <span className="tooltip-arrow" />
        Get Your Free Audit
      </div>
      <div className="whatsapp-icon">
        <svg viewBox="0 0 32 32" width="28" height="28" fill="white">
          <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.128 6.744 3.046 9.378L1.054 31.2l6.062-1.96A15.91 15.91 0 0016.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.316 22.594c-.39 1.094-1.932 2.002-3.142 2.27-.834.182-1.924.326-5.584-1.2-4.686-1.918-7.692-6.582-7.924-6.898-.224-.316-1.876-2.496-1.876-4.762 0-2.264 1.19-3.37 1.612-3.834.39-.428.938-.542 1.248-.542.148 0 .28.008.402.014.402.018.604.04.87.674.33.784 1.128 2.746 1.226 2.94.098.194.164.42.032.672-.13.254-.194.414-.388.638-.194.224-.408.5-.582.672-.194.194-.396.402-.17.786.226.384 1.006 1.66 2.158 2.688 1.482 1.324 2.732 1.734 3.12 1.926.388.194.612.162.836-.098.226-.26.958-1.116 1.214-1.504.254-.388.51-.324.86-.194.348.13 2.202 1.042 2.582 1.232.38.194.634.29.73.45.098.162.098.934-.292 2.028z"/>
        </svg>
      </div>
    </a>
  );
}
