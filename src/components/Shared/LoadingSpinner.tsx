const LoadingSpinner = () => {
    return (
      <div className="flex justify-center items-center h-screen"> {/* Center the spinner */}
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-300"></div>
      </div>
    );
  };
  
  export default LoadingSpinner;