import "../styles/globals.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

import Head from "next/head";
import { StateProvider } from "../context/StateContext";
import reducer, { initialState } from "../context/StateReducer";

export default function App({ Component, pageProps }) {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>freelanceX</title>
      </Head>
      <div className="relative flex flex-col h-screen justify-between">
        <NavBar />
        <div className="mb-auto w-full mx-auto">
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
    </StateProvider>
  );
}
