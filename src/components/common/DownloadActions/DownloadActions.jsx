const DownloadActions = () => {
  return (
    <div className="mt-4 flex space-x-4">
      <button className="bg-[#F0F8FF] hover:bg-[#e1f1ff] text-gray-900 px-6 py-3 rounded-lg border-[0.3px] border-gray-200 shadow font-medium transition-colors duration-200">
        Download
      </button>
      <button className="bg-[#F0F8FF] hover:bg-[#e1f1ff] text-gray-900 px-6 py-3 rounded-lg border-[0.3px] border-gray-200 shadow font-medium transition-colors duration-200">
        Transcript
      </button>
    </div>
  );
};

export default DownloadActions;
