import {
  type PropsWithChildren,
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react'

import { type Product } from '~/types/product'

interface OrderFormItem extends Product {
  quantity: number
}

interface OrderForm {
  items: OrderFormItem[]
  total?: number
}

interface OrderFormContext {
  orderForm: OrderForm
  reducer: ReducerFunction
}

type ReducerFunction = (action: ReducerAction) => void

type ReducerActionType = 'ADD' | 'REMOVE' | 'UPDATE'

interface ReducerAction {
  type: ReducerActionType
  state: OrderFormItem
}

const LOCALSTORAGE_KEY = 'app_orderForm'

const OrderFormContext = createContext<OrderFormContext>({} as OrderFormContext)

export function OrderFormProvider({ children }: PropsWithChildren) {
  const [orderForm, setOrderFom] = useState<OrderForm>(
    JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY) || '{ "items": [] }') as OrderForm,
  )

  useEffect(() => {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(orderForm))
  }, [orderForm])

  const sunTotal = useCallback(
    (items: OrderFormItem[]) =>
      items.reduce((acc, product) => acc + product.quantity * product.price, 0),
    [],
  )

  const reducer: ReducerFunction = useCallback(
    (action) => {
      switch (action.type) {
        case 'ADD': {
          const newItems = [...orderForm.items, { ...action.state }]

          setOrderFom({
            items: newItems,
            total: sunTotal(newItems),
          })
          break
        }
        case 'REMOVE': {
          const newItems = orderForm.items.filter(
            (item) => item.productId !== action.state.productId,
          )

          setOrderFom({
            items: newItems,
            total: sunTotal(newItems),
          })
          break
        }
        case 'UPDATE': {
          const newItems = orderForm.items.map((item) => {
            if (item.productId === action.state.productId) {
              return { ...item, ...action.state }
            }

            return item
          })

          setOrderFom({
            items: newItems,
            total: sunTotal(newItems),
          })

          break
        }
      }
    },
    [orderForm, setOrderFom],
  )

  return (
    <OrderFormContext.Provider value={{ orderForm, reducer }}>{children}</OrderFormContext.Provider>
  )
}

export function useOrderForm() {
  const context = useContext(OrderFormContext)

  if (!context) {
    new Error('useOrderForm must be used within a OrderFormProvider')
  }

  return context
}
