import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Hero.css';
import portfolioImg from '../assets/portfolio.png';

export default function Hero() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const leftTextRef = useRef(null);
  const rightTextRef = useRef(null);
  const ctaRef = useRef(null);
  const imgRef = useRef(null);
  const navRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Heading lines reveal
      const lines = headingRef.current?.querySelectorAll('.hero-line');
      if (lines?.length) {
        tl.fromTo(lines,
          { y: '115%', opacity: 0 },
          { y: '0%', opacity: 1, duration: 1.3, stagger: 0.2, delay: 0.3 }
        );
      }

      // Left text
      if (leftTextRef.current) {
        tl.fromTo(leftTextRef.current,
          { x: -40, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8 },
          '-=0.6'
        );
      }

      // Right text
      if (rightTextRef.current) {
        tl.fromTo(rightTextRef.current,
          { x: 40, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8 },
          '-=0.6'
        );
      }

      // CTA buttons
      if (ctaRef.current?.children) {
        tl.fromTo(ctaRef.current.children,
          { y: 25, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.12 },
          '-=0.4'
        );
      }

      // Profile image
      if (imgRef.current) {
        tl.fromTo(imgRef.current,
          { scale: 1.15, opacity: 0, filter: 'blur(8px)' },
          { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1.4, ease: 'power2.out' },
          '-=1'
        );
      }

      // Nav links
      if (navRef.current?.children) {
        tl.fromTo(navRef.current.children,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.06 },
          '-=0.8'
        );
      }

      // Status cards
      if (cardsRef.current?.children) {
        tl.fromTo(cardsRef.current.children,
          { y: 20, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.5)' },
          '-=0.4'
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" id="hero" ref={sectionRef}>
      <div className="hero-sticky">
        <div className="container hero-container">
          {/* Top nav links (like heynesh.com) */}
          <div className="hero-nav-wrap" ref={navRef}>
            <a href="#work" className="hero-nav-link hover-target">
              <span className="hero-nav-bg" />
              <span className="hero-nav-text">Work</span>
              <span className="hero-nav-icon">&rarr;</span>
            </a>
            <span className="hero-nav-sep" />
            <a href="#expertise" className="hero-nav-link hover-target">
              <span className="hero-nav-bg" />
              <span className="hero-nav-text">Services</span>
              <span className="hero-nav-icon">&rarr;</span>
            </a>
            <span className="hero-nav-sep" />
            <a href="#about" className="hero-nav-link hover-target">
              <span className="hero-nav-bg" />
              <span className="hero-nav-text">About</span>
              <span className="hero-nav-icon">&rarr;</span>
            </a>
            <span className="hero-nav-sep" />
            <a href="#contact" className="hero-nav-link hover-target">
              <span className="hero-nav-bg" />
              <span className="hero-nav-text">Contact</span>
              <span className="hero-nav-icon">&rarr;</span>
            </a>
          </div>

          {/* Main hero content */}
          <div className="hero-content">
            <p className="hero-left-text" ref={leftTextRef}>
              The Digital Growth Expert. That's Sabir.
            </p>

            <h1 className="hero-heading" ref={headingRef}>
              <span className="hero-line-wrap"><span className="hero-line">Digital Growth,</span></span>
              <span className="hero-line-wrap"><span className="hero-line">Applied</span></span>
              <span className="hero-line-wrap"><span className="hero-line hero-line-accent">Differently.</span></span>
            </h1>

            <div className="hero-buttons-wrap" ref={ctaRef}>
              <a href="#work" className="hero-cta-button hover-target">
                <span>View My Work</span>
              </a>
              <a href="#about" className="hero-button hover-target">
                <span>About Me</span>
              </a>
            </div>

            <p className="hero-right-text" ref={rightTextRef}>
              Working closely with brands to deliver performance marketing,
              creative direction, and data-driven growth systems
              that merge strategy, execution, and long-term value.
            </p>
          </div>

          {/* Profile image + stats cards */}
          <div className="hero-bottom-layout">
            <div className="hero-profile-wrap">
              <div className="hero-profile-item" ref={imgRef}>
                <img src={portfolioImg} alt="Sabir Lalahiane" className="hero-profile-img" />
              </div>
            </div>

            <div className="hero-cards-wrap" ref={cardsRef}>
              <div className="hero-stat-card">
                <div className="hero-stat-card-bg" />
                <p className="hero-stat-text">7+<br/>Years</p>
              </div>
              <div className="hero-stat-card">
                <div className="hero-stat-card-bg" />
                <p className="hero-stat-text">50+<br/>Brands</p>
              </div>
              <div className="hero-stat-card">
                <div className="hero-stat-card-bg" />
                <p className="hero-stat-text">3M+<br/>Revenue</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
