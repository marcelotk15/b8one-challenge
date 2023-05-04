import { Price } from './Price'
import { WishListButton } from './WishListButton'
import { AddToCart } from './AddToCart'

import { useProduct } from '~/contexts/Product'

export function ProductCard() {
  const { title, image } = useProduct()

  return (
    <div className="flex max-w-[304px] flex-1 flex-col gap-8 rounded-md bg-white p-3 transition-all duration-500 hover:shadow-lg md:p-8">
      <div className="relative">
        <img src={image} width={240} height={240} title={title} />

        <WishListButton />
      </div>

      <div className="flex flex-1 flex-col gap-6">
        <h2 className="line-clamp-3 text-sm font-medium text-[#1C1C1C]" title={title}>
          {title}
        </h2>

        <Price />

        <AddToCart />
      </div>
    </div>
  )
}
