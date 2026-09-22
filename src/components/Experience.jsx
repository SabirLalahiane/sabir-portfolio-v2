import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Experience.css';
import { experience } from '../data/portfolioData';

export default function Experience() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const timelineRef = useRef(null);

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

    const items = timelineRef.current?.children;
    if (items?.length) {
      tl.fromTo(items,
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.15 },
        '-=0.3'
      );
    }

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section className="experience" id="experience" ref={sectionRef}>
      <div className="container">
        <div ref={headerRef}>
          <span className="section-label">Experience</span>
          <h2 className="section-title">
            My <span style={{ color: 'var(--accent)' }}>journey</span>
          </h2>
        </div>
        <div className="experience-timeline" ref={timelineRef}>
          {experience.map((item, i) => (
            <div className="experience-item" key={i}>
              <div className="experience-dot" />
              <div className="experience-line" />
              <div className="experience-content">
                <span className="experience-period">{item.period}</span>
                <h3 className="experience-role">{item.role}</h3>
                <span className="experience-company">{item.company}</span>
                <p className="experience-desc">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
