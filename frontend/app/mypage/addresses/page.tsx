"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { useState } from "react"
import { MapPin, Plus, Edit, Trash2, ChevronLeft } from "lucide-react"

interface Address {
  id: string
  name: string
  recipient: string
  phone: string
  zipcode: string
  address: string
  addressDetail: string
  isDefault: boolean
}

export default function AddressManagementPage() {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      name: "집",
      recipient: "홍길동",
      phone: "010-1234-5678",
      zipcode: "06234",
      address: "서울특별시 강남구 테헤란로 123",
      addressDetail: "101동 1001호",
      isDefault: true,
    },
    {
      id: "2",
      name: "회사",
      recipient: "홍길동",
      phone: "010-1234-5678",
      zipcode: "06234",
      address: "서울특별시 강남구 역삼동 456",
      addressDetail: "A동 5층",
      isDefault: false,
    },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)

  const handleDelete = (id: string) => {
    if (confirm("배송지를 삭제하시겠습니까?")) {
      setAddresses(addresses.filter((addr) => addr.id !== id))
    }
  }

  const handleSetDefault = (id: string) => {
    setAddresses(addresses.map((addr) => ({ ...addr, isDefault: addr.id === id })))
  }

  const handleEdit = (address: Address) => {
    setEditingAddress(address)
    setIsDialogOpen(true)
  }

  const handleAddNew = () => {
    setEditingAddress(null)
    setIsDialogOpen(true)
  }

  const handleSave = () => {
    // Save logic would go here
    setIsDialogOpen(false)
    setEditingAddress(null)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <Link href="/mypage">
                <Button variant="ghost" size="icon">
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-3xl font-bold">배송지 관리</h1>
            </div>

            {/* Add New Address Button */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full mb-6" size="lg" onClick={handleAddNew}>
                  <Plus className="h-5 w-5 mr-2" />새 배송지 추가
                </Button>
              </DialogTrigger>

              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingAddress ? "배송지 수정" : "새 배송지 추가"}</DialogTitle>
                </DialogHeader>

                <form className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="address-name">배송지명 *</Label>
                    <Input id="address-name" placeholder="예: 집, 회사" defaultValue={editingAddress?.name || ""} />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="recipient">받는 사람 *</Label>
                      <Input id="recipient" placeholder="홍길동" defaultValue={editingAddress?.recipient || ""} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">휴대폰 번호 *</Label>
                      <Input id="phone" placeholder="010-0000-0000" defaultValue={editingAddress?.phone || ""} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">주소 *</Label>
                    <div className="flex gap-2 mb-2">
                      <Input
                        id="zipcode"
                        placeholder="우편번호"
                        className="w-32"
                        defaultValue={editingAddress?.zipcode || ""}
                        readOnly
                      />
                      <Button type="button" variant="outline">
                        주소검색
                      </Button>
                    </div>
                    <Input
                      id="address"
                      placeholder="기본주소"
                      defaultValue={editingAddress?.address || ""}
                      readOnly
                      className="mb-2"
                    />
                    <Input
                      id="address-detail"
                      placeholder="상세주소를 입력하세요"
                      defaultValue={editingAddress?.addressDetail || ""}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="set-default" defaultChecked={editingAddress?.isDefault || false} />
                    <label htmlFor="set-default" className="text-sm cursor-pointer">
                      기본 배송지로 설정
                    </label>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      취소
                    </Button>
                    <Button type="button" className="flex-1" onClick={handleSave}>
                      저장
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>

            {/* Address List */}
            {addresses.length === 0 ? (
              <Card>
                <CardContent className="py-20 text-center">
                  <MapPin className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h2 className="text-xl font-semibold mb-2">등록된 배송지가 없습니다</h2>
                  <p className="text-muted-foreground mb-6">자주 사용하는 배송지를 등록해보세요</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {addresses.map((address) => (
                  <Card key={address.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-lg">{address.name}</CardTitle>
                          {address.isDefault && (
                            <Badge className="bg-primary text-primary-foreground">기본배송지</Badge>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(address)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(address.id)}
                            disabled={address.isDefault}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">받는 사람</span>
                          <p className="font-medium">{address.recipient}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">연락처</span>
                          <p className="font-medium">{address.phone}</p>
                        </div>
                      </div>

                      <div className="text-sm">
                        <span className="text-muted-foreground">주소</span>
                        <p className="font-medium">
                          [{address.zipcode}] {address.address}
                        </p>
                        <p className="font-medium">{address.addressDetail}</p>
                      </div>

                      {!address.isDefault && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full bg-transparent"
                          onClick={() => handleSetDefault(address.id)}
                        >
                          기본 배송지로 설정
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Info */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-base">배송지 관리 안내</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                  <li>• 최대 10개까지 배송지를 등록할 수 있습니다</li>
                  <li>• 기본 배송지는 주문 시 자동으로 선택됩니다</li>
                  <li>• 기본 배송지는 삭제할 수 없습니다</li>
                  <li>• 배송지 정보는 안전하게 암호화되어 저장됩니다</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
