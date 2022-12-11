import { Listbox, Transition } from "@headlessui/react"
import { useStore } from "@lib/context/store-context"
import useToggleState from "@lib/hooks/use-toggle-state"
import { Fragment, useState } from "react"
import ReactCountryFlag from "react-country-flag"
import { useRouter } from 'next/router';
import { translations } from "@lib/i18n"
import { IS_BROWSER } from "@lib/constants"


const LanguageSelect = () => {
  const i = translations()

  const router = useRouter();

  const { state, open, close } = useToggleState()
  const [current, setCurrent] = useState<string>(IS_BROWSER ? window.localStorage.getItem('language') || 'en' : 'en')


  const handleChange = (languageCode: string) => {
    window.localStorage.setItem("language", languageCode)
    setCurrent(languageCode)
    router.replace(router.asPath);
    close()
  }

  let locale = current
  let locales: string[] = ['en', 'es']

  return (
    <div onMouseEnter={open} onMouseLeave={close}>
      <Listbox
        onChange={handleChange}
        value={
          (locale)
        }
      >
        <Listbox.Button className="py-1 w-max">
          <div className="text-small-regular flex items-center gap-x-2 justify-end">
            <span>{i.footer.language}:</span>
            {IS_BROWSER && (
              <span className="text-small-semi flex items-center gap-x-2">
                <ReactCountryFlag
                  svg
                  style={{
                    width: "16px",
                    height: "16px",
                  }}
                  countryCode={locale == 'en' ? 'gb' : locale}
                />
                {locale.toUpperCase()}
              </span>
            )}
          </div>
        </Listbox.Button>
        <div className="relative w-fit min-w-[150px]">
          <Transition
            show={state}
            as={Fragment}
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className="absolute -bottom-[calc(100%-36px)] left-0 xsmall:left-10 xsmall:right-0 max-h-[442px] overflow-y-scroll z-[900] bg-gray-900 drop-shadow-md text-small-regular uppercase text-white no-scrollbar"
              static
            >
              {locales.map((i) => {
                return (
                  <Listbox.Option
                    key={i}
                    value={i}
                    className="py-2 hover:bg-gray-600 px-3 cursor-pointer flex items-center gap-x-2"
                  >
                    <ReactCountryFlag
                      key={i}
                      svg
                      style={{
                        width: "16px",
                        height: "16px",
                      }}
                      countryCode={i == 'en' ? 'gb' : i}
                    />
                    {i.toUpperCase()}
                  </Listbox.Option>
                )
              })}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default LanguageSelect
