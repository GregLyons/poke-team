// From Shahmir Jadoon's answer at https://stackoverflow.com/questions/63916900/how-to-properly-type-a-react-errorboundary-class-component-in-typescript

import { Component, ErrorInfo, ReactNode } from "react";
import Popup from "../Popup/Popup";
import './ErrorBoundary.css';

interface Props {
  children: ReactNode
  orientation: 'left' | 'right' | 'top' | 'bottom'
  nudge?: 'left' | 'right' | 'top' | 'bottom'
}

interface State {
  error: Error | undefined
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    error: undefined,
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { error, hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("error: " + error);
    console.log("errorInfo: " + JSON.stringify(errorInfo));
    console.log("componentStack: " + errorInfo.componentStack);
  }

  public render() {
    if (this.state.hasError && this.state.error) {
      const message = this.state.error.message;
      const messageID = message.slice(0, 20);

      return (<>
        <label htmlFor={messageID} className="hidden-label">An error occured; click for error message</label>
        <Popup
          triggerID={messageID}
          trigger={<p className="error-boundary__trigger" title="An unexpected error occurred.">Error!</p>}
          content={<div
            className="error-boundary__message-wrapper"
          >
            <p className="error-boundary__message">{message}</p>
          </div>}
          orientation={this.props.orientation}
          nudge={this.props.nudge}
        />
      </>);
    }

    // If no children, return nothing
    return this.props.children ? this.props.children : null;
  }
}

export default ErrorBoundary;