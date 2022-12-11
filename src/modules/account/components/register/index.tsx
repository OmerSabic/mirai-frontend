import { medusaClient } from "@lib/config"
import { LOGIN_VIEW, useAccount } from "@lib/context/account-context"
import {translations, template } from "@lib/i18n"
import Button from "@modules/common/components/button"
import Input from "@modules/common/components/input"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { FieldValues, useForm } from "react-hook-form"

interface RegisterCredentials extends FieldValues {
  first_name: string
  last_name: string
  email: string
  password: string
  phone?: string
}

const Register = () => {
  const i = translations()

  const { loginView, refetchCustomer } = useAccount()
  const [_, setCurrentView] = loginView
  const [authError, setAuthError] = useState<string | undefined>(undefined)
  const router = useRouter()

  const handleError = (e: Error) => {
    setAuthError(i.account.register.error_occured)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterCredentials>()

  const onSubmit = handleSubmit(async (credentials) => {
    medusaClient.customers
      .create(credentials)
      .then(() => {
        refetchCustomer()
        router.push("/account")
      })
      .catch(handleError)
  })

  return (
    <div className="max-w-sm flex flex-col items-center mt-12">
      <h1 className="text-large-semi uppercase mb-6">{i.account.register.title}</h1>
      <p className="text-center text-base-regular text-gray-700 mb-4">
        {i.account.register.subtitle}
      </p>
      <form className="w-full flex flex-col" onSubmit={onSubmit}>
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label={i.account.first_name}
            {...register("first_name", { required: template(i.common.is_required, { "field": i.account.first_name }) })}
            autoComplete="given-name"
            errors={errors}
          />
          <Input
            label={i.account.last_name}
            {...register("last_name", { required: template(i.common.is_required, { "field": i.account.last_name }) })}
            autoComplete="family-name"
            errors={errors}
          />
          <Input
            label={i.account.email}
            {...register("email", { required: template(i.common.is_required, { "field": i.account.email }) })}
            autoComplete="email"
            errors={errors}
          />
          <Input
            label={i.account.phone}
            {...register("phone")}
            autoComplete="tel"
            errors={errors}
          />
          <Input
            label={i.account.password}
            {...register("password", {
              required: template(i.common.is_required, { "field": i.account.password })
            })}
            type="password"
            autoComplete="new-password"
            errors={errors}
          />
        </div>
        {authError && (
          <div>
            <span className="text-rose-500 w-full text-small-regular">
              {i.account.incorrect_credentials}
            </span>
          </div>
        )}
        <span className="text-center text-gray-700 text-small-regular mt-6">
          {i.account.register.agree}{" "}
          <Link href="/content/privacy-policy">
            <a className="underline">{i.account.register.privacy_policy}</a>
          </Link>{" "}
          {i.account.register.and}{" "}
          <Link href="/content/terms-of-use">
            <a className="underline">{i.account.register.terms_of_use}</a>
          </Link>
          .
        </span>
        <Button className="mt-6">{i.account.register.join}</Button>
      </form>
      <span className="text-center text-gray-700 text-small-regular mt-6">
        {i.account.register.already_a_member}{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="underline"
        >
          {i.account.register.sign_in}
        </button>
        .
      </span>
    </div>
  )
}

export default Register
