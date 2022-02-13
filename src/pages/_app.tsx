import type { AppProps } from "next/app";
import NavBar from "../components/_molecules/NavBar/NavBar";
import { AuthProvider } from "../context/auth";
import CssBaseline from "@mui/material/CssBaseline";
import Head from "next/head";
<meta name="viewport" content="initial-scale=1, width=device-width" />;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <AuthProvider>
        <CssBaseline />
        <NavBar />
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}

export default MyApp;
