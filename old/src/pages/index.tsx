import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import MainLayout from "../components/common/main-layout"
import Section1 from "../components/sections/section1"
import Section2 from "../components/sections/section2"
import Section3 from "../components/sections/section3"
import Section4 from "../components/sections/section4"
import Section5 from "../components/sections/section5"
import Header from "../components/common/header"
import Footer from "../components/common/footer"

const IndexPage: React.FC<PageProps> = () => {
  return (
    <MainLayout>
      <Header/>
      <Section1/>
      <Section2/>
      <Section3/>
      <Section4/>
      <Section5/>
      <Footer/>
    </MainLayout>
  )
}

export default IndexPage

export const Head: HeadFC = () => {
  return (
    <>
      <title>Angel Finance</title>
      <meta name="description" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
      <meta property="og:title" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
      <meta property="og:type" content="website" />
      <meta property="og:description" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Angel Finance" />
      <meta name="twitter:description" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
    </>
  )
}
