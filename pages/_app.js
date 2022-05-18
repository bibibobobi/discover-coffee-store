import '../styles/globals.css';
import StoreProvider from '../store/store-context';

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
      <footer>
        <p>&copy;2022 Bibo Chan</p>
      </footer>
    </StoreProvider>
  );
}

export default MyApp;
