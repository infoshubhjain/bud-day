/**
 * Error boundary component
 * Catches React errors and displays user-friendly message
 * No technical jargon, plain language only
 */

import { Component, ReactNode } from "react";
import "./ErrorBoundary.css";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // In production, log to error reporting service
    console.error("Error caught by boundary:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-boundary-content">
            <h1 className="error-boundary-title">Something went wrong</h1>
            <p className="error-boundary-text">
              We encountered an unexpected problem. Please try refreshing the page.
            </p>
            <button className="btn-primary" onClick={this.handleReload}>
              Refresh page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
