import React from 'react';

import ExtendedHiraganaTable from './hiragana-table/ExtendedHiraganaTable';
import QuizSettings from './components/QuizSettings';
import SelectedCharactersList from './components/SelectedCharactersList';
import { HiraganaProvider } from '../../../contexts/HiraganaContext.jsx';
import useHiraganaSelection from '../../../hooks/useHiraganaSelection';
import useExtendedHiraganaSelector from '../../../hooks/useExtendedHiraganaSelector';

import styles from './QuizPreparation.module.css';

const QuizPreparation = ({ onStartQuiz }) => {
  // 히라가나 선택 상태 관리
  const hiraganaSelection = useHiraganaSelection();
  const { selectedCharacters } = hiraganaSelection;

  // 반응형 데이터와 퀴즈 설정 관리
  const {
    selectedCharactersList,
    selectedCount,
    quizType,
    setQuizType,
    choiceCount,
    setChoiceCount,
    getResponsiveData,
    getResponsiveColumns,
  } = useExtendedHiraganaSelector(selectedCharacters);

  const handleStartQuiz = () => {
    const settings = {
      type: quizType,
      choiceCount: choiceCount,
      autoSubmit: true // 기본값을 true로 설정
    };
    onStartQuiz(selectedCharactersList, settings);
  };

  return (
    <HiraganaProvider value={hiraganaSelection}>
      <div className={styles.hiraganaSelector}>
        <ExtendedHiraganaTable
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
    </HiraganaProvider>
  );
};

export default QuizPreparation; 