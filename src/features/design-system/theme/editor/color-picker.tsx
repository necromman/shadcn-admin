import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { hexToHSL, hslToHex, isValidHSL } from '../core/theme-utils'

interface ColorPickerProps {
  label: string
  value: string
  onChange: (value: string) => void
  description?: string
}

export function ColorPicker({ label, value, onChange, description }: ColorPickerProps) {
  const [hslValue, setHslValue] = useState(value)
  const [hexValue, setHexValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setHslValue(value)
    if (isValidHSL(value)) {
      setHexValue(hslToHex(value))
    }
  }, [value])

  const handleHexChange = (hex: string) => {
    setHexValue(hex)
    if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
      const hsl = hexToHSL(hex)
      setHslValue(hsl)
      onChange(hsl)
    }
  }

  const handleHSLChange = (hsl: string) => {
    setHslValue(hsl)
    if (isValidHSL(hsl)) {
      setHexValue(hslToHex(hsl))
      onChange(hsl)
    }
  }

  const handleColorInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hex = e.target.value
    handleHexChange(hex)
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={label} className="text-sm font-medium">
        {label}
      </Label>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
      <div className="flex gap-2">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              <div className="flex items-center gap-2 w-full">
                <div
                  className="h-4 w-4 rounded border border-border"
                  style={{
                    backgroundColor: `hsl(${hslValue})`,
                  }}
                />
                <span className="flex-1 truncate text-sm">{hslValue}</span>
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="start">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor={`${label}-hex`}>HEX</Label>
                <div className="flex gap-2">
                  <Input
                    id={`${label}-hex`}
                    type="text"
                    value={hexValue}
                    onChange={(e) => handleHexChange(e.target.value)}
                    placeholder="#000000"
                    className="font-mono text-sm"
                  />
                  <Input
                    type="color"
                    value={hexValue}
                    onChange={handleColorInputChange}
                    className="w-12 p-1 h-9"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`${label}-hsl`}>HSL</Label>
                <Input
                  id={`${label}-hsl`}
                  type="text"
                  value={hslValue}
                  onChange={(e) => handleHSLChange(e.target.value)}
                  placeholder="0 0% 0%"
                  className="font-mono text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label>Preview</Label>
                <div className="flex gap-2">
                  <div
                    className="flex-1 h-20 rounded-md border border-border"
                    style={{
                      backgroundColor: `hsl(${hslValue})`,
                    }}
                  />
                  <div className="flex-1 space-y-2">
                    <div className="h-9 rounded-md border border-border bg-background flex items-center justify-center">
                      <span
                        className="text-sm font-medium"
                        style={{ color: `hsl(${hslValue})` }}
                      >
                        Text
                      </span>
                    </div>
                    <div
                      className="h-9 rounded-md border flex items-center justify-center"
                      style={{
                        backgroundColor: `hsl(${hslValue})`,
                        borderColor: `hsl(${hslValue})`,
                      }}
                    >
                      <span className="text-sm font-medium text-white">
                        Button
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}