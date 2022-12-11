import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"
import React from "react"
import { useEffect } from 'react'
import Router from 'next/router'
import * as ackeeTracker from 'ackee-tracker'

const Layout: React.FC = ({ children }) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.ackeeTrackerInstance = ackeeTracker.create('https://analytics.miraiclothing.shop', {
        ignoreLocalhost: true,
        detailed: true
      })
      window.ackeeTrackerInstance.record('5d434d46-921f-4f83-8cf3-1621c7336db1')

      Router.events.on('routeChangeComplete', () => window.ackeeTrackerInstance.record('5d434d46-921f-4f83-8cf3-1621c7336db1'))
    }
  }, [])

  return (
    <div>
      <Nav />
      <main className="relative">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
