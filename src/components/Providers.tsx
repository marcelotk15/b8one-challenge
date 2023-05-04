import { type PropsWithChildren } from 'react'

import { OrderFormProvider } from '~/contexts/OrderForm'
import { WishListProvider } from '~/contexts/WishList'

export function Providers({ children }: PropsWithChildren) {
  return (
    <OrderFormProvider>
      <WishListProvider>{children}</WishListProvider>
    </OrderFormProvider>
  )
}
