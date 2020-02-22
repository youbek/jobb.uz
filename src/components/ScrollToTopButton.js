import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "./Buttons/Button";

const ToTopButton = styled(Button)`
  font-size: 1.5rem;
  padding: 0.5rem 1rem;
  bottom: 50px;
  right: 0;
  margin-right: 20px;
  position: fixed;

  @media screen and (max-width: 992px) {
    display: none;
  }
`;

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleVisibility);
    return () => window.removeEventListener("scroll", handleVisibility);
  });

  function handleVisibility() {
    if (window.pageYOffset > 3000) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div>{isVisible && <ToTopButton onClick={scrollToTop}>↑</ToTopButton>}</div>
  );
}

export default ScrollToTopButton;
