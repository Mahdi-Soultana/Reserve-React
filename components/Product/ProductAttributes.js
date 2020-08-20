import React, { useState } from 'react';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import { useRouter } from 'next/router';



import { Header, Button, Modal } from 'semantic-ui-react';
function ProductAttributes({ description, _id,user}) {
  const [modal, setModal] = useState(false);
  const router = useRouter();
  const isRoot = user.role === "root"
  const isAdmin = user.role === "admin"
  const idAdminOrRoot=(isAdmin||isRoot)
  const handelDelete = async () => {
    const url = `${baseUrl}/api/product`
    const payload = { params: { _id } }
    await axios.delete(url, payload);
    router.push('/');
    console.log("Delete")

  }
  return (
    <>
      <Header as="h3">About This Product</Header>
      <p>{description}</p>
      {idAdminOrRoot && <>
        <Button
        icon="trash alternate outline"
        color="red"
        content="Delete Product "
        onClick={() => setModal(true)}
      />
      <Modal open={modal} dimmer="blurring">
        <Modal.Header>confirm Delete</Modal.Header>
        <Modal.Content>
          <p>Are you shure To delete Thos Product ?!</p>
        </Modal.Content>
        <Modal.Actions>
          <Button content="Cancel"
            onClick={() => setModal(false)} />
          <Button
            negative
            icon="trash"
            labelPosition="right"
            content="Delete"
            onClick={handelDelete}
          />
        </Modal.Actions>
      </Modal>
      </>
    }
    </>
  );
}

export default ProductAttributes;
