import { type Product } from '~/types/product'
import { ProductProvider } from '~/contexts/Product'
import { ProductCard } from '~/components/ProductCard'

interface Shelf {
  products: Product[]
}

export function Shelf({ products }: Shelf) {
  return (
    <aside className="grid grid-cols-2 gap-1 md:flex md:gap-2">
      {products.map((product) => (
        <ProductProvider key={product.productId} product={product}>
          <ProductCard />
        </ProductProvider>
      ))}
    </aside>
  )
}
