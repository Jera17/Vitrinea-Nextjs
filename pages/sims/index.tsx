import Layout from "./Layout";
import Webcam from "react-webcam";
// import "../components/styles.css";

const Home = () => (
  <Layout title="Home Page">
    <h2>Home</h2>
    <div className="House WebCam">
      <Webcam mirrored={true} />
    </div>
  </Layout>
);

export default Home;
