import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import MainLayout from "../components/common/main-layout"
import Section1 from "../components/sections/section1"
import Section3 from "../components/sections/section3"
import Section4 from "../components/sections/section4"
import Section5 from "../components/sections/section5"


const IndexPage: React.FC<PageProps> = () => {
  return (
    <MainLayout>
      <Section1/>
      <Section3/>
      <Section4/>
      <Section5/>
    </MainLayout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
