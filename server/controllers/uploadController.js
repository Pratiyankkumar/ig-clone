const supabase = require("../config/supabase");

const uploadImage = async (file, fileType) => {
  try {
    if (!file) {
      throw new Error("No file provided");
    }

    const fileName = `${Date.now()}-${file.originalname}`; // Add timestamp to prevent naming conflicts

    // Upload file to Supabase
    const { data, error } = await supabase.storage
      .from(`profile-pics/${fileType}`)
      .upload(fileName, file.buffer);

    if (error) {
      throw new Error(error.message);
    }

    // Get the public URL - corrected method
    const {
      data: { publicUrl },
    } = supabase.storage
      .from(`profile-pics/${fileType}`)
      .getPublicUrl(fileName);

    // Log the URL to check if it's correct
    console.log("Uploaded image URL:", publicUrl);

    // Return the public URL
    return publicUrl;
  } catch (err) {
    console.error("Upload Error:", err.message);
    throw new Error("Failed to upload image.");
  }
};

const uploadStory = async (file, fileType) => {
  try {
    if (!file) {
      throw new Error("No file provided");
    }

    const fileName = `${Date.now()}-${file.originalname}`; // Add timestamp to prevent naming conflicts

    // Upload file to Supabase
    const { data, error } = await supabase.storage
      .from(`profile-pics/${fileType}`)
      .upload(fileName, file.buffer);

    if (error) {
      throw new Error(error.message);
    }

    // Get the public URL - corrected method
    const {
      data: { publicUrl },
    } = supabase.storage
      .from(`profile-pics/${fileType}`)
      .getPublicUrl(fileName);

    // Log the URL to check if it's correct
    console.log("Uploaded image URL:", publicUrl);

    // Return the public URL
    return publicUrl;
  } catch (err) {
    console.error("Upload Error:", err.message);
    throw new Error("Failed to upload image.");
  }
};

module.exports = { uploadImage, uploadStory };
