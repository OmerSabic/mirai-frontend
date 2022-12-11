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

const Home: NextPageWithLayout = () => {
  const i = translations();

  return (
    <>
      <Head
        title="Home"
        description="Shop all available models only at Mirai. Worldwide Shipping. Secure Payment."
      />

      <div data-w-id="3b43b66a-aa93-50be-05e3-2fe29a7e4c15" className="container cc-heading-wrap">
        <h1 className="our-beers">{i.home.title}</h1>
        <div className="store-categories-wrap">
          {/* <Link href="/" passHref={true}>
            <a aria-current="page" className="products-category-link w--current">All Products</a>
          </Link> */}
          {/* <CollectionsPicker setCollection={setCollection} /> */}
        </div>
      </div>
      {/* <Hero /> */}
      {/* <FeaturedProducts collection={collection}/> */}
      <FeaturedProducts />
      <div className="max-w-md mx-auto mt-16">
        <Link href="/store" passHref={true}>
          <Button>{i.home.view_more}</Button>
        </Link>
      </div>
    </>
  )
}



Home.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default Home
