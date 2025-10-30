"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  TrendingUp,
  Download,
  Eye,
  Edit,
  Trash2,
} from "lucide-react"
import { useState } from "react"

export default function AdminDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("7days")

  // 샘플 데이터
  const stats = {
    totalSales: 15420000,
    totalOrders: 342,
    totalUsers: 1234,
    totalProducts: 156,
    salesGrowth: 12.5,
    ordersGrowth: 8.3,
    usersGrowth: 15.2,
  }

  const salesData = [
    { name: "월", sales: 2400000 },
    { name: "화", sales: 1800000 },
    { name: "수", sales: 3200000 },
    { name: "목", sales: 2100000 },
    { name: "금", sales: 2800000 },
    { name: "토", sales: 3900000 },
    { name: "일", sales: 4200000 },
  ]

  const categoryData = [
    { name: "채소", value: 35, color: "#10b981" },
    { name: "과일", value: 30, color: "#f59e0b" },
    { name: "수산물", value: 20, color: "#3b82f6" },
    { name: "축산물", value: 15, color: "#ef4444" },
  ]

  const recentOrders = [
    {
      id: "ORD-2025-001",
      customer: "김민수",
      product: "제주 감귤 3kg",
      amount: 19900,
      status: "배송중",
      date: "2025-01-20",
    },
    {
      id: "ORD-2025-002",
      customer: "이지은",
      product: "국내산 딸기 500g",
      amount: 12900,
      status: "결제완료",
      date: "2025-01-20",
    },
    {
      id: "ORD-2025-003",
      customer: "박준형",
      product: "완도 활전복 10미",
      amount: 35000,
      status: "배송완료",
      date: "2025-01-19",
    },
    {
      id: "ORD-2025-004",
      customer: "최수진",
      product: "유기농 샐러드 채소",
      amount: 8900,
      status: "주문취소",
      date: "2025-01-19",
    },
  ]

  const topProducts = [
    { id: 1, name: "제주 감귤 3kg", sales: 234, revenue: 4656600 },
    { id: 2, name: "국내산 딸기 500g", sales: 189, revenue: 2438100 },
    { id: 3, name: "완도 활전복 10미", sales: 156, revenue: 5460000 },
    { id: 4, name: "유기농 샐러드 채소", sales: 145, revenue: 1290500 },
    { id: 5, name: "강원도 감자 5kg", sales: 123, revenue: 1955700 },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "배송중":
        return <Badge className="bg-blue-500">배송중</Badge>
      case "결제완료":
        return <Badge className="bg-green-500">결제완료</Badge>
      case "배송완료":
        return <Badge variant="secondary">배송완료</Badge>
      case "주문취소":
        return <Badge variant="destructive">주문취소</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const handleExportExcel = () => {
    // TODO: 엑셀 다운로드 API 호출
    alert("엑셀 다운로드 기능은 개발 중입니다.")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">관리자 대시보드</h1>
            <p className="text-muted-foreground">농수산물 쇼핑몰 관리</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">총 매출</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalSales.toLocaleString()}원</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                  전주 대비 +{stats.salesGrowth}%
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">총 주문</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalOrders}건</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                  전주 대비 +{stats.ordersGrowth}%
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">총 회원</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalUsers}명</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                  전주 대비 +{stats.usersGrowth}%
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">총 상품</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalProducts}개</div>
                <p className="text-xs text-muted-foreground mt-1">등록된 상품 수</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>주간 매출 현황</CardTitle>
                <CardDescription>최근 7일간의 일별 매출</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${Number(value).toLocaleString()}원`} />
                    <Bar dataKey="sales" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>카테고리별 판매 비율</CardTitle>
                <CardDescription>전체 판매 중 카테고리 비중</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="orders" className="space-y-4">
            <TabsList>
              <TabsTrigger value="orders">최근 주문</TabsTrigger>
              <TabsTrigger value="products">인기 상품</TabsTrigger>
            </TabsList>

            <TabsContent value="orders" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>최근 주문 내역</CardTitle>
                      <CardDescription>최근 주문을 확인하고 관리하세요</CardDescription>
                    </div>
                    <Button onClick={handleExportExcel}>
                      <Download className="h-4 w-4 mr-2" />
                      엑셀 다운로드
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>주문번호</TableHead>
                        <TableHead>고객명</TableHead>
                        <TableHead>상품</TableHead>
                        <TableHead>금액</TableHead>
                        <TableHead>상태</TableHead>
                        <TableHead>주문일</TableHead>
                        <TableHead className="text-right">작업</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell>{order.product}</TableCell>
                          <TableCell>{order.amount.toLocaleString()}원</TableCell>
                          <TableCell>{getStatusBadge(order.status)}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="products" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>인기 상품 TOP 5</CardTitle>
                  <CardDescription>판매량이 높은 상품 순위</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>순위</TableHead>
                        <TableHead>상품명</TableHead>
                        <TableHead>판매량</TableHead>
                        <TableHead>매출액</TableHead>
                        <TableHead className="text-right">작업</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {topProducts.map((product, index) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">{index + 1}</TableCell>
                          <TableCell>{product.name}</TableCell>
                          <TableCell>{product.sales}개</TableCell>
                          <TableCell>{product.revenue.toLocaleString()}원</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
