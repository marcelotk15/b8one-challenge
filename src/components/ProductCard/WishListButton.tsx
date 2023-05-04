import { type ButtonHTMLAttributes, forwardRef, useMemo } from 'react'
import { cva } from 'class-variance-authority'

import { useProduct } from '../../contexts/Product'

import { Icons } from '~/components/Icons'
import { cn } from '~/lib/utils'
import { useWishList } from '~/contexts/WishList'

const wishListButtonVariants = cva(
  'absolute right-0 top-0 flex items-center justify-center rounded-full p-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none ring-offset-background',
  {
    variants: {
      variant: {
        default: 'bg-[#F2F3F6] hover:bg-[#FEE5EC] text-[#1C1C1C] hover:text-[#DA4B4F]',
        wihilisted: 'bg-[#DA4B4F] hover:bg-[#C22539] text-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export const WishListButton = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(function WishListButton(props, ref) {
  const { productId } = useProduct()

  const { itens, toogleWishList } = useWishList()

  const isWhilisted = useMemo(() => {
    return itens.findIndex((value) => value === productId.toString()) > -1
  }, [itens])

  return (
    <button
      ref={ref}
      onClick={() => toogleWishList(productId.toString())}
      className={cn(wishListButtonVariants({ variant: isWhilisted ? 'wihilisted' : 'default' }))}
      {...props}
    >
      {isWhilisted ? Icons.heartFill : Icons.heartOutline}
    </button>
  )
})
