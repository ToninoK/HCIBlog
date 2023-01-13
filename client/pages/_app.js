import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  fetch('https://api.hciblog.online/ping')
      .then((response) => response.json())
      .then((data) => console.log(data));
  return <Component {...pageProps} />
}

export default MyApp
