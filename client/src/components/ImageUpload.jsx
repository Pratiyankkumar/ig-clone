/* eslint-disable no-unused-vars */
// client/src/components/ImageUpload.jsx

import { useState } from "react";
import supabase from "../config/supabase";

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [publicUrl, setPublicUrl] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file!");

    try {
      const { data, error } = await supabase.storage
        .from("profile-pics/profile-pics") // Bucket name
        .upload(`${file.name}`, file);

      if (error) {
        throw error;
      }

      const { data: urlData } = supabase.storage
        .from("profile-pics/profile-pics")
        .getPublicUrl(`${file.name}`);

      setPublicUrl(urlData.publicUrl);
      alert("Image uploaded successfully!");
    } catch (err) {
      console.error(err.message);
      alert("Failed to upload image.");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {publicUrl && (
        <div>
          <p>Image URL:</p>
          <a href={publicUrl} target="_blank" rel="noopener noreferrer">
            {publicUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
