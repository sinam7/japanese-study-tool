import { hiraganaData } from '../data/hiraganaData';

export const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const getAllCharacters = () => {
  return hiraganaData
    .flatMap(row => row.characters)
    .filter(char => char !== null);
};

export const generateChoices = (correctAnswer, choiceCount) => {
  const allCharacters = getAllCharacters();
  const otherCharacters = allCharacters.filter(
    char => char.hiragana !== correctAnswer.hiragana
  );
  
  const wrongAnswersNeeded = choiceCount - 1;
  const shuffledOthers = shuffleArray(otherCharacters);
  const wrongAnswers = shuffledOthers.slice(0, wrongAnswersNeeded);
  
  const allChoices = [correctAnswer, ...wrongAnswers];
  return shuffleArray(allChoices);
};
