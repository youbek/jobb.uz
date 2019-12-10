import React, { useState, useEffect, useContext } from "react";
import { useMutation } from "@apollo/react-hooks";

import { AuthContext } from "../context/AuthContext";

import {
  Container,
  Row,
  Col,
  Alert,
  Form,
  FormGroup,
  Label,
  FormFeedback,
  Input,
  Button,
  Spinner,
} from "reactstrap";

import isValidEmail from "../helpers/isValidEmail";
import isEmptyStr from "../helpers/isEmptyStr";

import { LOGIN_USER } from "../graphql/mutations";

function LogInPage() {
  const [loginUser, loginStatus] = useMutation(LOGIN_USER, {
    onCompleted: onLogin,
    errorPolicy: "all",
  });

  const { setAuthenticatedUser } = useContext(AuthContext);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setError(false);
  }, [user]);

  function handleInputs(e) {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  function onSubmit(e) {
    if (e) e.preventDefault();

    if (!isValidEmail(user.email)) {
      setError({
        type: "email",
        msg: "Invalid email address",
      });
      return;
    }

    if (isEmptyStr(user.password)) {
      setError({
        type: "password",
        msg: "Password is required",
      });
      return;
    }

    loginUser({
      variables: {
        email: user.email,
        password: user.password,
      },
    });
  }

  function onLogin({ logInUser }) {
    setSubmitted(true);
    localStorage.setItem("userToken", logInUser.token);

    setTimeout(() => {
      setAuthenticatedUser(logInUser.user);
    }, 1000);
  }

  return (
    <Container className="pt-5">
      <Row className="justify-content-center">
        <Col md="6">
          <h1 className="mb-4 mt-5">Login</h1>
          {loginStatus.error && (
            <Alert color="danger">
              <p className="m-0">
                {loginStatus.error.graphQLErrors
                  ? loginStatus.error.graphQLErrors.map(
                      ({ message }) => message,
                    )
                  : "Something went wrong. Please try again later."}
              </p>
            </Alert>
          )}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="email">
                Email <FormFeedback tag="span">*</FormFeedback>
              </Label>
              <Input
                id="email"
                type="email"
                name="email"
                invalid={error.type === "email"}
                valid={loginStatus.loading || submitted}
                value={user.email}
                onChange={handleInputs}
              />
              <FormFeedback>{error.msg}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="password">
                Password <FormFeedback tag="span">*</FormFeedback>
              </Label>
              <Input
                id="password"
                type="password"
                name="password"
                invalid={error.type === "password"}
                valid={loginStatus.loading || submitted}
                value={user.password}
                onChange={handleInputs}
              />
              <FormFeedback>{error.msg}</FormFeedback>
            </FormGroup>
            <Button color="primary" disabled={submitted || loginStatus.loading}>
              {!submitted && !loginStatus.loading ? "Login" : <Spinner />}
            </Button>
            <Button color="link" disabled={submitted || loginStatus.loading}>
              Don't have an account yet?
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LogInPage;
