import { Component } from "react";
import { Link } from "react-router-dom";
class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    // this function updates the new state after catching an error
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    //life cycle method
    // typically we would log this to trackJS or NewRelic
    console.error("ErrorBoundary component caught an error", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <h2>
          {/* if we want to make our error boundary more reusabble, we can create a prop, and then pass in the messages to that prop */}
          {/* here, we couldve created the prop named errorMessage as:
          return this.props.errorMessage */}
          There was an error with this listing. <Link to="/">Click here</Link>{" "}
          to go back to the home page
        </h2>
      );
    }
    // Now anything that is a child of this component will have errors caught here. Think of this like a catch block from try/catch.
    return this.props.children;
    // if there is  no error, we want this to pass through seamlessly, as we want to render details with no interference
  }
}
// ErrorBoundary.getDerivedStateFromError();
// we call the static method directly inside the class itself, and not necessarily on any instancce of the class
export default ErrorBoundary;
