import React, { useState, useEffect, useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import { AuthContext } from "../context/AuthContext";

import ProfileContainer from "../components/ProfilePage/ProfileContainer";
import Row from "../components/Layout/Row";
import Col8 from "../components/Layout/Col8";
import TableRow from "../components/ProfilePage/TableRow";
import TableCol from "../components/ProfilePage/TableCol";
import Button from "../components/Buttons/Button";
import Input from "../components/Form/Input";
import TableCollapse from "../components/ProfilePage/TableCollapse";

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
    <ProfileContainer>
      <Row>
        <Col8>
          <h2>Profile settings</h2>
          <div>
            <TableRow
              name="Name"
              value={`${firstName} ${lastName}`}
              button={
                activeSettings === "name" && submitted ? "Edited" : "Edit"
              }
              onClick={() => toggleSettings("name")}
              activeSettings={activeSettings}
            />
            <TableCollapse isOpen={activeSettings === "name"}>
              <TableCol>
                <Input
                  placeholder="First name"
                  value={newFirstName}
                  disabled={isLoading}
                  valid={activeSettings === "name" && submitted}
                  onChange={e => setNewFirstName(e.target.value)}
                />
              </TableCol>
              <TableCol>
                <Input
                  placeholder="Last name"
                  value={newLastName}
                  disabled={isLoading}
                  valid={activeSettings === "name" && submitted}
                  onChange={e => setNewLastName(e.target.value)}
                />
              </TableCol>
              <TableCol>
                <Button
                  color="primary"
                  disabled={isLoading}
                  onClick={() => saveUser({ newFirstName, newLastName })}
                >
                  {activeSettings === "name" && submitted ? "Saved" : "Save"}
                </Button>
              </TableCol>
            </TableCollapse>
            <TableRow
              name="Email"
              value={email}
              button="Change"
              onClick={() => toggleSettings("email")}
            />
            <TableCollapse isOpen={activeSettings === "email"}>
              <TableCol>New email</TableCol>
              <TableCol>
                <Input
                  placeholder="New email address"
                  value={newEmail}
                  disabled={isLoading}
                  valid={activeSettings === "email" && submitted}
                  onChange={event => setNewEmail(event.target.value)}
                />
              </TableCol>
              <TableCol>
                <Button
                  color="primary"
                  disabled={isLoading}
                  onClick={() => editUser({ variables: { newEmail } })}
                >
                  {activeSettings === "email" && submitted ? "Saved" : "Save"}
                </Button>
              </TableCol>
            </TableCollapse>
            <TableRow
              name="Password"
              value="*******"
              button="Change"
              onClick={() => toggleSettings("password")}
            />
            <TableCollapse isOpen={activeSettings === "password"}>
              <TableCol>
                <Input
                  placeholder="Old password"
                  value={lastPassword}
                  disabled={isLoading}
                  valid={activeSettings === "password" && submitted}
                  onChange={e => setLastPassword(e.target.value)}
                />
              </TableCol>
              <TableCol>
                <Input
                  placeholder="New password"
                  value={newPassword}
                  disabled={isLoading}
                  valid={activeSettings === "password" && submitted}
                  onChange={e => setNewPassword(e.target.value)}
                />
              </TableCol>
              <TableCol>
                <Button
                  color="primary"
                  disabled={isLoading}
                  onClick={() => saveUser({ lastPassword, newPassword })}
                >
                  {activeSettings === "password" && submitted
                    ? "Saved"
                    : "Save"}
                </Button>
              </TableCol>
            </TableCollapse>
            <TableRow
              name="Phone Number"
              value={phoneNumber ? phoneNumber : "Not provided"}
              button={phoneNumber ? "Edit" : "Add"}
              onClick={() => toggleSettings("phoneNumber")}
            />
            <TableCollapse isOpen={activeSettings === "phoneNumber"}>
              <TableCol>
                {phoneNumber ? "Edit phone number" : "Add phone number "}
              </TableCol>
              <TableCol>
                <Input
                  placeholder="Phone number"
                  value={newPhoneNumber}
                  valid={activeSettings === "phoneNumber" && submitted}
                  disabled={isLoading}
                  onChange={e => setNewPhoneNumber(e.target.value)}
                />
              </TableCol>
              <TableCol>
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
              </TableCol>
            </TableCollapse>
            <TableRow
              name="Address"
              value={address ? address : "Not Provided"}
              button={address ? "Edit" : "Add"}
              onClick={() => toggleSettings("address")}
            />
            <TableCollapse isOpen={activeSettings === "address"}>
              <TableCol>
                {address ? "Edit address" : "Add new address"}
              </TableCol>
              <TableCol>
                <Input
                  placeholder="Address"
                  value={newAddress}
                  disabled={isLoading}
                  onChange={e => setNewAddress(e.target.value)}
                />
              </TableCol>
              <TableCol>
                <Button
                  color="primary"
                  disabled={isLoading}
                  onClick={() => saveUser({ newAddress })}
                >
                  Save
                </Button>
              </TableCol>
            </TableCollapse>

            <Button className="mt-4" onClick={handleDeleteUser}>
              Delete Account
            </Button>
          </div>
        </Col8>
      </Row>
    </ProfileContainer>
  );
}

export default ProfilePage;
