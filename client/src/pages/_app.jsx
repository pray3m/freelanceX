import "../styles/globals.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import NextNProgress from "nextjs-progressbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import Head from "next/head";
import { useRouter } from "next/router";
import { StateProvider } from "../context/StateContext";
import reducer, { initialState } from "../context/StateReducer";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>freelanceX</title>
      </Head>
      <NextNProgress stopDelayMs={20} />
      <ToastContainer />
      <div className="relative flex flex-col h-screen justify-between">
        <NavBar />
        <div
          className={`${
            router.pathname !== "/" ? "mt-32" : ""
          } mb-auto w-full mx-auto`}
        ></div>
        <div className="mb-auto w-full mx-auto">
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
    </StateProvider>
  );
}
