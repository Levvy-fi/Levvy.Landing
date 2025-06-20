import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import MainLayout from "../components/common/main-layout"
import Header from "../components/common/header"
import ComingSoon from "../components/coming/coming"

const Policy: React.FC<PageProps> = () => {
  return (
    <MainLayout>
        <Header/>
        <ComingSoon />
    </MainLayout>
  )
}

export default Policy