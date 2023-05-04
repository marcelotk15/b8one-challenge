import { type ButtonHTMLAttributes, forwardRef, useMemo, useCallback } from 'react'
import { cva } from 'class-variance-authority'

import { useProduct } from '~/contexts/Product'
import { useOrderForm } from '~/contexts/OrderForm'
import { Icons } from '~/components/Icons'
import { cn } from '~/lib/utils'

const addToCartVariants = cva(
  'flex items-center justify-center rounded px-6 py-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none ring-offset-background uppercase font-bold gap-3 text-sm leading-6',
  {
    variants: {
      variant: {
        default: 'bg-[#40B25C] hover:bg-[#1C6C3E] text-white',
        alreadyOnCart: 'bg-[#A3F9B9] hover:bg-[#E20F15] text-[#1C1C1C] hover:text-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export const AddToCart = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  function AddToCart({ ...props }, ref) {
    const product = useProduct()

    const { orderForm, reducer } = useOrderForm()

    const isOnCart = useMemo(() => {
      return orderForm.items.findIndex((item) => item.productId === product.productId) > -1
    }, [orderForm.items])

    const handleButton = useCallback(() => {
      if (isOnCart) {
        reducer({
          type: 'REMOVE',
          state: { ...product, quantity: 0 },
        })

        return
      }

      reducer({
        type: 'ADD',
        state: {
          ...product,
          quantity: 1,
        },
      })
    }, [isOnCart, product, reducer])

    return (
      <button
        ref={ref}
        className={cn(addToCartVariants({ variant: isOnCart ? 'alreadyOnCart' : 'default' }))}
        onClick={handleButton}
        {...props}
      >
        {isOnCart ? (
          <>
            {Icons.check}
            remover
          </>
        ) : (
          'Adicionar'
        )}
      </button>
    )
  },
)
