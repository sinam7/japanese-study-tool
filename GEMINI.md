# Japanese Hiragana Quiz Learning App

## 프로젝트 개요
React 기반의 히라가나 학습 웹앱으로, 사용자가 히라가나 문자를 선택하여 퀴즈를 풀고 학습할 수 있는 인터랙티브한 교육 도구입니다.

## 핵심 기능
- 히라가나 50음도 표에서 원하는 문자 선택
- 입력형(히라가나 → 로마자) 및 선택형(로마자 → 히라가나) 퀴즈
- 퀴즈 선택지 개수 조절(3~5개)
- 가로/세로 레이아웃 전환 및 디바이스별 레이아웃 모드 저장
- URL 기반 라우팅으로 각 페이지 직접 접근 가능
- 페이지별 가로모드 토글 자동 관리

## 기술 스택
- **Frontend:** React.js (함수형 컴포넌트, Hooks)
- **Routing:** React Router DOM v6
- **Build Tool:** Vite
- **Language:** JavaScript (JSX)
- **Styling:** CSS (반응형 디자인, CSS Variables)

## 최근 주요 업데이트

### 🚀 라우터 도입 (React Router DOM)
- URL 기반 네비게이션으로 사용자 경험 개선
- 브라우저 뒤로가기/앞으로가기 지원
- 새로고침 시에도 현재 페이지 유지
- 각 페이지별 직접 접근 가능

### 🎨 색상 변수명 체계화
- 기존: `--color-blue-accent` → 새로운: `--color-primary`
- 기존: `--color-green-dark` → 새로운: `--color-success`
- 기존: `--color-red-dark` → 새로운: `--color-danger`
- 기존: `--color-white-10` → 새로운: `--color-surface-1`
- 실제 사용 용도에 맞게 직관적으로 변경

### ⚙️ 라우트 설정 중앙화
- 모든 라우트 설정을 `routeConfig.js`에서 중앙 관리
- 페이지별 가로모드 토글 표시 여부 자동 제어
- 새 페이지 추가 시 설정 파일만 수정하면 자동 반영

## 개발 가이드라인

### 코드 스타일
- 함수형 컴포넌트와 React Hooks 사용
- camelCase 변수명 및 함수명
- 컴포넌트명은 PascalCase
- 명확하고 직관적인 네이밍 컨벤션

### 상태 관리
- useState/useEffect를 활용한 로컬 상태 관리
- 상태 끌어올리기(Lifting State Up) 패턴 활용
- 불필요한 상태 중복 방지

### 컴포넌트 설계
- 단일 책임 원칙에 따른 컴포넌트 분리
- 재사용 가능한 컴포넌트 우선 설계
- Props 타입 명시 및 기본값 설정

### 스타일링
- CSS 모듈 또는 일반 CSS 파일 사용
- 모바일 퍼스트 반응형 디자인
- 일관된 색상 팔레트와 타이포그래피
- CSS Variables 활용한 테마 관리

### 라우팅 관리
- `routeConfig.js`에서 모든 경로 설정 중앙 관리
- 새 페이지 추가 시 설정 파일과 라우트만 추가
- 가로모드 토글 지원 여부도 설정에서 관리

## 권장 파일 구조
```
src/
├── components/
│   ├── common/
│   │   ├── Button.js
│   │   └── Layout.js
│   ├── quiz/
│   │   ├── HiraganaSelector.jsx
│   │   ├── InputQuiz.jsx
│   │   ├── ChoiceQuiz.jsx
│   │   └── QuizContainer.jsx
│   ├── learning/
│   │   ├── LearningPage.jsx
│   │   └── HiraganaCard.jsx
│   └── settings/
│       ├── Settings.js
│       └── routeConfig.js    # 라우트 설정 중앙 관리
├── data/
│   └── hiraganaData.js
├── hooks/
│   └── useQuiz.js
├── styles/
│   ├── global.css
│   ├── variables.css   # 색상 정보는 이 파일 활용 (체계화됨)
│   └── components/
│       ├── HiraganaSelector.css
│       ├── Quiz.css
│       ├── LearningPage.css
│       ├── HiraganaCard.css
│       └── Settings.css
├── utils/
│   └── quizHelpers.js
├── main.jsx             # React Router DOM Provider 설정
└── App.jsx              # 라우터 기반 앱 구조
```

## 주요 컴포넌트 역할

### App.jsx
- React Router 기반 전체 앱 라우팅
- 레이아웃 모드 및 설정 관리
- 가로모드 토글 자동 표시/숨김 제어

### routeConfig.js
- 모든 경로별 설정 중앙 관리
- 페이지명, 가로모드 지원 여부, 설명 등
- 라우트 관련 유틸리티 함수 제공

### HiraganaSelector.jsx
- 50음도 표 렌더링
- 문자 선택/해제 로직
- 가로/세로 레이아웃 모드 지원

### QuizContainer.jsx
- 퀴즈 모드 전환 및 문제 생성
- 점수 및 진행 상황 관리

### InputQuiz.jsx / ChoiceQuiz.jsx
- 각각 입력형, 선택형 퀴즈 인터페이스
- 정답 확인 및 피드백 처리

### LearningPage.jsx
- 히라가나 연상 학습 페이지
- 가로모드 토글 미지원

### Settings.js
- 퀴즈 설정 및 레이아웃 관리
- 라우트 설정 시각화 및 관리
- 사용자 설정 저장/불러오기

## 데이터 관리
- 히라가나 데이터는 별도 파일로 분리
- 사용자 설정은 localStorage 활용
- 퀴즈 상태는 메모리 상태로 관리
- 라우트 설정은 중앙화된 설정 파일에서 관리

## 새 페이지 추가 방법
1. `src/components/settings/routeConfig.js`에서 새 라우트 설정 추가
2. `src/App.jsx`에서 새 Route 컴포넌트 추가
3. 필요시 해당 페이지 컴포넌트 생성

```javascript
// routeConfig.js 예시
'/new-page': {
  name: '새 페이지',
  showLayoutToggle: false,  // 가로모드 지원 여부
  component: 'NewPage',
  description: '새로운 기능 페이지'
}
```

## 개발 우선순위
1. ✅ 주요 기능 구현
2. ✅ 라우터 도입 및 네비게이션 개선
3. ✅ 색상 변수 체계화 및 가독성 개선
4. ✅ 레이아웃 및 설정 기능
5. 반응형 디자인 및 접근성 개선

---