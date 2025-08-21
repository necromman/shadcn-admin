# 테마 시스템 설계 문서

## 📋 요구사항 분석

### 1. 핵심 요구사항
- **독립성**: 테마 시스템이 없어도 프로젝트는 정상 작동해야 함
- **호환성**: shadcn/ui 기반 컴포넌트와 완벽 호환
- **실시간성**: 테마 변경 시 즉시 프리뷰 가능
- **이식성**: 다른 프로젝트에 쉽게 적용 가능
- **확장성**: 색상 외 다른 스타일 요소도 커스터마이징 가능

### 2. 기능 요구사항

#### 2.1 색상 시스템
- **주요 색상**: 3-5개의 메인 색상 설정
  - Primary
  - Secondary
  - Accent (선택)
  - Destructive
  - Muted
- **자동 변형**: 각 색상별 자동 shade 생성 (50-950)
- **모드 대응**: 라이트/다크 모드별 독립적 설정
- **배경색**: 전체 배경색 커스터마이징

#### 2.2 영향 범위
- Border 색상
- Input/Select 필드
- Card 컴포넌트
- Button 컴포넌트
- 모든 UI 요소의 hover/active 상태

#### 2.3 고도화 기능
- Border radius 조절
- Font 크기 스케일
- Spacing 시스템
- Shadow 깊이

### 3. 기술 요구사항
- **저장 형식**: TypeScript/JavaScript 단일 파일
- **적용 방식**: CSS Custom Properties 오버라이드
- **Export 형식**: 
  - 단일 `.ts` 또는 `.js` 파일 (테마명 포함)
  - 예: `theme-ocean.ts`, `theme-dark-forest.ts`
- **다중 테마 지원**: 
  - 테마 폴더 자동 스캔
  - 테마 선택 UI 제공
  - localStorage에 선택 저장

## 🏗️ 시스템 아키텍처

### 1. 데이터 구조 (단순화)

```typescript
interface ThemeConfig {
  name: string
  version: string
  colors: {
    light: ColorScheme
    dark: ColorScheme
  }
  styles?: {
    borderRadius?: RadiusScale
    fontSize?: FontScale
    spacing?: SpacingScale
  }
}

interface ColorScheme {
  // 모든 색상은 HSL 문자열 (예: "222.2 47.4% 11.2%")
  background: string
  foreground: string
  primary: string
  "primary-foreground": string
  secondary: string
  "secondary-foreground": string
  destructive: string
  "destructive-foreground": string
  muted: string
  "muted-foreground": string
  accent: string
  "accent-foreground": string
  border: string
  input: string
  ring: string
  // 자동 생성되는 shade는 별도 처리
}
```

### 2. 파일 구조

```
src/features/design-system/
├── theme/
│   ├── core/
│   │   ├── theme-provider.tsx      # 테마 적용 Provider
│   │   ├── theme-generator.ts      # 색상 변형 생성
│   │   └── theme-validator.ts      # 테마 검증
│   ├── editor/
│   │   ├── theme-editor.tsx        # 메인 에디터 UI
│   │   ├── color-picker.tsx        # 색상 선택기
│   │   ├── preview-window.tsx      # 실시간 프리뷰
│   │   └── export-dialog.tsx       # Export 옵션
│   ├── presets/
│   │   ├── default.json
│   │   ├── ocean.json
│   │   └── forest.json
│   └── utils/
│       ├── color-utils.ts          # 색상 변환/계산
│       ├── export-utils.ts         # Export 기능
│       └── import-utils.ts         # Import 기능
```

## 🎨 색상 생성 알고리즘

### 1. Shade 자동 생성
```typescript
// HSL 기반 밝기 조절
function generateShades(baseColor: string) {
  const hsl = hexToHSL(baseColor)
  return {
    50: adjustLightness(hsl, 95),
    100: adjustLightness(hsl, 90),
    200: adjustLightness(hsl, 80),
    300: adjustLightness(hsl, 70),
    400: adjustLightness(hsl, 60),
    500: baseColor, // DEFAULT
    600: adjustLightness(hsl, 40),
    700: adjustLightness(hsl, 30),
    800: adjustLightness(hsl, 20),
    900: adjustLightness(hsl, 10),
    950: adjustLightness(hsl, 5)
  }
}
```

### 2. 대비 색상 자동 계산
```typescript
// WCAG 기준 충족하는 foreground 색상 자동 선택
function getContrastColor(background: string): string {
  const luminance = getLuminance(background)
  return luminance > 0.5 ? '#000000' : '#ffffff'
}
```

## 🔧 구현 계획

