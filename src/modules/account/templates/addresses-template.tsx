import { useAccount } from "@lib/context/account-context"
import { translations } from "@lib/i18n"
import AddressBook from "../components/address-book"

const AddressesTemplate = () => {
  const i = translations()

  const { customer, retrievingCustomer } = useAccount()

  if (retrievingCustomer || !customer) {
    return null
  }

  return (
    <div className="w-full">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">{i.checkout.shipping_address}</h1>
        <p className="text-base-regular">
          {i.account.page.shipping_subtitle}
        </p>
      </div>
      <AddressBook customer={customer} />
    </div>
  )
}

export default AddressesTemplate
