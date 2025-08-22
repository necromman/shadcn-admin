import { HiMoon, HiSun } from 'react-icons/hi2'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/context/theme-provider'

export function ThemeToggleButton() {
  const { theme, setTheme } = useTheme()
  
  const toggleTheme = () => {
    // 시스템 테마일 경우 현재 시스템 설정에 따라 다음 테마 결정
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      setTheme(systemTheme === 'dark' ? 'light' : 'dark')
    } else {
      // light -> dark -> light 순환
      setTheme(theme === 'light' ? 'dark' : 'light')
    }
  }

  return (
    <Button 
      variant="outline" 
      size="icon" 
      onClick={toggleTheme}
      className="relative overflow-hidden"
    >
      <HiSun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
      <HiMoon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}