import {
  type PropsWithChildren,
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react'

interface WishListContext {
  itens: string[]
  toogleWishList: (id: string) => void
}

const LOCALSTORAGE_KEY = 'app_whishList'

const WishListContext = createContext<WishListContext>({} as WishListContext)

export function WishListProvider({ children }: PropsWithChildren) {
  const [wishList, setWishList] = useState<string[]>(
    JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY) || '[]') as string[],
  )

  useEffect(() => {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(wishList))
  }, [wishList])

  const toogleWishList = useCallback(
    (id: string) => {
      const idIndex = wishList.findIndex((value) => value === id)

      if (idIndex < 0) {
        setWishList((state) => [...state, id])

        return
      }

      setWishList(wishList.filter((value) => value !== id))
    },
    [wishList, setWishList],
  )

  return (
    <WishListContext.Provider value={{ itens: wishList, toogleWishList }}>
      {children}
    </WishListContext.Provider>
  )
}

export function useWishList() {
  const context = useContext(WishListContext)

  if (!context) {
    new Error('useWishList must be used within a WishListProvider')
  }

  return context
}
