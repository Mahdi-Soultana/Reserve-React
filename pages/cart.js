import { Segment } from 'semantic-ui-react'
import CartItemList from "../components/Cart/CartItemList"
import CartSummary from "../components/Cart/CartSummary"
import { parseCookies } from 'nookies'
import axios from "axios"
import baseUrl from "../utils/baseUrl"
import React, { useState } from 'react'
import cookie from 'js-cookie'
function Cart({ products, user }) {
  const [cartProduct, setCartProduct] = useState(products);

  const handelRemoveFromCart = async (productId) => {
    const url = `${baseUrl}/api/cart`
    const token = cookie.get("token")
    const payload = {
      params: { productId },
      headers: { Authorization: token }
    }
    const response = await axios.delete(url, payload)
    setCartProduct(response.data)
  }

  return (
    <>
      <Segment>
        <CartItemList
          handelRemoveFromCart={handelRemoveFromCart}
          user={user}
          products={cartProduct}
        />
        <CartSummary products={cartProduct} />
      </Segment>
    </>
  )
}

Cart.getInitialProps = async ctx => {
  const { token } = parseCookies(ctx);
  if (!token) {
    return { product: [] };
  }
  const url = `${baseUrl}/api/cart`
  const payload = { headers: { Authorization: token } }
  const response = await axios.get(url, payload);
  return { products: response.data }
}
export default Cart;
