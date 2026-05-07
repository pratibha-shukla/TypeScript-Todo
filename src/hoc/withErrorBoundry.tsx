

import React from 'react';
import ErrorBoundary from '../components/ErrorBoundry';

export function withErrorBoundary<T extends object>(Component: React.ComponentType<T>) {
  return (props: T) => (
    <ErrorBoundary>
      <Component {...props} />
    </ErrorBoundary>
  );
}
