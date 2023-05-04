import { createContext, useContext, type PropsWithChildren } from 'react'

import { type Product } from '../types/product'

interface ProductProviderProps {
  product: Product
}

const ProductContext = createContext<Product>({} as Product)

export function ProductProvider({ children, product }: PropsWithChildren<ProductProviderProps>) {
  return <ProductContext.Provider value={product}>{children}</ProductContext.Provider>
}

export function useProduct() {
  const context = useContext(ProductContext)

  if (!context) {
    new Error('useProduct must be used within a ProductProvider')
  }

  return context
}
