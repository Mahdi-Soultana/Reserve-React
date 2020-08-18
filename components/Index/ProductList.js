import { Card } from 'semantic-ui-react'

function ProductList({ products }) {
  const mapproducts = products.map((product) => ({
    header: product.name,
    image: product.mediaUrl,
    color: 'orange',
    meta:`$${product.price}`,
    fluid: true,
    childKey: product._id,
    href: `/product?_id=${product._id}`
  }))

  return <Card.Group itemsPerRow="3" centered stackable items={mapproducts} />;
}

export default ProductList;
