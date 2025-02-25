import { useEffect, useRef } from 'react';
import Image from 'next/image';
import anime from 'animejs';
import styles from './Hero.module.scss';

export default function Hero() {
  const titleRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    anime.timeline({
      easing: 'easeOutExpo',
    })
    .add({
      targets: titleRef.current,
      opacity: [0, 1],
      translateY: [50, 0],
      duration: 2000,
    })
    .add({
      targets: imageRef.current,
      scale: [0.9, 1],
      opacity: [0, 1],
      duration: 1500,
    }, '-=1800'); // Начинаем немного раньше, чем закончится предыдущая анимация
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.textContent} ref={titleRef}>
          <h1>
            <span className={styles.highlight}>Dmitry Matveyev</span>
            <span className={styles.subtitle}>Where Law Meets Innovation</span>
          </h1>
          <p className={styles.recognition}>
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