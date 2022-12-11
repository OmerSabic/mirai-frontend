import { useFeaturedProductsQuery } from "@lib/hooks/use-layout-data"
import ProductPreview from "@modules/products/components/product-preview"
import SkeletonProductPreview from "@modules/skeletons/components/skeleton-product-preview"
import Button from '@modules/common/components/button'
import Link from 'next/link'
import { useState } from "react"


const FeaturedProducts = () => {
  const { data } = useFeaturedProductsQuery()

  return (
    <div className="section-2 wf-section">
      <div className="container-2 w-container">
        <div className="div-block">
          {data
            ? data.map(product => (
              <ProductPreview {...product} key={product.id} />
            ))
            : Array.from(Array(3).keys()).map((i) => (
              <li className="list-style-none" key={i}>
                <SkeletonProductPreview />
              </li>
            ))}
        </div>
      </div>
    </div>
  )
}

export default FeaturedProducts
