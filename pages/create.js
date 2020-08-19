import React, { useState, useEffect } from 'react'
import axios from "axios"
import baseUrl from '../utils/baseUrl';
import catchErrors from '../utils/catchErrors'
import { Form, Input, TextArea, Button, Image, Message, Header, Icon } from "semantic-ui-react"
function CreateProduct() {
  const InitialeProduct = {
    name: "",
    media: "",
    description: "",
    price: ""
  }
  const [successMess, setSuccessMess] = useState(false)
  const [loading, setloading] = useState(false)
  const [disable, setdisable] = useState(true)
  const [error, seterror] = useState("")
  const [product, setProduct] = useState(InitialeProduct)
  const [perviewImage, setperviewImage] = useState("")

  useEffect(() => {
    const isDisabled = Object.values(product).every((item) => Boolean(item));
    isDisabled ? setdisable(false) : setdisable(true);
  }, [product])

  const handelChange = (e) => {
    //e.target.preventDefault();
    const { name, value, files } = e.target;
    if (name === "media") {
      setProduct((prevState => ({ ...prevState, media: files[0] })))
      setperviewImage(window.URL.createObjectURL(files[0]))
    } else {
      setProduct((prevState => ({ ...prevState, [name]: value })))
      // 
    }
  }

  const handelImageUploud = async () => {
    const data = new FormData();
    data.append("file", product.media)
    data.append("upload_preset", "reactreserve")
    data.append("could_name", "soultana-mahdi")
    const response = axios.post(process.env.CLOUDINARY_URL, data)
    const mediaUrl = (await response).data.url;
    return mediaUrl;
  }
  const onSubmitForm = async (e) => {
    try {
      
      e.preventDefault();
      setloading(true)
      const mediaUrl = await handelImageUploud()
  
      const url = `${baseUrl}/api/product`;
      const { name, price, description } = product
      console.log({ product })
      const payload = {
        name, price, description,
        mediaUrl
      }
      const response = await axios.post(url, payload);
      console.log(response.data)
      setloading(false)
      setProduct(InitialeProduct)
      setSuccessMess(true)
    } catch (e) {
      catchErrors(e,seterror)
    } finally{
      setloading(false)

    }

  }
  return (
    <>
      <Header as="h2" block>
        <Icon name="add" color="blue" />
        Create New Create Product
      </Header>
      <Form loading={loading} error={Boolean(error)} success={successMess} onSubmit={onSubmitForm}>
        <Message
          error
         
          header="Oops"
          content={error}
        />
        <Message
          success
          icon="check"
          header="Success"
          content="your product has been Posted Succeffully !"
        />
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            name="name"
            label="Name"
            placeholder="Name"
            value={product.name}
            onChange={handelChange}
          />
          <Form.Field control={Input}
            name="price"
            label="price"
            placeholder="price"
            min="0.00"
            step="0.01"
            type="number"
            value={product.price}
            onChange={handelChange}
          />
          <Form.Field
            control={Input}
            name="media"
            label="Media"
            type="file"
            accept="image/*"
            content="Select Image"
            //value={product.media}
            onChange={handelChange}
          />
        </Form.Group>
        <Image
          src={perviewImage}
          rounded
          centered
          size="medium"
        />
        <Form.Field
          control={TextArea}
          name="description"
          label="Description"
          placeholder="Description"
          value={product.description}
          onChange={handelChange}
        />

        <Form.Field
          control={Button}
          disabled={disable||loading}
          color="orange"
          icon="pencil alternate"
          content="Submit"
          type="submit"
        />

      </Form>

    </>);
}

export default CreateProduct;
