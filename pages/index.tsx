import Link from "next/link";
import Layout from "../components/Layout";

import Cover from "../components/Home/Cover";
import Coverage from "../components/Home/Coverage";
import Feedback from "../components/Home/Feedback";
import Partners from "../components/Home/Partners";
import GetStarted from "../components/Home/GetStarted";

const IndexPage: React.FC = () => (
  <Layout title="Home | Tool">
    <Cover />
    <Coverage />
    <Feedback />
    <Partners />
    <GetStarted />
  </Layout>
);

export default IndexPage;
