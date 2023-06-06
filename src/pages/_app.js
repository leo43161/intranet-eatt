import '../styles/globals.css'
import '../styles/index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/common/Header';
import { loginVerify } from '../helpers/authHelpers';
import { useState, useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  const [logged, setLogged] = useState(false);
  const [loggedReload, setLoggedReload] = useState(true);

  useEffect(() => {
    if (loggedReload) {
      checkLogged();
      setLoggedReload(false);
    }
  }, [loggedReload]);
  const checkLogged = async () => setLogged(await loginVerify());
  return <>
    {logged && <Header setLoggedReload={setLoggedReload}></Header>}
    <Component {...pageProps} setLoggedReload={setLoggedReload} />
  </>
}
export default MyApp
