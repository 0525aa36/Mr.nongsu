"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, Truck, Shield, Leaf, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"

interface Product {
  id: number
  name: string
  category: string
  origin: string
  description: string
  price: number
  stock: number
  imageUrl: string
  createdAt: string
  updatedAt: string
}

interface ProductCardData {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  badge?: string
  rating?: number
  reviewCount?: number
}

export default function HomePage() {
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/products?size=50&sort=createdAt,desc")
      if (response.ok) {
        const data = await response.json()
        setAllProducts(data.content || [])
      }
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  // Convert backend Product to ProductCard props
  const convertToCardData = (product: Product, badge?: string): ProductCardData => ({
    id: product.id.toString(),
    name: product.name,
    price: product.price,
    image: product.imageUrl || "/placeholder.svg",
    badge: badge || product.category,
    rating: 4.5,
    reviewCount: 0,
  })

  // Get latest products for "Today's Deals"
  const todayDeals = allProducts.slice(0, 4).map((p) => convertToCardData(p, "오늘특가"))

  // Get new products (most recent 8)
  const newProducts = allProducts.slice(0, 8).map((p) => convertToCardData(p, "NEW"))

  // Get categories from products
  const categories = Array.from(new Set(allProducts.map((p) => p.category)))
    .slice(0, 4)
    .map((category) => ({
      name: category,
      image: "fresh+vegetables",
      href: `/search?category=${encodeURIComponent(category)}`,
    }))

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
                <Link href="/search">
                  <Button size="lg" className="text-base">
                    지금 쇼핑하기
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="text-base bg-transparent">
                  생산자 스토리
                </Button>
              </div>
            </div>
          </div>
          <div className="absolute right-0 top-0 h-full w-1/2 hidden lg:block">
            <Image
              src="/fresh-vegetables-and-fruits-basket.jpg"
              alt="신선한 농산물"
              fill
              className="object-contain"
            />
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
              <Link href="/search">
                <Button variant="ghost">
                  전체보기
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>

            {loading ? (
              <div className="text-center py-12 text-muted-foreground">로딩 중...</div>
            ) : todayDeals.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">등록된 상품이 없습니다</div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {todayDeals.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Category Banner */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">카테고리별 쇼핑</h2>
            {loading ? (
              <div className="text-center py-12 text-muted-foreground">로딩 중...</div>
            ) : categories.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">카테고리가 없습니다</div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categories.map((category) => (
                  <Link key={category.name} href={category.href}>
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                      <div className="relative aspect-square bg-muted flex items-center justify-center">
                        <div className="text-6xl">🌾</div>
                      </div>
                      <CardContent className="p-4 text-center">
                        <h3 className="font-semibold text-lg">{category.name}</h3>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
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
              <Link href="/search">
                <Button variant="ghost">
                  전체보기
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>

            {loading ? (
              <div className="text-center py-12 text-muted-foreground">로딩 중...</div>
            ) : newProducts.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">등록된 상품이 없습니다</div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {newProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            )}
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
                  <div className="relative aspect-video bg-muted flex items-center justify-center">
                    <div className="text-8xl">🌱</div>
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
