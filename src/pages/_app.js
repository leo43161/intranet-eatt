import '../styles/globals.css'
import '../styles/index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/common/Header';
import { loginVerify } from '../helpers/authHelpers';
import { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';

function MyApp({ Component, pageProps }) {
  const [loader, setLoader] = useState(false);
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
    {loader && <div
      className="d-flex justify-content-center align-items-center bg-dark bg-opacity-75"
      style={{
        zIndex: 10000000,
        height: '100vh',
        width: '100vw',
        position: "fixed"
      }} >
      <Spinner style={{ width: "3rem", height: "3rem", borderWidth: "0.5em" }} animation="border" role="status" variant="light">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>}

    {logged && <Header setLoggedReload={setLoggedReload}></Header>}
    <Component {...pageProps} setLoader={setLoader} setLoggedReload={setLoggedReload} />
  </>
}
export default MyApp