### Phase 1: 기본 구조 (Day 1)
1. ThemeProvider 컴포넌트 구현
2. 색상 생성 알고리즘 구현
3. CSS Variables 적용 시스템

### Phase 2: 에디터 UI (Day 2)
1. 테마 에디터 다이얼로그
2. 색상 선택기 컴포넌트
3. 실시간 프리뷰 윈도우

### Phase 3: Export/Import (Day 3)
1. JSON Export
2. CSS Export
3. React Component Export
4. Import 기능

### Phase 4: 고도화 (Day 4)
1. Border radius 조절
2. 프리셋 테마
3. 테마 검증 기능

## 💾 Export 형식

### 단일 파일 시스템 - TypeScript/JavaScript 파일

```typescript
// theme-ocean-blue.ts (파일명에 테마 이름 포함)
export const themeConfig = {
  id: "ocean-blue",  // 고유 ID
  name: "Ocean Blue",  // 표시 이름
  description: "깊은 바다를 연상시키는 블루 테마",
  version: "1.0.0",
  author: "Design System",
  colors: {
    light: {
      background: "0 0% 100%",
      foreground: "222.2 84% 4.9%",
      primary: "222.2 47.4% 11.2%",
      "primary-foreground": "210 40% 98%",
      secondary: "210 40% 96.1%",
      "secondary-foreground": "222.2 47.4% 11.2%",
      destructive: "0 84.2% 60.2%",
      "destructive-foreground": "210 40% 98%",
      muted: "210 40% 96.1%",
      "muted-foreground": "215.4 16.3% 46.9%",
      accent: "210 40% 96.1%",
      "accent-foreground": "222.2 47.4% 11.2%",
      border: "214.3 31.8% 91.4%",
      input: "214.3 31.8% 91.4%",
      ring: "222.2 84% 4.9%",
    },
    dark: {
      background: "222.2 84% 4.9%",
      foreground: "210 40% 98%",
      primary: "210 40% 98%",
      "primary-foreground": "222.2 47.4% 11.2%",
      secondary: "217.2 32.6% 17.5%",
      "secondary-foreground": "210 40% 98%",
      destructive: "0 62.8% 30.6%",
      "destructive-foreground": "210 40% 98%",
      muted: "217.2 32.6% 17.5%",
      "muted-foreground": "215 20.2% 65.1%",
      accent: "217.2 32.6% 17.5%",
      "accent-foreground": "210 40% 98%",
      border: "217.2 32.6% 17.5%",
      input: "217.2 32.6% 17.5%",
      ring: "212.7 26.8% 83.9%",
    }
  },
  // 선택적 스타일 설정
  styles: {
    borderRadius: {
      base: "0.5rem",
      sm: "0.375rem",
      md: "0.5rem",
      lg: "0.75rem",
    }
  }
}

// 테마 적용 함수 (자동 포함)
export function applyTheme(config = themeConfig) {
  const root = document.documentElement;
  const isDark = root.classList.contains('dark');
  const colors = isDark ? config.colors.dark : config.colors.light;
  
  // CSS Variables 적용
  Object.entries(colors).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value);
  });
  
  // 스타일 적용 (선택적)
  if (config.styles?.borderRadius) {
    Object.entries(config.styles.borderRadius).forEach(([key, value]) => {
      root.style.setProperty(`--radius-${key}`, value);
    });
  }
}

// 테마 등록 (자동)
if (typeof window !== 'undefined') {
  // 전역 테마 레지스트리에 등록
  window.__THEMES__ = window.__THEMES__ || {};
  window.__THEMES__[themeConfig.id] = themeConfig;
  
  // 다크모드 변경 감지 (선택된 테마인 경우만)
  const selectedTheme = localStorage.getItem('selected-theme');
  if (selectedTheme === themeConfig.id) {
    const observer = new MutationObserver(() => {
      applyTheme(themeConfig);
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    // 초기 적용
    applyTheme(themeConfig);
  }
}
```

### 사용 방법

#### 1. **다중 테마 설정**

```tsx
// themes/index.ts - 모든 테마 import
import './theme-ocean-blue.ts'
import './theme-dark-forest.ts'
import './theme-sunset.ts'
import './theme-default.ts'

// main.tsx에서
import './themes'  // 모든 테마 자동 등록
```

#### 2. **테마 선택 UI 컴포넌트**

