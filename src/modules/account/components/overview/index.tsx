import { translations } from "@lib/i18n"
import { toLocaleDateString } from "@lib/util/toLocaleDateString"
import { Customer, Order } from "@medusajs/medusa"
import ChevronDown from "@modules/common/icons/chevron-down"
import MapPin from "@modules/common/icons/map-pin"
import Package from "@modules/common/icons/package"
import User from "@modules/common/icons/user"
import { formatAmount } from "medusa-react"
import Link from "next/link"

type OverviewProps = {
  orders?: Order[]
  customer?: Omit<Customer, "password_hash">
}

const Overview = ({ orders, customer }: OverviewProps) => {
  const i = translations()

  return (
    <div>
      <div className="small:hidden">
        <div className="text-xl-semi mb-4 px-8">
          {i.account.page.hello} {customer?.first_name}
        </div>
        <div className="text-base-regular">
          <ul>
            <li>
              <Link href="/account/profile">
                <a className="flex items-center justify-between py-4 border-b border-gray-200 px-8">
                  <div className="flex items-center gap-x-2">
                    <User size={16} />
                    <span>{i.account.page.profile}</span>
                  </div>
                  <ChevronDown className="transform -rotate-90" />
                </a>
              </Link>
            </li>
            <li>
              <Link href="/account/addresses">
                <a className="flex items-center justify-between py-4 border-b border-gray-200 px-8">
                  <div className="flex items-center gap-x-2">
                    <MapPin size={16} />
                    <span>{i.account.page.addresses}</span>
                  </div>
                  <ChevronDown className="transform -rotate-90" />
                </a>
              </Link>
            </li>
            <li>
              <Link href="/account/orders">
                <a className="flex items-center justify-between py-4 border-b border-gray-200 px-8">
                  <div className="flex items-center gap-x-2">
                    <Package size={16} />
                    <span>{i.account.page.orders}</span>
                  </div>
                  <ChevronDown className="transform -rotate-90" />
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="hidden small:block">
        <div className="text-xl-semi flex justify-between items-start mb-4">
          <span>{i.account.page.hello} {customer?.first_name}</span>
          <span className="text-small-regular text-gray-700">
            {i.account.page.signed_in_as}:{" "}
            <span className="font-semibold">{customer?.email}</span>
          </span>
        </div>
        <div className="flex flex-col py-8 border-t border-gray-200">
          <div className="flex flex-col gap-y-4 h-full col-span-1 row-span-2 flex-1">
            <div className="flex items-start gap-x-16 mb-6">
              <div className="flex flex-col gap-y-4">
                <h3 className="text-large-semi">{i.account.page.profile}</h3>
                <div className="flex items-end gap-x-2">
                  <span className="text-3xl-semi leading-none">
                    {getProfileCompletion(customer)}%
                  </span>
                  <span className="uppercase text-base-regular text-gray-500">
                    {i.account.page.completed}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-y-4">
                <h3 className="text-large-semi">{i.account.page.addresses}</h3>
                <div className="flex items-end gap-x-2">
                  <span className="text-3xl-semi leading-none">
                    {customer?.shipping_addresses?.length || 0}
                  </span>
                  <span className="uppercase text-base-regular text-gray-500">
                    {i.account.page.saved}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-y-4">
              <div className="flex items-center gap-x-2">
                <h3 className="text-large-semi">{i.account.page.recent_orders}</h3>
              </div>
              <ul className="flex flex-col gap-y-4">
                {orders ? (
                  orders.slice(0, 5).map((order) => {
                    return (
                      <li key={order.id}>
                        <Link href={`/order/details/${order.id}`}>
                          <a>
                            <div className="bg-gray-900 flex justify-between items-center p-4">
                              <div className="grid grid-cols-3 grid-rows-2 text-small-regular gap-x-4 flex-1">
                                <span className="font-semibold">
                                {i.account.page.date_placed}
                                </span>
                                <span className="font-semibold">
                                  {i.account.page.order_number}
                                </span>
                                <span className="font-semibold">
                                  {i.account.page.total_amount}
                                </span>
                                <span>
                                  {toLocaleDateString(new Date(order.created_at), i.locale_code)}
                                </span>
                                <span>#{order.display_id}</span>
                                <span>
                                  {formatAmount({
                                    amount: order.total,
                                    region: order.region,
                                    includeTaxes: false,
                                  })}
                                </span>
                              </div>
                              <button
                                className="flex items-center justify-between"
                                onClick={close}
                              >
                                <span className="sr-only">
                                  {i.account.page.go_to_order} #{order.display_id}
                                </span>
                                <ChevronDown className="-rotate-90" />
                              </button>
                            </div>
                          </a>
                        </Link>
                      </li>
                    )
                  })
                ) : (
                  <span>{i.account.page.no_recent_orders}</span>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const getProfileCompletion = (customer?: Omit<Customer, "password_hash">) => {
  let count = 0

  if (!customer) {
    return 0
  }

  if (customer.email) {
    count++
  }

  if (customer.first_name && customer.last_name) {
    count++
  }

  if (customer.phone) {
    count++
  }

  if (customer.billing_address) {
    count++
  }

  return (count / 4) * 100
}

export default Overview
