import React, { Component, ErrorInfo } from "react";
import styled from "styled-components";
import { Container } from "components";

const StyledContainer = styled(Container)`
  text-align: center;
  margin-top: 1.5rem;
`;

interface Props extends React.ComponentClass {}

interface State {
  hasError: boolean;
}

class ErrorBoundry extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <StyledContainer>
          <h3>Something Went Wrong</h3>
          <a href="/">Return Home</a>
        </StyledContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundry;
