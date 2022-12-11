import Head from "@modules/common/components/head"
import FeaturedProducts from "@modules/home/components/featured-products"
// import Hero from "@modules/home/components/hero"
import Layout from "@modules/layout/templates"
import { ReactElement, useState } from "react"
import { NextPageWithLayout } from "types/global"
import CollectionsPicker from "@modules/home/components/collections-picker"
import Link from 'next/link'
import Button from "@modules/common/components/button"
import { translations } from "@lib/i18n"

const Contact: NextPageWithLayout = () => {
  const i = translations();

  return (
    <>
      <Head
        title="Contact"
        description="Contact Mirai for support"
      />

      <div data-w-id="3b43b66a-aa93-50be-05e3-2fe29a7e4c15" className="container cc-heading-wrap" style={{marginTop: "5rem", marginBottom: "10rem"}}>
        <h3>{i.support.email}</h3>
      </div>
    </>
  )
}



Contact.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default Contact
