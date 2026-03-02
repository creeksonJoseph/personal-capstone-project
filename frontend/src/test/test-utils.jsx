import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from '../context/ToastContext';

/**
 * Custom render function that wraps components with necessary providers
 * @param {React.ReactElement} ui - Component to render
 * @param {Object} options - Render options
 * @returns {Object} - Render result with all utilities
 */
export function renderWithProviders(ui, options = {}) {
  const Wrapper = ({ children }) => (
    <BrowserRouter>
      <ToastProvider>
        {children}
      </ToastProvider>
    </BrowserRouter>
  );

  return render(ui, { wrapper: Wrapper, ...options });
}

/**
 * Create mock axios response
 * @param {*} data - Response data
 * @param {number} status - HTTP status code
 * @returns {Object} - Mock axios response
 */
export function createMockResponse(data, status = 200) {
  return {
    data,
    status,
    statusText: 'OK',
    headers: {},
    config: {},
  };
}

/**
 * Create mock axios error
 * @param {string} message - Error message
 * @param {number} status - HTTP status code
 * @returns {Error} - Mock axios error
 */
export function createMockError(message, status = 500) {
  const error = new Error(message);
  error.response = {
    data: { message },
    status,
    statusText: 'Error',
  };
  return error;
}

// Re-export everything from @testing-library/react
export * from '@testing-library/react';
