import '~/styles/global.css'

import { useMemo } from 'react'

import { Shelf } from '~/components/Shelf'
import { api } from '~/service/api'

function App() {
  const products = useMemo(() => api.products, [api])

  return (
    <main>
      <section className="container mt-3">
        <Shelf products={products} />
      </section>
    </main>
  )
}

export default App
