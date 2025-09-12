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
  HiAdjustmentsHorizontal,
  HiArrowRight,
  HiMapPin,
  HiClock,
  HiUserGroup,
  HiChevronRight
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

// 검색 결과 예시 데이터
interface Equipment {
  id: string
  name: string
  nameEn: string
  institution: string
  process: string
  model: string
  manufacturer: string
  location: string
  status: 'available' | 'in-use' | 'maintenance'
  imageUrl?: string
}

// 예시 장비 데이터 (10개)
const sampleEquipments: Equipment[] = [
  {
    id: '1',
    name: 'Deep oxide/SiC etching system',
    nameEn: 'Deep oxide/SiC etching system',
    institution: 'DGIST',
    process: 'etching',
    model: 'Plasma-Therm Versaline',
    manufacturer: 'Plasma-Therm',
    location: '대구경북과학기술원',
    status: 'available'
  },
  {
    id: '2',
    name: 'Field-Emission Scanning Electron Microscopy',
    nameEn: 'FE-SEM',
    institution: 'NINT',
    process: 'analysis',
    model: 'JSM-7900F',
    manufacturer: 'JEOL',
    location: '나노융합기술원',
    status: 'available'
  },
  {
    id: '3',
    name: 'Dielectric ICP Etcher System',
    nameEn: 'ICP-RIE',
    institution: 'KANC',
    process: 'etching',
    model: 'Oxford PlasmaPro System100',
    manufacturer: 'Oxford Instruments',
    location: '한국나노기술원',
    status: 'in-use'
  },
  {
    id: '4',
    name: 'X-ray Photoelectron Spectrometer',
    nameEn: 'XPS',
    institution: 'ISRC',
    process: 'analysis',
    model: 'K-Alpha+',
    manufacturer: 'Thermo Fisher',
    location: '서울대학교 반도체공동연구소',
    status: 'available'
  },
  {
    id: '5',
    name: 'Local Electrode Atom Probe Tomography',
    nameEn: 'LEAP',
    institution: 'ETRI',
    process: 'analysis',
    model: 'LEAP 5000 XS',
    manufacturer: 'CAMECA',
    location: '한국전자통신연구원',
    status: 'maintenance'
  },
  {
    id: '6',
    name: 'Atomic Layer Deposition System',
    nameEn: 'ALD',
    institution: 'NNFC',
    process: 'deposition',
    model: 'Fiji G2',
    manufacturer: 'Veeco',
    location: '나노종합기술원',
    status: 'available'
  },
  {
    id: '7',
    name: 'Focused Ion Beam System',
    nameEn: 'FIB-SEM',
    institution: 'KANC',
    process: 'analysis',
    model: 'Helios 5 UX',
    manufacturer: 'Thermo Fisher',
    location: '한국나노기술원',
    status: 'available'
  },
  {
    id: '8',
    name: 'Chemical Vapor Deposition',
    nameEn: 'CVD',
    institution: 'ISRC',
    process: 'deposition',
    model: 'Black Magic Pro',
    manufacturer: 'Aixtron',
    location: '서울대학교 반도체공동연구소',
    status: 'in-use'
  },
  {
    id: '9',
    name: 'Electron Beam Lithography',
    nameEn: 'EBL',
    institution: 'DGIST',
    process: 'photolithography',
    model: 'EBPG5200',
    manufacturer: 'Raith',
    location: '대구경북과학기술원',
    status: 'available'
  },
  {
    id: '10',
    name: 'Reactive Ion Etching System',
    nameEn: 'RIE',
    institution: 'NINT',
    process: 'etching',
    model: 'PlasmaPro 100',
    manufacturer: 'Oxford Instruments',
    location: '나노융합기술원',
    status: 'available'
  }
]

