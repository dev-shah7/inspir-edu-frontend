const PdfViewer = ({ fileUrl }) => {
  return (
    <div className='w-full max-w-[1300px] mx-auto overflow-hidden'>
      <object
        className='w-full h-[300px] sm:h-[400px] md:h-[600px] lg:h-[800px]'
        data={fileUrl}
        type='application/pdf'
      ></object>
    </div>
  );
};

export default PdfViewer;