import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import MainLayout from "../components/common/main-layout"

const IndexPage: React.FC<PageProps> = () => {
  return (
    <MainLayout>
      <h1 className="text-[50px]">PlaceHolder</h1>
    </MainLayout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
