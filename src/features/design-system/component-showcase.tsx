import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Slider } from '@/components/ui/slider'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert'
import { HiExclamationCircle, HiCheckCircle, HiXCircle, HiInformationCircle } from 'react-icons/hi2'

type ToastPosition = 
  | 'top-left' 
  | 'top-center' 
  | 'top-right' 
  | 'bottom-left' 
  | 'bottom-center' 
  | 'bottom-right'

export function ComponentShowcase() {
  const [toastPosition, setToastPosition] = useState<ToastPosition>('bottom-right')
  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Buttons</h2>
        <div className="grid gap-4">
          <div>
            <h3 className="text-sm font-medium mb-3">Variants</h3>
            <div className="flex flex-wrap gap-2">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-3">Sizes</h3>
            <div className="flex flex-wrap items-center gap-2">
              <Button size="lg">Large</Button>
              <Button>Default</Button>
              <Button size="sm">Small</Button>
              <Button size="icon">
                <HiCheckCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Form Controls</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Input Fields</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Enter password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Type your message here" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Selection Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Select Option</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option1">Option 1</SelectItem>
                    <SelectItem value="option2">Option 2</SelectItem>
                    <SelectItem value="option3">Option 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Switch id="airplane" />
                  <Label htmlFor="airplane">Airplane Mode</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms">Accept terms and conditions</Label>
                </div>
              </div>

              <RadioGroup defaultValue="option-1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-1" id="option-1" />
                  <Label htmlFor="option-1">Option 1</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-2" id="option-2" />
                  <Label htmlFor="option-2">Option 2</Label>
                </div>
              </RadioGroup>

              <div className="space-y-2">
                <Label>Volume</Label>
                <Slider defaultValue={[50]} max={100} step={1} />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Feedback Section */}
      <section className="rounded-lg border bg-card/50 p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="h-2 w-2 rounded-full bg-orange-500" />
          <h2 className="text-xl font-bold">Feedback</h2>
        </div>
        <div className="grid gap-6">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Alerts</h3>
            <div className="space-y-2">
              <Alert>
                <HiInformationCircle className="h-4 w-4" />
                <AlertTitle>Information</AlertTitle>
                <AlertDescription>
                  This is an informational alert message.
                </AlertDescription>
              </Alert>
              <Alert className="border-green-500/50 text-green-600 dark:text-green-400">
                <HiCheckCircle className="h-4 w-4" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>
                  Your action was completed successfully.
                </AlertDescription>
              </Alert>
              <Alert className="border-yellow-500/50 text-yellow-600 dark:text-yellow-400">
                <HiExclamationCircle className="h-4 w-4" />
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>
                  Please review this important information.
                </AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <HiXCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  Something went wrong. Please try again.
                </AlertDescription>
              </Alert>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground">Toasts</h3>
            
            {/* 토스트 위치 선택 */}
            <div className="space-y-2">
              <Label htmlFor="toast-position" className="text-xs">토스트 위치</Label>
              <Select value={toastPosition} onValueChange={(value) => setToastPosition(value as ToastPosition)}>
                <SelectTrigger id="toast-position" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="top-left">↖ 왼쪽 상단</SelectItem>
                  <SelectItem value="top-center">↑ 상단 중앙</SelectItem>
                  <SelectItem value="top-right">↗ 오른쪽 상단</SelectItem>
                  <SelectItem value="bottom-left">↙ 왼쪽 하단</SelectItem>
                  <SelectItem value="bottom-center">↓ 하단 중앙</SelectItem>
                  <SelectItem value="bottom-right">↘ 오른쪽 하단 (기본)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* 토스트 표시 버튼 */}
            <div className="flex flex-wrap gap-2">
              <Button 
                onClick={() => toast.success('성공적으로 완료되었습니다!', {
                  position: toastPosition,
                })}
                variant="default"
              >
                성공 토스트
              </Button>
              <Button 
                onClick={() => toast.error('오류가 발생했습니다!', {
                  position: toastPosition,
                })}
                variant="destructive"
              >
                오류 토스트
              </Button>
              <Button 
                onClick={() => toast.info('알림 메시지입니다.', {
                  position: toastPosition,
                })}
                variant="secondary"
              >
                정보 토스트
              </Button>
              <Button 
                onClick={() => toast.warning('경고: 주의가 필요합니다!', {
                  position: toastPosition,
                })}
                variant="outline"
              >
                경고 토스트
              </Button>
            </div>
            
            {/* 위치 시각화 */}
            <div className="mt-4 p-4 border rounded-lg bg-muted/20">
              <div className="text-xs text-muted-foreground mb-2">현재 선택된 위치</div>
              <div className="relative aspect-video w-full max-w-xs mx-auto border-2 border-dashed rounded-lg">
                {/* 상단 */}
                <div className="absolute top-2 left-2 right-2 flex justify-between">
                  <div className={`w-8 h-8 rounded-sm transition-all ${toastPosition === 'top-left' ? 'bg-primary scale-125' : 'bg-muted/50'}`} />
                  <div className={`w-8 h-8 rounded-sm transition-all ${toastPosition === 'top-center' ? 'bg-primary scale-125' : 'bg-muted/50'}`} />
                  <div className={`w-8 h-8 rounded-sm transition-all ${toastPosition === 'top-right' ? 'bg-primary scale-125' : 'bg-muted/50'}`} />
                </div>
                
                {/* 하단 */}
                <div className="absolute bottom-2 left-2 right-2 flex justify-between">
                  <div className={`w-8 h-8 rounded-sm transition-all ${toastPosition === 'bottom-left' ? 'bg-primary scale-125' : 'bg-muted/50'}`} />
                  <div className={`w-8 h-8 rounded-sm transition-all ${toastPosition === 'bottom-center' ? 'bg-primary scale-125' : 'bg-muted/50'}`} />
                  <div className={`w-8 h-8 rounded-sm transition-all ${toastPosition === 'bottom-right' ? 'bg-primary scale-125' : 'bg-muted/50'}`} />
                </div>
                
                {/* 중앙 텍스트 */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">화면 미리보기</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Dialog</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Open Dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Dialog Title</DialogTitle>
                  <DialogDescription>
                    This is a dialog description. It provides context about the dialog content.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <p>Dialog content goes here.</p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Display Section */}
      <section className="rounded-lg border bg-card/50 p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="h-2 w-2 rounded-full bg-purple-500" />
          <h2 className="text-xl font-bold">Display</h2>
        </div>
        <div className="grid gap-6">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Badges</h3>
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Cards</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Card Title</CardTitle>
                  <CardDescription>Card description goes here</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Card content can include any components or text.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Another Card</CardTitle>
                  <CardDescription>With different content</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Each card can have unique content.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Third Card</CardTitle>
                  <CardDescription>More examples</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Cards are versatile containers.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}