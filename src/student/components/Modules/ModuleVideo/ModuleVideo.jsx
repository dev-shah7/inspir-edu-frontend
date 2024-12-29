import React from 'react';
import useModuleStore from "../../../../admin/store/useModuleStore";
import ModuleHeading from '../ModuleHeading/ModuleHeading';
import NextPrevActions from '../../../../components/common/NextPrevActions/NextPrevActions';
import VideoPlayer from '../../../../components/common/VideoPlayer/VideoPlayer';
import DownloadActions from '../../../../components/common/DownloadActions/DownloadActions';
import ModuleSidebar from '../ModuleSidebar/ModuleSidebar';
import playVideoPoster from "../../../../assets/play-thumbnail.jpg";

const ModuleVideo = () => {
  const { currentModule } = useModuleStore();

  const fallbackVideoUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

  console.log("current video:", currentModule.data)
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F8FF] to-white p-6">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <ModuleHeading title={currentModule?.data?.name || "Module Title"} />
        <NextPrevActions />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <VideoPlayer
            videoUrl={currentModule?.data?.url || fallbackVideoUrl}
            posterUrl={playVideoPoster}
          />
          <DownloadActions />
        </div>
        <ModuleSidebar
          isLiveClass={true}
          liveClassDates="17 Nov - 23 Nov 2024"
          description={currentModule?.data?.description}
        />
      </div>
    </div>
  );
};

export default ModuleVideo;
