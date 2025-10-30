"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Image from "next/image"
import { useState } from "react"
import { ShoppingCart, Heart, Share2, Minus, Plus, Star, Truck, Shield, RefreshCw } from "lucide-react"
import { ProductCard } from "@/components/product-card"

export default function ProductDetailPage() {
  const [quantity, setQuantity] = useState(1)
  const [selectedOption, setSelectedOption] = useState("3kg")
  const [mainImage, setMainImage] = useState("/fresh-jeju-tangerines.jpg")

  const product = {
    id: "1",
    name: "제주 감귤 (특품)",
    price: 19900,
    originalPrice: 29900,
    rating: 4.8,
    reviewCount: 234,
    description:
      "제주 청정 지역에서 재배한 당도 높은 프리미엄 감귤입니다. 비타민C가 풍부하여 겨울철 건강 관리에 좋습니다.",
    producer: "제주 김농부",
    origin: "제주 서귀포",
    shipping: "새벽배송 가능",
  }

  const images = [
    "/fresh-jeju-tangerines.jpg",
    "/fresh-korean-strawberries.jpg",
    "/cherry-tomatoes.jpg",
    "/organic-salad-vegetables.jpg",
  ]

  const relatedProducts = [
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
      id: "5",
      name: "강원도 감자 5kg",
      price: 15900,
      image: "/fresh-potatoes.png",
      badge: "NEW",
      rating: 4.5,
      reviewCount: 45,
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

  const reviews = [
    {
      id: 1,
      author: "김**",
      rating: 5,
      date: "2025.01.15",
      content: "정말 달고 맛있어요! 크기도 적당하고 신선해서 만족합니다. 다음에도 재구매 의사 있습니다.",
      helpful: 24,
    },
    {
      id: 2,
      author: "이**",
      rating: 5,
      date: "2025.01.14",
      content: "배송도 빠르고 포장도 꼼꼼하게 잘 되어있었어요. 가족들이 모두 좋아합니다.",
      helpful: 18,
    },
    {
      id: 3,
      author: "박**",
      rating: 4,
      date: "2025.01.13",
      content: "대체로 만족하지만 몇 개는 조금 작았어요. 그래도 맛은 좋습니다!",
      helpful: 12,
    },
  ]

  const qna = [
    {
      id: 1,
      question: "새벽배송 가능한가요?",
      answer: "네, 새벽배송 가능합니다. 주문 시 배송 옵션에서 선택해주세요.",
      author: "홍**",
      date: "2025.01.14",
      answered: true,
    },
    {
      id: 2,
      question: "유통기한이 얼마나 되나요?",
      answer: "수확 후 바로 배송되며, 냉장 보관 시 약 2주 정도 신선하게 드실 수 있습니다.",
      author: "최**",
      date: "2025.01.13",
      answered: true,
    },
  ]

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Product Info Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Images */}
            <div>
              <div className="relative aspect-square rounded-lg overflow-hidden bg-muted mb-4">
                <Image src={mainImage || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">{discount}% 할인</Badge>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setMainImage(img)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 ${
                      mainImage === img ? "border-primary" : "border-transparent"
                    }`}
                  >
                    <Image
                      src={img || "/placeholder.svg"}
                      alt={`상품 이미지 ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div>
              <div className="mb-4">
                <Badge className="mb-2" variant="secondary">
                  {product.origin}
                </Badge>
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                <p className="text-muted-foreground mb-4">{product.description}</p>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold">{product.rating}</span>
                  <span className="text-muted-foreground">({product.reviewCount}개 리뷰)</span>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl font-bold text-primary">{discount}%</span>
                  <span className="text-3xl font-bold">{product.price.toLocaleString()}원</span>
                </div>
                <span className="text-lg text-muted-foreground line-through">
                  {product.originalPrice.toLocaleString()}원
                </span>
              </div>

              <Separator className="my-6" />

              {/* Options */}
              <div className="space-y-4 mb-6">
                <div>
                  <Label className="mb-3 block">용량 선택</Label>
                  <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="3kg" id="3kg" />
                      <Label htmlFor="3kg" className="flex-1 cursor-pointer">
                        3kg (19,900원)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="5kg" id="5kg" />
                      <Label htmlFor="5kg" className="flex-1 cursor-pointer">
                        5kg (29,900원)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="10kg" id="10kg" />
                      <Label htmlFor="10kg" className="flex-1 cursor-pointer">
                        10kg (49,900원)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label className="mb-3 block">수량</Label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input type="number" value={quantity} readOnly className="w-20 text-center" />
                    <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Total Price */}
              <div className="bg-muted/50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between text-lg">
                  <span className="font-semibold">총 상품 금액</span>
                  <span className="text-2xl font-bold text-primary">
                    {(product.price * quantity).toLocaleString()}원
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mb-6">
                <Button variant="outline" size="icon" className="bg-transparent">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" className="bg-transparent">
                  <Share2 className="h-5 w-5" />
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  장바구니
                </Button>
                <Button className="flex-1">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  바로구매
                </Button>
              </div>

              {/* Shipping Info */}
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Truck className="h-4 w-4" />
                  <span>배송비 3,000원 (3만원 이상 무료배송)</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  <span>신선도 보장 - 불만족 시 100% 환불</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <RefreshCw className="h-4 w-4" />
                  <span>수령 후 7일 이내 교환/반품 가능</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <Tabs defaultValue="detail" className="mb-12">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
              <TabsTrigger
                value="detail"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                상품상세
              </TabsTrigger>
              <TabsTrigger
                value="review"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                리뷰 ({product.reviewCount})
              </TabsTrigger>
              <TabsTrigger
                value="qna"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                상품문의
              </TabsTrigger>
              <TabsTrigger
                value="info"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                배송/교환/반품
              </TabsTrigger>
            </TabsList>

            <TabsContent value="detail" className="mt-8">
              <div className="prose max-w-none">
                <div className="bg-muted/30 rounded-lg p-8 mb-6">
                  <h3 className="text-xl font-bold mb-4">상품 정보</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="flex">
                      <span className="font-semibold w-24">생산자</span>
                      <span>{product.producer}</span>
                    </div>
                    <div className="flex">
                      <span className="font-semibold w-24">원산지</span>
                      <span>{product.origin}</span>
                    </div>
                    <div className="flex">
                      <span className="font-semibold w-24">배송</span>
                      <span>{product.shipping}</span>
                    </div>
                    <div className="flex">
                      <span className="font-semibold w-24">보관방법</span>
                      <span>냉장보관</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold">상품 설명</h3>
                  <p className="leading-relaxed">
                    제주의 청정 자연에서 자란 프리미엄 감귤입니다. 일교차가 큰 제주의 기후 덕분에 당도가 높고 과즙이
                    풍부합니다.
                  </p>
                  <p className="leading-relaxed">
                    비타민C가 풍부하여 겨울철 감기 예방에 좋으며, 껍질이 얇아 먹기 편합니다. 엄선된 특품만을 선별하여
                    배송해드립니다.
                  </p>
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                    <Image src="/fresh-jeju-tangerines.jpg" alt="상품 상세 이미지" fill className="object-cover" />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="review" className="mt-8">
              <div className="mb-8">
                <div className="flex items-center gap-8 mb-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">{product.rating}</div>
                    <div className="flex items-center justify-center mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground">{product.reviewCount}개 리뷰</div>
                  </div>
                  <div className="flex-1">
                    <Button>리뷰 작성하기</Button>
                  </div>
                </div>

                <div className="space-y-4">
                  {reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold">{review.author}</span>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating ? "fill-accent text-accent" : "text-muted"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <div className="text-sm text-muted-foreground">{review.date}</div>
                          </div>
                        </div>
                        <p className="text-sm leading-relaxed mb-3">{review.content}</p>
                        <Button variant="ghost" size="sm" className="text-muted-foreground">
                          도움돼요 ({review.helpful})
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="qna" className="mt-8">
              <div className="mb-6">
                <Button>문의하기</Button>
              </div>
              <div className="space-y-4">
                {qna.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">Q</Badge>
                          <span className="font-semibold">{item.question}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {item.author} · {item.date}
                        </div>
                      </div>
                      {item.answered && (
                        <div className="bg-muted/50 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className="bg-primary text-primary-foreground">A</Badge>
                            <span className="font-semibold">판매자 답변</span>
                          </div>
                          <p className="text-sm leading-relaxed">{item.answer}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="info" className="mt-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold mb-3">배송 안내</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                    <li>• 배송비: 3,000원 (3만원 이상 구매 시 무료배송)</li>
                    <li>• 배송 방법: 새벽배송, 택배배송 선택 가능</li>
                    <li>• 배송 기간: 주문 후 1-2일 이내 배송</li>
                    <li>• 제주/도서산간 지역은 추가 배송비가 발생할 수 있습니다</li>
                  </ul>
                </div>
                <Separator />
                <div>
                  <h3 className="text-lg font-bold mb-3">교환/반품 안내</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                    <li>• 신선식품 특성상 단순 변심에 의한 교환/반품은 어렵습니다</li>
                    <li>• 상품 불량, 오배송의 경우 수령 후 24시간 이내 연락 주시면 교환/환불 가능합니다</li>
                    <li>• 교환/반품 배송비는 판매자 부담입니다</li>
                    <li>• 고객센터: 1588-0000 (평일 09:00-18:00)</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Related Products */}
          <section>
            <h2 className="text-2xl font-bold mb-6">함께 보면 좋은 상품</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
