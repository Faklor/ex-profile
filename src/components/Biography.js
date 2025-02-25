'use client'
import { useEffect, useRef } from 'react';
import styles from './Biography.module.scss';

export default function Biography() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  const timelineItems = [
    {
      icon: (
        <svg viewBox="0 0 24 24" className={styles.icon}>
          <path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM13 16h-2v2h2v-2zm0-6h-2v4h2v-4z"/>
        </svg>
      ),
      text: "Dmitry Matveyev has been assisting the projects in the field of information technologies and intellectual property for more than 10 years, he is regarded as an expert in the above field."
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className={styles.icon}>
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.18l7 3.12v5.7c0 4.83-3.4 9.16-7 10.35-3.6-1.2-7-5.52-7-10.35V6.3l7-3.12z"/>
        </svg>
      ),
      text: "He is top ranked lawyer in the field of intellectual property/IT according to the international ranking Chambers Europe 2015 (has got the highest Tier 1 position)."
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className={styles.icon}>
          <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"/>
        </svg>
      ),
      text: "In the business incubator of the Hi-Tech Park he conducts regular workshops on legal aspects of operating IT business as part of the Cooperation Agreement signed between Aleinikov & Partners and the Hi-Tech Park. Author of a number of scientific research works and publications in the Republic of Belarus and abroad."
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className={styles.icon}>
          <path d="M20 3H4c-1.1 0-1.99.9-1.99 2L2 15c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 3h2v2h-2V6zm0 3h2v2h-2V9zM8 6h2v2H8V6zm0 3h2v2H8V9zm-1 6l-1-1h3L8 15zm9-6h-2V6h2v3zm0-3h-2V6h2v2zm3 3h-2V9h2v2zm0-3h-2V6h2v2zm-7 15l4-4H8l4 4z"/>
        </svg>
      ),
      text: "In 2017, Dmitry Matveyev won \"Mentor of the Year\" Award. Traditionally, the award goes to the entrepreneurs who made the most exceptional effort to the Belarusian startup ecosystem development."
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className={styles.icon}>
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z"/>
        </svg>
      ),
      text: "A number of milestone for the country IT projects and M&A transactions in the field of IT and telecommunications were successfully finalyzed under the direction of Dmitry Matveyev."
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className={styles.icon}>
          <path d="M4 10h3v7H4zm6.5 0h3v7h-3zM2 19h20v3H2zm15-9h3v7h-3zm-5-9L2 6v2h20V6z"/>
        </svg>
      ),
      text: "Dmitry Matveyev has also significant experience in the field of banking/finance law and capital market. Over the years the authoritative international rankings Chambers Global, Chambers Europe, Legal 500, International Financial Law Review 1000 recommend Dmitry Matveyev as an expert in commercial and finance law."
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className={styles.icon}>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
        </svg>
      ),
      text: "Within the scope of the World Bank's project on technical assistance to the Republic of Belarus on harmonizing of the domestic legislation with the EU Directives and IOSCO standards, he participated as a legal advisor (on the World Bank's side) in the working group on development of the draft Law On Collective Investments Scheme, Law On Securities Market, Law On Securitization."
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className={styles.icon}>
          <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/>
        </svg>
      ),
      text: "Working languages: Russian, English."
    }
  ];

  return (
    <section className={styles.biography}>
      <video
        ref={videoRef}
        className={styles.backgroundVideo}
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/video/background.mp4" type="video/mp4" />
      </video>
      <div className={styles.content}>
        <div className={styles.section}>
          <h2>Education & Expertise</h2>
          <div className={styles.educationBlock}>
            <p>Graduated with honors from the European Humanities University, law faculty (2004).</p>
            <p>Post-graduate of the Institute of State and Law of the National Academy of Sciences of Belarus (field of research is information technologies).</p>
            <p className={styles.expertise}>Fields of expertise: intellectual property / IT, corporate / M&A, banking and finance, commercial law.</p>
          </div>
        </div>

        <div className={styles.section}>
          <h2>Professional Background</h2>
          <div className={styles.timelineGrid}>
            {timelineItems.map((item, index) => (
              <div key={index} className={styles.timelineItem}>
                <div className={styles.iconWrapper}>
                  {item.icon}
                </div>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 