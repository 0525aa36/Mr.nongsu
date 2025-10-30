import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import Image from "next/image"
import {
  Package,
  Heart,
  MapPin,
  CreditCard,
  Gift,
  Bell,
  Settings,
  ChevronRight,
  ShoppingBag,
  Truck,
  CheckCircle,
} from "lucide-react"

export default function MyPage() {
  const user = {
    name: "홍길동",
    email: "hong@email.com",
    grade: "VIP",
    points: 5000,
    coupons: 3,
  }

  const recentOrders = [
    {
      id: "20250115-0001234",
      date: "2025.01.15",
      status: "배송중",
      statusColor: "bg-primary",
      items: [
        {
          name: "제주 감귤 (특품) 3kg",
          image: "/fresh-jeju-tangerines.jpg",
          price: 19900,
          quantity: 2,
        },
      ],
      total: 39800,
    },
    {
      id: "20250110-0001233",
      date: "2025.01.10",
      status: "배송완료",
      statusColor: "bg-secondary",
      items: [
        {
          name: "국내산 딸기 500g",
          image: "/fresh-korean-strawberries.jpg",
          price: 12900,
          quantity: 1,
        },
      ],
      total: 12900,
    },
  ]

  const orderStats = [
    { label: "결제완료", count: 2, icon: CreditCard },
    { label: "배송준비", count: 1, icon: Package },
    { label: "배송중", count: 1, icon: Truck },
    { label: "배송완료", count: 5, icon: CheckCircle },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">마이페이지</h1>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl font-bold text-primary">{user.name[0]}</span>
                    </div>
                    <h2 className="font-bold text-lg mb-1">{user.name}</h2>
                    <p className="text-sm text-muted-foreground mb-2">{user.email}</p>
                    <Badge className="bg-accent text-accent-foreground">{user.grade} 회원</Badge>
                  </div>

                  <Separator className="my-4" />

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-1">{user.points.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">적립금</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-1">{user.coupons}</div>
                      <div className="text-xs text-muted-foreground">쿠폰</div>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <nav className="space-y-1">
                    <Link
                      href="/mypage/orders"
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Package className="h-5 w-5 text-muted-foreground" />
                        <span className="text-sm font-medium">주문내역</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </Link>

                    <Link
                      href="/mypage/wishlist"
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Heart className="h-5 w-5 text-muted-foreground" />
                        <span className="text-sm font-medium">찜한상품</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </Link>

                    <Link
                      href="/mypage/addresses"
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-muted-foreground" />
                        <span className="text-sm font-medium">배송지 관리</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </Link>

                    <Link
                      href="/mypage/coupons"
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Gift className="h-5 w-5 text-muted-foreground" />
                        <span className="text-sm font-medium">쿠폰</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </Link>

                    <Link
                      href="/mypage/points"
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5 text-muted-foreground" />
                        <span className="text-sm font-medium">적립금</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </Link>

                    <Link
                      href="/mypage/notifications"
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Bell className="h-5 w-5 text-muted-foreground" />
                        <span className="text-sm font-medium">알림설정</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </Link>

                    <Link
                      href="/mypage/settings"
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Settings className="h-5 w-5 text-muted-foreground" />
                        <span className="text-sm font-medium">회원정보 수정</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Order Status */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>주문 현황</CardTitle>
                    <Link href="/mypage/orders">
                      <Button variant="ghost" size="sm">
                        전체보기
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {orderStats.map((stat, index) => (
                      <div
                        key={index}
                        className="text-center p-4 border rounded-lg hover:border-primary transition-colors"
                      >
                        <stat.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                        <div className="text-2xl font-bold mb-1">{stat.count}</div>
                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Orders */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>최근 주문</CardTitle>
                    <Link href="/mypage/orders">
                      <Button variant="ghost" size="sm">
                        전체보기
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">{order.date}</div>
                          <div className="font-semibold">주문번호: {order.id}</div>
                        </div>
                        <Badge className={order.statusColor}>{order.status}</Badge>
                      </div>

                      {order.items.map((item, index) => (
                        <div key={index} className="flex gap-4 mb-4">
                          <div className="relative w-20 h-20 flex-shrink-0">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover rounded-lg"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium mb-1">{item.name}</h4>
                            <p className="text-sm text-muted-foreground mb-2">수량: {item.quantity}개</p>
                            <p className="font-semibold">{item.price.toLocaleString()}원</p>
                          </div>
                        </div>
                      ))}

                      <Separator className="my-4" />

                      <div className="flex items-center justify-between">
                        <span className="font-semibold">총 결제금액</span>
                        <span className="text-xl font-bold text-primary">{order.total.toLocaleString()}원</span>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" className="flex-1 bg-transparent" asChild>
                          <Link href={`/mypage/orders/${order.id}`}>주문상세</Link>
                        </Button>
                        {order.status === "배송완료" && (
                          <Button variant="outline" className="flex-1 bg-transparent">
                            리뷰작성
                          </Button>
                        )}
                        {order.status === "배송중" && (
                          <Button variant="outline" className="flex-1 bg-transparent">
                            배송조회
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Benefits */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Gift className="h-5 w-5" />
                      사용 가능한 쿠폰
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-6">
                      <div className="text-4xl font-bold text-primary mb-2">{user.coupons}</div>
                      <p className="text-sm text-muted-foreground mb-4">장</p>
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/mypage/coupons">쿠폰함 보기</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      보유 적립금
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-6">
                      <div className="text-4xl font-bold text-primary mb-2">{user.points.toLocaleString()}</div>
                      <p className="text-sm text-muted-foreground mb-4">원</p>
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/mypage/points">적립금 내역</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>자주 찾는 메뉴</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Link
                      href="/mypage/wishlist"
                      className="flex flex-col items-center gap-2 p-4 border rounded-lg hover:border-primary transition-colors"
                    >
                      <Heart className="h-8 w-8 text-primary" />
                      <span className="text-sm font-medium">찜한상품</span>
                    </Link>

                    <Link
                      href="/mypage/addresses"
                      className="flex flex-col items-center gap-2 p-4 border rounded-lg hover:border-primary transition-colors"
                    >
                      <MapPin className="h-8 w-8 text-primary" />
                      <span className="text-sm font-medium">배송지관리</span>
                    </Link>

                    <Link
                      href="/mypage/reviews"
                      className="flex flex-col items-center gap-2 p-4 border rounded-lg hover:border-primary transition-colors"
                    >
                      <ShoppingBag className="h-8 w-8 text-primary" />
                      <span className="text-sm font-medium">리뷰관리</span>
                    </Link>

                    <Link
                      href="/mypage/inquiries"
                      className="flex flex-col items-center gap-2 p-4 border rounded-lg hover:border-primary transition-colors"
                    >
                      <Bell className="h-8 w-8 text-primary" />
                      <span className="text-sm font-medium">문의내역</span>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
