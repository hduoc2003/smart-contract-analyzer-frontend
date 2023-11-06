import { wrapper } from "../redux/store";
import { AppProps } from "next/app";

import 'animate.css';
import "../styles/index.css";

function MyApp({ Component, pageProps }: AppProps) {
  //@ts-ignore
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
