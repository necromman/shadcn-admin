import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  HiBookOpen,
  HiArrowRight,
  HiStar,
  HiFire,
  HiSparkles,
  HiChevronLeft,
  HiChevronRight
} from 'react-icons/hi2'

interface Book {
  id: string
  title: string
  author: string
  publisher: string
  publishDate: string
  isbn: string
  category: string
  coverImage: string
  rating: number
  isNew?: boolean
  isBest?: boolean
  description: string
  pages?: number
  price?: string
  available?: boolean
}

// 2025년 베스트셀러 도서 데이터
const newBooks: Book[] = [
  {
    id: '1',
    title: '트렌드 코리아 2025',
    author: '김난도, 전미영, 이준영 외',
    publisher: '미래의창',
    publishDate: '2024-10',
    isbn: '9791198776501',
    category: '경제경영',
    coverImage: 'https://image.yes24.com/goods/129426571/XL',
    rating: 4.5,
    isNew: true,
    isBest: true,
    description: '2025년 대한민국 소비 트렌드를 예측하는 필독서',
    pages: 456,
    price: '19,000원',
    available: true
  },
  {
    id: '2',
    title: '불편한 편의점 3',
    author: '김호연',
    publisher: '나무옆의자',
    publishDate: '2024-11',
    isbn: '9791198776518',
    category: '소설',
    coverImage: 'https://image.yes24.com/goods/129557547/XL',
    rating: 4.8,
    isBest: true,
    description: '전국민이 사랑한 불편한 편의점 시리즈 완결편',
    pages: 320,
    price: '16,800원',
    available: true
  },
  {
    id: '3',
    title: '퓨처셀프',
    author: '벤저민 하디',
    publisher: '상상스퀘어',
    publishDate: '2024-12',
    isbn: '9791198776525',
    category: '자기계발',
    coverImage: 'https://image.yes24.com/goods/123789456/XL',
    rating: 4.3,
    isNew: true,
    description: '미래의 나를 위한 현재의 선택',
    pages: 380,
    price: '18,000원',
    available: true
  },
  {
    id: '4',
    title: '나의 문화유산답사기: 중국편 5',
    author: '유홍준',
    publisher: '창비',
    publishDate: '2024-11',
    isbn: '9791198776532',
    category: '역사문화',
    coverImage: 'https://image.yes24.com/goods/129426572/XL',
    rating: 4.6,
    isBest: true,
    description: '중국 문화유산의 진수를 만나다',
    pages: 520,
    price: '22,000원',
    available: false
  },
  {
    id: '5',
    title: '마흔에 읽는 니체',
    author: '장재형',
    publisher: '유노북스',
    publishDate: '2024-10',
    isbn: '9791198776549',
    category: '인문',
    coverImage: 'https://image.yes24.com/goods/129426573/XL',
    rating: 4.4,
    description: '인생 후반전을 위한 니체 철학 입문서',
    pages: 296,
    price: '17,000원',
    available: true
  },
  {
    id: '6',
    title: '역행자',
    author: '자청',
    publisher: '웅진지식하우스',
    publishDate: '2024-09',
    isbn: '9791198776556',
    category: '자기계발',
    coverImage: 'https://image.yes24.com/goods/112369561/XL',
    rating: 4.7,
    isBest: true,
    description: '평범한 삶을 거부하는 역행자의 성공 법칙',
    pages: 340,
    price: '17,500원',
    available: true
  },
  {
    id: '7',
    title: '시대예보: 핵개인의 시대',
    author: '송길영',
    publisher: '북스톤',
    publishDate: '2024-12',
    isbn: '9791198776563',
    category: '사회',
    coverImage: 'https://image.yes24.com/goods/129426574/XL',
    rating: 4.2,
    isNew: true,
    description: '빅데이터로 읽는 대한민국의 미래',
    pages: 312,
    price: '18,500원',
    available: true
  },
  {
    id: '8',
    title: '아주 희미한 빛으로도',
    author: '최은영',
    publisher: '문학동네',
    publishDate: '2024-11',
    isbn: '9791198776570',
    category: '소설',
    coverImage: 'https://image.yes24.com/goods/129426575/XL',
    rating: 4.9,
    isNew: true,
    description: '최은영 작가의 신작 소설집',
    pages: 280,
    price: '15,800원',
    available: true
  }
]

