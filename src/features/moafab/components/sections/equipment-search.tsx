import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  HiMagnifyingGlass, 
  HiArrowPath, 
  HiFunnel,
  HiBeaker,
  HiCpuChip,
  HiCube,
  HiSparkles,
  HiAdjustmentsHorizontal
} from 'react-icons/hi2'
import { useTranslation } from '@/lib/i18n/hooks'
import { cn } from '@/lib/utils'
import { useMoafabDevSettings } from '../../context/dev-settings-provider'

// 공정 아이콘 매핑
const processIcons: Record<string, any> = {
  epitaxy: HiCube,
  oxidation: HiBeaker,
  photolithography: HiSparkles,
  etching: HiCpuChip,
  deposition: HiCube,
  metallization: HiAdjustmentsHorizontal,
  eds: HiBeaker,
  packaging: HiCube,
  analysis: HiMagnifyingGlass,
}

export function EquipmentSearch() {
  const { t } = useTranslation()
  const { settings } = useMoafabDevSettings()
  const [selectedInstitutions, setSelectedInstitutions] = useState<string[]>([])
  const [selectedProcess, setSelectedProcess] = useState('all')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [selectAll, setSelectAll] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)

  // 번역된 기관 목록
  const institutions = useMemo(() => [
    { 
      id: 'NINT', 
      name: t('moafab.equipment.institutions.NINT'),
      shortName: 'NINT',
      equipmentCount: 85,
      speciality: '나노 융합'
    },
    { 
      id: 'NNFC', 
      name: t('moafab.equipment.institutions.NNFC'),
      shortName: 'NNFC',
      equipmentCount: 120,
      speciality: '종합 나노팹'
    },
    { 
      id: 'KANC', 
      name: t('moafab.equipment.institutions.KANC'),
      shortName: 'KANC',
      equipmentCount: 95,
      speciality: '반도체 공정'
    },
    { 
      id: 'ISRC', 
      name: t('moafab.equipment.institutions.ISRC'),
      shortName: 'ISRC',
      equipmentCount: 78,
      speciality: '첨단 반도체'
    },
    { 
      id: 'ETRI', 
      name: t('moafab.equipment.institutions.ETRI'),
      shortName: 'ETRI',
      equipmentCount: 102,
      speciality: 'ICT 융합'
    },
    { 
      id: 'DGIST', 
      name: t('moafab.equipment.institutions.DGIST'),
      shortName: 'DGIST',
      equipmentCount: 65,
      speciality: '융합 과학'
    },
  ], [t])

  // 번역된 공정 목록
  const processes = useMemo(() => [
    { id: 'all', name: '전체 공정', icon: HiFunnel },
    { id: 'epitaxy', name: t('moafab.equipment.processes.epitaxy'), icon: processIcons.epitaxy },
    { id: 'oxidation', name: t('moafab.equipment.processes.oxidation'), icon: processIcons.oxidation },
    { id: 'photolithography', name: t('moafab.equipment.processes.photolithography'), icon: processIcons.photolithography },
    { id: 'etching', name: t('moafab.equipment.processes.etching'), icon: processIcons.etching },
    { id: 'deposition', name: t('moafab.equipment.processes.deposition'), icon: processIcons.deposition },
    { id: 'metallization', name: t('moafab.equipment.processes.metallization'), icon: processIcons.metallization },
    { id: 'eds', name: t('moafab.equipment.processes.eds'), icon: processIcons.eds },
    { id: 'packaging', name: t('moafab.equipment.processes.packaging'), icon: processIcons.packaging },
    { id: 'analysis', name: t('moafab.equipment.processes.analysis'), icon: processIcons.analysis },
  ], [t])

  const handleInstitutionToggle = (institutionId: string) => {
    setSelectedInstitutions(prev =>
      prev.includes(institutionId)
        ? prev.filter(id => id !== institutionId)
        : [...prev, institutionId]
    )
    setSelectAll(false)
  }

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked)
    if (checked) {
      setSelectedInstitutions(institutions.map(inst => inst.id))
    } else {
      setSelectedInstitutions([])
    }
  }

  const handleSearch = () => {
    console.log('Search:', {
      institutions: selectedInstitutions,
      process: selectedProcess,
      keyword: searchKeyword,
    })
  }

  const handleReset = () => {
    setSelectedInstitutions([])
    setSelectedProcess('all')
    setSearchKeyword('')
    setSelectAll(false)
  }

  // 선택된 기관의 총 장비 수 계산
  const totalEquipmentCount = useMemo(() => {
    return institutions
      .filter(inst => selectedInstitutions.includes(inst.id))
      .reduce((sum, inst) => sum + inst.equipmentCount, 0)
  }, [institutions, selectedInstitutions])

  return (
    <section className="py-16 bg-gradient-to-b from-background via-background to-background">
      <div className={cn(
        "mx-auto px-4 sm:px-6 lg:px-8",
        settings.layout.containerWidth === 'full' && "max-w-full",
        settings.layout.containerWidth === 'wide' && "max-w-7xl",
        settings.layout.containerWidth === 'narrow' && "max-w-5xl"
      )}>
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">{t('moafab.equipment.title')}</h2>
          <p className="text-muted-foreground text-lg">
            545개 이상의 최첨단 장비를 실시간으로 검색하고 예약하세요
          </p>
        </div>

        <Card className="border-0 shadow-2xl bg-gradient-to-br from-card via-card to-muted/5">
          <CardHeader className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-b-0 pb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary rounded-xl shadow-lg shadow-primary/20">
                  <HiMagnifyingGlass className="h-7 w-7 text-primary-foreground" />
                </div>
                <div>
                  <CardTitle className="text-2xl">장비 검색</CardTitle>
                  <CardDescription className="mt-1">
                    원하는 조건으로 장비를 검색하세요
                  </CardDescription>
                </div>
              </div>
              {selectedInstitutions.length > 0 && (
                <Badge variant="secondary" className="text-lg px-5 py-2.5 bg-primary/10 hover:bg-primary/20 transition-colors">
                  <span className="font-bold">{totalEquipmentCount}</span>개 장비 검색 가능
                </Badge>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="p-8 space-y-8">
            {/* 기관 선택 섹션 */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base font-semibold flex items-center gap-2">
                  <HiCube className="h-4 w-4 text-primary" />
                  연구기관 선택
                </Label>
                <Button
                  variant={selectAll ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleSelectAll(!selectAll)}
                  className="font-medium"
                >
                  {selectAll ? "선택 해제" : "전체 선택"}
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {institutions.map((inst) => (
                  <div 
                    key={inst.id} 
                    className={cn(
                      "relative rounded-xl p-5 transition-all cursor-pointer group",
                      "bg-gradient-to-br hover:shadow-lg",
                      selectedInstitutions.includes(inst.id) 
                        ? "from-primary/10 to-primary/5 border-2 border-primary shadow-md" 
                        : "from-card to-card border-2 border-border hover:border-primary/50 hover:from-muted/50 hover:to-muted/30"
                    )}
                    onClick={() => handleInstitutionToggle(inst.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "mt-0.5 transition-transform",
                        selectedInstitutions.includes(inst.id) && "scale-110"
                      )}>
                        <Checkbox
                          id={inst.id}
                          checked={selectedInstitutions.includes(inst.id)}
                          onCheckedChange={() => handleInstitutionToggle(inst.id)}
                          className="h-5 w-5"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                      <div className="flex-1">
                        <Label htmlFor={inst.id} className="cursor-pointer block">
                          <div className="font-semibold text-base">{inst.shortName}</div>
                          <div className="text-sm text-muted-foreground mt-1">{inst.name}</div>
                          <div className="flex items-center justify-between mt-3">
                            <Badge 
                              variant={selectedInstitutions.includes(inst.id) ? "default" : "secondary"}
                              className="text-xs px-2 py-0.5"
                            >
                              {inst.equipmentCount}개 장비
                            </Badge>
                            <span className="text-xs font-medium text-muted-foreground">
                              {inst.speciality}
                            </span>
                          </div>
                        </Label>
                      </div>
                    </div>
                    {selectedInstitutions.includes(inst.id) && (
                      <div className="absolute top-2 right-2">
                        <div className="h-2 w-2 bg-primary rounded-full animate-pulse" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 검색 필터 섹션 */}
            <div className="space-y-4">
              <Label className="text-base font-semibold flex items-center gap-2">
                <HiFunnel className="h-4 w-4 text-primary" />
                검색 필터
              </Label>
              
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* 공정 선택 */}
                <div className="space-y-2">
                  <Label htmlFor="process" className="text-sm">공정 분류</Label>
                  <Select value={selectedProcess} onValueChange={setSelectedProcess}>
                    <SelectTrigger id="process" className="h-12">
                      <SelectValue placeholder="공정을 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      {processes.map((process) => {
                        const Icon = process.icon
                        return (
                          <SelectItem key={process.id} value={process.id}>
                            <div className="flex items-center gap-2">
                              <Icon className="h-4 w-4" />
                              <span>{process.name}</span>
                            </div>
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                </div>

                {/* 키워드 검색 */}
                <div className="space-y-2">
                  <Label htmlFor="keyword" className="text-sm">키워드 검색</Label>
                  <Input
                    id="keyword"
                    placeholder={t('moafab.equipment.searchPlaceholder')}
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="h-12"
                  />
                </div>

                {/* 검색 버튼 */}
                <div className="flex items-end gap-2">
                  <Button 
                    onClick={handleSearch} 
                    className="flex-1 h-12" 
                    size="lg"
                    disabled={selectedInstitutions.length === 0}
                  >
                    <HiMagnifyingGlass className="mr-2 h-5 w-5" />
                    {selectedInstitutions.length === 0 ? '기관을 선택하세요' : t('moafab.equipment.searchButton')}
                  </Button>
                  <Button 
                    onClick={handleReset} 
                    variant="outline" 
                    size="lg"
                    className="h-12 px-4"
                  >
                    <HiArrowPath className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* 고급 검색 옵션 (선택적) */}
            <div className="border-t pt-4">
              <Button
                variant="ghost"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-sm"
              >
                <HiAdjustmentsHorizontal className="mr-2 h-4 w-4" />
                고급 검색 옵션
              </Button>
              
              {showAdvanced && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="available" />
                    <Label htmlFor="available" className="text-sm cursor-pointer">
                      즉시 예약 가능
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="training" />
                    <Label htmlFor="training" className="text-sm cursor-pointer">
                      교육 지원
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remote" />
                    <Label htmlFor="remote" className="text-sm cursor-pointer">
                      원격 사용 가능
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="discount" />
                    <Label htmlFor="discount" className="text-sm cursor-pointer">
                      할인 적용 가능
                    </Label>
                  </div>
                </div>
              )}
            </div>

            {/* 검색 결과 요약 */}
            {selectedInstitutions.length > 0 && (
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{selectedInstitutions.length}개</span> 기관에서 
                    <span className="font-medium text-foreground ml-1">{totalEquipmentCount}개</span>의 장비를 검색합니다
                  </div>
                  {searchKeyword && (
                    <Badge variant="secondary">
                      "{searchKeyword}" 검색 중
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}