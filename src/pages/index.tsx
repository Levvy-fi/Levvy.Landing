import React from 'react';
import Layout from '@theme/Layout';
import MainLayout from '../components/common/MainLayout';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Section1 from '../components/sections/Section1';

export default function Home(): React.ReactNode {
  return (
    <Layout
      title="Angel Finance"
      description="Join Angel Finance on Cardano—bringing DeFi to new heights with lending, borrowing, and yield farming powered by $ANGELS and the Levvy protocol."
      wrapperClassName="homepage"
    >
      <MainLayout>
        <Header />
        <main>
          <Section1 />
        </main>
        <Footer />
      </MainLayout>
    </Layout>
  );
}