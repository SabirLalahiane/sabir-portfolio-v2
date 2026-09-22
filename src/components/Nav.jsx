import { useEffect, useState } from 'react';
import './Nav.css';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#expertise' },
    { label: 'Work', href: '#work' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="nav-inner">
        <a href="#" className="nav-logo hover-target">
          <span className="nav-logo-icon">&#9670;</span>
          <span className="nav-logo-text">SABIR<span className="nav-logo-dot">.</span></span>
        </a>

        <div className={`nav-links ${menuOpen ? 'nav-links-open' : ''}`}>
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="nav-link hover-target"
              onClick={() => setMenuOpen(false)}
            >
              <span className="nav-link-bg" />
              <span className="nav-link-text">{link.label}</span>
            </a>
          ))}
        </div>

        <a href="#contact" className="nav-cta hover-target">Let's Talk</a>

        <button
          className={`nav-burger hover-target ${menuOpen ? 'nav-burger-open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
