import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useModalStore from "../store/useModalStore";
import useModuleStore from "../store/useModuleStore";
import useCourseStore from "../store/useCourseStore";
import { toast } from "react-hot-toast";
import InputField from "../../components/common/InputField/InputField";
import AddQuestionContent from "../testQuestions/AddQuestionContent";

// Dummy data structure (replace with your actual data source)
export const dummyModules = [
  {
    id: 1,
    moduleType: "Document",
    mediaInputType: "upload",
    mediaUrl: "",
    moduleName: "Introduction to React",
    description: "Learn the basics of React",
  },
  {
    id: 2,
    moduleType: "Video",
    mediaInputType: "url",
    mediaUrl: "https://example.com/video",
    moduleName: "Advanced React Concepts",
    description: "Deep dive into React hooks",
  },
];

const MediaPreview = ({ type, file, url }) => {
  if (!file && !url) return null;

  if (type === "Image") {
    return (
      <div className="mt-4">
        <img
          src={file ? URL.createObjectURL(file) : url}
          alt="Preview"
          className="w-48 h-48 object-cover rounded-md mx-auto"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "path/to/fallback-image.png"; // Add your fallback image
          }}
        />
      </div>
    );
  }

  if (type === "Video") {
    return (
      <div className="mt-4">
        {file ? (
          <video
            className="w-full max-w-lg mx-auto rounded-md"
            controls
            src={URL.createObjectURL(file)}
          >
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="aspect-video w-full max-w-lg mx-auto">
            {url?.includes("youtube") ? (
              <iframe
                className="w-full h-full rounded-md"
                src={getYouTubeEmbedUrl(url)}
                title="Video preview"
                allowFullScreen
              />
            ) : (
              <video className="w-full rounded-md" controls src={url}>
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="mt-4">
      <p className="text-sm text-gray-600">
        Selected File: {file?.name || url}
      </p>
    </div>
  );
};

const getYouTubeEmbedUrl = (url) => {
  if (!url) return "";

  // Handle different YouTube URL formats
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);

  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}`;
  }

  return url;
};

const CreateModuleContent = ({ mode = "add", moduleId }) => {
  const { closeModal, queueModal } = useModalStore();
  const {
    saveModule,
    fetchModuleById,
    uploadFile,
    fetchModulesByCourse,
    isFetchingModule,
  } = useModuleStore();
  const { currentCourse } = useCourseStore();
  const { courseId: courseIdFromParams } = useParams();

  const courseId = currentCourse || courseIdFromParams;

  console.log("Current Course:", currentCourse);
  console.log("Course ID from params:", courseIdFromParams);

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(mode === "edit");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedType, setSelectedType] = useState("Image");
  const [mediaInputType, setMediaInputType] = useState("upload");
  const [selectedFile, setSelectedFile] = useState(null);
  const [mediaUrl, setMediaUrl] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    url: "",
    position: 0,
    releaseDate: new Date().toISOString(),
  });

  // Add state to track if we want to replace existing media
  const [replaceMedia, setReplaceMedia] = useState(false);

  // Determine media type from URL
  const getMediaTypeFromUrl = (url) => {
    if (!url) return null;

    // Check for video file extensions including .mov
    if (url.match(/\.(mp4|webm|ogg|mov)$/i)) return "Video";

    // Check for image file extensions
    if (url.match(/\.(jpg|jpeg|png|gif|webp)$/i)) return "Image";

    // Check for document file extensions
    if (url.match(/\.(pdf|doc|docx|txt)$/i)) return "Document";

    // Check for YouTube videos
    if (url.includes("youtube.com") || url.includes("youtu.be")) return "Video";

    // For Azure blob storage URLs, check the content by filename
    if (url.includes("blob.core.windows.net")) {
      const filename = url.split("/").pop(); // Get the filename from URL
      if (filename.match(/\.(mp4|webm|ogg|mov)$/i)) return "Video";
      if (filename.match(/\.(jpg|jpeg|png|gif|webp)$/i)) return "Image";
      if (filename.match(/\.(pdf|doc|docx|txt)$/i)) return "Document";
    }

    // If no matches found, try to determine from the filename
    const filename = url.split("/").pop();
    if (filename.match(/\.(mp4|webm|ogg|mov)$/i)) return "Video";
    if (filename.match(/\.(jpg|jpeg|png|gif|webp)$/i)) return "Image";

    // Default case
    return "Document";
  };

  // Update form data when editing
  useEffect(() => {
    if (mode === "edit" && moduleId) {
      const loadModule = async () => {
        try {
          const moduleData = await fetchModuleById(moduleId);

          // Set the media type based on the URL
          if (moduleData.url) {
            const mediaType = getMediaTypeFromUrl(moduleData.url);
            setSelectedType(mediaType);
            setMediaInputType("url");
            setMediaUrl(moduleData.url);
          }

          setFormData({
            name: moduleData.name,
            description: moduleData.description,
            url: moduleData.url,
            position: moduleData.position,
            releaseDate: moduleData.releaseDate,
          });
        } catch (error) {
          console.error("Error loading module:", error);
          toast.error("Failed to load module data");
        }
      };
      loadModule();
    }
  }, [mode, moduleId, fetchModuleById]);

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setMediaInputType("upload");
    setSelectedFile(null);
    setMediaUrl("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Modify the media section to show current media and replacement option
  const renderMediaSection = () => {
    // Show type selection even in edit mode
    return (
      <div>
        {/* Type Selection Buttons - Now available in edit mode too */}
        <div className="mb-6">
          <div className="flex justify-center space-x-6">
            {["Document", "Image", "Video"].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => {
                  setSelectedType(type);
                  // Reset media state when changing type
                  setMediaInputType("upload");
                  setSelectedFile(null);
                  setMediaUrl("");
                  if (mode === "edit") {
                    setReplaceMedia(true);
                  }
                }}
                className={`p-4 w-40 h-40 flex flex-col items-center justify-center border rounded-lg ${
                  selectedType === type
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 bg-gray-100 opacity-50"
                } hover:shadow-md transition`}
              >
                <img
                  src={`https://cdn-icons-png.flaticon.com/512/${
                    type === "Document"
                      ? "337/337946"
                      : type === "Image"
                      ? "1000/1000917"
                      : "1384/1384060"
                  }.png`}
                  alt={type}
                  className="w-12"
                />
                <p className="text-sm mt-2">{type}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Show current media if not replacing */}
        {mode === "edit" && formData.url && !replaceMedia && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-md font-medium">
                Current Media ({selectedType})
              </h3>
              <button
                type="button"
                onClick={() => setReplaceMedia(true)}
                className="text-blue-600 hover:text-blue-800"
              >
                Replace Media
              </button>
            </div>
            <MediaPreview type={selectedType} url={formData.url} />
          </div>
        )}

        {/* Show upload/URL options when adding new or replacing */}
        {(mode === "add" || replaceMedia) && (
          <>
            <div className="flex justify-center space-x-4 mb-4">
              <button
                type="button"
                onClick={() => setMediaInputType("upload")}
                className={`px-4 py-2 border rounded-lg ${
                  mediaInputType === "upload"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-300 bg-gray-100 text-gray-700"
                } hover:shadow-md transition`}
              >
                Upload {selectedType}
              </button>
              <button
                type="button"
                onClick={() => setMediaInputType("url")}
                className={`px-4 py-2 border rounded-lg ${
                  mediaInputType === "url"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-300 bg-gray-100 text-gray-700"
                } hover:shadow-md transition`}
              >
                {selectedType} URL
              </button>
            </div>

            {mediaInputType === "upload" && (
              <div>
                <label className="block mb-2 text-sm font-medium text-[#0F172A]">
                  Select file
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept={
                    selectedType === "Image"
                      ? "image/*"
                      : selectedType === "Video"
                      ? "video/*"
                      : ".pdf,.doc,.docx,.txt"
                  }
                  className="w-full p-2 border rounded-md focus:outline-none"
                />
                <MediaPreview type={selectedType} file={selectedFile} />
              </div>
            )}

            {mediaInputType === "url" && (
              <div>
                <label className="block mb-2 text-sm font-medium text-[#0F172A]">
                  Enter {selectedType} URL
                </label>
                <input
                  type="text"
                  value={mediaUrl}
                  onChange={(e) => setMediaUrl(e.target.value)}
                  className="w-full p-2 border rounded-md focus:outline-none"
                  placeholder={`Enter ${selectedType} URL`}
                />
                <MediaPreview type={selectedType} url={mediaUrl} />
              </div>
            )}

            {mode === "edit" && (
              <button
                type="button"
                onClick={() => {
                  setReplaceMedia(false);
                  // Reset to original media type and URL
                  if (formData.url) {
                    const originalType = getMediaTypeFromUrl(formData.url);
                    setSelectedType(originalType);
                    setMediaUrl(formData.url);
                  }
                }}
                className="mt-4 text-blue-600 hover:text-blue-800"
              >
                Cancel Replacement
              </button>
            )}
          </>
        )}
      </div>
    );
  };

  // Update handleSubmit to handle media replacement
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let fileUrl = formData.url;

      if (replaceMedia || mode === "add") {
        if (selectedFile) {
          fileUrl = await uploadFile(selectedFile, selectedType, (progress) => {
            setUploadProgress(progress);
          });
        } else if (mediaInputType === "url" && mediaUrl) {
          fileUrl = mediaUrl;
        }
      }

      const moduleData = {
        id: mode === "edit" ? parseInt(moduleId) : 0,
        name: formData.name,
        description: formData.description,
        url: fileUrl,
        position: formData.position,
        releaseDate: formData.releaseDate,
        courseId: parseInt(courseId),
      };

      // Save module first
      await saveModule(moduleData);

      // Then refresh the list in the background
      fetchModulesByCourse(courseId).catch(console.error);

      toast.success(
        `Module ${mode === "edit" ? "updated" : "created"} successfully`
      );
      queueModal("Add More Questions", <AddQuestionContent />);
      closeModal();
    } catch (error) {
      toast.error(error.message || "Operation failed");
    } finally {
      setIsLoading(false);
    }
  };

  const getModuleTypeNumber = (type) => {
    switch (type) {
      case "Document":
        return 0;
      case "Image":
        return 1;
      case "Video":
        return 2;
      default:
        return 0;
    }
  };

  if (isFetchingModule) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="text-gray-600">Loading module data...</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="text-gray-600">
          {mode === "edit" ? "Updating module..." : "Creating module..."}
        </p>
        {uploadProgress > 0 && (
          <div className="w-64">
            <div className="bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Uploading: {uploadProgress}%
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="my-2">
      <form onSubmit={handleSubmit} className="space-y-6 px-16">
        <h2 className="text-md text-center font-light text-[#0F172A]">
          {mode === "edit" ? "Edit Module" : "Create New Module"}
        </h2>

        {/* Media Section */}
        {renderMediaSection()}

        {/* Module Name */}
        <div>
          <InputField
            label="Module name"
            value={formData.name}
            type="text"
            name="name"
            onChange={handleInputChange}
            placeholder="Enter module name"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 text-sm font-medium text-[#0F172A]">
            Description
          </label>
          <textarea
            value={formData.description}
            name="description"
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="4"
            placeholder="Enter description"
            required
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            type="button"
            onClick={() => closeModal()}
            className="px-6 py-2 bg-[#C6433D] text-white font-medium rounded-md hover:bg-[#B91C1C] transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-[#1A73E8] text-white font-medium rounded-md hover:bg-[#1E40AF] transition"
          >
            {mode === "edit" ? "Update Module" : "Create Module"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateModuleContent;
