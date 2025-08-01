import type { ReactNode, ErrorInfo } from 'react';
import { Component } from 'react';
import Alert from './Alert';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <Alert type="error" title="Something went wrong">
              <p className="mb-4">
                The application encountered an unexpected error. Please try refreshing the page.
              </p>
              {this.state.error && (
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium mb-2">
                    Technical Details
                  </summary>
                  <pre className="text-xs bg-red-100 dark:bg-red-900/20 p-2 rounded border overflow-auto">
                    {this.state.error.message}
                    {this.state.error.stack && (
                      <>
                        {'\n\n'}
                        {this.state.error.stack}
                      </>
                    )}
                  </pre>
                </details>
              )}
              <div className="mt-4 flex space-x-3">
                <button
                  onClick={() => window.location.reload()}
                  className="btn-primary"
                >
                  Refresh Page
                </button>
                <button
                  onClick={() => this.setState({ hasError: false, error: undefined })}
                  className="btn-secondary"
                >
                  Try Again
                </button>
              </div>
            </Alert>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 