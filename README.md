# @rundevelrun/free-visitor-counter

무료 방문자 카운터 React 컴포넌트입니다. 이 패키지는 [free-visit-counter-api-dashboard](https://github.com/rundevelrun/free-visit-counter-api-dashboard)를 활용하여 웹사이트의 방문자 수를 추적하고 표시합니다.

## 설치

```bash
npm install @rundevelrun/free-visitor-counter
# 또는
yarn add @rundevelrun/free-visitor-counter
```

## 사용법

### 기본 사용법

```jsx
import { FreeVisitorCounter } from '@rundevelrun/free-visitor-counter';

function MyComponent() {
return (
<div>
<h1>내 웹사이트</h1>
<FreeVisitorCounter />
</div>
);
}
```

### 커스텀 스타일 적용

```jsx
import { FreeVisitorCounter } from '@rundevelrun/free-visitor-counter';

function MyComponent() {
return (
<div>
<h1>내 웹사이트</h1>
<FreeVisitorCounter
totalCountPrefix="총 방문자: "
todayCountPrefix="오늘 방문자: "
separator=" | "
style={{
color: 'blue',
fontWeight: 'bold'
}}
/>
</div>
);
}
```

### Gatsby에서 사용하기

```jsx
import { FreeVisitorCounter } from '@rundevelrun/free-visitor-counter';

export default function IndexPage() {
return (
<main>
<h1>Gatsby 사이트</h1>
<FreeVisitorCounter
totalCountPrefix="총 방문자: "
todayCountPrefix="오늘 방문자: "
/>
</main>
);
}
```

### 데이터 로드 이벤트 처리

```jsx
import { FreeVisitorCounter } from '@rundevelrun/free-visitor-counter';

function MyComponent() {
const handleCounterLoad = (data) => {
console.log('방문자 데이터:', data);
// 추가 로직 구현
};

return (
<div>
<h1>내 웹사이트</h1>
<FreeVisitorCounter
onLoad={handleCounterLoad}
/>
</div>
);
}
```

## Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| totalCountPrefix | string | 'Total: ' | 총 방문자 수 앞에 표시할 텍스트 |
| totalCountSuffix | string | '' | 총 방문자 수 뒤에 표시할 텍스트 |
| todayCountPrefix | string | 'Today: ' | 오늘 방문자 수 앞에 표시할 텍스트 |
| todayCountSuffix | string | '' | 오늘 방문자 수 뒤에 표시할 텍스트 |
| separator | string | ' \| ' | 총 방문자 수와 오늘 방문자 수 사이의 구분자 (줄바꿈은 '\n'으로 지정) |
| showTotalFirst | boolean | true | true면 총 방문자 수를 먼저 표시, false면 오늘 방문자 수를 먼저 표시 |
| style | object | {} | 컴포넌트에 적용할 인라인 스타일 |
| className | string | '' | 컴포넌트에 적용할 CSS 클래스 |
| onLoad | function | undefined | 방문자 데이터가 로드되었을 때 호출될 콜백 함수 |

## 작동 방식

이 컴포넌트는 페이지가 로드될 때 자동으로 방문자 카운터 API에 요청을 보냅니다. 요청에는 다음 정보가 포함됩니다:

- 현재 도메인
- 사용자의 타임존
- 현재 페이지 경로
- 현재 페이지 제목
- 리퍼러 URL
- 검색 엔진에서 온 경우 검색어

localhost 또는 127.0.0.1에서 테스트할 경우, API 요청을 보내지 않고 샘플 데이터를 반환합니다.

## 라이센스

MIT
