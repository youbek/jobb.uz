import React, { useState, useEffect, useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Link } from "react-router-dom";

import { AuthContext } from "../../../context/AuthContext";

import {
  Alert,
  Form,
  FormGroup,
  FormFeedback,
  Input,
  Button,
  Spinner,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";

import isValidEmail from "../../../helpers/isValidEmail";
import isEmptyStr from "../../../helpers/isEmptyStr";

import { REGISTER_USER } from "../../../graphql/mutations";

function RegisterModal({
  toggleRegisterModal,
  toggleRegisterHrModal,
  toggleLoginModal,
  isHr,
}) {
  const { setAuthenticatedUser } = useContext(AuthContext);
  const [registerUser, registerStatus] = useMutation(REGISTER_USER, {
    onCompleted: onRegister,
  });
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    isHr,
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
    <Modal
      isOpen={true}
      toggle={() => (isHr ? toggleRegisterHrModal() : toggleRegisterModal())}
    >
      <ModalHeader
        toggle={() => (isHr ? toggleRegisterHrModal() : toggleRegisterModal())}
      >
        <h3>Register as {isHr ? "Recruiter" : "Candidate"}</h3>
      </ModalHeader>
      <ModalBody className="register-modal">
        {registerStatus.error && (
          <Alert color="danger">
            <p className="m-0">
              {registerStatus.error.graphQLErrors
                ? registerStatus.error.graphQLErrors.map(
                    ({ message }) => message,
                  )
                : "Something went wrong. Please try again later."}
            </p>
          </Alert>
        )}
        <Form className="mt-4" onSubmit={handleSubmit}>
          <FormGroup>
            <Input
              id="firstName"
              type="text"
              name="firstName"
              invalid={error.type === "name"}
              valid={submitted}
              value={user.firstName}
              disabled={submitted || registerStatus.loading}
              onChange={handleInputs}
              placeholder="First name"
            />
            <FormFeedback>{error.msg}</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Input
              id="lastName"
              type="text"
              name="lastName"
              invalid={error.type === "surname"}
              valid={submitted}
              value={user.lastName}
              disabled={submitted || registerStatus.loading}
              onChange={handleInputs}
              placeholder="Last name"
            />
            <FormFeedback>{error.msg}</FormFeedback>
          </FormGroup>

          <FormGroup>
            <Input
              id="email"
              type="text"
              name="email"
              invalid={error.type === "email"}
              valid={submitted}
              value={user.email}
              disabled={submitted || registerStatus.loading}
              onChange={handleInputs}
              placeholder="Email address"
            />
            <FormFeedback>{error.msg}</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Input
              id="password"
              type="password"
              name="password"
              invalid={error.type === "password"}
              valid={submitted}
              value={user.password}
              disabled={submitted || registerStatus.loading}
              onChange={handleInputs}
              placeholder="Password"
            />
            <FormFeedback>{error.msg}</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              disabled={submitted || registerStatus.loading}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
            />
          </FormGroup>
          <Button
            color="primary"
            disabled={submitted || registerStatus.loading}
            className="mt-2"
          >
            {!submitted && !registerStatus.loading ? (
              "Register"
            ) : (
              <Spinner size="sm" />
            )}
          </Button>
          <div className="auth-link mt-3">
            <p>
              Already a member?{" "}
              <Button
                onClick={() => {
                  toggleRegisterModal();
                  toggleLoginModal();
                }}
                color="link"
                disabled={submitted || registerStatus.loading}
              >
                Sign In
              </Button>
            </p>
          </div>
          <div className="auth-link">
            <p>
              {isHr ? "Seeking a job? " : "Seeking candidates? "}
              <Button
                onClick={() => {
                  toggleRegisterModal();
                  toggleRegisterHrModal();
                }}
                color="link"
                disabled={submitted || registerStatus.loading}
              >
                {isHr ? "Sign up to apply" : "Register as Recruiter"}
              </Button>
            </p>
          </div>
        </Form>
      </ModalBody>
    </Modal>
  );
}

export default RegisterModal;
