import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import { useLibraryDevSettings } from '@/features/library/context/dev-settings-provider'
import { Star, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Book {
  id: string
  title: string
  author: string
  publisher: string
  publishDate: string
  coverImage: string
  rating: number
  category: string
  isbn: string
  description: string
  isNew?: boolean
  isBestSeller?: boolean
}

// 베스트셀러 도서 데이터 (실제 도서 정보)
const newBooks: Book[] = [
  {
    id: '1',
    title: '불편한 편의점',
    author: '김호연',
    publisher: '나무옆의자',
    publishDate: '2024-04',
    coverImage: 'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791161571836.jpg',
    rating: 4.8,
    category: '소설',
    isbn: '9791161571836',
    description: '서울역 노숙인과 편의점 알바생의 따뜻한 이야기',
    isBestSeller: true
  },
  {
    id: '2',
    title: '역행자',
    author: '자청',
    publisher: '웅진지식하우스',
    publishDate: '2024-06',
    coverImage: 'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788901260716.jpg',
    rating: 4.5,
    category: '자기계발',
    isbn: '9788901260716',
    description: '평범한 사람이 부자가 되는 방법',
    isNew: true,
    isBestSeller: true
  },
  {
    id: '3',
    title: '트렌드 코리아 2025',
    author: '김난도',
    publisher: '미래의창',
    publishDate: '2024-10',
    coverImage: 'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788959899722.jpg',
    rating: 4.3,
    category: '경제경영',
    isbn: '9788959899722',
    description: '2025년 대한민국 소비 트렌드 전망',
    isNew: true
  },
  {
    id: '4',
    title: '세이노의 가르침',
    author: '세이노',
    publisher: '데이원',
    publishDate: '2024-03',
    coverImage: 'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791168473690.jpg',
    rating: 4.9,
    category: '자기계발',
    isbn: '9791168473690',
    description: '세이노가 전하는 인생의 지혜',
    isBestSeller: true
  },
  {
    id: '5',
    title: '퓨처셀프',
    author: '벤저민 하디',
    publisher: '상상스퀘어',
    publishDate: '2024-07',
    coverImage: 'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791192389103.jpg',
    rating: 4.4,
    category: '자기계발',
    isbn: '9791192389103',
    description: '미래의 나를 만나는 방법',
    isNew: true
  },
  {
    id: '6',
    title: '시대예보: 호명사회',
    author: '송길영',
    publisher: '교보문고',
    publishDate: '2024-09',
    coverImage: 'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791193506110.jpg',
    rating: 4.6,
    category: '인문',
    isbn: '9791193506110',
    description: '빅데이터로 읽는 한국 사회의 미래',
    isNew: true
  },
  {
    id: '7',
    title: '모든 삶은 흐른다',
    author: '로랑스 드빌레르',
    publisher: '포레스트북스',
    publishDate: '2024-04',
    coverImage: 'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791193506783.jpg',
    rating: 4.7,
    category: '에세이',
    isbn: '9791193506783',
    description: '프랑스 정신과 의사가 전하는 삶의 지혜',
    isBestSeller: true
  },
  {
    id: '8',
    title: '마흔에 읽는 쇼펜하우어',
    author: '강용수',
    publisher: '유노북스',
    publishDate: '2024-08',
    coverImage: 'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791192300856.jpg',
    rating: 4.2,
    category: '철학',
    isbn: '9791192300856',
    description: '인생 후반전을 위한 철학 수업',
    isNew: true
  }
]

export function LibraryNewBooks() {
  const { settings } = useLibraryDevSettings()
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  
  // 캐러셀 현재 위치 업데이트
  useEffect(() => {
    if (!api) return

    setCurrent(api.selectedScrollSnap())

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])
  
  // 설정에서 섹션 표시 여부 확인
  if (!settings.newBooks.showSection) {
    return null
  }
  
  // 표시할 도서 개수 제한
  const displayBooks = newBooks.slice(0, settings.newBooks.itemCount)
  
  // 캐러셀 레이아웃
  if (settings.newBooks.layout === 'carousel') {
    return (
      <div className="w-full bg-muted/30 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">신착도서</h2>
              <p className="text-muted-foreground">이번 달 새로 들어온 도서를 확인하세요</p>
            </div>
            <Button variant="outline" size="sm">
              전체보기
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="relative">
            <Carousel
              setApi={setApi}
              className="w-full"
              opts={{
                align: 'start',
                loop: true,
              }}
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {displayBooks.map((book) => (
                  <CarouselItem key={book.id} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                    <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden border-0 bg-card/80">
                      <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-b from-muted/50 to-muted">
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                        />
                        {book.isBestSeller && (
                          <Badge className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-red-600 text-white border-0 shadow-lg">
                            베스트셀러
                          </Badge>
                        )}
                        {book.isNew && (
                          <Badge className="absolute top-3 right-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-0 shadow-lg">
                            NEW
                          </Badge>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      
                      <CardContent className="p-4 space-y-2">
                        <div>
                          <h3 className="font-bold text-sm line-clamp-2 group-hover:text-primary transition-colors min-h-[2.5rem]">
                            {book.title}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-1">
                            {book.author}
                          </p>
                        </div>
                        
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  "h-3 w-3",
                                  i < Math.floor(book.rating)
                                    ? "fill-amber-400 text-amber-400"
                                    : "fill-muted text-muted-foreground"
                                )}
                              />
                            ))}
                            <span className="text-[11px] text-muted-foreground ml-1.5 font-medium">
                              {book.rating}
                            </span>
                          </div>
                          <Badge variant="secondary" className="text-[10px] h-5 px-2">
                            {book.category}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex -left-12" />
              <CarouselNext className="hidden md:flex -right-12" />
            </Carousel>
            
            {/* 인디케이터 */}
            <div className="flex justify-center gap-2 mt-4">
              {Array.from({ length: Math.ceil(displayBooks.length / 4) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index * 4)}
                  className={cn(
                    "h-2 transition-all duration-300",
                    Math.floor(current / 4) === index 
                      ? "w-8 bg-primary" 
                      : "w-2 bg-muted-foreground/30"
                  )}
                  aria-label={`슬라이드 ${index + 1}로 이동`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  // 그리드 레이아웃
  return (
    <div className="w-full bg-muted/30 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">신착도서</h2>
            <p className="text-muted-foreground">이번 달 새로 들어온 도서를 확인하세요</p>
          </div>
          <Button variant="outline" size="sm">
            전체보기
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {displayBooks.map((book) => (
            <Card key={book.id} className="hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden border-0 bg-card/80">
              <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-b from-muted/50 to-muted">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                />
                {book.isBestSeller && (
                  <Badge className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-red-600 text-white border-0 shadow-lg">
                    베스트셀러
                  </Badge>
                )}
                {book.isNew && (
                  <Badge className="absolute top-3 right-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-0 shadow-lg">
                    NEW
                  </Badge>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <CardContent className="p-4 space-y-2">
                <div>
                  <h3 className="font-bold text-sm line-clamp-2 group-hover:text-primary transition-colors min-h-[2.5rem]">
                    {book.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {book.author}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {book.publisher}
                  </p>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-3 w-3",
                          i < Math.floor(book.rating)
                            ? "fill-amber-400 text-amber-400"
                            : "fill-muted text-muted-foreground"
                        )}
                      />
                    ))}
                    <span className="text-[11px] text-muted-foreground ml-1.5 font-medium">
                      {book.rating}
                    </span>
                  </div>
                  <Badge variant="secondary" className="text-[10px] h-5 px-2">
                    {book.category}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}