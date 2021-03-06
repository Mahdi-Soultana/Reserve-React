import React, { useState, useEffect } from 'react'
import catchErrors from '../utils/catchErrors'
import { Button, Form, Icon, Message, Segment } from "semantic-ui-react"
import Link from 'next/link';
import axios from 'axios';
import baseUrl from '../utils/baseUrl'
import { handelLogin } from '../utils/auth'
const InitialState = {
  name: "",
  email: "",
  password: ""
}
function Signup() {
  const [user, setUser] = useState(InitialState)
  const [disable, setDisable] = useState(true)
  const [loading, setloading] = useState(false)
  const [error, seterror] = useState("");
  useEffect(() => {
    const isdesible = Object.values(user).every((el) => Boolean(el))
    isdesible ? setDisable(false) : setDisable(true);
  }, [user]);

  const handelChange = (event) => {
    const { name, value } = event.target;
    setUser((pervState) => ({ ...pervState, [name]: value }))
  }

  const handelSubmit = async (e) => {
    e.preventDefault();

    try {
      setloading(true)
      seterror("")
      const url = `${baseUrl}/api/signup`
      const payload = { ...user }
      const response = await axios.post(url, payload);
      handelLogin(response.data)

    } catch (e) {
      catchErrors(e, seterror)
    } finally {
      setloading(false)
    }
  }
  return (
    <>
      <Message
        attached
        icon="setting"
        header="Get Started "
        content=" Create New Account"
        color="teal"
      />
      <Form error={Boolean(error)} loading={loading} onSubmit={handelSubmit}>
        <Message
          error
          header="Oopss"
          content={error} />
        <Segment>
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            label="Name"
            placeholder="Name"
            name="name"
            value={user.name}
            onChange={handelChange}
          />
          <Form.Input
            fluid
            icon="envelope"
            iconPosition="left"
            label="Email"
            placeholder="Email"
            name="email"
            type="email"
            value={user.email}
            onChange={handelChange}
          />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            label="Password"
            placeholder="Password"
            name="password"
            type="password"
            value={user.password}
            onChange={handelChange}
          />
          <Button
            icon="signup"
            type="submit"
            color="orange"
            content="signUp"
            disabled={disable || loading} />
        </Segment>

      </Form>
      <Message attached="bottom" warning>
        <Icon name="help" />
      Existing user ? {" "}
        <Link href="/login">
          <a>Log in Here !</a>
        </Link>{"  "}instead.
      </Message>
    </>
  );

}

export default Signup;
