// 애플리케이션 전체에서 사용하는 상수들
export const LOCAL_STORAGE_KEYS = {
  SELECTED_CHARACTERS: 'hiragana-quiz-selected-characters',
  LAYOUT_MODE: 'hiragana-quiz-layout-mode',
  QUIZ_SETTINGS: 'hiragana-quiz-settings',
};

// 기타 상수들
export const DEFAULT_VALUES = {
  LAYOUT_MODE: 'horizontal',
  QUIZ_SETTINGS: {
    type: 'input',
    choiceCount: 3
  }
}; 