import type { AppProps } from "next/app";
import NavBar from "../components/_molecules/NavBar/NavBar";
import { AuthProvider } from "../context/auth";
import CssBaseline from "@mui/material/CssBaseline";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      {/* CssBaseline = material-ui css normalize solution */}
      <CssBaseline />
      <NavBar />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
