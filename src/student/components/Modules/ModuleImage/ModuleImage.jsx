import React from 'react';
import { useNavigate } from "react-router-dom";
import useModuleStore from "../../../../admin/store/useModuleStore";
import ModuleHeading from "../ModuleHeading/ModuleHeading";
import NextPrevActions from "../../../../components/common/NextPrevActions/NextPrevActions";
import ImageViewer from "../../../../components/common/ImageViewer/ImageViewer";
import ModuleSidebar from '../ModuleSidebar/ModuleSidebar';

const ModuleImage = ({ courseId }) => {
  const { currentModule } = useModuleStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F8FF] to-white p-6">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 space-y-4 md:space-y-0">
        {/* <ModuleHeading title={currentModule?.data?.name || "Module Title"} /> */}
        {/* <NextPrevActions /> */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ImageViewer
            imageUrl={currentModule?.data?.url}
            altText="Course thumbnail"
          />
        </div>

        <ModuleSidebar
          isLiveClass={true}
          liveClassDates="17 Nov - 23 Nov 2024"
          description={currentModule?.data?.description}
          courseId={courseId}
        />
      </div>
    </div>
  );
};

export default ModuleImage;
