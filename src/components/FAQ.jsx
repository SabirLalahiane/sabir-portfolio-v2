import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './FAQ.css';
import { faqs } from '../data/portfolioData';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

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

    const leftChildren = leftRef.current?.children;
    if (leftChildren?.length) {
      tl.fromTo(leftChildren,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.1 }
      );
    }

    const items = rightRef.current?.children;
    if (items?.length) {
      tl.fromTo(items,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.08 },
        '-=0.4'
      );
    }

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section className="faq" id="faq" ref={sectionRef}>
      <div className="container faq-container">
        <div className="faq-left" ref={leftRef}>
          <span className="section-label">FAQ</span>
          <h2 className="section-title">
            Frequently asked <span style={{ color: 'var(--accent)' }}>questions</span>
          </h2>
          <p className="faq-subtitle">
            Got a question? I've got answers. If you don't find what you're looking for, feel free to reach out.
          </p>
        </div>
        <div className="faq-right" ref={rightRef}>
          {faqs.map((faq, i) => (
            <div
              className={`faq-item ${openIndex === i ? 'faq-open' : ''}`}
              key={i}
            >
              <button className="faq-question hover-target" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                <span>{faq.question}</span>
                <span className="faq-icon">{openIndex === i ? '−' : '+'}</span>
              </button>
              <div className="faq-answer-wrap">
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
