import { CheckoutFormValues } from "@lib/context/checkout-context"
import { translations, template } from "@lib/i18n"
import { emailRegex } from "@lib/util/regex"
import ConnectForm from "@modules/common/components/connect-form"
import Input from "@modules/common/components/input"
import { useMeCustomer } from "medusa-react"
import AddressSelect from "../address-select"
import CountrySelect from "../country-select"

const ShippingAddress = () => {
  const i = translations()

  const { customer } = useMeCustomer()
  return (
    <div>
      {customer && (customer.shipping_addresses?.length || 0) > 0 && (
        <div className="mb-6 flex flex-col gap-y-4 bg-amber-100 p-4">
          <p className="text-small-regular">
            {template(i.account.use_saved_address, {customer: customer.first_name})}
          </p>
          <AddressSelect addresses={customer.shipping_addresses} />
        </div>
      )}
      <ConnectForm<CheckoutFormValues>>
        {({ register, formState: { errors, touchedFields } }) => (
          <div className="grid grid-cols-1 gap-y-2">
            <Input
              label={i.account.email}
              {...register("email", {
                required: template(i.common.is_required, { field: i.account.email }),
                pattern: emailRegex,
              })}
              autoComplete="email"
              errors={errors}
              touched={touchedFields}
            />
            <div className="grid grid-cols-2 gap-x-2">
              <Input
                label={i.account.first_name}
                {...register("shipping_address.first_name", {
                  required: template(i.common.is_required, { field: i.account.first_name }),
                })}
                autoComplete="given-name"
                errors={errors}
                touched={touchedFields}
              />
              <Input
                label={i.account.last_name}
                {...register("shipping_address.last_name", {
                  required: template(i.common.is_required, { field: i.account.last_name }),
                })}
                autoComplete="family-name"
                errors={errors}
                touched={touchedFields}
              />
            </div>
            <Input
              label={i.account.company}
              {...register("shipping_address.company")}
              autoComplete="organization"
              errors={errors}
              touched={touchedFields}
            />
            <Input
              label={i.account.address}
              {...register("shipping_address.address_1", {
                required: template(i.common.is_required, { field: i.account.address }),
              })}
              autoComplete="address-line1"
              errors={errors}
              touched={touchedFields}
            />
            <Input
              label={i.account.apartment}
              {...register("shipping_address.address_2")}
              autoComplete="address-line2"
              errors={errors}
              touched={touchedFields}
            />
            <div className="grid grid-cols-[122px_1fr] gap-x-2">
              <Input
                label={i.account.postal_code}
                {...register("shipping_address.postal_code", {
                  required: template(i.common.is_required, { field: i.account.postal_code }),
                })}
                autoComplete="postal-code"
                errors={errors}
                touched={touchedFields}
              />
              <Input
                label={i.account.city}
                {...register("shipping_address.city", {
                  required: template(i.common.is_required, { field: i.account.city }),
                })}
                autoComplete="address-level2"
                errors={errors}
                touched={touchedFields}
              />
            </div>
            <CountrySelect
              {...register("shipping_address.country_code", {
                required: template(i.common.is_required, { field: i.account.country }),
              })}
              autoComplete="country"
              errors={errors}
              touched={touchedFields}
            />
            <Input
              label={i.account.state}
              {...register("shipping_address.province")}
              autoComplete="address-level1"
              errors={errors}
              touched={touchedFields}
            />
            <Input
              label={i.account.phone}
              {...register("shipping_address.phone")}
              autoComplete="tel"
              errors={errors}
              touched={touchedFields}
            />
          </div>
        )}
      </ConnectForm>
    </div>
  )
}

export default ShippingAddress
