import React from 'react';
import '../../styles/components/HiraganaCard.css';

const HiraganaCard = ({ hiragana, romaji, image, description }) => {
  return (
    <div className="hiragana-card">
      <div className="hiragana-char">{hiragana}</div>
      <div className="romaji">{romaji}</div>
      {image && <img src={image} alt={hiragana} className="hiragana-image" />}
      {description && <p className="hiragana-description">{description}</p>}
    </div>
  );
};

export default HiraganaCard;
