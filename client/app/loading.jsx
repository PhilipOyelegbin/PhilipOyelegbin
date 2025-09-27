const loading = () => {
  return (
    <div className="flex justify-center item-center text-center h-screen p-20 relative bg-surface">
      <div
        className="animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-priamry rounded-full"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default loading;
