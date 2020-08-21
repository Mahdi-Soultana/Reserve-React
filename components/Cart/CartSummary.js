import { Button, Segment, Divider } from 'semantic-ui-react'
import React, { useState, useEffect } from 'react'
import calculateCartTotal from '../../utils/calculateCartTotal'
function CartSummary({ products }) {
  const [cartAmount, setCartAmount] = useState(0)
  const [stripAmount, setStripAmount] = useState(0)


  const [isCratEmpty, setCartEmpty] = useState(false);
  useEffect(() => {
    const { cartTotal, stripeTotal } = calculateCartTotal(products)
    setCartAmount(cartTotal);
    setStripAmount(stripeTotal);
    setCartEmpty(products.length === 0)
  }, [products])

  return (<>
    <Divider />
    <Segment clearing size="large">
      <strong> sub Totlal :</strong> ${cartAmount}
    <Button icon="cart"
        disabled={isCratEmpty}
        color="orange"
        floated="right"
        content="Checkout" />
    </Segment>
  </>);
}

export default CartSummary;
