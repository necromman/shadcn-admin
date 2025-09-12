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
  const [selectedInstitutions, setSelectedInstitutions] = useState<string[]>([])
  const [selectedProcess, setSelectedProcess] = useState('all')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [selectAll, setSelectAll] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)

  // 번역된 기관 목록 - 실제 950개 이상 장비 반영
  const institutions = useMemo(() => [
    { 
      id: 'NINT', 
      name: t('moafab.equipment.institutions.NINT'),
      shortName: 'NINT',
      equipmentCount: 185,
      speciality: '나노 융합'
    },
    { 
      id: 'NNFC', 
      name: t('moafab.equipment.institutions.NNFC'),
      shortName: 'NNFC',
      equipmentCount: 234,
      speciality: '종합 나노팹'
    },
    { 
      id: 'KANC', 
      name: t('moafab.equipment.institutions.KANC'),
      shortName: 'KANC',
      equipmentCount: 156,
      speciality: '반도체 공정'
    },
    { 
      id: 'ISRC', 
      name: t('moafab.equipment.institutions.ISRC'),
      shortName: 'ISRC',
      equipmentCount: 142,
      speciality: '첨단 반도체'
    },
    { 
      id: 'ETRI', 
      name: t('moafab.equipment.institutions.ETRI'),
      shortName: 'ETRI',
      equipmentCount: 178,
      speciality: 'ICT 융합'
    },
    { 
      id: 'DGIST', 
      name: t('moafab.equipment.institutions.DGIST'),
      shortName: 'DGIST',
      equipmentCount: 95,
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
    <section className="py-12">

      {/* 메인 카드 - 적절한 overflow와 border 설정 */}
      <Card className="overflow-hidden border shadow-lg py-0 pb-0">         
          <CardHeader className="border-b bg-gradient-to-r from-muted/30 to-muted/50 px-6 pt-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 p-3 bg-primary rounded-lg shadow-sm">
                  <HiMagnifyingGlass className="h-6 w-6 text-primary-foreground" />
                </div>
                <div className="flex flex-col justify-center">
                  <CardTitle className="text-xl leading-tight">장비 통합 검색</CardTitle>
                  <CardDescription className="mt-0.5">
                    전국 6개 기관의 990개 이상 최첨단 장비를 한 곳에서
                  </CardDescription>
                </div>
              </div>
              {selectedInstitutions.length > 0 && (
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                    <span>실시간 검색</span>
                  </div>
                  <Badge variant="default" className="text-sm px-3 py-1.5">
                    <span className="font-bold mr-1">{totalEquipmentCount}</span>
                    <span>개 장비</span>
                  </Badge>
                </div>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="p-6 space-y-6">
            {/* 기관 선택 섹션 */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-primary">STEP 1</span>
                  <Label className="text-base font-semibold">
                    연구기관 선택
                  </Label>
                  <span className="text-sm text-muted-foreground">
                    ({selectedInstitutions.length}/{institutions.length}개 선택)
                  </span>
                </div>
                <Button
                  variant={selectAll ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleSelectAll(!selectAll)}
                >
                  {selectAll ? "선택 해제" : "전체 선택"}
                </Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {institutions.map((inst) => (
                  <button
                    key={inst.id}
                    type="button"
                    className={cn(
                      "relative rounded-lg p-4 transition-all duration-200 text-left",
                      "hover:shadow-md border",
                      selectedInstitutions.includes(inst.id) 
                        ? "bg-primary/10 border-primary shadow-sm" 
                        : "bg-background border-border hover:border-primary/50"
                    )}
                    onClick={() => handleInstitutionToggle(inst.id)}
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1 flex-1">
                          <div className="font-semibold text-sm">{inst.shortName}</div>
                          <div className="text-xs text-muted-foreground line-clamp-2">
                            {inst.name}
                          </div>
                        </div>
                        <Checkbox
                          checked={selectedInstitutions.includes(inst.id)}
                          className="h-4 w-4 mt-0.5 pointer-events-none"
                          tabIndex={-1}
                          aria-hidden="true"
                        />
                      </div>
                      <div className="pt-2 border-t flex items-center justify-between">
                        <Badge 
                          variant={selectedInstitutions.includes(inst.id) ? "default" : "outline"}
                          className="text-xs"
                        >
                          {inst.equipmentCount}대
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {inst.speciality}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 검색 필터 섹션 */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-primary">STEP 2</span>
                <Label className="text-base font-semibold">
                  검색 조건 설정
                </Label>
              </div>
              
              <div className="bg-muted/20 rounded-lg p-4 space-y-4">
                <div className="grid gap-4 lg:grid-cols-3">
                  {/* 키워드 검색 - 첫 번째 */}
                  <div className="space-y-2">
                    <Label htmlFor="keyword" className="text-sm">키워드 검색</Label>
                    <div className="relative">
                      <Input
                        id="keyword"
                        placeholder={t('moafab.equipment.searchPlaceholder')}
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        className="h-10 pr-10"
                      />
                      {searchKeyword && (
                        <button
                          onClick={() => setSearchKeyword('')}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* 검색 버튼 - 두 번째 */}
                  <div className="space-y-2">
                    <Label className="text-sm invisible lg:visible">작업</Label>
                    <div className="flex gap-2">
                      <Button 
                        onClick={handleSearch} 
                        className="flex-1 h-10" 
                        disabled={selectedInstitutions.length === 0}
                      >
                        <HiMagnifyingGlass className="mr-2 h-4 w-4" />
                        {selectedInstitutions.length === 0 ? '기관 선택' : `검색 (${totalEquipmentCount}개)`}
                      </Button>
                      <Button 
                        onClick={handleReset} 
                        variant="outline" 
                        size="icon"
                        className="h-10 w-10"
                      >
                        <HiArrowPath className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* 공정 선택 - 마지막 */}
                  <div className="space-y-2">
                    <Label htmlFor="process" className="text-sm">공정 분류</Label>
                    <Select value={selectedProcess} onValueChange={setSelectedProcess}>
                      <SelectTrigger id="process" className="h-10">
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
                </div>
              </div>
            </div>

            {/* 고급 검색 옵션 */}
            <div className="space-y-3">
              <Button
                variant="ghost"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                <HiAdjustmentsHorizontal className="mr-2 h-4 w-4" />
                고급 옵션 {showAdvanced ? '접기' : '펼치기'}
              </Button>
              
              {showAdvanced && (
                <div className="p-4 bg-muted/10 rounded-lg border">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="available" className="h-4 w-4" />
                      <Label htmlFor="available" className="text-sm cursor-pointer">
                        즉시 예약
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="training" className="h-4 w-4" />
                      <Label htmlFor="training" className="text-sm cursor-pointer">
                        교육 지원
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="remote" className="h-4 w-4" />
                      <Label htmlFor="remote" className="text-sm cursor-pointer">
                        원격 사용
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="discount" className="h-4 w-4" />
                      <Label htmlFor="discount" className="text-sm cursor-pointer">
                        할인 가능
                      </Label>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 검색 결과 요약 */}
            {selectedInstitutions.length > 0 && (
              <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="font-medium">
                        {selectedInstitutions.length}개 기관
                      </span>
                    </div>
                    <span className="text-muted-foreground">·</span>
                    <span className="font-medium">
                      {totalEquipmentCount}개 장비
                    </span>
                    {selectedProcess !== 'all' && (
                      <>
                        <span className="text-muted-foreground">·</span>
                        <Badge variant="outline" className="text-xs">
                          {processes.find(p => p.id === selectedProcess)?.name}
                        </Badge>
                      </>
                    )}
                  </div>
                  {searchKeyword && (
                    <Badge variant="secondary" className="text-xs">
                      "{searchKeyword}"
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
    </section>
  )
}