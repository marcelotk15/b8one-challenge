import { useProduct } from '../../contexts/Product'
import { formatPrice } from '../../lib/utils'

export function Price() {
  const { price, listPrice, installmentsOptions } = useProduct()

  return (
    <div className="mt-auto flex flex-col gap-1 tracking-tight">
      {listPrice > price && (
        <del className="text-sm font-medium text-[#B5B5B6]">{formatPrice(listPrice)}</del>
      )}

      <span className="text-xl font-semibold leading-6  text-[#DA4B4F]">{formatPrice(price)}</span>

      <span className="text-xs font-medium text-[#848587]">
        em até{' '}
        <span className="text-[#1C1C1C]">
          {installmentsOptions.numberOfInstallments}x de{' '}
          {formatPrice(installmentsOptions.fowardprice)}
        </span>{' '}
        sem juros
      </span>
    </div>
  )
}
