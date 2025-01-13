import React from 'react';
import VideoPlayer from '../../components/common/VideoPlayer/VideoPlayer';
import PdfViewer from '../../components/common/PDFViewer/PDFViewer';
import ImageViewer from '../../components/common/ImageViewer/ImageViewer';
import useModuleStore from '../../admin/store/useModuleStore';
import playVideoPoster from "../../assets/play-thumbnail.jpg";

const CurrentModuleMedia = () => {
    const { currentModule } = useModuleStore();
    const moduleType = currentModule?.data?.type || 1;
    
  return <div>
      {moduleType === 1 && <VideoPlayer videoUrl={currentModule?.data?.url}
        posterUrl={playVideoPoster}/>}
      {moduleType === 2 && <PdfViewer fileUrl={currentModule?.data?.url} />}
      {moduleType === 3 && <ImageViewer imageUrl={currentModule.data.url}
        altText={currentModule.data.name || 'Course image'}/>}
  </div>;
};

export default CurrentModuleMedia;
