import { useAccount } from "@lib/context/account-context"
import useToggleState from "@lib/hooks/use-toggle-state"
import { translations, template } from "@lib/i18n"
import { emailRegex } from "@lib/util/regex"
import { Customer } from "@medusajs/medusa"
import EditButton from "@modules/account/components/edit-button"
import Button from "@modules/common/components/button"
import Input from "@modules/common/components/input"
import Modal from "@modules/common/components/modal"
import Spinner from "@modules/common/icons/spinner"
import { useUpdateMe } from "medusa-react"
import React, { useState } from "react"
import { useForm } from "react-hook-form"

type EditEmailModalProps = {
  customer: Omit<Customer, "password_hash">
}

type FormValues = {
  email: string
}

const EditEmailModal: React.FC<EditEmailModalProps> = ({ customer }) => {
  const i = translations()

  const { state, open, close } = useToggleState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)

  const { mutate } = useUpdateMe()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: customer.email,
    },
  })

  const { refetchCustomer } = useAccount()

  const submit = handleSubmit((data) => {
    setSubmitting(true)
    setError(undefined)

    if (data.email === customer.email) {
      setSubmitting(false)
      setError("You must enter a new email.")
      return
    }

    mutate(
      { id: customer.id, ...data },
      {
        onSuccess: () => {
          setSubmitting(false)
          refetchCustomer()
          close()
        },
        onError: () => {
          setSubmitting(false)
          setError(i.account.failed_to_update_email)
        },
      }
    )
  })

  return (
    <div>
      <EditButton onClick={open} />
      <Modal isOpen={state} close={close}>
        <Modal.Title>{i.account.page.edit_email}</Modal.Title>
        <Modal.Body>
          <div className="flex flex-col w-full">
            <Input
              label={i.account.email}
              {...register("email", {
                required: template(i.common.is_required, { field: i.account.email }),
                pattern: {
                  value: emailRegex,
                  message: i.account.page.must_be_valid_email,
                },
              })}
              errors={errors}
            />
          </div>
          {error && (
            <div className="text-rose-500 text-small-regular py-2">{error}</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="!bg-gray-200 !text-gray-900 !border-gray-200 min-h-0"
            onClick={close}
          >
            {i.common.cancel}
          </Button>
          <Button className="min-h-0" onClick={submit} disabled={submitting}>
            {i.common.save}
            {submitting && <Spinner />}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default EditEmailModal
