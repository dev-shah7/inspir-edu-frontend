import React from 'react';
import useModuleStore from '../../../../admin/store/useModuleStore';
import NextPrevActions from '../../../../components/common/NextPrevActions/NextPrevActions';
import ModuleSidebar from '../ModuleSidebar/ModuleSidebar';
import PdfViewer from '../../../../components/common/PDFViewer/PDFViewer';

const ModulePdf = () => {
  const { currentModule } = useModuleStore();

  const handleDownload = () => {
    const filename = fileUrl.split('/').pop();
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col items-center w-full p-2 sm:p-4 md:p-8">
      <div className="w-full max-w-6xl relative">
        <div className="mb-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleDownload}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center justify-center"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download PDF
            </button>
          </div>
          <NextPrevActions />
        </div>

        <div className='my-5'>
          <ModuleSidebar
            isLiveClass={true}
            liveClassDates="17 Nov - 23 Nov 2024"
            description={currentModule?.data?.description}
          />
        </div>
        <div className="h-[50vh] md:h-[70vh] lg:h-[750px] w-full">
          <PdfViewer fileUrl={currentModule?.data?.url} />
        </div>
      </div>
    </div>
  );
};

export default ModulePdf;
