import { translations } from "@lib/i18n"
import UnderlineLink from "@modules/common/components/underline-link"

const EmptyCartMessage = () => {
  const i = translations()

  return (
    <div className="px-8 py-24 flex flex-col justify-center items-center text-center">
      <h1 className="text-2xl-semi">{i.cart.empty}</h1>
      <p className="text-base-regular mt-4 mb-6 max-w-[32rem]">
        {i.cart.empty_subtitle}
      </p>
      <div>
        <UnderlineLink href="/store">{i.cart.explore}</UnderlineLink>
      </div>
    </div>
  )
}

export default EmptyCartMessage
