import React from 'react';
import '../../styles/components/HiraganaCard.css';

const HiraganaCard = ({ hiragana, romanji, image, description }) => {
  return (
    <div className="hiragana-card">
      <div className="hiragana-char">{hiragana}</div>
      <div className="romanji">{romanji}</div>
      {image && <img src={image} alt={hiragana} className="hiragana-image" />}
      {description && <p className="hiragana-description">{description}</p>}
    </div>
  );
};

export default HiraganaCard;
