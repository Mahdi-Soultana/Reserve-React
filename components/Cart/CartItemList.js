import { Header, Button, Segment, Icon, Item } from 'semantic-ui-react'
import { useRouter } from 'next/router'
function CartItemList({ products  , user ,handelRemoveFromCart}) {
  console.log(products)
  const mapCartProducts = () => (products.map(p => ({
    key: p.product._id,
    childKey: p.product._id,
    header: (
      <Item.Header as="a" onClick={() => router.push(`/product?_id=${p.product._id}`)}>
        {p.product.name}
      </Item.Header>
    ),

    image: p.product.mediaUrl,
    meta: `${p.quantity} x ${p.product.price}`,
    fluid: 'true',
    extra: (
      <Button
        basic
        icon="remove"
        floated="right"
        onClick={() => handelRemoveFromCart(p.product._id)}
      />
    )
  })))


  const router = useRouter();
  if (products.length === 0) {

    return (
      <Segment secondary color="teal" inverted textAlign="center" placeholder>
        <Header icon>
          <Icon name="shopping basket" />
      No Product In your Cart Add some !
      </Header>
        <div>
          {
            user ?
              (<Button color="blue" onClick={
                () => router.push("/")
              }>
                view Product
              </Button>) : (
                <Button color="orange" onClick={
                  () => router.push("/login")
                }>

                  Login to Add Products </Button>
              )
          }</div>
      </Segment>);
  }
  return <Item.Group divided items={mapCartProducts(products)} />




}

export default CartItemList;
