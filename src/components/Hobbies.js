'use client'
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import anime from 'animejs';
import styles from './Hobbies.module.scss';

export default function Hobbies() {
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll(`.${styles.card}`);
            anime({
              targets: cards,
              scale: [0.9, 1],
              opacity: [0, 1],
              delay: anime.stagger(200),
              duration: 1000,
              easing: 'easeOutExpo'
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const hobbies = [
    {
      title: 'Tennis',
      description: 'Mastering the court with precision and strategy',
      image: '/images/sport.jpg'
    },
    {
      title: 'Music',
      description: 'Finding harmony in every note',
      image: '/images/music.jpg'
    },
    {
      title: 'Travel',
      description: 'Exploring new horizons and cultures',
      image: '/images/travel.jpg'
    },
    {
      title: 'Photography',
      description: 'Capturing moments that tell stories',
      image: '/images/photo.jpg'
    }
  ];

  return (
    <section className={styles.hobbies} ref={containerRef}>
      <h2 className={styles.title}>Beyond Law: Personal Passions</h2>
      <div className={styles.container}>
        {hobbies.map((hobby, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.content}>
              <div className={styles.imgBx}>
                <Image
                  src={hobby.image}
                  alt={hobby.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>
              <div className={styles.contentBx}>
                <h3>{hobby.title}</h3>
                <p>{hobby.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Link 
        href="https://www.instagram.com/dmitrymatveyev/" 
        target="_blank" 
        rel="noopener noreferrer"
        className={styles.instagramLink}
      >
        <svg className={styles.instagramIcon} viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
        <span>Follow on Instagram</span>
      </Link>
    </section>
  );
} 