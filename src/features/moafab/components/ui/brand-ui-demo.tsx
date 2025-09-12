import { useState } from 'react'
import { BrandButton } from './brand-button'
import { BrandCheckbox } from './brand-checkbox'
import { Label } from '@/components/ui/label'

export function BrandUIDemo() {
  const [checked1, setChecked1] = useState(false)
  const [checked2, setChecked2] = useState(true)
  const [checked3, setChecked3] = useState(false)
  const [checked4, setChecked4] = useState(true)
  const [checked5, setChecked5] = useState(false)

  return (
    <div className="p-8 space-y-8">
      {/* Button Variants */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Brand Buttons</h2>
        
        <div className="space-y-4">
          {/* Primary Buttons */}
          <div>
            <h3 className="text-sm font-medium mb-2 text-muted-foreground">Primary Variants</h3>
            <div className="flex flex-wrap gap-2">
              <BrandButton variant="primary" size="sm">Small</BrandButton>
              <BrandButton variant="primary">Default</BrandButton>
              <BrandButton variant="primary" size="lg">Large</BrandButton>
              <BrandButton variant="primary" size="xl">Extra Large</BrandButton>
              <BrandButton variant="primary" disabled>Disabled</BrandButton>
            </div>
          </div>

          {/* Secondary Buttons */}
          <div>
            <h3 className="text-sm font-medium mb-2 text-muted-foreground">Secondary Variants</h3>
            <div className="flex flex-wrap gap-2">
              <BrandButton variant="secondary">Secondary</BrandButton>
              <BrandButton variant="accent">Accent</BrandButton>
              <BrandButton variant="outline">Outline</BrandButton>
              <BrandButton variant="ghost">Ghost</BrandButton>
              <BrandButton variant="link">Link Style</BrandButton>
            </div>
          </div>

          {/* Status Buttons */}
          <div>
            <h3 className="text-sm font-medium mb-2 text-muted-foreground">Status Variants</h3>
            <div className="flex flex-wrap gap-2">
              <BrandButton variant="success">Success</BrandButton>
              <BrandButton variant="warning">Warning</BrandButton>
              <BrandButton variant="destructive">Destructive</BrandButton>
              <BrandButton variant="info">Info</BrandButton>
            </div>
          </div>

          {/* Icon Buttons */}
          <div>
            <h3 className="text-sm font-medium mb-2 text-muted-foreground">Icon Buttons</h3>
            <div className="flex flex-wrap gap-2">
              <BrandButton variant="primary" size="icon-sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M5 12h14"/>
                </svg>
              </BrandButton>
              <BrandButton variant="primary" size="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M5 12h14"/>
                </svg>
              </BrandButton>
              <BrandButton variant="primary" size="icon-lg">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M5 12h14"/>
                </svg>
              </BrandButton>
            </div>
          </div>
        </div>
      </div>

      {/* Checkbox Variants */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Brand Checkboxes</h2>
        
        <div className="space-y-4">
          {/* Color Variants */}
          <div>
            <h3 className="text-sm font-medium mb-2 text-muted-foreground">Color Variants</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <BrandCheckbox 
                  id="primary" 
                  variant="primary"
                  checked={checked1}
                  onCheckedChange={(checked) => setChecked1(checked as boolean)}
                />
                <Label htmlFor="primary" className="cursor-pointer">
                  Primary Brand Color
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <BrandCheckbox 
                  id="secondary" 
                  variant="secondary"
                  checked={checked2}
                  onCheckedChange={(checked) => setChecked2(checked as boolean)}
                />
                <Label htmlFor="secondary" className="cursor-pointer">
                  Secondary Brand Color
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <BrandCheckbox 
                  id="accent" 
                  variant="accent"
                  checked={checked3}
                  onCheckedChange={(checked) => setChecked3(checked as boolean)}
                />
                <Label htmlFor="accent" className="cursor-pointer">
                  Accent Brand Color
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <BrandCheckbox 
                  id="success" 
                  variant="success"
                  checked={checked4}
                  onCheckedChange={(checked) => setChecked4(checked as boolean)}
                />
                <Label htmlFor="success" className="cursor-pointer">
                  Success Status
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <BrandCheckbox 
                  id="error" 
                  variant="error"
                  checked={checked5}
                  onCheckedChange={(checked) => setChecked5(checked as boolean)}
                />
                <Label htmlFor="error" className="cursor-pointer">
                  Error Status
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <BrandCheckbox 
                  id="outline" 
                  variant="outline"
                />
                <Label htmlFor="outline" className="cursor-pointer">
                  Outline Style
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <BrandCheckbox 
                  id="disabled" 
                  variant="primary"
                  disabled
                  checked
                />
                <Label htmlFor="disabled" className="cursor-pointer opacity-50">
                  Disabled State
                </Label>
              </div>
            </div>
          </div>

          {/* Size Variants */}
          <div>
            <h3 className="text-sm font-medium mb-2 text-muted-foreground">Size Variants</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <BrandCheckbox size="sm" variant="primary" defaultChecked />
                <Label className="text-sm">Small</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <BrandCheckbox size="default" variant="primary" defaultChecked />
                <Label>Default</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <BrandCheckbox size="lg" variant="primary" defaultChecked />
                <Label className="text-lg">Large</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <BrandCheckbox size="xl" variant="primary" defaultChecked />
                <Label className="text-xl">Extra Large</Label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Color System Info */}
      <div className="border rounded-lg p-4 bg-muted/50">
        <h3 className="text-sm font-medium mb-2">Brand Color Management</h3>
        <p className="text-sm text-muted-foreground mb-2">
          All brand colors are centrally managed in:
        </p>
        <ul className="text-sm space-y-1 ml-4">
          <li>• <code className="bg-muted px-1 py-0.5 rounded text-xs">src/features/moafab/config/brand-colors.ts</code> - TypeScript configuration</li>
          <li>• <code className="bg-muted px-1 py-0.5 rounded text-xs">src/styles/brand-theme.css</code> - CSS variables</li>
        </ul>
        <p className="text-sm text-muted-foreground mt-2">
          Changes to these files will automatically update all brand-themed components.
        </p>
      </div>
    </div>
  )
}