import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import anime from 'animejs';
import styles from './Hero.module.scss';

export default function Hero() {
  const [text, setText] = useState('');
  const fullName = 'Dmitry Matveyev ';
  const cursorRef = useRef(null);
  const imageRef = useRef(null);
  const subtitleRef = useRef(null);
  const recognitionRef = useRef(null);
  const nameRef = useRef(null);

  useEffect(() => {
    // Анимация печатающегося текста
    let currentChar = 0;
    const typeTimer = setInterval(() => {
      if (currentChar < fullName.length) {
        setText(fullName.slice(0, currentChar + 1));
        currentChar++;
      } else {
        clearInterval(typeTimer);
        startSecondaryAnimations();
        startColorAnimation();
      }
    }, 100);

    // Анимация мигающего курсора
    anime({
      targets: cursorRef.current,
      opacity: [1, 0],
      duration: 800,
      easing: 'steps(2)',
      loop: true
    });

    return () => clearInterval(typeTimer);
  }, []);

  const startColorAnimation = () => {
    anime({
      targets: nameRef.current,
      background: [
        'linear-gradient(90deg, #64B5F6 0%, #E91E63 100%)',
        'linear-gradient(90deg, #E91E63 0%, #64B5F6 100%)',
        'linear-gradient(90deg, #64B5F6 0%, #E91E63 100%)'
      ],
      duration: 3000,
      direction: 'alternate',
      easing: 'easeInOutSine',
      loop: true,
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
    });
  };

  const startSecondaryAnimations = () => {
    anime.timeline({
      easing: 'easeOutExpo',
    })
    .add({
      targets: subtitleRef.current,
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 1200,
    })
    .add({
      targets: recognitionRef.current,
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 1200,
    }, '-=800')
    .add({
      targets: imageRef.current,
      scale: [0.9, 1],
      opacity: [0, 1],
      duration: 1500,
      rotate: ['2deg', '0deg'],
    }, '-=800');
  };

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.textContent}>
          <h1>
            <span ref={nameRef} className={styles.highlight}>
              {text}
              <span ref={cursorRef} className={styles.cursor}>|</span>
            </span>
            <span ref={subtitleRef} className={styles.subtitle}>
              Where Law Meets Innovation
            </span>
          </h1>
          <p ref={recognitionRef} className={styles.recognition}>
            Recognized by Chambers Europe as a leading Intellectual Property expert
          </p>
        </div>
        <div className={styles.imageWrapper} ref={imageRef}>
          <Image
            src="/images/main.jpg"
            alt="Dmitry Matveyev"
            width={400}
            height={500}
            priority
            className={styles.mainImage}
          />
        </div>
      </div>
    </section>
  );
} 