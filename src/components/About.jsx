import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';
import aboutPhoto from '../assets/about-photo.png';

export default function About() {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const contentRef = useRef(null);
  const tagsRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    tl.fromTo(imgRef.current,
      { x: -60, opacity: 0, scale: 0.95 },
      { x: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }
    );

    const contentChildren = contentRef.current?.children;
    if (contentChildren?.length) {
      tl.fromTo(contentChildren,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.1 },
        '-=0.6'
      );
    }

    const tags = tagsRef.current?.children;
    if (tags?.length) {
      tl.fromTo(tags,
        { y: 20, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)', stagger: 0.05 },
        '-=0.3'
      );
    }

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section className="about" id="about" ref={sectionRef}>
      <div className="container about-container">
        <div className="about-left" ref={imgRef}>
          <img src={aboutPhoto} alt="Sabir Lalahiane" className="about-img" />
        </div>
        <div className="about-right">
          <div ref={contentRef}>
            <span className="section-label">About Me</span>
            <h2 className="section-title">
              Turning clicks into <span style={{ color: 'var(--accent)' }}>customers</span>
            </h2>
            <p className="about-text">
              "Many of my clients are new to digital media — and I take pride in being patient, understanding, and results-obsessed. I don't just run ads. I architect full-funnel growth strategies that turn strangers into paying customers."
            </p>
            <p className="about-text">
              Performance-driven Digital Marketer & Ads Specialist with 5+ years of experience scaling eCommerce, B2B, and service businesses across Europe and beyond. Fluent in English & Arabic — your global growth partner based in Marrakech, Morocco.
            </p>
          </div>
          <div className="about-tags" ref={tagsRef}>
            {['Meta Ads', 'Google Ads', 'TikTok Ads', 'GA4 & GTM', 'B2B Lead Gen', 'eCommerce', 'A/B Testing', 'Looker Studio'].map((tag) => (
              <span className="about-tag hover-target" key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
