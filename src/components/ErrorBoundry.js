import React, { Component } from "react";
import { Container } from "reactstrap";

class ErrorBoundry extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
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
