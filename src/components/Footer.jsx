import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Footer.css';
import { contactData } from '../data/portfolioData';

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const anim = gsap.fromTo(footer.children,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: footer,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, []);

  return (
    <footer className="footer" ref={footerRef}>
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#" className="footer-logo hover-target">
              <span className="footer-logo-icon">&#9670;</span>
              <span>SABIR<span style={{ color: 'var(--accent)' }}>.</span></span>
            </a>
            <p className="footer-tagline">Digital Growth Architect</p>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <h4>Navigation</h4>
              <a href="#about" className="hover-target">About</a>
              <a href="#expertise" className="hover-target">Services</a>
              <a href="#cases" className="hover-target">Work</a>
              <a href="#contact" className="hover-target">Contact</a>
            </div>
            <div className="footer-col">
              <h4>Social</h4>
              <a href={contactData.linkedin} target="_blank" rel="noopener noreferrer" className="hover-target">LinkedIn</a>
              <a href={contactData.github} target="_blank" rel="noopener noreferrer" className="hover-target">GitHub</a>
              <a href={`mailto:${contactData.email}`} className="hover-target">Email</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} Sabir Lalahiane. All rights reserved.</span>
          <span className="footer-built">Built with passion & data.</span>
        </div>
      </div>
    </footer>
  );
}
