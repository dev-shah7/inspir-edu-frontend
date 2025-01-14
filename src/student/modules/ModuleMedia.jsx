import React, { useEffect } from 'react';
import ModuleVideo from '../components/Modules/ModuleVideo/ModuleVideo';
import ModulePdf from '../components/Modules/ModulePdf/ModulePdf';
import ModuleImage from '../components/Modules/ModuleImage/ModuleImage';
import useModuleStore from '../../admin/store/useModuleStore';
import { useParams } from 'react-router';
import Loader from '../../components/common/Loader/Loader';
import BackButton from '../../components/common/BackButton/BackButton';
const ModuleMedia = () => {
  const { moduleId, courseId } = useParams();
  const { fetchModuleById, isFetchingModule, currentModule } = useModuleStore();

  useEffect(() => {
    if (moduleId)
      fetchModuleById(moduleId);
  }, [fetchModuleById]);

  if (isFetchingModule) {
    return <Loader />;
  }

  const moduleType = currentModule?.data?.type || 1;
  return (
    <div>
      <BackButton />
      {moduleType === 1 && <ModuleVideo courseId={courseId} />}
      {moduleType === 2 && <ModulePdf courseId={courseId} />}
      {moduleType === 3 && <ModuleImage courseId={courseId} />}
    </div>
  );
};

export default ModuleMedia;
