import { Button, Segment, Divider } from 'semantic-ui-react'

function CartSummary() {
  return (<>
    <Divider />
    <Segment clearing size="large">
      <strong> sub Totlal :</strong> $0.00
    <Button icon="cart"
    color="orange"
    floated="right"
    content="Checkout"/>
    </Segment>
  </>);
}

export default CartSummary;
