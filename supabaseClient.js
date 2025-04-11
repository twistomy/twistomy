// src/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Function to upload an image
export const uploadImage = async (file, filePath, bucketId) => {
  const { data, error } = await supabase.storage
    .from(bucketId)
    .upload(filePath, file);
  if (error) throw new Error("Error uploading image:", error);
  return data?.path; // Unique identifier for the uploaded image
};

// Function to delete an image
export const deleteImage = async (imagePath, bucketId) => {
  const { data, error } = await supabase.storage
    .from(bucketId)
    .remove([imagePath]);
  if (error) throw new Error("Error deleting image:", error);
  return data; // Success response from Supabase
};

// Function to get image URL
export const getImageUrl = async (imagePath, bucketId) => {
  const { signedURL, error } = await supabase.storage
    .from(bucketId)
    .createSignedUrl(imagePath, 60);
  if (error) throw new Error("Error getting image URL:", error);
  return signedURL;
};

// Function to get all images
export const getAllImages = async (bucketId) => {
  const { data, error } = await supabase.storage.from(bucketId).list();
  if (error) throw new Error("Error getting all images:", error);
  return data; // List of images in the bucket
};
