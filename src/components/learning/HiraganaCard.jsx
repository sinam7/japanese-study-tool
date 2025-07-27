import React from 'react';
import styles from './HiraganaCard.module.css';

const HiraganaCard = ({ hiragana, romaji, image, description }) => {
  return (
    <div className={styles.hiraganaCard}>
      <div className={styles.hiraganaChar}>{hiragana}</div>
      <div className={styles.romaji}>{romaji}</div>
      {image && <img src={image} alt={hiragana} className={styles.hiraganaImage} />}
      {description && <p className={styles.hiraganaDescription}>{description}</p>}
    </div>
  );
};

export default HiraganaCard;
