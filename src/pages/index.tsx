import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import MainLayout from "../components/common/main-layout"
import Section6 from "../components/sections/section6"

const IndexPage: React.FC<PageProps> = () => {
  return (
    <MainLayout>
      <Section6/>
    </MainLayout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
