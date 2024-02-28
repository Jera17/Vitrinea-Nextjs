import Link from "next/link";
import Layout from "../components/Layout";

const Home = () => (
  <Layout title="Home Page">

    <h1>Home</h1>
    <p>This is the home page</p>
    <p>
      <Link href="/">Go home</Link>
    </p>
    <video></video>
    
  </Layout>
);

export default Home;
