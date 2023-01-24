import "../styles/globals.css";
import { Mulish } from "@next/font/google";


const mulish = Mulish({subsets:['latin']});

function MyApp({ Component, pageProps }) {
  return (
    <main className={mulish.className}>
      <Component {...pageProps} />
    </main>
  );
}

export default MyApp;
