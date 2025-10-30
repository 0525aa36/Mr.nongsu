"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Minus, Plus, X, ShoppingBag, Truck } from "lucide-react"
import { useRouter } from "next/navigation"

interface Product {
  id: number
  name: string
  price: number
  imageUrl: string
  stock: number
}

interface CartItem {
  id: number
  product: Product
  quantity: number
  price: number
}

interface Cart {
  id: number
  cartItems: CartItem[]
}

export default function CartPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [cart, setCart] = useState<Cart | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedItems, setSelectedItems] = useState<number[]>([])

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
      return
    }

    fetchCart()
  }, [])

  const fetchCart = async () => {
    const token = localStorage.getItem("token")
    if (!token) return

    try {
      const response = await fetch("http://localhost:8081/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setCart(data)
        // Select all items by default
        setSelectedItems(data.cartItems.map((item: CartItem) => item.id))
      } else if (response.status === 404) {
        // Cart doesn't exist yet - empty cart
        setCart(null)
      } else {
        throw new Error("Failed to fetch cart")
      }
    } catch (error) {
      console.error("Error fetching cart:", error)
      toast({
        title: "오류",
        description: "장바구니를 불러오는 중 오류가 발생했습니다.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const updateQuantity = async (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return

    const token = localStorage.getItem("token")
    if (!token) return

    try {
      const response = await fetch(`http://localhost:8081/api/cart/items/${itemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity: newQuantity }),
      })

      if (response.ok) {
        // Refresh cart
        await fetchCart()
      } else {
        throw new Error("Failed to update quantity")
      }
    } catch (error) {
      console.error("Error updating quantity:", error)
      toast({
        title: "오류",
        description: "수량 변경 중 오류가 발생했습니다.",
        variant: "destructive",
      })
    }
  }

  const removeItem = async (itemId: number) => {
    const token = localStorage.getItem("token")
    if (!token) return

    try {
      const response = await fetch(`http://localhost:8081/api/cart/items/${itemId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        // Refresh cart
        await fetchCart()
        setSelectedItems(selectedItems.filter((id) => id !== itemId))
        toast({
          title: "삭제 완료",
          description: "상품이 장바구니에서 삭제되었습니다.",
        })
      } else {
        throw new Error("Failed to remove item")
      }
    } catch (error) {
      console.error("Error removing item:", error)
      toast({
        title: "오류",
        description: "상품 삭제 중 오류가 발생했습니다.",
        variant: "destructive",
      })
    }
  }

  const toggleSelectItem = (id: number) => {
    setSelectedItems(
      selectedItems.includes(id) ? selectedItems.filter((itemId) => itemId !== id) : [...selectedItems, id],
    )
  }

  const toggleSelectAll = () => {
    if (!cart) return
    setSelectedItems(selectedItems.length === cart.cartItems.length ? [] : cart.cartItems.map((item) => item.id))
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-8 bg-muted/30">
          <div className="container mx-auto px-4">
            <p className="text-center">로딩 중...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const cartItems = cart?.cartItems || []
  const selectedCartItems = cartItems.filter((item) => selectedItems.includes(item.id))
  const totalProductPrice = selectedCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalShipping = totalProductPrice >= 30000 ? 0 : 3000
  const finalTotal = totalProductPrice + totalShipping

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">장바구니</h1>

          {cartItems.length === 0 ? (
            <Card className="py-20">
              <CardContent className="text-center">
                <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h2 className="text-xl font-semibold mb-2">장바구니가 비어있습니다</h2>
                <p className="text-muted-foreground mb-6">신선한 상품을 담아보세요</p>
                <Button asChild>
                  <Link href="/">쇼핑 계속하기</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {/* Select All */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="select-all"
                          checked={selectedItems.length === cartItems.length}
                          onCheckedChange={toggleSelectAll}
                        />
                        <label htmlFor="select-all" className="font-medium cursor-pointer">
                          전체선택 ({selectedItems.length}/{cartItems.length})
                        </label>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          selectedItems.forEach((id) => removeItem(id))
                        }}
                        disabled={selectedItems.length === 0}
                      >
                        선택삭제
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Cart Items List */}
                {cartItems.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <Checkbox
                          checked={selectedItems.includes(item.id)}
                          onCheckedChange={() => toggleSelectItem(item.id)}
                          className="mt-1"
                        />

                        <Link href={`/product/${item.product.id}`} className="relative w-24 h-24 flex-shrink-0">
                          <Image
                            src={item.product.imageUrl || "/placeholder.svg"}
                            alt={item.product.name}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </Link>

                        <div className="flex-1 min-w-0">
                          <Link href={`/product/${item.product.id}`}>
                            <h3 className="font-semibold mb-1 hover:text-primary transition-colors">
                              {item.product.name}
                            </h3>
                          </Link>

                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-lg font-bold">{item.price.toLocaleString()}원</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 bg-transparent"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <Input
                                type="number"
                                value={item.quantity}
                                readOnly
                                className="w-16 h-8 text-center p-0"
                              />
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 bg-transparent"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>

                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeItem(item.id)}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <Separator className="my-4" />

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Truck className="h-4 w-4" />
                          <span>배송비 3,000원</span>
                        </div>
                        <span className="font-bold text-lg">{(item.price * item.quantity).toLocaleString()}원</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-bold mb-6">주문 요약</h2>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">상품금액</span>
                          <span>{totalProductPrice.toLocaleString()}원</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">배송비</span>
                          <span>{totalShipping === 0 ? "무료" : `${totalShipping.toLocaleString()}원`}</span>
                        </div>
                      </div>

                      <Separator className="my-4" />

                      <div className="flex items-center justify-between mb-6">
                        <span className="text-lg font-semibold">총 결제금액</span>
                        <span className="text-2xl font-bold text-primary">{finalTotal.toLocaleString()}원</span>
                      </div>

                      {totalProductPrice < 30000 && totalProductPrice > 0 && (
                        <div className="bg-muted/50 rounded-lg p-4 mb-4 text-sm text-center">
                          <p className="text-muted-foreground">
                            <span className="font-semibold text-primary">
                              {(30000 - totalProductPrice).toLocaleString()}원
                            </span>{" "}
                            더 담으면 무료배송!
                          </p>
                        </div>
                      )}

                      <Button className="w-full mb-3" size="lg" disabled={selectedItems.length === 0} asChild>
                        <Link href="/checkout">주문하기</Link>
                      </Button>

                      <Button variant="outline" className="w-full bg-transparent" asChild>
                        <Link href="/">쇼핑 계속하기</Link>
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Benefits */}
                  <Card className="mt-4">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4">혜택 안내</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <span>3만원 이상 구매 시 무료배송</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <span>신선도 보장 - 불만족 시 100% 환불</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <span>구매금액의 1% 적립</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
