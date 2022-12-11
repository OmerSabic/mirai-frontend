import Image from 'next/image'
import CountrySelect from '@modules/layout/components/country-select'
import LanguageSelect from '@modules/layout/components/language-select'

const Footer = () => {
  return (
    <footer className="relative flex flex-col-reverse items-center md:justify-center md:flex-row my-8">
      <div className="min-w-[150px] w-auto">
        <Image src="/mirai-name.svg" alt="Mirai logo with text" width={150} height={45} />
      </div>
      <div className="w-[160px]">
        <CountrySelect></CountrySelect>
        <LanguageSelect></LanguageSelect>
      </div>
    </footer>
  )
}

export default Footer
