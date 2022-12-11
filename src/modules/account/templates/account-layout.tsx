import { useAccount } from "@lib/context/account-context"
import { translations } from "@lib/i18n"
import UnderlineLink from "@modules/common/components/underline-link"
import Spinner from "@modules/common/icons/spinner"
import React, { useEffect } from "react"
import AccountNav from "../components/account-nav"

const AccountLayout: React.FC = ({ children }) => {
  const i = translations();

  const { customer, retrievingCustomer, checkSession } = useAccount()

  useEffect(() => {
    checkSession()
  }, [checkSession])

  if (retrievingCustomer || !customer) {
    return (
      <div className="flex items-center justify-center w-full min-h-[640px] h-full text-white">
        <Spinner size={36} />
      </div>
    )
  }

  return (
    <div className="flex-1 small:py-12">
      <div className="flex-1 h-full max-w-5xl mx-auto flex flex-col">
        <div className="grid grid-cols-1 small:grid-cols-[240px_1fr] small:px-8 py-6 small:py-12 ">
          <div>
            <AccountNav />
          </div>
          <div className="flex-1">{children}</div>
        </div>
        <div className="flex flex-col small:flex-row items-end justify-between small:border-t border-gray-200 px-8 py-12 gap-x-8">
          <div>
            <h3 className="text-xl-semi mb-4">{i.customer_service.got_questions}</h3>
            <span className="text-small-regular">
              {i.customer_service.subtitle}
            </span>
          </div>
          <div>
            <UnderlineLink href="/customer-service">
              {i.customer_service.customer_service}
            </UnderlineLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountLayout