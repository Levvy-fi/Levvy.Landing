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

export const Head: HeadFC = () => <title>Home Page</title>
