import React from 'react';
import '../../../styles/components/HiraganaSelector.css';

const HiraganaTable = ({ 
  selectedCharacters, 
  currentData, 
  currentColumns, 
  isAllSelected,
  toggleCharacter,
  toggleRow,
  toggleColumn,
  toggleAll 
}) => {
  return (
    <div className="hiragana-table">
      {/* 열 헤더 */}
      <div className="table-header">
        <button 
          className="select-all-btn"
          onClick={toggleAll}
          title="전체 선택/해제"
        >
          {isAllSelected ? '전체\n해제' : '전체\n선택'}
        </button>
        {currentColumns.map((col, colIndex) => (
          <button
            key={col}
            className="column-header"
            onClick={() => toggleColumn(colIndex)}
            title={`${col}단 전체 선택/해제`}
          >
            {col}
          </button>
        ))}
      </div>

      {/* 각 행 */}
      {currentData.map((rowData, rowIndex) => (
        <div key={rowData.row} className="table-row">
          <button
            className="row-header"
            onClick={() => toggleRow(rowData)}
            title={`${rowData.row}행 전체 선택/해제`}
          >
            {rowData.row}
          </button>
          {rowData.characters.map((char, charIndex) => (
            <div key={charIndex} className="character-cell">
              {char ? (
                <button
                  className={`character-btn ${
                    selectedCharacters.has(`${char.hiragana}-${char.romaji}`) ? 'selected' : ''
                  }`}
                  onClick={() => toggleCharacter(char)}
                >
                  <div className="hiragana">{char.hiragana}</div>
                  <div className="romaji">{char.romaji}</div>
                </button>
              ) : (
                <div className="empty-cell"></div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default HiraganaTable; 