import React from 'react';
import HiraganaTable from './HiraganaTable';
import QuizSettings from './QuizSettings';
import SelectedCharactersList from './SelectedCharactersList';
import useHiraganaSelector from '../../../hooks/useHiraganaSelector';
import styles from './QuizPreparation.module.css';

const QuizPreparation = ({ onStartQuiz }) => {
  const {
    // 상태들
    selectedCharacters,
    quizType,
    setQuizType,
    choiceCount,
    setChoiceCount,
    currentData,
    currentColumns,
    
    // 계산된 값들
    isAllSelected,
    selectedCharactersArray,
    
    // 함수들
    toggleCharacter,
    toggleRow,
    toggleColumn,
    toggleAll,
  } = useHiraganaSelector();

  const handleStartQuiz = () => {
    const settings = {
      type: quizType,
      choiceCount: choiceCount,
      autoSubmit: true // 기본값을 true로 설정
    };
    onStartQuiz(selectedCharactersArray, settings);
  };

  return (
    <div className={styles.hiraganaSelector}>
      <HiraganaTable
        selectedCharacters={selectedCharacters}
        currentData={currentData}
        currentColumns={currentColumns}
        isAllSelected={isAllSelected}
        toggleCharacter={toggleCharacter}
        toggleRow={toggleRow}
        toggleColumn={toggleColumn}
        toggleAll={toggleAll}
      />

      <div className={styles.bottomSections}>
        <QuizSettings
          quizType={quizType}
          setQuizType={setQuizType}
          choiceCount={choiceCount}
          setChoiceCount={setChoiceCount}
        />

        <SelectedCharactersList
          selectedCharacters={selectedCharacters}
          selectedCharactersArray={selectedCharactersArray}
          onStartQuiz={handleStartQuiz}
        />
      </div>
    </div>
  );
};

export default QuizPreparation; 