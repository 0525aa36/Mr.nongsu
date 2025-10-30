import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, Truck, Shield, Leaf, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  // Sample product data
  const todayDeals = [
    {
      id: "1",
      name: "제주 감귤 3kg (특품)",
      price: 19900,
      originalPrice: 29900,
      image: "/fresh-jeju-tangerines.jpg",
      badge: "오늘특가",
      rating: 4.8,
      reviewCount: 234,
    },
    {
      id: "2",
      name: "국내산 딸기 500g",
      price: 12900,
      originalPrice: 15900,
      image: "/fresh-korean-strawberries.jpg",
      badge: "베스트",
      rating: 4.9,
      reviewCount: 456,
    },
    {
      id: "3",
      name: "완도 활전복 10미",
      price: 35000,
      originalPrice: 45000,
      image: "/fresh-abalone.jpg",
      badge: "신선보장",
      rating: 4.7,
      reviewCount: 123,
    },
    {
      id: "4",
      name: "유기농 샐러드 채소 모음",
      price: 8900,
      image: "/organic-salad-vegetables.jpg",
      badge: "유기농",
      rating: 4.6,
      reviewCount: 89,
    },
  ]

  const newProducts = [
    {
      id: "5",
      name: "강원도 감자 5kg",
      price: 15900,
      image: "/fresh-potatoes.png",
      badge: "NEW",
      rating: 4.5,
      reviewCount: 45,
    },
    {
      id: "6",
      name: "제주 은갈치 2마리",
      price: 28000,
      image: "/fresh-hairtail-fish.jpg",
      badge: "NEW",
      rating: 4.8,
      reviewCount: 67,
    },
    {
      id: "7",
      name: "국내산 한우 등심 500g",
      price: 45000,
      image: "/korean-beef-sirloin.jpg",
      badge: "NEW",
      rating: 4.9,
      reviewCount: 234,
    },
    {
      id: "8",
      name: "친환경 방울토마토 1kg",
      price: 9900,
      image: "/cherry-tomatoes.jpg",
      badge: "NEW",
      rating: 4.7,
      reviewCount: 156,
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Banner */}
        <section className="relative h-[400px] md:h-[500px] bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl">
              <Badge className="mb-4 bg-accent text-accent-foreground">신선함을 배송합니다</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
                농가에서 식탁까지
                <br />
                신선한 농수산물 직송
              </h1>
              <p className="text-lg text-muted-foreground mb-6 text-pretty leading-relaxed">
                전국의 우수 농가와 어가에서 직접 배송하는
                <br />
                믿을 수 있는 신선 식품을 만나보세요
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="text-base">
                  지금 쇼핑하기
                </Button>
                <Button size="lg" variant="outline" className="text-base bg-transparent">
                  생산자 스토리
                </Button>
              </div>
            </div>
          </div>
          <div className="absolute right-0 top-0 h-full w-1/2 hidden lg:block">
            <Image src="/fresh-vegetables-and-fruits-basket.jpg" alt="신선한 농산물" fill className="object-contain" />
          </div>
        </section>

        {/* Features */}
        <section className="py-12 border-b bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex flex-col items-center text-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">신선 배송</h3>
                  <p className="text-sm text-muted-foreground">당일 수확 직송</p>
                </div>
              </div>

              <div className="flex flex-col items-center text-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">품질 보증</h3>
                  <p className="text-sm text-muted-foreground">100% 환불 보장</p>
                </div>
              </div>

              <div className="flex flex-col items-center text-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">친환경 인증</h3>
                  <p className="text-sm text-muted-foreground">유기농 GAP 인증</p>
                </div>
              </div>

              <div className="flex flex-col items-center text-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">빠른 배송</h3>
                  <p className="text-sm text-muted-foreground">새벽/당일 배송</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Today's Deals */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">오늘의 특가</h2>
                <p className="text-muted-foreground">매일 새로운 특가 상품을 만나보세요</p>
              </div>
              <Link href="/deals">
                <Button variant="ghost">
                  전체보기
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {todayDeals.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </section>

        {/* Category Banner */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">카테고리별 쇼핑</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "채소", image: "fresh+vegetables", href: "/category/vegetables" },
                { name: "과일", image: "fresh+fruits", href: "/category/fruits" },
                { name: "수산물", image: "fresh+seafood", href: "/category/seafood" },
                { name: "축산물", image: "fresh+meat", href: "/category/meat" },
              ].map((category) => (
                <Link key={category.name} href={category.href}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                    <div className="relative aspect-square">
                      <Image
                        src={`/.jpg?height=300&width=300&query=${category.image}`}
                        alt={category.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-4 text-center">
                      <h3 className="font-semibold text-lg">{category.name}</h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* New Products */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">신상품</h2>
                <p className="text-muted-foreground">이번 주 새로 입고된 신선 식품</p>
              </div>
              <Link href="/new">
                <Button variant="ghost">
                  전체보기
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {newProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </section>

        {/* Producer Story */}
        <section className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">생산자 이야기</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "김농부님의 유기농 딸기",
                  location: "충남 논산",
                  image: "strawberry+farm",
                  description: "30년 경력의 딸기 재배 전문가",
                },
                {
                  name: "이어부님의 완도 전복",
                  location: "전남 완도",
                  image: "abalone+farm",
                  description: "청정 해역에서 자란 싱싱한 전복",
                },
                {
                  name: "박농부님의 제주 감귤",
                  location: "제주 서귀포",
                  image: "tangerine+farm",
                  description: "햇살 가득한 제주 감귤",
                },
              ].map((story, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative aspect-video">
                    <Image
                      src={`/.jpg?height=300&width=400&query=${story.image}`}
                      alt={story.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <Badge className="mb-2" variant="secondary">
                      {story.location}
                    </Badge>
                    <h3 className="font-semibold text-lg mb-2">{story.name}</h3>
                    <p className="text-sm text-muted-foreground">{story.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
