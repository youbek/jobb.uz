import React, { Component, ErrorInfo } from "react";
import { Container } from "components";

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
        <Container className="text-center mt-4">
          <h3>Something Went Wrong</h3>
          <a href="/">Return Home</a>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundry;
