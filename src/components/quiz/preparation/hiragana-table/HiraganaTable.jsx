import React from 'react';
import { useHiraganaContext } from '../../../../contexts/HiraganaContext.jsx';
import styles from './HiraganaTable.module.css';

const HiraganaTable = ({ 
  currentData, 
  currentColumns, 
  currentCategory
}) => {
  const {
    selectedCharacters,
    toggleCharacter,
    toggleRow,
    toggleColumn,
    toggleAll,
    isAllSelected
  } = useHiraganaContext();

  const isCurrentAllSelected = isAllSelected(currentData);

  return (
    <div className={styles.hiraganaTable}>
      {/* 열 헤더 */}
      <div className={styles.tableHeader}>
        <button 
          className={styles.selectAllBtn}
          onClick={() => toggleAll(currentData)}
          title="전체 선택/해제"
        >
          {isCurrentAllSelected ? '전체\n해제' : '전체\n선택'}
        </button>
        {currentColumns.map((col, colIndex) => (
          <button
            key={col}
            className={styles.columnHeader}
            onClick={() => toggleColumn(colIndex, currentData)}
            title={`${col}단 전체 선택/해제`}
          >
            {col}
          </button>
        ))}
      </div>

      {/* 각 행 */}
      {currentData.map((rowData, rowIndex) => (
        <div key={rowData.row} className={styles.tableRow}>
          <button
            className={styles.rowHeader}
            onClick={() => toggleRow(rowData)}
            title={`${rowData.row}행 전체 선택/해제`}
          >
            {rowData.row}
          </button>
          {rowData.characters.map((char, charIndex) => (
            <div key={charIndex} className={styles.characterCell}>
              {char ? (
                <button
                  className={`${styles.characterBtn} ${
                    selectedCharacters.has(`${char.hiragana}-${char.romaji}`) ? styles.selected : ''
                  }`}
                  onClick={() => toggleCharacter(char)}
                >
                  <div className={`${styles.hiragana} ${currentCategory === 'youon' ? styles.youonText : ''}`}>
                    {char.hiragana}
                  </div>
                  <div className={styles.romaji}>{char.romaji}</div>
                </button>
              ) : (
                <div className={styles.emptyCell}></div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default HiraganaTable; 