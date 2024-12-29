import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import Loader from '../Loader/Loader';
import useModuleStore from '../../../admin/store/useModuleStore';

const PdfViewer = ({ fileUrl }) => {
  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
      <Viewer
        fileUrl={fileUrl}
        defaultScale={1}
        renderLoader={(percentages) => (
          <div className="flex items-center justify-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="ml-2 text-gray-600">Loading PDF...</span>
          </div>
        )}
      />
    </Worker>
  );
};

export default PdfViewer;
