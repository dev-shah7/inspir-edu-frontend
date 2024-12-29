const NextPrevActions = () => {
  return (
    <div className="flex items-center space-x-6 font-sans">
      <button className="text-blue-900 hover:text-blue-950 text-sm font-normal flex items-center gap-2">
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path d="M15 19l-7-7 7-7" />
        </svg>
        Previous
      </button>
      <button className="text-blue-900 hover:text-blue-950 text-sm font-normal flex items-center gap-2">
        Next
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default NextPrevActions;
