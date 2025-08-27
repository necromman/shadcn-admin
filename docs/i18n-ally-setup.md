# i18n Ally VSCode 설정 가이드

## 1. 확장 프로그램 설치

1. VSCode 확장 프로그램 탭 열기 (Ctrl+Shift+X)
2. "i18n Ally" 검색
3. "Lokalise.i18n-ally" 설치

## 2. 프로젝트 설정 완료

`.vscode/settings.json` 파일이 이미 생성되어 있으며, 다음과 같이 설정되어 있습니다:

- **소스 언어**: 한국어 (ko)
- **표시 언어**: 한국어
- **번역 파일 경로**: `src/locales/{locale}/translation.json`
- **키 스타일**: nested (중첩 구조)

## 3. 사용 방법

### 기본 기능
- **인라인 번역 표시**: 코드에서 `t('header.nav.products')` 위에 마우스를 올리면 "제품"이 표시됩니다
- **번역 미리보기**: 주석 형태로 `// → 제품` 표시
- **빠른 이동**: Ctrl+클릭으로 해당 번역 JSON 파일로 이동

### 단축키
- `Ctrl+Alt+I`: 현재 파일의 모든 번역 키 표시/숨기기
- `Ctrl+Shift+Alt+I`: 프로젝트 전체 번역 통계 보기

### 언어 전환
상태 바에서 현재 표시 언어를 클릭하여 다른 언어로 전환 가능

## 4. 문제 해결

### "key does not exist" 오류가 표시될 때

1. **VSCode 재시작**
   - `Ctrl+Shift+P` → "Developer: Reload Window"

2. **캐시 정리**
   - `Ctrl+Shift+P` → "i18n Ally: Clear Cache"

3. **경로 확인**
   - 번역 파일이 `src/locales/ko/translation.json`에 있는지 확인

4. **Framework 설정 확인**
   - 상태 바에서 "i18n Ally" 클릭
   - Framework가 "react-i18next"로 설정되어 있는지 확인

## 5. 추가 팁

### 번역 편집
- 코드에서 번역 키 우클릭 → "Edit translation in i18n Ally"
- 사이드바에서 모든 언어 동시 편집 가능

### 번역 추출
- 하드코딩된 한국어 텍스트 선택 → 우클릭 → "Extract to i18n"

### 번역 검색
- `Ctrl+Shift+P` → "i18n Ally: Search translations"

## 6. 고급 설정

### 인라인 표시 방식 변경
```json
// .vscode/settings.json
{
  "i18n-ally.annotationInPlace": true  // 키 대신 번역 직접 표시
}
```

### 자동 번역 활성화
```json
{
  "i18n-ally.translate.engines": ["google"],
  "i18n-ally.translate.fallbackToKey": true
}
```

## 7. 현재 프로젝트 구조

```
src/
├── locales/
│   ├── ko/translation.json      # 한국어 (기본)
│   ├── en/translation.json      # 영어
│   ├── zh-CN/translation.json   # 중국어 간체
│   ├── zh-HK/translation.json   # 중국어 번체
│   ├── ja/translation.json      # 일본어
│   ├── th/translation.json      # 태국어
│   ├── fr/translation.json      # 프랑스어
│   └── it/translation.json      # 이탈리아어
└── lib/
    └── i18n/
        ├── config.ts             # i18n 설정
        ├── types.ts              # 타입 정의
        └── hooks.ts              # 커스텀 훅
```