export function EquipmentSearch() {
  const { t } = useTranslation()
  const [selectedInstitutions, setSelectedInstitutions] = useState<string[]>([])
  const [selectedProcess, setSelectedProcess] = useState('all')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [selectAll, setSelectAll] = useState(true)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [searchResults, setSearchResults] = useState<Equipment[]>([])
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null)

  // 컴포넌트 마운트 시 전체 기관 선택 및 전체 장비 표시
  useState(() => {
    const allInstitutionIds = ['NINT', 'NNFC', 'KANC', 'ISRC', 'ETRI', 'DGIST']
    setSelectedInstitutions(allInstitutionIds)
    // 초기에 모든 장비 표시
    setSearchResults(sampleEquipments)
    setSelectedEquipment(sampleEquipments[0])
    return null
  })

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
    // 검색 로직 (예시)
    let results = sampleEquipments
    
    // 기관 필터링
    if (selectedInstitutions.length > 0) {
      results = results.filter(eq => selectedInstitutions.includes(eq.institution))
    }
    
    // 공정 필터링
    if (selectedProcess !== 'all') {
      results = results.filter(eq => eq.process === selectedProcess)
    }
    
    // 키워드 필터링
    if (searchKeyword) {
      const keyword = searchKeyword.toLowerCase()
      results = results.filter(eq => 
        eq.name.toLowerCase().includes(keyword) ||
        eq.nameEn.toLowerCase().includes(keyword) ||
        eq.model.toLowerCase().includes(keyword)
      )
    }
    
    setSearchResults(results)
    if (results.length > 0) {
      setSelectedEquipment(results[0])
    }
  }

  const handleReset = () => {
    setSelectedInstitutions([])
    setSelectedProcess('all')
    setSearchKeyword('')
    setSelectAll(false)
    setSearchResults([])
    setSelectedEquipment(null)
  }

  // 선택된 기관의 총 장비 수 계산
  const totalEquipmentCount = useMemo(() => {
    return institutions
      .filter(inst => selectedInstitutions.includes(inst.id))
      .reduce((sum, inst) => sum + inst.equipmentCount, 0)
  }, [institutions, selectedInstitutions])

  return (
    <section className="py-12">
      {/* 통합 검색 카드 */}
      <Card className="overflow-hidden border shadow-lg">         
        <CardHeader className="border-b bg-gradient-to-r from-muted/30 to-muted/50 px-5 pb-0 pt-7">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div>
                <CardTitle className="text-lg">장비 통합 검색</CardTitle>
                <CardDescription className="text-xs">
                  전국 6개 기관 · 990개+ 장비
                </CardDescription>
              </div>
            </div>
            {selectedInstitutions.length > 0 && (
              <Badge variant="default" className="text-sm">
                {totalEquipmentCount}개 장비
              </Badge>
            )}
          </div>
        </CardHeader>
          
        <CardContent className="p-0">
          {/* 검색 옵션 영역 */}
          <div className="p-4 border-b bg-muted/10">
            {/* 기관 선택 - 컴팩트 */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">
                  연구기관 ({selectedInstitutions.length}/{institutions.length})
                </Label>
                <Button
                  variant={selectAll ? "default" : "outline"}
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => handleSelectAll(!selectAll)}
                >
                  {selectAll ? "선택 해제" : "전체 선택"}
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {institutions.map((inst) => (
                  <button
                    key={inst.id}
                    type="button"
                    className={cn(
                      "px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                      "border hover:shadow-sm",
                      selectedInstitutions.includes(inst.id) 
                        ? "bg-[var(--brand-primary)] text-[var(--brand-primary-foreground)] border-[var(--brand-primary)]" 
                        : "bg-background border-border hover:border-[var(--brand-primary)]/50"
                    )}
                    onClick={() => handleInstitutionToggle(inst.id)}
                  >
                    {inst.shortName}
                    <span className="ml-1 opacity-70">({inst.equipmentCount})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 검색 필터 - 컴팩트 */}
            <div className="mt-3 flex gap-2">
              <div className="flex-1 relative">
                <Input
                  placeholder="장비명, 모델명 검색"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="h-9 text-sm pr-8"
                />
                {searchKeyword && (
                  <button
                    onClick={() => setSearchKeyword('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    ×
                  </button>
                )}
              </div>
              
              <Select value={selectedProcess} onValueChange={setSelectedProcess}>
                <SelectTrigger className="w-[140px] h-9 text-sm">
                  <SelectValue placeholder="공정 선택" />
                </SelectTrigger>
                <SelectContent>
                  {processes.map((process) => {
                    const Icon = process.icon
                    return (
                      <SelectItem key={process.id} value={process.id}>
                        <div className="flex items-center gap-2">
                          <Icon className="h-3 w-3" />
                          <span className="text-sm">{process.name}</span>
                        </div>
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
              
              <Button 
                onClick={handleSearch}
                variant="default"
                className="h-9 px-4" 
                disabled={selectedInstitutions.length === 0}
              >
                <HiMagnifyingGlass className="h-4 w-4" />
                <span className="ml-2 hidden sm:inline">검색</span>
              </Button>
              
              <Button 
                onClick={handleReset} 
                variant="outline" 
                size="icon"
                className="h-9 w-9"
              >
                <HiArrowPath className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* 검색 결과 영역 */}
          {searchResults.length > 0 && (
            <div className="grid md:grid-cols-2 divide-x border-t">
              {/* 왼쪽: 검색 결과 리스트 (10개 표시) */}
              <div className="h-full">
                <div className="divide-y max-h-[600px] overflow-y-auto">
                  {searchResults.map((equipment, index) => (
                    <div
                      key={equipment.id}
                      className={cn(
                        "p-3 cursor-pointer transition-all hover:bg-muted/50",
                        selectedEquipment?.id === equipment.id && "bg-primary/10 border-l-4 border-primary"
                      )}
                      onClick={() => setSelectedEquipment(equipment)}
                    >
                      {/* 상단: 제목 및 기관 */}
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm line-clamp-1">
                              {equipment.nameEn}
                            </h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              {equipment.name}
                            </p>
                          </div>
                          <Badge 
                            variant={equipment.status === 'available' ? 'default' : 
                                    equipment.status === 'in-use' ? 'secondary' : 'destructive'}
                            className="shrink-0"
                          >
                            {equipment.status === 'available' && '이용가능'}
                            {equipment.status === 'in-use' && '사용중'}
                            {equipment.status === 'maintenance' && '점검중'}
                          </Badge>
                        </div>
                        
                        {/* 하단: 공정 및 위치 정보 */}
                        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                          <span className="font-medium">{equipment.institution}</span>
                          <span>·</span>
                          <span>{processes.find(p => p.id === equipment.process)?.name || equipment.process}</span>
                          <span>·</span>
                          <span>{equipment.model}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* 오른쪽: 선택된 장비 상세 정보 */}
              <div className="p-4 bg-muted/10 min-h-[600px] flex flex-col">
                {selectedEquipment ? (
                  <div className="space-y-4 flex-1 flex flex-col">
                    {/* 장비 이미지 */}
                    <div className="relative flex-1 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-lg overflow-hidden">
                      {selectedEquipment.imageUrl ? (
                        <img 
                          src={selectedEquipment.imageUrl} 
                          alt={selectedEquipment.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-center space-y-3">
                            <HiBeaker className="w-20 h-20 mx-auto text-slate-400 dark:text-slate-600" />
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              장비 이미지
                            </p>
                          </div>
                        </div>
                      )}
                      
                      {/* 자세히보기 버튼 */}
                      <Button 
                        size="sm" 
                        variant="default"
                        className="absolute bottom-3 right-3 shadow-lg"
                      >
                        자세히보기
                        <HiArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                    
                    {/* 장비 상세 정보 */}
                    <div className="space-y-3 pt-2">
                      <div>
                        <h3 className="font-semibold text-base">
                          {selectedEquipment.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {selectedEquipment.nameEn}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-muted-foreground text-xs mb-1">장비명</p>
                          <p className="font-medium text-sm">{selectedEquipment.name}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs mb-1">보유기관</p>
                          <p className="font-medium text-sm">{selectedEquipment.location}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs mb-1">제조사</p>
                          <p className="font-medium text-sm">{selectedEquipment.manufacturer}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs mb-1">모델명</p>
                          <p className="font-medium text-sm">{selectedEquipment.model}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-muted-foreground">
                    <div className="text-center space-y-2">
                      <HiCube className="w-12 h-12 mx-auto" />
                      <p className="text-sm">장비를 선택해주세요</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  )
}