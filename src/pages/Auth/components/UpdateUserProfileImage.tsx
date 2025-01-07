import React from "react";

interface UploadProps {
  onFileUpload: (file: File) => void;
}

const UpdateUserProfileImage: React.FC<UploadProps> = ({ onFileUpload }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        id="profileImg"
        accept="image/png, image/jpeg, image/jpg"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default UpdateUserProfileImage;
