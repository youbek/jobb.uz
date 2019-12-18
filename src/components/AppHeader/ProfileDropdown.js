import React, { useEffect, createRef, forwardRef } from "react";
import { Link } from "react-router-dom";

const ProfileDropdown = forwardRef((props, ref) => {
  const dropDownContainer = createRef();

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  function handleOutsideClick(e) {
    const { current } = dropDownContainer;

    if (
      current &&
      !current.contains(e.target) &&
      ref.current &&
      !ref.current.contains(e.target)
    ) {
      props.toggleProfileDropdown();
    }
  }

  return (
    <div className="profile-dropdown-container" ref={dropDownContainer}>
      <div className="profile-dropdown-item">
        <div className="profile-dropdown-name">
          {`${props.user.firstName} ${props.user.lastName}`}
        </div>
        <Link
          className="profile-dropdown-settings"
          to="/profile"
          onClick={props.toggleProfileDropdown}
        >
          <u>Settings</u>
        </Link>
      </div>
      <div className="profile-dropdown-item">
        <a href="/logout">Log out</a>
      </div>
    </div>
  );
});

ProfileDropdown.displayName = "ProfileDropdown";

export default ProfileDropdown;
