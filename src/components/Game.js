'use client'
import { useEffect, useRef, useState } from 'react';
import styles from './Game.module.scss';

let Phaser;
if (typeof window !== 'undefined') {
  Phaser = require('phaser');
}

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
    this.score = 0;
  }

  create() {
    // Создаем графические объекты
    const graphics = this.add.graphics();

    // Создаем игрока (синий квадрат)
    graphics.fillStyle(0x64B5F6);
    graphics.fillRect(0, 0, 50, 50);
    graphics.generateTexture('player', 50, 50);

    // Создаем документ (белый прямоугольник)
    graphics.clear();
    graphics.fillStyle(0xFFFFFF);
    graphics.fillRect(0, 0, 40, 60);
    graphics.generateTexture('document', 40, 60);

    // Создаем препятствие (красный круг)
    graphics.clear();
    graphics.fillStyle(0xFF4444);
    graphics.fillCircle(25, 25, 25);
    graphics.generateTexture('obstacle', 50, 50);

    graphics.destroy();

    // Создаем игрока
    this.player = this.add.sprite(400, 500, 'player');
    this.player.setScale(0.8);

    // Включаем физику
    this.physics.add.existing(this.player);
    this.player.body.setCollideWorldBounds(true);

    // Группы для документов и препятствий
    this.documents = this.physics.add.group();
    this.obstacles = this.physics.add.group();

    // Добавляем коллизии
    this.physics.add.overlap(this.player, this.documents, this.collectDocument, null, this);
    this.physics.add.overlap(this.player, this.obstacles, this.gameOver, null, this);

    // Таймеры для создания объектов
    this.time.addEvent({
      delay: 2000,
      callback: this.spawnDocument,
      callbackScope: this,
      loop: true
    });

    this.time.addEvent({
      delay: 3000,
      callback: this.spawnObstacle,
      callbackScope: this,
      loop: true
    });

    // Добавляем текст счета
    this.scoreText = this.add.text(16, 16, 'Score: 0', {
      fontSize: '32px',
      fill: '#fff',
      fontFamily: 'Arial'
    });

    // Управление
    this.cursors = this.input.keyboard.createCursorKeys();

    // Добавляем инструкции
    this.add.text(16, this.game.config.height - 40, 'Use ← → arrows or touch sides to move', {
      fontSize: '16px',
      fill: '#fff',
      fontFamily: 'Arial'
    });
  }

  update() {
    // Управление клавиатурой
    if (this.cursors.left.isDown) {
      this.player.x -= 5;
    }
    if (this.cursors.right.isDown) {
      this.player.x += 5;
    }

    // Мобильное управление
    if (this.input.activePointer.isDown) {
      const touchX = this.input.activePointer.x;
      if (touchX < this.game.config.width / 2) {
        this.player.x -= 5;
      } else {
        this.player.x += 5;
      }
    }

    // Вращение объектов
    this.documents.getChildren().forEach(doc => {
      doc.angle += 1;
    });
    this.obstacles.getChildren().forEach(obs => {
      obs.angle -= 2;
    });
  }

  spawnDocument() {
    const x = Phaser.Math.Between(100, 700);
    const document = this.documents.create(x, 0, 'document');
    document.setScale(0.8);
    document.setVelocityY(200);
  }

  spawnObstacle() {
    const x = Phaser.Math.Between(100, 700);
    const obstacle = this.obstacles.create(x, 0, 'obstacle');
    obstacle.setScale(0.8);
    obstacle.setVelocityY(300);
  }

  collectDocument(player, document) {
    document.destroy();
    this.score += 10;
    this.scoreText.setText('Score: ' + this.score);

    // Эффект при сборе документа
    this.tweens.add({
      targets: this.scoreText,
      scale: 1.2,
      duration: 100,
      yoyo: true
    });
  }

  gameOver() {
    this.scene.pause();
    this.game.events.emit('gameOver', this.score);
  }
}

export default function Game() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const gameRef = useRef(null);

  const getGameDimensions = () => {
    const width = Math.min(800, window.innerWidth);
    const height = Math.min(600, window.innerHeight);
    return { width, height };
  };

  useEffect(() => {
    const handleResize = () => {
      if (gameRef.current) {
        const { width, height } = getGameDimensions();
        gameRef.current.scale.resize(width, height);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (gameRef.current) {
        gameRef.current.destroy(true);
      }
    };
  }, []);

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);

    const { width, height } = getGameDimensions();

    const config = {
      type: Phaser.AUTO,
      parent: 'game-container',
      width,
      height,
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: 'game-container',
      },
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false
        }
      },
      scene: GameScene,
      backgroundColor: '#1a1a1a'
    };

    gameRef.current = new Phaser.Game(config);

    gameRef.current.events.on('gameOver', (finalScore) => {
      setScore(finalScore);
      setIsPlaying(false);
      gameRef.current.destroy(true);
    });
  };

  return (
    <section className={styles.gameSection}>
      <div className={styles.gameInfo}>
        <h2>Legal Documents Collector</h2>
        <p>Collect legal documents and avoid obstacles!</p>
        <p className={styles.score}>Score: {score}</p>
        {!isPlaying && (
          <button className={styles.startButton} onClick={startGame}>
            Start Game
          </button>
        )}
      </div>
      <div id="game-container" className={styles.gameContainer} />
    </section>
  );
} 