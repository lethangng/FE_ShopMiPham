// UploadForm.tsx
import React, { useEffect, useState } from "react";
import "../UploadForm/UploadForm.css";

interface UploadFormProps {
  handleSelectImg: (imgs: any) => void;
  listPhoto: File[];
}

const UploadForm: React.FC<UploadFormProps> = ({
  handleSelectImg,
  listPhoto,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  // const memoizedHandleSelectImg = useCallback(handleSelectImg, []);
  useEffect(() => {
    handleSelectImg(selectedFiles);
  }, [previewImages]);
  console.log(">>> check:", previewImages);
  console.log(">>> check file:", selectedFiles);

  useEffect(() => {
    if (listPhoto && listPhoto.length > 0) {
      setSelectedFiles((prevSelectedFiles) => {
        const newFiles = listPhoto.filter(
          (photo) => !prevSelectedFiles.find((file) => file.name === photo.name)
        );
        return prevSelectedFiles.concat(newFiles);
      });
    }
  }, [listPhoto]);
  console.log(">>> check list: ", listPhoto);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // Thêm các hình ảnh mới vào mảng selectedFiles
      setSelectedFiles((prevSelectedFiles) => {
        const newSelectedFiles = prevSelectedFiles
          ? [...prevSelectedFiles]
          : [];
        for (let i = 0; i < files.length; i++) {
          newSelectedFiles.push(files[i]);
        }
        return newSelectedFiles;
      });

      // Tạo các URL của hình ảnh mới để hiển thị trước
      const fileURLs: string[] = [];
      for (let i = 0; i < files.length; i++) {
        fileURLs.push(URL.createObjectURL(files[i]));
      }
      // Kết hợp với các URL của hình ảnh đã chọn trước đó
      setPreviewImages((prevPreviewImages) => [
        ...prevPreviewImages,
        ...fileURLs,
      ]);
    }
  };

  const handleRemoveImage = (index: number) => {
    // Xóa hình ảnh khỏi mảng selectedFiles và previewImages
    setSelectedFiles((prevSelectedFiles) => {
      const newSelectedFiles = prevSelectedFiles ? [...prevSelectedFiles] : [];
      newSelectedFiles.splice(index, 1);
      return newSelectedFiles;
    });

    setPreviewImages((prevPreviewImages) => {
      const newPreviewImages = [...prevPreviewImages];
      newPreviewImages.splice(index, 1);
      return newPreviewImages;
    });
  };

  return (
    <>
      <div className="form-group">
        <input
          type="file"
          id="image-upload"
          className="form-control-file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      {selectedFiles && (
        <div className="row">
          {Array.from(selectedFiles).map((file, index) => (
            <div className="col-md-3" key={index}>
              <div className="image-preview">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Image ${index + 1}`}
                  className="img-fluid"
                />
                <button
                  type="button"
                  className="close"
                  aria-label="Remove"
                  onClick={() => handleRemoveImage(index)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default UploadForm;
