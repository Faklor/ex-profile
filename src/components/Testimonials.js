'use client'
import { useState, useEffect } from 'react';
import styles from './Testimonials.module.scss';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const testimonials = [
    {
      text: "Dmitry Matveev is a leading specialist in IT/IP law, recognized by Chambers Europe. His deep understanding of the technology sector and legal aspects makes him an indispensable partner for IT companies. His expertise in digital law and intellectual property has earned him recognition among international legal directories.",
      author: "Chambers Europe",
      position: "Legal Directory",
      year: "2023"
    },
    {
      text: "As a partner at REVERA Law Firm, Dmitry leads the IT/IP practice and provides expert advice on intellectual property and information technology matters. His innovative approach to legal solutions has helped numerous technology companies navigate complex regulatory landscapes.",
      author: "REVERA Law Firm",
      position: "Legal Practice",
      year: "2023"
    },
    {
      text: "Dmitry's professional experience includes supporting major IT projects in Belarus, advising startups, and working with international technology companies. His track record of successful cases and deep industry knowledge makes him a trusted advisor in the IT sector.",
      author: "Legal 500",
      position: "International Legal Directory",
      year: "2023"
    },
    {
      text: "An expert in IT business structuring, intellectual property protection, and investment transactions in the technology sector. Dmitry's strategic approach and comprehensive understanding of both legal and technical aspects set him apart in the field of IT law.",
      author: "IT Legal Community",
      position: "Professional Association",
      year: "2023"
    }
  ];
  
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={styles.testimonials}>
      <h2>Testimonials & Recognition</h2>
      <div className={styles.sliderContainer}>
        <div className={styles.slider}>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`${styles.slide} ${index === activeIndex ? styles.active : ''}`}
              style={{
                transform: `translateX(${(index - activeIndex) * 120}%)`
              }}
            >
              <div className={styles.quoteIcon}>"</div>
              <p className={styles.text}>{testimonial.text}</p>
              <div className={styles.author}>
                <strong>{testimonial.author}</strong>
                <span>{testimonial.position}</span>
                <span className={styles.year}>{testimonial.year}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.dots}>
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === activeIndex ? styles.activeDot : ''}`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
} 