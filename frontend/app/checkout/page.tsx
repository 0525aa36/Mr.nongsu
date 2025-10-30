"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"
import { useState } from "react"
import { ChevronRight, Check } from "lucide-react"

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [shippingMethod, setShippingMethod] = useState("standard")
  const [paymentMethod, setPaymentMethod] = useState("card")

  const orderItems = [
    {
      id: "1",
      name: "제주 감귤 (특품)",
      price: 19900,
      quantity: 2,
      image: "/fresh-jeju-tangerines.jpg",
      option: "3kg",
    },
    {
      id: "2",
      name: "국내산 딸기 500g",
      price: 12900,
      quantity: 1,
      image: "/fresh-korean-strawberries.jpg",
      option: "500g",
    },
  ]

  const totalProductPrice = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shippingFee = totalProductPrice >= 30000 ? 0 : 3000
  const finalTotal = totalProductPrice + shippingFee

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">주문/결제</h1>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {step > 1 ? <Check className="h-5 w-5" /> : "1"}
              </div>
              <span className="ml-2 text-sm font-medium">배송정보</span>
            </div>

            <ChevronRight className="mx-4 h-5 w-5 text-muted-foreground" />

            <div className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {step > 2 ? <Check className="h-5 w-5" /> : "2"}
              </div>
              <span className="ml-2 text-sm font-medium">결제하기</span>
            </div>

            <ChevronRight className="mx-4 h-5 w-5 text-muted-foreground" />

            <div className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                3
              </div>
              <span className="ml-2 text-sm font-medium">주문완료</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Step 1: Shipping Information */}
              {step === 1 && (
                <>
                  {/* Orderer Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle>주문자 정보</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="orderer-name">이름 *</Label>
                          <Input id="orderer-name" placeholder="홍길동" defaultValue="홍길동" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="orderer-phone">휴대폰 번호 *</Label>
                          <Input id="orderer-phone" placeholder="010-0000-0000" defaultValue="010-1234-5678" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="orderer-email">이메일 *</Label>
                        <Input
                          id="orderer-email"
                          type="email"
                          placeholder="example@email.com"
                          defaultValue="hong@email.com"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Shipping Address */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>배송지 정보</CardTitle>
                        <Button variant="outline" size="sm">
                          배송지 목록
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="same-as-orderer" defaultChecked />
                        <label htmlFor="same-as-orderer" className="text-sm cursor-pointer">
                          주문자 정보와 동일
                        </label>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="receiver-name">받는 사람 *</Label>
                          <Input id="receiver-name" placeholder="홍길동" defaultValue="홍길동" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="receiver-phone">휴대폰 번호 *</Label>
                          <Input id="receiver-phone" placeholder="010-0000-0000" defaultValue="010-1234-5678" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">주소 *</Label>
                        <div className="flex gap-2 mb-2">
                          <Input id="zipcode" placeholder="우편번호" className="w-32" defaultValue="06234" readOnly />
                          <Button type="button" variant="outline">
                            주소검색
                          </Button>
                        </div>
                        <Input
                          id="address"
                          placeholder="기본주소"
                          defaultValue="서울특별시 강남구 테헤란로 123"
                          readOnly
                          className="mb-2"
                        />
                        <Input id="address-detail" placeholder="상세주소를 입력하세요" defaultValue="101동 1001호" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="delivery-request">배송 요청사항</Label>
                        <Textarea
                          id="delivery-request"
                          placeholder="배송 시 요청사항을 입력해주세요"
                          rows={3}
                          defaultValue="문 앞에 놓아주세요"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Shipping Method */}
                  <Card>
                    <CardHeader>
                      <CardTitle>배송 방법</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
                        <div className="flex items-center justify-between p-4 border rounded-lg mb-3">
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem value="standard" id="standard" />
                            <div>
                              <Label htmlFor="standard" className="font-semibold cursor-pointer">
                                일반배송
                              </Label>
                              <p className="text-sm text-muted-foreground">2-3일 소요</p>
                            </div>
                          </div>
                          <span className="font-semibold">무료</span>
                        </div>

                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem value="dawn" id="dawn" />
                            <div>
                              <Label htmlFor="dawn" className="font-semibold cursor-pointer">
                                새벽배송
                              </Label>
                              <p className="text-sm text-muted-foreground">다음날 오전 7시 전 도착</p>
                            </div>
                          </div>
                          <span className="font-semibold">+3,000원</span>
                        </div>
                      </RadioGroup>
                    </CardContent>
                  </Card>

                  <Button className="w-full" size="lg" onClick={() => setStep(2)}>
                    다음 단계
                  </Button>
                </>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <>
                  {/* Payment Method */}
                  <Card>
                    <CardHeader>
                      <CardTitle>결제 수단</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3 p-4 border rounded-lg">
                            <RadioGroupItem value="card" id="card" />
                            <Label htmlFor="card" className="flex-1 cursor-pointer">
                              신용카드 / 체크카드
                            </Label>
                          </div>

                          <div className="flex items-center space-x-3 p-4 border rounded-lg">
                            <RadioGroupItem value="transfer" id="transfer" />
                            <Label htmlFor="transfer" className="flex-1 cursor-pointer">
                              실시간 계좌이체
                            </Label>
                          </div>

                          <div className="flex items-center space-x-3 p-4 border rounded-lg">
                            <RadioGroupItem value="vbank" id="vbank" />
                            <Label htmlFor="vbank" className="flex-1 cursor-pointer">
                              무통장 입금
                            </Label>
                          </div>

                          <div className="flex items-center space-x-3 p-4 border rounded-lg">
                            <RadioGroupItem value="phone" id="phone" />
                            <Label htmlFor="phone" className="flex-1 cursor-pointer">
                              휴대폰 결제
                            </Label>
                          </div>

                          <div className="flex items-center space-x-3 p-4 border rounded-lg">
                            <RadioGroupItem value="kakao" id="kakao" />
                            <Label htmlFor="kakao" className="flex-1 cursor-pointer">
                              카카오페이
                            </Label>
                          </div>

                          <div className="flex items-center space-x-3 p-4 border rounded-lg">
                            <RadioGroupItem value="naver" id="naver" />
                            <Label htmlFor="naver" className="flex-1 cursor-pointer">
                              네이버페이
                            </Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </CardContent>
                  </Card>

                  {/* Coupon & Points */}
                  <Card>
                    <CardHeader>
                      <CardTitle>할인 / 적립</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>쿠폰</Label>
                        <div className="flex gap-2">
                          <Input placeholder="쿠폰을 선택하세요" readOnly />
                          <Button variant="outline">선택</Button>
                        </div>
                        <p className="text-sm text-muted-foreground">사용 가능한 쿠폰 3장</p>
                      </div>

                      <div className="space-y-2">
                        <Label>적립금</Label>
                        <div className="flex gap-2">
                          <Input type="number" placeholder="0" />
                          <Button variant="outline">전액사용</Button>
                        </div>
                        <p className="text-sm text-muted-foreground">보유 적립금: 5,000원</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Agreement */}
                  <Card>
                    <CardHeader>
                      <CardTitle>주문 동의</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-start space-x-2">
                        <Checkbox id="agree-all" />
                        <label htmlFor="agree-all" className="font-semibold cursor-pointer">
                          전체 동의
                        </label>
                      </div>

                      <Separator />

                      <div className="space-y-2 pl-6">
                        <div className="flex items-start space-x-2">
                          <Checkbox id="agree-terms" />
                          <label htmlFor="agree-terms" className="text-sm cursor-pointer">
                            [필수] 개인정보 수집 및 이용 동의
                          </label>
                        </div>

                        <div className="flex items-start space-x-2">
                          <Checkbox id="agree-payment" />
                          <label htmlFor="agree-payment" className="text-sm cursor-pointer">
                            [필수] 결제대행 서비스 이용약관 동의
                          </label>
                        </div>

                        <div className="flex items-start space-x-2">
                          <Checkbox id="agree-order" />
                          <label htmlFor="agree-order" className="text-sm cursor-pointer">
                            [필수] 주문 내용 확인 및 결제 동의
                          </label>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setStep(1)}>
                      이전
                    </Button>
                    <Button className="flex-1" size="lg" onClick={() => setStep(3)}>
                      {finalTotal.toLocaleString()}원 결제하기
                    </Button>
                  </div>
                </>
              )}

              {/* Step 3: Complete */}
              {step === 3 && (
                <Card>
                  <CardContent className="py-12 text-center">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                      <Check className="h-10 w-10 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">주문이 완료되었습니다!</h2>
                    <p className="text-muted-foreground mb-2">주문번호: 20250116-0001234</p>
                    <p className="text-sm text-muted-foreground mb-8">
                      주문 내역은 마이페이지에서 확인하실 수 있습니다
                    </p>

                    <div className="bg-muted/50 rounded-lg p-6 mb-8 text-left max-w-md mx-auto">
                      <h3 className="font-semibold mb-4">배송 정보</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">받는 사람</span>
                          <span>홍길동</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">연락처</span>
                          <span>010-1234-5678</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">배송지</span>
                          <span className="text-right">서울특별시 강남구 테헤란로 123</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">배송 방법</span>
                          <span>일반배송</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 max-w-md mx-auto">
                      <Button variant="outline" className="flex-1 bg-transparent" asChild>
                        <a href="/">홈으로</a>
                      </Button>
                      <Button className="flex-1" asChild>
                        <a href="/mypage/orders">주문내역 보기</a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card>
                  <CardHeader>
                    <CardTitle>주문 상품</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {orderItems.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <div className="relative w-16 h-16 flex-shrink-0">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium line-clamp-2 mb-1">{item.name}</h4>
                          <p className="text-xs text-muted-foreground mb-1">{item.option}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">수량: {item.quantity}</span>
                            <span className="text-sm font-semibold">
                              {(item.price * item.quantity).toLocaleString()}원
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}

                    <Separator />

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">상품금액</span>
                        <span>{totalProductPrice.toLocaleString()}원</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">배송비</span>
                        <span>{shippingFee === 0 ? "무료" : `${shippingFee.toLocaleString()}원`}</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-between items-center">
                      <span className="font-semibold">총 결제금액</span>
                      <span className="text-2xl font-bold text-primary">{finalTotal.toLocaleString()}원</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
