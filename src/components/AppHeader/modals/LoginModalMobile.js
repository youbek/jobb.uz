import React, { useState, useContext, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import isValidEmail from "../../../helpers/isValidEmail";
import isEmptyStr from "../../../helpers/isEmptyStr";
import { AuthContext } from "../../../context/AuthContext";

import { LOGIN_USER } from "../../../graphql/mutations";

import {
  Alert,
  Form,
  FormGroup,
  FormFeedback,
  Button,
  Input,
  Spinner,
} from "reactstrap";

import OverlayContainer from "../../OverlayContainer/OverlayContainer";
import OverlayContainerFooter from "../../OverlayContainer/OverlayContainerFooter";

function LoginModalMobile({ showLoginModalMobile, toggleLoginModalMobile }) {
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
    <OverlayContainer
      isOpen={showLoginModalMobile}
      toggle={toggleLoginModalMobile}
      title="Login and Register"
    >
      <div>
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
            block
            disabled={submitted || loginStatus.loading}
            className="mt-2"
          >
            {!submitted && !loginStatus.loading ? (
              "Login"
            ) : (
              <Spinner size="sm" />
            )}
          </Button>
          <OverlayContainerFooter>
            <Button
              className="border-bottom"
              onClick={() => {}}
              color="link"
              disabled={submitted || loginStatus.loading}
            >
              Register
            </Button>
            <Button
              onClick={() => {}}
              color="link"
              disabled={submitted || loginStatus.loading}
            >
              Register as Recruiter
            </Button>
          </OverlayContainerFooter>
        </Form>
      </div>
    </OverlayContainer>
  );
}

export default LoginModalMobile;
