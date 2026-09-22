import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Contact.css';
import { contactData } from '../data/portfolioData';

const needs = [
  'Social Ads / SEA',
  'Production créa (Statiques / UGC)',
  'Creative Strategy',
  'Tracking & Data',
];

const budgets = [
  '< 1 000 \u20AC',
  '1 000 \u20AC \u2014 3 000 \u20AC',
  '3 000 \u20AC \u2014 5 000 \u20AC',
  '5 000 \u20AC \u2014 10 000 \u20AC',
  '10 000 \u20AC+',
];

export default function Contact() {
  const [selectedNeeds, setSelectedNeeds] = useState([]);
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
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.1 }
      );
    }

    if (rightRef.current) {
      tl.fromTo(rightRef.current,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      );
    }

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  const toggleNeed = (need) => {
    setSelectedNeeds((prev) =>
      prev.includes(need) ? prev.filter((n) => n !== need) : [...prev, need]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const phone = '212631297189';
    const website = e.target.elements.contactWebsite.value;
    const budget = e.target.elements.contactBudget.value;
    const message = encodeURIComponent(
      `Hey Sabir! I'm interested in a free marketing audit.\n\nWebsite: ${website}\nNeeds: ${selectedNeeds.join(', ')}\nBudget: ${budget}`
    );
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
    e.target.reset();
    setSelectedNeeds([]);
  };

  return (
    <section className="contact" id="contact" ref={sectionRef}>
      <div className="container contact-container">
        <div className="contact-left" ref={leftRef}>
          <span className="section-label">Get In Touch</span>
          <h2 className="section-title">
            {contactData.heading}
          </h2>
          <p className="contact-desc">{contactData.desc}</p>
          <div className="contact-items">
            <a href={`mailto:${contactData.email}`} className="contact-item hover-target">
              <span className="contact-icon email-icon">&#9993;</span>
              <div>
                <strong>Email</strong>
                <span>{contactData.email}</span>
              </div>
            </a>
            <a href={`tel:${contactData.phone.replace(/\s/g, '')}`} className="contact-item hover-target">
              <span className="contact-icon phone-icon">&#9742;</span>
              <div>
                <strong>Phone</strong>
                <span>{contactData.phone}</span>
              </div>
            </a>
            <div className="contact-item">
              <span className="contact-icon location-icon">&#9873;</span>
              <div>
                <strong>Location</strong>
                <span>{contactData.location}</span>
              </div>
            </div>
          </div>
          <a href={contactData.linkedin} target="_blank" rel="noopener noreferrer" className="linkedin-btn hover-target">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn Profile
          </a>
        </div>

        <div className="contact-right" ref={rightRef}>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-field">
              <label>Quel est votre site web ? <span className="required">*</span></label>
              <input type="url" name="contactWebsite" placeholder="https://votre-site.com" required />
            </div>
            <div className="contact-field">
              <label>Quels sont vos besoins ? <span className="required">*</span></label>
              <div className="contact-checkboxes">
                {needs.map((need) => (
                  <label className={`contact-checkbox ${selectedNeeds.includes(need) ? 'active' : ''}`} key={need}>
                    <input
                      type="checkbox"
                      checked={selectedNeeds.includes(need)}
                      onChange={() => toggleNeed(need)}
                    />
                    {need}
                  </label>
                ))}
              </div>
            </div>
            <div className="contact-field">
              <label>Quel budget mensuel souhaitez-vous allouer à la publicité ? <span className="required">*</span></label>
              <select name="contactBudget" required defaultValue="">
                <option value="" disabled>Sélectionnez un budget</option>
                {budgets.map((b) => (
                  <option value={b} key={b}>{b}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="form-submit hover-target">
              Envoyer via WhatsApp &#8594;
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
