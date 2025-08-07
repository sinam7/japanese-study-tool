import React from 'react';
import ExtendedHiraganaTable from './ExtendedHiraganaTable';
import QuizSettings from './QuizSettings';
import SelectedCharactersList from './SelectedCharactersList';
import useExtendedHiraganaSelector from '../../../hooks/useExtendedHiraganaSelector';
import styles from './QuizPreparation.module.css';

const QuizPreparation = ({ onStartQuiz }) => {
  const {
    // 상태들
    selectedCharacters,
    selectedCharactersList,
    selectedCount,
    quizType,
    setQuizType,
    choiceCount,
    setChoiceCount,
    
    // 함수들
    toggleCharacter,
    toggleRow,
    toggleColumn,
    toggleAll,
    isAllSelected,
    getResponsiveData,
    getResponsiveColumns,
  } = useExtendedHiraganaSelector();

  const handleStartQuiz = () => {
    const settings = {
      type: quizType,
      choiceCount: choiceCount,
      autoSubmit: true // 기본값을 true로 설정
    };
    onStartQuiz(selectedCharactersList, settings);
  };

  return (
    <div className={styles.hiraganaSelector}>
      <ExtendedHiraganaTable
        selectedCharacters={selectedCharacters}
        isAllSelected={isAllSelected}
        toggleCharacter={toggleCharacter}
        toggleRow={toggleRow}
        toggleColumn={toggleColumn}
        toggleAll={toggleAll}
        getResponsiveData={getResponsiveData}
        getResponsiveColumns={getResponsiveColumns}
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
          selectedCharactersArray={selectedCharactersList}
          onStartQuiz={handleStartQuiz}
        />
      </div>
    </div>
  );
};

export default QuizPreparation; 