```tsx
// ThemeSelector.tsx
export function ThemeSelector() {
  const [themes, setThemes] = useState([])
  const [selected, setSelected] = useState('')
  
  useEffect(() => {
    // 등록된 모든 테마 가져오기
    const availableThemes = Object.values(window.__THEMES__ || {})
    setThemes(availableThemes)
    
    // 저장된 테마 불러오기
    const savedTheme = localStorage.getItem('selected-theme')
    if (savedTheme) {
      applyThemeById(savedTheme)
      setSelected(savedTheme)
    }
  }, [])
  
  const handleThemeChange = (themeId: string) => {
    const theme = window.__THEMES__[themeId]
    if (theme) {
      applyTheme(theme)
      localStorage.setItem('selected-theme', themeId)
      setSelected(themeId)
    }
  }
  
  return (
    <Select value={selected} onValueChange={handleThemeChange}>
      <SelectTrigger>
        <SelectValue placeholder="테마 선택" />
      </SelectTrigger>
      <SelectContent>
        {themes.map(theme => (
          <SelectItem key={theme.id} value={theme.id}>
            <div>
              <div className="font-medium">{theme.name}</div>
              <div className="text-xs text-muted-foreground">
                {theme.description}
              </div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
```

#### 3. **단일 테마만 사용**

```tsx
// 하나의 테마만 import
import './themes/theme-ocean-blue.ts'

// 자동으로 적용하려면
localStorage.setItem('selected-theme', 'ocean-blue')
location.reload()
```

## 🚀 사용 시나리오

### 1. 테마 생성 워크플로우
1. 디자인 시스템 페이지에서 "테마 에디터" 버튼 클릭
2. **테마 정보 입력**:
   - 테마 이름 (예: "Ocean Blue")
   - 설명 (선택사항)
   - 작성자 (선택사항)
3. **색상 커스터마이징**:
   - Primary, Secondary 등 주요 색상 선택
   - 라이트/다크 모드별 설정
   - 실시간 프리뷰로 확인
4. **Export**:
   - "테마 내보내기" 클릭
   - `theme-[이름].ts` 파일 자동 생성 및 다운로드

### 2. 테마 적용 시나리오

#### 시나리오 A: 단일 테마
```tsx
// 1. themes 폴더에 파일 추가
src/themes/theme-ocean-blue.ts

// 2. main.tsx에서 import
import './themes/theme-ocean-blue.ts'

// 3. 자동 적용 (첫 번째 테마가 기본값)
```

#### 시나리오 B: 다중 테마
```tsx
// 1. themes 폴더에 여러 파일 추가
src/themes/
  ├── theme-ocean-blue.ts
  ├── theme-dark-forest.ts
  └── theme-sunset.ts

// 2. index.ts에서 모두 import
// themes/index.ts
import './theme-ocean-blue.ts'
import './theme-dark-forest.ts'
import './theme-sunset.ts'

// 3. main.tsx에서
import './themes'
import { ThemeSelector } from '@/components/theme-selector'

// 4. 앱에 테마 선택기 추가
<ThemeSelector />
```

### 3. 테마 관리
- **테마 추가**: 새 파일을 themes 폴더에 추가
- **테마 제거**: 파일 삭제 또는 import 제거
- **기본 테마 변경**: localStorage 수정
- **테마 초기화**: localStorage 클리어

## ✅ 검증 기준

### 1. 접근성
- WCAG AA 기준 색상 대비
- 키보드 네비게이션
- 스크린 리더 지원

### 2. 성능
- 테마 전환 < 100ms
- 번들 크기 < 10KB
- 런타임 오버헤드 최소화

### 3. 호환성
- shadcn/ui 모든 컴포넌트 지원
- Tailwind CSS 클래스와 충돌 없음
- 다크/라이트 모드 완벽 지원

## 📝 참고사항

### 1. 제약사항
- IE11 미지원 (CSS Variables 사용)
- 동적 테마는 클라이언트 사이드만 지원
- SSR 시 기본 테마로 초기 렌더링

### 2. 모범 사례
- 색상은 HSL 형식 사용 (투명도 조절 용이)
- 의미있는 색상 이름 사용
- 충분한 색상 대비 확보

### 3. 확장 가능성
- 폰트 시스템 추가
- 애니메이션 속도 조절
- 컴포넌트별 세부 스타일링

## 🎯 목표

1. **즉시 사용 가능**: 복잡한 설정 없이 바로 적용
2. **직관적 인터페이스**: 개발자가 아니어도 사용 가능
3. **완벽한 호환성**: 기존 프로젝트에 영향 없음
4. **프로덕션 레디**: 실제 서비스에 바로 적용 가능

---

## 다음 단계

1. 이 설계 문서 검토 및 피드백
2. Phase 1 구현 시작
3. 프로토타입 테스트
4. 점진적 기능 추가