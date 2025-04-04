import React from 'react';
import useModuleStore from "../../../../admin/store/useModuleStore";
import ModuleHeading from '../ModuleHeading/ModuleHeading';
import NextPrevActions from '../../../../components/common/NextPrevActions/NextPrevActions';
import DownloadActions from '../../../../components/common/DownloadActions/DownloadActions';
import playVideoPoster from "../../../../assets/play-thumbnail.jpg";
import ModuleSidebar from '../ModuleSidebar/ModuleSidebar';
import VideoPlayer from '../../../../components/common/VideoPlayer/VideoPlayer';

const ModuleVideo = ({ courseId }) => {
  const { currentModule } = useModuleStore();

  const fallbackVideoUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F8FF] to-white p-6">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        {/* <ModuleHeading title={currentModule?.data?.name || "Module Title"} /> */}
        {/* <NextPrevActions /> */}
        <ModuleSidebar
          isLiveClass={true}
          liveClassDates="17 Nov - 23 Nov 2024"
          description={currentModule?.data?.description}
          courseId={courseId}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <VideoPlayer
            videoUrl={currentModule?.data?.url || fallbackVideoUrl}
            posterUrl={playVideoPoster}
          />
          {/* <DownloadActions /> */}
        </div>
      </div>
    </div>
  );
};

export default ModuleVideo;
