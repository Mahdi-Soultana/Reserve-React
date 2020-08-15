import React, { useEffect } from 'react'
import axios from "axios";

function Home({prodects}) {
  console.log(prodects)
   

  // async function getProdects() {
  //   const url = "http://localhost:3000/api/products"
  //   const prodects = await axios.get(url);
  //   console.log(prodects.data)
  // }

  return <>Home</>;
}

Home.getInitialProps = async () => {
  const url = "http://localhost:3000/api/products"
  const prodects = await axios.get(url);
  return {prodects:prodects.data}

}

export default Home;
