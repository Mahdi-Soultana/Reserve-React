import React from 'react'
import axios from "axios";
import ProductList from '../components/Index/ProductList'
import baseUrl from '../utils/baseUrl'
function Home({prodects}) {
  
  return <ProductList products={prodects}/>;
}

Home.getInitialProps = async () => {
  const url = `${baseUrl}/api/products`
  const prodects = await axios.get(url);
  return {prodects:prodects.data}

}

export default Home;
