import { GetStaticProps, GetStaticPaths } from "next";
import { useEffect } from "react";
import Layout from "../../components/Layout";
import { sampleUserData } from "../../utils/sample-data";
import { Box, CircularProgress } from "@mui/material";

type Props = {
  id?: string;
  errors?: string;
};

const StaticPropsDetail = ({ id, errors }: Props) => {
  useEffect(() => {
    window.location.href = `vitrineaapp://product/${id}`;
    setTimeout(() => {
      window.location.href =
        "https://play.google.com/store/apps/details?id=com.sv.vitrinnea.ltda";
    }, 2000);
  }, [id]);

  if (errors) {
    return (
      <Layout title="Error | Next.js + TypeScript Example">
        <p>
          <span style={{ color: "red" }}>Error:</span> {errors}
        </p>
      </Layout>
    );
  }

  return (
    <Box
      sx={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default StaticPropsDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  // Get the paths we want to pre-render based on users
  const paths = sampleUserData.map((user) => ({
    params: { id: user.id.toString() },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const id = params?.id;
    return { props: { id } };
  } catch (err: any) {
    return { props: { errors: err.message } };
  }
};
