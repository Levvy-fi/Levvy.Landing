import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import MainLayout from "../components/common/main-layout"
import Section6 from "../components/sections/section6"
import Section1 from "../components/sections/section1"
import Section3 from "../components/sections/section3"

const IndexPage: React.FC<PageProps> = () => {
  return (
    <MainLayout>
      <Section1/>
      <Section3/>
      <Section6/>
    </MainLayout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
