'use client'
import { useEffect, useRef } from 'react';
import styles from './GameFooter.module.scss';

export default function GameFooter({ score, isVisible }) {
  const footerRef = useRef(null);

  useEffect(() => {
    if (isVisible && footerRef.current) {
      footerRef.current.style.transform = 'translateY(0)';
      footerRef.current.style.opacity = '1';
    }
  }, [isVisible]);

  return (
    <footer 
      ref={footerRef} 
      className={`${styles.footer} ${isVisible ? styles.visible : ''}`}
    >
      <div className={styles.content}>
        <h2 className={styles.title}>Game Over!</h2>
        <p className={styles.score}>Your Score: {score}</p>
        
        <div className={styles.social}>
          <p>Follow me on Facebook for more updates:</p>
          <a 
            href="https://www.facebook.com/dmitry.matveyev"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.fbButton}
          >
            <svg viewBox="0 0 24 24" className={styles.fbIcon}>
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
            </svg>
            Follow on Facebook
          </a>
        </div>

        <div className={styles.contact}>
          <h3>Contact Information:</h3>
          <p>Email: your.email@example.com</p>
          <p>Phone: +1234567890</p>
        </div>
      </div>
    </footer>
  );
} 