import Link from "next/link";
import Layout from "../components/Layout";

import Cover from "../components/Home/Cover";
import Partners from "../components/Home/Partners";

const IndexPage: React.FC = () => (
  <Layout title="Home | Tool">
    <Cover />
    <Partners />

    <div className="h-screen bg-orange-300">
      <h1>1111111111111111111</h1>
    </div>
  </Layout>
);

export default IndexPage;
