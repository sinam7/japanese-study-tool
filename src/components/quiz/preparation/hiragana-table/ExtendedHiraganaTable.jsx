import React, { useState } from 'react';

import CategoryTabs from './CategoryTabs';
import CategoryInfo from './CategoryInfo';
import HiraganaTable from './HiraganaTable';

import { hiraganaCategories } from './extendedHiraganaData';
import styles from './ExtendedHiraganaTable.module.css';

const ExtendedHiraganaTable = ({ 
  getResponsiveData,
  getResponsiveColumns
}) => {
  const [activeCategory, setActiveCategory] = useState('basic');

  const currentCategory = hiraganaCategories[activeCategory];
  const currentData = getResponsiveData(activeCategory);
  const currentColumns = getResponsiveColumns(activeCategory);

  return (
    <div className={styles.extendedHiraganaTable}>
      {/* 탭 헤더 */}
      <CategoryTabs 
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* 카테고리 설명 */}
      <CategoryInfo category={currentCategory} />

      {/* 히라가나 테이블 */}
      <HiraganaTable
        currentData={currentData}
        currentColumns={currentColumns}
        currentCategory={activeCategory}
      />
    </div>
  );
};

export default ExtendedHiraganaTable; 