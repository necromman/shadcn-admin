# 테마 시스템 개선 - 프론트엔드/백오피스 구분

## 📋 요구사항

1. 프론트엔드와 백오피스에서 각각 다른 테마를 사용할 수 있도록 구분
2. 테마 선택 UI에서 프론트엔드용/백오피스용 테마를 필터링
3. 테마 에디터에서 scope 선택 가능
4. 테마 내보내기 기능 확인 및 개선

## 🏗️ 설계

### 1. ThemeConfig 타입 확장

```typescript
interface ThemeConfig {
  id: string
  name: string
  description?: string
  version?: string
  author?: string
  scope?: 'frontend' | 'backoffice' | 'both'  // 새로운 필드 추가
  colors: {
    light: ThemeColors
    dark: ThemeColors
  }
  styles?: {
    borderRadius?: Record<string, string>
  }
}
```

### 2. 테마 scope 정의

- **frontend**: 일반 사용자가 보는 프론트엔드 페이지용
- **backoffice**: 관리자 백오피스용
- **both**: 양쪽 모두 사용 가능 (기본값)

### 3. UI 개선 사항

#### 3.1 테마 목록 필터링
- 테마 선택 드롭다운에 필터 탭 추가
  - 전체
  - 프론트엔드
  - 백오피스
  - 공통

#### 3.2 테마 에디터
- 테마 정보 섹션에 Scope 선택 필드 추가
- 라디오 버튼 또는 Select로 구현

#### 3.3 시각적 구분
- 테마 카드에 scope 표시 Badge 추가
  - 🌐 Frontend
  - 🏢 Backoffice
  - ✨ Both

### 4. 구현 계획

1. **타입 정의 업데이트**
   - `types.ts`에 scope 필드 추가
   - 기본값은 'both'로 설정

2. **기존 테마 업데이트**
   - default.ts: scope: 'both'
   - theme-custom-theme.ts: scope 설정

3. **UI 컴포넌트 수정**
   - ThemeEditor: scope 선택 필드 추가
   - ThemeSelector: 필터링 기능 추가
   - ExportDialog: scope 정보 포함

4. **테마 적용 로직**
   - 현재 페이지 컨텍스트 파악
   - 해당 scope의 테마만 표시

## 🎯 기대 효과

1. **명확한 테마 구분**: 프론트엔드와 백오피스 테마를 명확히 구분
2. **관리 편의성**: 용도별 테마 관리가 쉬워짐
3. **사용자 경험 개선**: 각 영역에 맞는 테마만 보여줌으로써 선택 복잡도 감소

## 📝 추가 고려사항

1. **마이그레이션**: 기존 테마는 'both'로 자동 설정
2. **확장성**: 향후 더 많은 scope 추가 가능 (예: 'mobile', 'desktop')
3. **권한 관리**: 백오피스 테마는 관리자만 편집 가능하도록 제한 가능

## ✅ 구현 순서

1. ThemeConfig 타입에 scope 필드 추가
2. 기존 프리셋 테마들 업데이트
3. 테마 에디터에 scope 선택 UI 추가
4. 테마 선택기에 필터링 기능 추가
5. 테마 내보내기 기능 테스트
6. 전체 기능 통합 테스트

## 🔍 검증 항목

- [ ] scope 필드가 올바르게 저장되는가
- [ ] 필터링이 정확하게 동작하는가
- [ ] 내보낸 테마 파일에 scope 정보가 포함되는가
- [ ] 기존 테마와의 호환성이 유지되는가
- [ ] UI가 직관적이고 사용하기 쉬운가