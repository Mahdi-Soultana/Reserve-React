import React, { useState, useEffect } from 'react'
import catchErrors from '../utils/catchErrors'
import { Button, Form, Icon, Message, Segment } from "semantic-ui-react"
import Link from 'next/link';
import axios from 'axios'
import baseUrl from '../utils/baseUrl'
import { handelLogin } from '../utils/auth'

const InitialState = {
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
      const url = `${baseUrl}/api/login`
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
        icon="privacy"
        header="Welcom Back ! "
        content=" Login with Email AND Password"
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
            icon="sign in"
            type="submit"
            color="orange"
            content="Login"
            disabled={disable || loading} />
        </Segment>

      </Form>
      <Message attached="bottom" warning>
        <Icon name="help" />
      New User ? {" "}
        <Link href="/signup">
          <a>signup Here !</a>

        </Link>{"  "}instead.
      </Message>
    </>
  );

}

export default Signup;
