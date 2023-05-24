import "../styles/globals.css";
import { StateProvider } from "../context/StateContext";
import reducer, { initialState } from "../context/StateReducer";
import Footer from "../components/Footer";

export default function App({ Component, pageProps }) {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <div className="mb-auto w-full mx-auto">
        <Component {...pageProps} />
      </div>
      <Footer />
    </StateProvider>
  );
}
