'use client'
import { useState } from 'react';
import styles from './PersonalProfile.module.scss';

export default function PersonalProfile() {
  const [activeTab, setActiveTab] = useState('personal');

  const content = {
    personal: {
      title: "Beyond the Law",
      items: [
        {
          title: "Tech Enthusiast",
          description: "Passionate about emerging technologies and their impact on society. Regular participant in tech conferences and meetups.",
          icon: "💻"
        },
        {
          title: "Continuous Learner",
          description: "Constantly exploring new areas of knowledge, from blockchain technology to artificial intelligence ethics.",
          icon: "📚"
        },
        {
          title: "Community Builder",
          description: "Active member of legal and tech communities, organizing knowledge-sharing sessions and mentoring young professionals.",
          icon: "🤝"
        },
        {
          title: "Work-Life Balance",
          description: "Advocate for maintaining a healthy work-life balance through sports, reading, and quality time with family.",
          icon: "⚖️"
        }
      ]
    },
    interests: {
      title: "Personal Interests",
      items: [
        {
          title: "Sports & Fitness",
          description: "Regular tennis player and fitness enthusiast, believing in the connection between physical and mental well-being.",
          icon: "🎾"
        },
        {
          title: "Literature & Arts",
          description: "Avid reader of both classical literature and contemporary tech publications. Appreciates modern art exhibitions.",
          icon: "📖"
        },
        {
          title: "Travel & Culture",
          description: "Enjoys exploring different cultures and gaining new perspectives through international travel.",
          icon: "✈️"
        },
        {
          title: "Innovation & Creativity",
          description: "Follows latest tech trends and startups, often attending innovation forums and creative workshops.",
          icon: "💡"
        }
      ]
    },
    values: {
      title: "Personal Values",
      items: [
        {
          title: "Integrity",
          description: "Committed to maintaining highest ethical standards in both professional and personal life.",
          icon: "🎯"
        },
        {
          title: "Growth Mindset",
          description: "Believes in continuous personal development and embracing new challenges.",
          icon: "🌱"
        },
        {
          title: "Community Impact",
          description: "Dedicated to making positive impact through knowledge sharing and mentoring.",
          icon: "🌟"
        },
        {
          title: "Innovation",
          description: "Passionate about finding creative solutions and embracing technological progress.",
          icon: "🚀"
        }
      ]
    }
  };

  return (
    <section className={styles.personalProfile}>
      <h2>Personal Journey</h2>
      
      <div className={styles.tabs}>
        <button 
          className={`${styles.tab} ${activeTab === 'personal' ? styles.active : ''}`}
          onClick={() => setActiveTab('personal')}
        >
          Beyond the Law
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'interests' ? styles.active : ''}`}
          onClick={() => setActiveTab('interests')}
        >
          Personal Interests
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'values' ? styles.active : ''}`}
          onClick={() => setActiveTab('values')}
        >
          Values
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.grid}>
          {content[activeTab].items.map((item, index) => (
            <div key={index} className={styles.item}>
              <div className={styles.icon}>{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 