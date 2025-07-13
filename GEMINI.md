# Japanese Hiragana Quiz Learning App

## 프로젝트 개요
React 기반의 히라가나 학습 웹앱으로, 사용자가 히라가나 문자를 선택하여 퀴즈를 풀고 학습할 수 있는 인터랙티브한 교육 도구입니다.

## 핵심 기능
- 히라가나 50음도 표에서 원하는 문자 선택
- 입력형(히라가나 → 로마자) 및 선택형(로마자 → 히라가나) 퀴즈
- 퀴즈 선택지 개수 조절(3~5개)
- 가로/세로 레이아웃 전환 및 디바이스별 레이아웃 모드 저장

## 기술 스택
- **Frontend:** React.js (함수형 컴포넌트, Hooks)
- **Build Tool:** Vite
- **Language:** JavaScript (JSX)
- **Styling:** CSS (반응형 디자인)

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

## 권장 파일 구조
```
src/
├── components/
│   ├── common/
│   │   ├── Button.js
│   │   └── Layout.js
│   ├── quiz/
│   │   ├── HiraganaSelector.js
│   │   ├── InputQuiz.js
│   │   ├── ChoiceQuiz.js
│   │   └── QuizContainer.js
│   └── settings/
│       └── Settings.js
├── data/
│   └── hiraganaData.js
├── hooks/
│   └── useQuiz.js
├── styles/
│   ├── global.css
│   ├── variable.css   # 색상 정보는 이 파일 활용
│   └── components/
│       ├── HiraganaSelector.css
│       ├── Quiz.css
│       └── Settings.css
├── utils/
│   └── quizHelpers.js
└── App.js
```

## 주요 컴포넌트 역할

### App.js
- 전체 앱 상태 관리 및 라우팅
- 레이아웃 모드 및 설정 관리

### HiraganaSelector.js
- 50음도 표 렌더링
- 문자 선택/해제 로직

### QuizContainer.js
- 퀴즈 모드 전환 및 문제 생성
- 점수 및 진행 상황 관리

### InputQuiz.js / ChoiceQuiz.js
- 각각 입력형, 선택형 퀴즈 인터페이스
- 정답 확인 및 피드백 처리

### Settings.js
- 퀴즈 설정 및 레이아웃 관리
- 사용자 설정 저장/불러오기

## 데이터 관리
- 히라가나 데이터는 별도 파일로 분리
- 사용자 설정은 localStorage 활용
- 퀴즈 상태는 메모리 상태로 관리

## 개발 우선순위
1. 주요 기능 구현
2. 레이아웃 및 설정 기능
3. 반응형 디자인 및 접근성 개선

---