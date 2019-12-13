import React, { useState, useEffect, useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import { AuthContext } from "../context/AuthContext";

import { Container, Row, Col, Input, Button, Collapse } from "reactstrap";

import { EDIT_USER, DELETE_USER } from "../graphql/mutations";

function ProfilePage() {
  const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);
  const [editUser, editUserStatus] = useMutation(EDIT_USER, {
    onCompleted: onEditUser,
  });
  const [deleteUser, deleteUserStatus] = useMutation(DELETE_USER, {
    onCompleted: onDeleteUser,
  });
  const [activeSettings, setActiveSettings] = useState(undefined);
  const [newFirstName, setNewFirstName] = useState(undefined);
  const [newLastName, setNewLastName] = useState(undefined);
  const [newEmail, setNewEmail] = useState(undefined);
  const [newPhoneNumber, setNewPhoneNumber] = useState(undefined);
  const [newAddress, setNewAddress] = useState(undefined);

  const [newPassword, setNewPassword] = useState(undefined);
  const [lastPassword, setLastPassword] = useState(undefined);

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!submitted) {
      return;
    }

    setTimeout(() => {
      setSubmitted(false);
    }, 1000);
  }, [submitted]);

  function toggleSettings(settingsToOpen) {
    if (editUserStatus.loading) {
      return;
    }

    if (activeSettings === settingsToOpen) {
      setActiveSettings(undefined);
      return;
    }

    setActiveSettings(settingsToOpen);
  }

  function saveUser(variables) {
    console.log(authenticatedUser.hashId);
    editUser({
      variables: { ...variables, userId: authenticatedUser.hashId },
    });
    return;
  }

  function handleDeleteUser() {
    const confirmation = window.confirm("Are you sure?");
    if (confirmation) {
      deleteUser({ variables: { userId: authenticatedUser.hashId } });
    }
  }

  function onDeleteUser(data) {
    if (!data.deleteUser) return;

    localStorage.removeItem("userToken");
    setAuthenticatedUser(null);
  }

  function onEditUser(data) {
    setSubmitted(true);

    const editedContent = data.editUser;

    setAuthenticatedUser({
      ...authenticatedUser,
      editedContent,
    });
  }

  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    address,
  } = authenticatedUser;

  const isLoading = editUserStatus.loading || submitted;

  return (
    <Container>
      <Row className=" profile-page mt-5">
        <Col md="8">
          <h2>Profile settings</h2>
          <div className="profile-settings mt-3">
            <Row>
              <Col>Name</Col>
              <Col>{`${firstName} ${lastName}`}</Col>
              <Col align="right">
                <Button color="link" onClick={() => toggleSettings("name")}>
                  {activeSettings === "name" && submitted ? "Edited" : "Edit"}
                </Button>
              </Col>
            </Row>
            <Collapse
              isOpen={activeSettings === "name"}
              className="row profile-edit-table"
            >
              <Col>
                <Input
                  placeholder="First name"
                  value={newFirstName}
                  disabled={isLoading}
                  valid={activeSettings === "name" && submitted}
                  onChange={e => setNewFirstName(e.target.value)}
                />
              </Col>
              <Col>
                <Input
                  placeholder="Last name"
                  value={newLastName}
                  disabled={isLoading}
                  valid={activeSettings === "name" && submitted}
                  onChange={e => setNewLastName(e.target.value)}
                />
              </Col>
              <Col>
                <Button
                  color="primary"
                  disabled={isLoading}
                  onClick={() => saveUser({ newFirstName, newLastName })}
                >
                  {activeSettings === "name" && submitted ? "Saved" : "Save"}
                </Button>
              </Col>
            </Collapse>
            <Row>
              <Col>Email</Col>
              <Col>{email}</Col>
              <Col align="right">
                <Button color="link" onClick={() => toggleSettings("email")}>
                  Change
                </Button>
              </Col>
            </Row>
            <Collapse
              isOpen={activeSettings === "email"}
              className="row profile-edit-table"
            >
              <Col>New email</Col>
              <Col>
                <Input
                  placeholder="New email address"
                  value={newEmail}
                  disabled={isLoading}
                  valid={activeSettings === "email" && submitted}
                  onChange={event => setNewEmail(event.target.value)}
                />
              </Col>
              <Col>
                <Button
                  color="primary"
                  disabled={isLoading}
                  onClick={() => editUser({ variables: { newEmail } })}
                >
                  {activeSettings === "email" && submitted ? "Saved" : "Save"}
                </Button>
              </Col>
            </Collapse>
            <Row>
              <Col>Password</Col>
              <Col>*******</Col>
              <Col align="right">
                <Button color="link" onClick={() => toggleSettings("password")}>
                  Change
                </Button>
              </Col>
            </Row>
            <Collapse
              isOpen={activeSettings === "password"}
              className="row profile-edit-table"
            >
              <Col>
                <Input
                  placeholder="Old password"
                  value={lastPassword}
                  disabled={isLoading}
                  valid={activeSettings === "password" && submitted}
                  onChange={e => setLastPassword(e.target.value)}
                />
              </Col>
              <Col>
                <Input
                  placeholder="New password"
                  value={newPassword}
                  disabled={isLoading}
                  valid={activeSettings === "password" && submitted}
                  onChange={e => setNewPassword(e.target.value)}
                />
              </Col>
              <Col>
                <Button
                  color="primary"
                  disabled={isLoading}
                  onClick={() => saveUser({ lastPassword, newPassword })}
                >
                  {activeSettings === "password" && submitted
                    ? "Saved"
                    : "Save"}
                </Button>
              </Col>
            </Collapse>
            <Row>
              <Col>Phone Number</Col>
              <Col>{phoneNumber ? phoneNumber : "Not provided"}</Col>
              <Col align="right">
                <Button
                  color="link"
                  onClick={() => toggleSettings("phoneNumber")}
                >
                  {phoneNumber ? "Edit" : "Add"}
                </Button>
              </Col>
            </Row>
            <Collapse
              isOpen={activeSettings === "phoneNumber"}
              className="row profile-edit-table"
            >
              <Col>
                {phoneNumber ? "Edit phone number" : "Add phone number "}
              </Col>
              <Col>
                <Input
                  placeholder="Phone number"
                  value={newPhoneNumber}
                  valid={activeSettings === "phoneNumber" && submitted}
                  disabled={isLoading}
                  onChange={e => setNewPhoneNumber(e.target.value)}
                />
              </Col>
              <Col>
                <Button
                  color="primary"
                  disabled={isLoading}
                  onChange={() => saveUser({ newPhoneNumber })}
                >
                  {" "}
                  {activeSettings === "phoneNumber" && submitted
                    ? "Saved"
                    : "Save"}
                </Button>
              </Col>
            </Collapse>
            <Row>
              <Col>Address</Col>
              <Col>{address ? address : "Not Provided"}</Col>
              <Col align="right">
                {address ? (
                  <Button
                    color="link"
                    onClick={() => toggleSettings("address")}
                  >
                    Edit
                  </Button>
                ) : (
                  <Button
                    color="link"
                    onClick={() => toggleSettings("address")}
                  >
                    Add
                  </Button>
                )}
              </Col>
            </Row>
            <Collapse
              isOpen={activeSettings === "address"}
              className="row profile-edit-table"
            >
              <Col>{address ? "Edit address" : "Add new address"}</Col>
              <Col>
                <Input
                  placeholder="Address"
                  value={newAddress}
                  disabled={isLoading}
                  onChange={e => setNewAddress(e.target.value)}
                />
              </Col>
              <Col>
                <Button
                  color="primary"
                  disabled={isLoading}
                  onClick={() => saveUser({ newAddress })}
                >
                  Save
                </Button>
              </Col>
            </Collapse>
            <Row>
              <Col className="text-right">
                <Button
                  className="mt-4 text-muted"
                  color="link"
                  onClick={handleDeleteUser}
                >
                  Delete Account
                </Button>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ProfilePage;
