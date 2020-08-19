import { Header, Button, Segment, Icon } from 'semantic-ui-react'

function CartItemList() {
  const user=false;
  return (
    <Segment secondary color="teal" inverted textAlign="center" placeholder>
      <Header icon>
        <Icon name="shopping basket" />
    No Product In your Cart Add some !
    </Header>
    <div>
    {
      user?
      (<Button color="blue">
      view Product
      </Button>):(
<Button color="orange">

Login to Add Products </Button>
      )
    }</div>
    </Segment>);
}

export default CartItemList;
