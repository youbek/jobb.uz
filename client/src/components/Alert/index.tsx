import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 4rem;
  font-weight: 500;
  text-align: center;
  margin-top: 2rem;
  background-color: #f0f0f0;
  color: #707070;
  border-radius: 10px;
`;

interface Props extends React.ComponentProps<"div"> {}

function Alert(props: Props) {
  const { children } = props;

  return <Container>{children}</Container>;
}

export default Alert;
