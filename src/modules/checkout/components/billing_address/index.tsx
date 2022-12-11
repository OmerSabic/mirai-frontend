import { CheckoutFormValues } from "@lib/context/checkout-context"
import { translations, template } from "@lib/i18n"
import { IAdminPostUploadsFileReq } from "@medusajs/medusa"
import ConnectForm from "@modules/common/components/connect-form"
import Input from "@modules/common/components/input"
import CountrySelect from "../country-select"

const BillingAddress = () => {
  const i = translations()
  return (
    <ConnectForm<CheckoutFormValues>>
      {({ register, formState: { errors, touchedFields } }) => (
        <div className="grid grid-cols-1 gap-y-2">
          <div className="grid grid-cols-2 gap-x-2">
            <Input
              label={i.account.first_name}
              {...register("billing_address.first_name", {
                required: template(i.common.is_required, { field: i.account.first_name }),
              })}
              autoComplete="given-name"
              errors={errors}
              touched={touchedFields}
            />
            <Input
              label={i.account.last_name}
              {...register("billing_address.last_name", {
                required: template(i.common.is_required, { field: i.account.last_name }),
              })}
              autoComplete="family-name"
              errors={errors}
              touched={touchedFields}
            />
          </div>
          <Input
            label={i.account.company}
            {...register("billing_address.company")}
            autoComplete="organization"
            errors={errors}
            touched={touchedFields}
          />
          <Input
            label={i.account.address}
            {...register("billing_address.address_1", {
              required: template(i.common.is_required, { field: i.account.address }),
            })}
            autoComplete="address-line1"
            errors={errors}
            touched={touchedFields}
          />
          <Input
            label={i.account.apartment}
            {...register("billing_address.address_2")}
            autoComplete="address-line2"
            errors={errors}
            touched={touchedFields}
          />
          <div className="grid grid-cols-[144px_1fr] gap-x-2">
            <Input
              label={i.account.postal_code}
              {...register("billing_address.postal_code", {
                required: template(i.common.is_required, { field: i.account.postal_code }),
              })}
              autoComplete="postal-code"
              errors={errors}
              touched={touchedFields}
            />
            <Input
              label={i.account.city}
              {...register("billing_address.city", {
                required: template(i.common.is_required, { field: i.account.city }),
              })}
              autoComplete="address-level2"
              errors={errors}
              touched={touchedFields}
            />
          </div>
          <CountrySelect
            {...register("billing_address.country_code", {
              required: template(i.common.is_required, { field: i.account.country }),
            })}
            autoComplete="country"
            errors={errors}
            touched={touchedFields}
          />
          <Input
            label={i.account.state}
            {...register("billing_address.province")}
            autoComplete="address-level1"
            errors={errors}
            touched={touchedFields}
          />
          <Input
            label={i.account.phone}
            {...register("billing_address.phone")}
            autoComplete="tel"
            errors={errors}
            touched={touchedFields}
          />
        </div>
      )}
    </ConnectForm>
  )
}

export default BillingAddress
