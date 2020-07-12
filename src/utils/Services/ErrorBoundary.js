import React from "react";
import { GiBrokenPottery } from "react-icons/gi";
import { Button } from "../../Components/UI";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, netWorkError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log("error", error);
    console.log("info", errorInfo);
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="internet-error">
          <GiBrokenPottery size={100} style={{ alignSelf: "center" }} />
          <p>Something went wrong</p>
          <Button value="Go Back" onClick={() => window.history.back()} />
        </div>
      );
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
