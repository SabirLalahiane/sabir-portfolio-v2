import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Expertise.css';
import { expertise } from '../data/portfolioData';

export default function Expertise() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

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

    const headerChildren = headerRef.current?.children;
    if (headerChildren?.length) {
      tl.fromTo(headerChildren,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.1 }
      );
    }

    const cards = gridRef.current?.children;
    if (cards?.length) {
      tl.fromTo(cards,
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out', stagger: 0.08 },
        '-=0.4'
      );
    }

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section className="expertise" id="expertise" ref={sectionRef}>
      <div className="container">
        <div ref={headerRef}>
          <span className="section-label">Services</span>
          <h2 className="section-title">
            What I <span style={{ color: 'var(--accent)' }}>do</span>
          </h2>
        </div>
        <div className="expertise-grid" ref={gridRef}>
          {expertise.map((item, i) => (
            <div className="expertise-card hover-target" key={i}>
              <div className="expertise-icon">{item.icon}</div>
              <h3 className="expertise-title">{item.title}</h3>
              <p className="expertise-desc">{item.description}</p>
              <div className="expertise-card-line" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
