import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

interface ProductCardProps {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  badge?: string
  rating?: number
  reviewCount?: number
}

export function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  badge,
  rating = 4.5,
  reviewCount = 0,
}: ProductCardProps) {
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0

  return (
    <div className="group relative bg-card rounded-lg border overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/product/${id}`}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {badge && <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground">{badge}</Badge>}
          {discount > 0 && (
            <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">{discount}%</Badge>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/product/${id}`}>
          <h3 className="font-medium text-sm mb-2 line-clamp-2 hover:text-primary transition-colors">{name}</h3>
        </Link>

        <div className="flex items-center gap-1 mb-2 text-xs text-muted-foreground">
          <span className="text-accent">★</span>
          <span>{rating}</span>
          <span>({reviewCount})</span>
        </div>

        <div className="flex items-end gap-2 mb-3">
          {originalPrice && (
            <span className="text-xs text-muted-foreground line-through">{originalPrice.toLocaleString()}원</span>
          )}
          <span className="text-lg font-bold">{price.toLocaleString()}원</span>
        </div>

        <Button className="w-full" size="sm">
          <ShoppingCart className="h-4 w-4 mr-2" />
          장바구니
        </Button>
      </div>
    </div>
  )
}
