import { translations } from "@lib/i18n"
import Button from "@modules/common/components/button"
import Link from "next/link"

const SignInPrompt = () => {
  const i = translations()

  return (
    <div className="flex items-start justify-between">
      <div>
        <h2 className="text-xl-semi">{i.sign_in_prompt.title}</h2>
        <p className="text-base-regular text-gray-200 mt-2">
          {i.sign_in_prompt.subtitle}
        </p>
      </div>
      <div>
        <Link href="/account/login">
          <a>
            <Button variant="secondary">{i.sign_in_prompt.button}</Button>
          </a>
        </Link>
      </div>
    </div>
  )
}

export default SignInPrompt
