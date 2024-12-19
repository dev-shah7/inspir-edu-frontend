import React, { useState } from "react";
import useModalStore from "../store/useModalStore";
import AddQuestionContent from "../Questions/AddQuestionContent";

const CreateModuleContent = ({ onCancel }) => {
  const { closeModal, queueModal } = useModalStore();

  const [selectedType, setSelectedType] = useState(null);
  const [mediaInputType, setMediaInputType] = useState("upload");
  const [selectedFile, setSelectedFile] = useState(null);
  const [mediaUrl, setMediaUrl] = useState("");

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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = {
      moduleType: selectedType,
      mediaInputType,
      file: selectedFile,
      mediaUrl,
      moduleName: e.target.moduleName.value,
      description: e.target.description.value,
    };
    console.log("Form Data:", formData);
    queueModal("Add Question", <AddQuestionContent />);
    closeModal();
  };

  return (
    <div className="my-2">
      <form onSubmit={handleFormSubmit} className="space-y-6 px-16">
        <h2 className="text-md text-center font-light text-[#0F172A]">
          Select Module Type
        </h2>

        <div>
          <div className="flex justify-center space-x-6">
            <button
              type="button"
              onClick={() => handleTypeSelect("Document")}
              className={`p-4 w-40 h-40 flex flex-col items-center justify-center border rounded-lg ${
                selectedType === "Document"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 bg-gray-100 opacity-50"
              } hover:shadow-md transition`}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/337/337946.png"
                alt="Document"
                className="w-12"
              />
              <p className="text-sm mt-2">Document</p>
            </button>

            <button
              type="button"
              onClick={() => handleTypeSelect("Image")}
              className={`p-4 w-40 h-40 flex flex-col items-center justify-center border rounded-lg ${
                selectedType === "Image"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 bg-gray-100 opacity-50"
              } hover:shadow-md transition`}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/1000/1000917.png"
                alt="Image"
                className="w-12"
              />
              <p className="text-sm mt-2">Image</p>
            </button>

            <button
              type="button"
              onClick={() => handleTypeSelect("Video")}
              className={`p-4 w-40 h-40 flex flex-col items-center justify-center border rounded-lg ${
                selectedType === "Video"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 bg-gray-100 opacity-50"
              } hover:shadow-md transition`}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png"
                alt="Video"
                className="w-12"
              />
              <p className="text-sm mt-2">Video</p>
            </button>
          </div>
        </div>

        {(selectedType === "Document" ||
          selectedType === "Image" ||
          selectedType === "Video") && (
          <div>
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
                  className="w-full p-2 border rounded-md focus:outline-none"
                />
                {selectedFile && (
                  <div className="mt-4">
                    {selectedType === "Image" ? (
                      <img
                        src={URL.createObjectURL(selectedFile)}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-md mx-auto"
                      />
                    ) : (
                      <p className="text-sm text-gray-600">
                        Selected File: {selectedFile.name}
                      </p>
                    )}
                  </div>
                )}
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
                {mediaUrl && selectedType === "Image" && (
                  <div className="mt-4">
                    <img
                      src={mediaUrl}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-md mx-auto"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <div>
          <label className="block mb-2 text-sm font-medium text-[#0F172A]">
            Module name
          </label>
          <input
            type="text"
            name="moduleName"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter module name"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-[#0F172A]">
            Description
          </label>
          <textarea
            name="description"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="4"
            placeholder="Enter description"
            required
          ></textarea>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            type="submit"
            className="px-6 py-2 bg-[#1A73E8] text-white font-medium rounded-md hover:bg-[#1E40AF] transition"
          >
            Create Module
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 bg-[#C6433D] text-white font-medium rounded-md hover:bg-[#B91C1C] transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateModuleContent;
