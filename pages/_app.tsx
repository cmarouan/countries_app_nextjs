import "../styles/globals.css";
import type { AppProps } from "next/app";
import styled from "styled-components";

const Container = styled.div`
  margin: 0 auto;
  max-width: 700px;
  padding: 1rem;
  background-color: #f7f7ff;
`;

const Layout = ({ children }: any) => {
  return <Container>{children}</Container>;
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
