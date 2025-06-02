import React from "react";
import VideoPlayer from "../../components/common/VideoPlayer/VideoPlayer";
import PdfViewer from "../../components/common/PDFViewer/PDFViewer";
import ImageViewer from "../../components/common/ImageViewer/ImageViewer";
import useModuleStore from "../../admin/store/useModuleStore";
import playVideoPoster from "../../assets/play-thumbnail.jpg";

const CurrentModuleMedia = ({
  isWatched,
  setIsWatched,
  onDuration,
  onVideoEnd,
}) => {
  const { currentModule, lastPlayPosition, userModuleId, isFullVideoWatched } =
    useModuleStore();
  const moduleType = currentModule?.data?.type || 2;

  console.log(currentModule, "currentModule, ", moduleType);
  return (
    <div className="mx-5">
      {moduleType === 1 && (
        <VideoPlayer
          videoUrl={currentModule?.data?.url}
          lastPlayPosition={Number(lastPlayPosition) || 0}
          posterUrl={playVideoPoster}
          isWatched={isWatched}
          setIsWatched={setIsWatched}
          onDuration={onDuration}
          moduleId={userModuleId}
          onVideoEnd={onVideoEnd}
          isFullVideoWatched={isFullVideoWatched}
        />
      )}
      {moduleType === 2 && <PdfViewer fileUrl={currentModule?.data?.url} />}
      {moduleType === 3 && (
        <ImageViewer
          imageUrl={currentModule.data.url}
          altText={currentModule.data.name || "Course image"}
        />
      )}
    </div>
  );
};

export default CurrentModuleMedia;
