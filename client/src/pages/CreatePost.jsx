import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function CreatePost() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!image && !imageUrl.trim()) {
      setError("Upload an image or provide an image URL");
      return;
    }

    if (image && imageUrl.trim()) {
      setError("Use either file upload OR image URL");
      return;
    }

    const formData = new FormData();
    if (image) formData.append("image", image);
    if (imageUrl) formData.append("imageUrl", imageUrl);
    formData.append("caption", caption);

    try {
      await api.post("/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/profile");
    } catch (err) {
      setError("Failed to create post");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white mt-20 p-6 border rounded w-[350px] space-y-4">
        <h2 className="text-lg font-semibold text-center">Create Post</h2>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full text-sm"
        />

        <p className="text-center text-xs text-gray-400">OR</p>

        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full border px-3 py-2 text-sm"
        />

        <textarea
          placeholder="Write a caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="w-full border px-3 py-2 text-sm"
          rows="3"
        />

        <button className="w-full bg-blue-500 text-white py-2 rounded">
          Share
        </button>
      </form>
    </div>
  );
}
