import { Input } from 'semantic-ui-react';
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios'
import baseUrl from '../../utils/baseUrl'
import cookie from 'js-cookie'
import catchErrors from '../../utils/catchErrors'
function AddProductToCart({ user, productId }) {
  const [quantity, setquatity] = useState(1)
  const [loading, setLoading] = useState(false)
  const [success, setsuccess] = useState(false)
  const router = useRouter();

  useEffect(() => {
    let timeout;
    if (success) {
      timeout = setTimeout(() => setsuccess(false), 3000)
    }
    return ()=>{
      clearTimeout(timeout)
    } 
  }, [success])
  ///handelAddPorductToCart
  const handelAddPorductToCart = async () => {
    try {
      setLoading(true)
      const url = `${baseUrl}/api/cart`
      const payload = { quantity, productId }
      const token = cookie.get("token")
      const headers = { headers: { Authorization: token } }
      await axios.put(url, payload, headers)
      setsuccess(true)
    } catch (error) {
      catchErrors(error, window.alert)
    } finally {
      setLoading(false)
    }
  }

  return (<Input
    type="number"
    min="1"
    placeholder="Quantity"
    value={quantity}
    onChange={e => setquatity(Number(e.target.value))}
    action={
      user && success ? {
        color: "blue",
        content: "Item Added !",
        icon: "plus cart",
        disabled: true
      } :
        user ? {
          color: "orange",
          content: "Add to Cart",
          icon: "plus cart",
          loading,
          disabled: loading,
          onClick: handelAddPorductToCart
        } : {
            color: "blue",
            content: "signUp to purchase",
            icon: "signup",
            onClick: () => router.push("/signup")

          }}
  />)
}

export default AddProductToCart;
