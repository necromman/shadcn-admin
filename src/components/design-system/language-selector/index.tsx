'use client'

import * as React from 'react'
import { HiCheck, HiChevronDown } from 'react-icons/hi2'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useTranslation } from '@/lib/i18n/hooks'
import { SUPPORTED_LANGUAGES } from '@/lib/i18n/types'

interface LanguageSelectorProps {
  className?: string
  align?: 'start' | 'center' | 'end'
}

export function LanguageSelector({ className, align = 'end' }: LanguageSelectorProps) {
  const [open, setOpen] = React.useState(false)
  const { currentLanguage, setLanguage } = useTranslation()

  const currentLang = SUPPORTED_LANGUAGES[currentLanguage] || SUPPORTED_LANGUAGES.ko
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select language"
          className={cn("h-9 px-3 gap-1.5", className)}
        >
          <span className="text-sm font-medium">{currentLang.flag} {currentLang.nativeName}</span>
          <HiChevronDown className="h-3.5 w-3.5 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align={align}>
        <Command>
          <CommandEmpty>No language found.</CommandEmpty>
          <CommandGroup>
            {Object.values(SUPPORTED_LANGUAGES).map((language) => (
              <CommandItem
                key={language.code}
                value={language.code}
                onSelect={() => {
                  setLanguage(language.code)
                  setOpen(false)
                }}
              >
                <HiCheck
                  className={cn(
                    "mr-2 h-4 w-4",
                    currentLanguage === language.code ? "opacity-100" : "opacity-0"
                  )}
                />
                <span className="mr-2">{language.flag}</span>
                <span>{language.nativeName}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}