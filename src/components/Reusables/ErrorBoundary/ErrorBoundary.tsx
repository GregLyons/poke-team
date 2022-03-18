// From Shahmir Jadoon's answer at https://stackoverflow.com/questions/63916900/how-to-properly-type-a-react-errorboundary-class-component-in-typescript

import { Component, ErrorInfo, ReactNode } from "react";
import './ErrorBoundary.css';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("error: " + error);
    console.log("errorInfo: " + JSON.stringify(errorInfo));
    console.log("componentStack: " + errorInfo.componentStack);
  }

  public render() {
    if (this.state.hasError) {
      return <p className="error-boundary" title="An unexpected error occurred. Please check the console for diagnosis.">Error!</p>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;