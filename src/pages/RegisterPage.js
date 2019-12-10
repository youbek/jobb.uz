/*
  ==================================
  NOTE RENDERS USER REGISTERING PAGE
  ==================================
*/
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

import { REGISTER_USER } from "../graphql/mutations";

function RegisterPage() {
  const { setAuthenticatedUser } = useContext(AuthContext);
  const [registerUser, registerStatus] = useMutation(REGISTER_USER, {
    onCompleted: onRegister,
  });
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setError(false);
  }, [user]);

  function handleInputs(e) {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    // CHECK FOR ERRORS
    if (isEmptyStr(user.firstName)) {
      setError({ type: "name", msg: "Please, provide name" });
      return;
    }

    if (isEmptyStr(user.lastName)) {
      setError({ type: "surname", msg: "Please, provide lastname" });
      return;
    }

    if (!isValidEmail(user.email)) {
      setError({ type: "email", msg: "Please, provide valid email address" });
      return;
    }

    if (isEmptyStr(user.password)) {
      setError({ type: "password", msg: "Please, provide password" });
      return;
    }

    if (user.password !== confirmPassword) {
      setError({ type: "password", msg: "Confirmation password didn't match" });
      return;
    }

    registerUser({
      variables: user,
    });

    setError(false);
  }

  function onRegister(data) {
    setSubmitted(true);

    setTimeout(() => {
      localStorage.setItem("userToken", data.registerUser.token);
      setAuthenticatedUser(data.registerUser.user);
    }, 1000);
  }

  return (
    <Container className="pt-5">
      <Row className="justify-content-center">
        <Col md="6">
          <h1 className="mb-4 mt-5">Register</h1>
          {registerStatus.error && (
            <Alert color="danger">
              {registerStatus.error.graphQLErrors.length ? (
                registerStatus.error.graphQLErrors.map(({ message }) => (
                  <p className="m-0">{message}</p>
                ))
              ) : (
                <p className="m-0">
                  Something went wrong, please try again later.
                </p>
              )}
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Row form>
                <Col>
                  <Label for="firstName">
                    First Name <FormFeedback tag="span">*</FormFeedback>
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    name="firstName"
                    invalid={error.type === "name"}
                    valid={submitted}
                    value={user.firstName}
                    disabled={submitted || registerStatus.loading}
                    onChange={handleInputs}
                  />
                  <FormFeedback>{error.msg}</FormFeedback>
                </Col>
                <Col>
                  <Label for="lastName">
                    Last Name <FormFeedback tag="span">*</FormFeedback>
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    name="lastName"
                    invalid={error.type === "surname"}
                    valid={submitted}
                    value={user.lastName}
                    disabled={submitted || registerStatus.loading}
                    onChange={handleInputs}
                  />
                  <FormFeedback>{error.msg}</FormFeedback>
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Label for="email">
                Email address <FormFeedback tag="span">*</FormFeedback>
              </Label>
              <Input
                id="email"
                type="text"
                name="email"
                invalid={error.type === "email"}
                valid={submitted}
                value={user.email}
                disabled={submitted || registerStatus.loading}
                onChange={handleInputs}
              />
              <FormFeedback>{error.msg}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Row form>
                <Col>
                  <Label for="password">
                    Password <FormFeedback tag="span">*</FormFeedback>
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    invalid={error.type === "password"}
                    valid={submitted}
                    value={user.password}
                    disabled={submitted || registerStatus.loading}
                    onChange={handleInputs}
                  />
                  <FormFeedback>{error.msg}</FormFeedback>
                </Col>
                <Col>
                  <Label for="confirmPassword">
                    Confirm Password <FormFeedback tag="span"></FormFeedback>
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    disabled={submitted || registerStatus.loading}
                    onChange={e => setConfirmPassword(e.target.value)}
                  />
                </Col>
              </Row>
            </FormGroup>
            <Button
              color="primary"
              disabled={submitted || registerStatus.loading}
            >
              {!submitted && !registerStatus.loading ? "Register" : <Spinner />}
            </Button>
            <Button color="link" disabled={submitted || registerStatus.loading}>
              Already have an account?
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default RegisterPage;
