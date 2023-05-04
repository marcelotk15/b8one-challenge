export interface Product {
  productId: number
  title: string
  price: number
  listPrice: number
  image: string
  installmentsOptions: InstallmentsOptions
}

export interface InstallmentsOptions {
  fowardprice: number
  numberOfInstallments: number
}
