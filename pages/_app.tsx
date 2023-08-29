import React from "react";
import { AppProps } from "next/app";

import 'animate.css';
import "../styles/index.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

