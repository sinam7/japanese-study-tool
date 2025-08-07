import { 
  basicHiraganaData, 
  dakutenData, 
  handakutenData, 
  youonData 
} from '../components/quiz/preparation/hiragana-table/extendedHiraganaData';

// 모든 히라가나 문자와 로마자를 매핑하는 맵 생성
export const getAllHiraganaMap = () => {
  const hiraganaMap = {};
  
  // 기본 50음도 추가
  basicHiraganaData.forEach(row => {
    row.characters.forEach(char => {
      if (char) {
        hiraganaMap[char.hiragana] = char.romaji;
      }
    });
  });
  
  // 탁음 추가
  dakutenData.forEach(row => {
    row.characters.forEach(char => {
      if (char) {
        hiraganaMap[char.hiragana] = char.romaji;
      }
    });
  });
  
  // 반탁음 추가
  handakutenData.forEach(row => {
    row.characters.forEach(char => {
      if (char) {
        hiraganaMap[char.hiragana] = char.romaji;
      }
    });
  });
  
  // 요음 추가
  youonData.forEach(row => {
    row.characters.forEach(char => {
      if (char) {
        hiraganaMap[char.hiragana] = char.romaji;
      }
    });
  });
  
  return hiraganaMap;
};

// 히라가나 문자인지 확인하는 함수
export const isHiragana = (char) => {
  const hiraganaMap = getAllHiraganaMap();
  return hiraganaMap.hasOwnProperty(char);
};

// 문장에서 히라가나 문자들만 추출하는 함수
export const extractHiraganaFromSentence = (sentence) => {
  const hiraganaMap = getAllHiraganaMap();
  const characters = [];
  
  for (let i = 0; i < sentence.length; i++) {
    const char = sentence[i];
    
    // 요음 체크 (2글자) - 먼저 확인
    if (i < sentence.length - 1) {
      const twoChar = sentence.slice(i, i + 2);
      if (hiraganaMap[twoChar]) {
        characters.push({
          hiragana: twoChar,
          romaji: hiraganaMap[twoChar],
          position: i,
          length: 2
        });
        i++; // 다음 글자 건너뛰기
        continue;
      }
    }
    
    // 일반 히라가나 체크 (1글자)
    if (hiraganaMap[char]) {
      characters.push({
        hiragana: char,
        romaji: hiraganaMap[char],
        position: i,
        length: 1
      });
    }
  }
  
  return characters;
};

// 문장의 유효성 검사 (히라가나 문자가 포함되어 있는지)
export const validateHiraganaSentence = (sentence) => {
  const hiraganaCharacters = extractHiraganaFromSentence(sentence);
  return {
    isValid: hiraganaCharacters.length > 0,
    characterCount: hiraganaCharacters.length,
    characters: hiraganaCharacters
  };
};

// 로마자 표기 정규화 (대소문자 통일, 공백 제거)
export const normalizeRomaji = (romaji) => {
  return romaji.toLowerCase().trim();
};

// 답안 검증 함수
export const checkAnswer = (userAnswer, correctAnswer) => {
  const normalizedUser = normalizeRomaji(userAnswer);
  const normalizedCorrect = normalizeRomaji(correctAnswer);
  return normalizedUser === normalizedCorrect;
};

// 요음 패턴 확인
export const isYouon = (hiragana) => {
  const youonPatterns = [
    'きゃ', 'きゅ', 'きょ',
    'しゃ', 'しゅ', 'しょ',
    'ちゃ', 'ちゅ', 'ちょ',
    'にゃ', 'にゅ', 'にょ',
    'ひゃ', 'ひゅ', 'ひょ',
    'みゃ', 'みゅ', 'みょ',
    'りゃ', 'りゅ', 'りょ',
    'ぎゃ', 'ぎゅ', 'ぎょ',
    'じゃ', 'じゅ', 'じょ',
    'びゃ', 'びゅ', 'びょ',
    'ぴゃ', 'ぴゅ', 'ぴょ'
  ];
  return youonPatterns.includes(hiragana);
};

// 탁음 패턴 확인
export const isDakuten = (hiragana) => {
  const dakutenMap = getAllHiraganaMap();
  const dakutenPatterns = ['が', 'ぎ', 'ぐ', 'げ', 'ご', 'ざ', 'じ', 'ず', 'ぜ', 'ぞ', 'だ', 'ぢ', 'づ', 'で', 'ど', 'ば', 'び', 'ぶ', 'べ', 'ぼ'];
  return dakutenPatterns.includes(hiragana);
};

// 반탁음 패턴 확인
export const isHandakuten = (hiragana) => {
  const handakutenPatterns = ['ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ'];
  return handakutenPatterns.includes(hiragana);
}; 