const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4 text-center">
        404 - Page Not Found
      </h1>
      <p className="text-lg text-gray-600 max-w-md text-left mb-8">
        Sorry, the page you are looking for doesn't exist or has been moved.
      </p>
    </div>
  );
};

export default NotFound;
