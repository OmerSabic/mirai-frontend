import { translations } from "@lib/i18n"
import OrderOverview from "../components/order-overview"

const OrdersTemplate = () => {
  const i = translations()

  return (
    <div className="w-full">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">{i.account.page.orders}</h1>
        <p className="text-base-regular">
          {i.account.page.orders_subtitle}
        </p>
      </div>
      <div>
        <OrderOverview />
      </div>
    </div>
  )
}

export default OrdersTemplate
