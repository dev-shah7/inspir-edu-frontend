const ImageViewer = ({ imageUrl, altText }) => {
  return (
    <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
      <img
        src={imageUrl}
        alt={altText}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default ImageViewer;