// 카테고리별 도서 분류
const booksByCategory = {
  all: newBooks,
  novel: newBooks.filter(book => book.category === '소설'),
  business: newBooks.filter(book => book.category === '경제경영'),
  selfhelp: newBooks.filter(book => book.category === '자기계발'),
  humanities: newBooks.filter(book => ['인문', '역사문화', '사회'].includes(book.category))
}

export function DSLibraryNewBooks() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(0)
  const booksPerPage = 4

  const displayBooks = booksByCategory[selectedCategory as keyof typeof booksByCategory] || newBooks
  const totalPages = Math.ceil(displayBooks.length / booksPerPage)
  const currentBooks = displayBooks.slice(
    currentPage * booksPerPage,
    (currentPage + 1) * booksPerPage
  )

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <HiStar
            key={i}
            className={`h-3 w-3 ${
              i < Math.floor(rating)
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700'
            }`}
          />
        ))}
        <span className="ml-1 text-xs text-muted-foreground">{rating}</span>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <HiBookOpen className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">신착도서</h2>
          <Badge variant="secondary">
            <HiSparkles className="h-3 w-3 mr-1" />
            이달의 신간
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={prevPage}
            disabled={totalPages <= 1}
          >
            <HiChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={nextPage}
            disabled={totalPages <= 1}
          >
            <HiChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* 카테고리 탭 */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full mb-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">전체</TabsTrigger>
          <TabsTrigger value="novel">소설</TabsTrigger>
          <TabsTrigger value="business">경제경영</TabsTrigger>
          <TabsTrigger value="selfhelp">자기계발</TabsTrigger>
          <TabsTrigger value="humanities">인문</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* 도서 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {currentBooks.map((book) => (
          <Card key={book.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="relative">
              {/* 책 표지 이미지 */}
              <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = `https://via.placeholder.com/300x400/4a5568/ffffff?text=${encodeURIComponent(book.title)}`
                  }}
                />
                {/* 배지 */}
                <div className="absolute top-2 right-2 flex flex-col gap-1">
                  {book.isNew && (
                    <Badge className="bg-green-500 text-white">
                      <HiSparkles className="h-3 w-3 mr-1" />
                      NEW
                    </Badge>
                  )}
                  {book.isBest && (
                    <Badge className="bg-red-500 text-white">
                      <HiFire className="h-3 w-3 mr-1" />
                      BEST
                    </Badge>
                  )}
                </div>
                {/* 대출 가능 여부 */}
                <div className="absolute bottom-2 left-2">
                  <Badge variant={book.available ? "default" : "secondary"}>
                    {book.available ? '대출가능' : '대출중'}
                  </Badge>
                </div>
              </div>

              {/* 도서 정보 */}
              <CardContent className="p-4 space-y-3">
                {/* 카테고리 */}
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {book.category}
                  </Badge>
                  {renderStars(book.rating)}
                </div>

                {/* 제목 */}
                <h3 className="font-bold text-base line-clamp-2 group-hover:text-primary transition-colors">
                  {book.title}
                </h3>

                {/* 저자/출판사 */}
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p className="line-clamp-1">{book.author}</p>
                  <p className="text-xs">{book.publisher} · {book.publishDate}</p>
                </div>

                {/* 설명 */}
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {book.description}
                </p>

                {/* 추가 정보 */}
                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-sm font-medium">{book.price}</span>
                  <Button variant="ghost" size="sm" className="h-7 px-2">
                    상세보기
                    <HiArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>

      {/* 페이지네이션 정보 */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <p className="text-sm text-muted-foreground">
            {currentPage + 1} / {totalPages} 페이지
          </p>
        </div>
      )}

      {/* 더보기 버튼 */}
      <div className="flex justify-center mt-8">
        <Button variant="outline">
          전체 신착도서 보기
          <HiArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}