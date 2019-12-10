import React, { useEffect, useState, useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import isValidEmail from "../../../helpers/isValidEmail";
import isEmptyStr from "../../../helpers/isEmptyStr";
import { AuthContext } from "../../../context/AuthContext";
import { Link } from "react-router-dom";

import { LOGIN_USER } from "../../../graphql/mutations";
import {
  Modal,
  ModalBody,
  Alert,
  Form,
  FormGroup,
  Input,
  FormFeedback,
  Button,
  Spinner,
  ModalHeader,
} from "reactstrap";

function LoginModal({ showLoginModal, toggleLoginModal, toggleRegisterModal }) {
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
    <Modal isOpen={showLoginModal} toggle={toggleLoginModal}>
      <ModalHeader toggle={toggleLoginModal}>
        <h3>Login</h3>
      </ModalHeader>
      <ModalBody className="login-modal">
        {loginStatus.error && (
          <Alert color="danger">
            <p className="m-0">
              {loginStatus.error.graphQLErrors
                ? loginStatus.error.graphQLErrors.map(({ message }) => message)
                : "Something went wrong. Please try again later."}
            </p>
          </Alert>
        )}
        <Form onSubmit={onSubmit} className="mt-4">
          <FormGroup>
            <Input
              id="email"
              type="email"
              name="email"
              invalid={error.type === "email"}
              valid={loginStatus.loading || submitted}
              value={user.email}
              onChange={handleInputs}
              placeholder="Email"
            />
            <FormFeedback>{error.msg}</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Input
              id="password"
              type="password"
              name="password"
              invalid={error.type === "password"}
              valid={loginStatus.loading || submitted}
              value={user.password}
              onChange={handleInputs}
              placeholder="Password"
            />
            <FormFeedback>{error.msg}</FormFeedback>
          </FormGroup>
          <Button
            color="primary"
            disabled={submitted || loginStatus.loading}
            className="mt-2"
          >
            {!submitted && !loginStatus.loading ? (
              "Login"
            ) : (
              <Spinner size="sm" />
            )}
          </Button>
          <div className="auth-link mt-3">
            <p>
              Not a member?{" "}
              <Button
                onClick={() => {
                  toggleRegisterModal();
                  toggleLoginModal();
                }}
                color="link"
                disabled={submitted || loginStatus.loading}
              >
                Register
              </Button>
            </p>
          </div>
          <div className="auth-link ">
            <p>
              Seeking candidates?{" "}
              <Button
                onClick={() => {
                  toggleRegisterModal();
                  toggleLoginModal();
                }}
                color="link"
                disabled={submitted || loginStatus.loading}
              >
                Register as Recruiter
              </Button>
            </p>
          </div>
        </Form>
      </ModalBody>
    </Modal>
  );
}

export default LoginModal;
