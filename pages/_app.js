import "../styles.css";

import wrapper from '../store/configureStore';

function OPGGApp({ Component, pageProps }) {
  return (
      <Component {...pageProps} />
  );
}

export default wrapper.withRedux(OPGGApp);