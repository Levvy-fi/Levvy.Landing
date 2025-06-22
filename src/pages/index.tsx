import React from 'react';
import Layout from '@theme/Layout';
import MainLayout from '../components/common/MainLayout';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Section1 from '../components/sections/Section1';
import Section2 from '../components/sections/Section2';
import Section3 from '../components/sections/Section3';
import Section4 from '../components/sections/Section4';
import Section5 from '../components/sections/Section5';

export default function Home(): React.ReactNode {
  return (
    <Layout
      title=""
      description="Join Angel Finance on Cardano—bringing DeFi to new heights with lending, borrowing, and yield farming powered by $ANGELS and the Levvy protocol."
      wrapperClassName="homepage"
    >
      <MainLayout>
        <Header />
        <main>
          <Section1 />
          <Section2 />
          <Section3 />
          <Section4 />
          <Section5 />
        </main>
        <Footer />
      </MainLayout>
    </Layout>
  );
}