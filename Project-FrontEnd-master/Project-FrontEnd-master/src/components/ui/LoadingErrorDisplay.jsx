/**
 * LoadingErrorDisplay Component
 * 
 * This reusable component handles displaying the loading state, error messages, 
 * or renders child content when data is loaded successfully.
 * 
 * @param {boolean} loading - If true, displays the loading message.
 * @param {string} error - If an error occurs, displays the error message.
 * @param {ReactNode} children - The content to display if no error and not loading.
 */
const LoadingErrorDisplay = ({ loading, error, children }) => {
  if (loading) {
    return (
      <div className="text-center text-gray-500">
        {/* Display loading message */}
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        {/* Display error message */}
        <p>Error: {error}</p>
      </div>
    );
  }

  // If neither loading nor error, render children components
  return <>{children}</>;
};

export default LoadingErrorDisplay;
