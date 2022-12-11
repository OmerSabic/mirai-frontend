import clsx from "clsx"
import Link from "next/link"
import { ProductPreviewType } from "types/global"
import Thumbnail from "../thumbnail"
import Image from 'next/image'
import { translations } from "@lib/i18n"

const ProductPreview = ({
  title,
  handle,
  thumbnail,
  price,
}: ProductPreviewType) => {
  const i = translations()

  return (
    <Link href={`/products/${handle}`}>
      <a data-w-id="058c389b-cf02-f155-8f18-52d5114654ea" href="https://ryeriver.webflow.io/product/session-ipa"
        className="product-container session w-inline-block">
        <Image src={thumbnail || ""} width={240} height={320} loading="lazy" alt="" 
               className="product-image-archive" />

        <div className="text-block product-detail-archive price">{i.product.from} {price ? (
          <>
            {price.price_type === "sale" && (
              <span className="line-through text-gray-500">
                {price.original_price}
              </span>
            )}
            <span className={clsx("font-semibold", {
              "text-rose-500": price.price_type === "sale",
            })}>
              {price.calculated_price}
            </span>
          </>
        ) : (
          <div className="w-20 h-6 animate-pulse bg-gray-100"></div>
        )}</div>
        <div className="text-block product-detail-archive">{title}</div>
      </a>
    </Link>
  )
}

export default ProductPreview
