import { searchPost } from "@/services/apiService";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";

const Found = () => {
  const navigate = useNavigate();
  const imgRef = useRef();

  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);

  const [input, setInput] = useState({
    title: "",
    content: "",
  });

  const [location, setLocation] = useState({
    lat: null,
    lng: null,
  });

  // Handle text input
  const eventhandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImage(URL.createObjectURL(selectedFile));
    }
  };

  // Get user location
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setLocation({
          lat: latitude,
          lng: longitude,
        });

        toast.success("Location fetched!");
      },
      (error) => {
        toast.error("Permission denied or error");
        console.log(error);
      }
    );
  };

  // Submit form
  const searchFormHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", input.title);
    formData.append("content", input.content);
    formData.append("status", "FOUND");

    if (file) formData.append("image", file);
    if (location.lat) {
      formData.append("latitude", location.lat);
      formData.append("longitude", location.lng);
    }

    try {
      const res = await searchPost(formData);
      if (res.data.success) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="bg-[#151e32] min-h-screen w-screen text-slate-300 flex items-center justify-center">
      <div className="bg-[#0c101a] w-[35%] rounded-2xl flex flex-col justify-center items-center gap-6 p-6">
        
        <h1 className="text-3xl font-bold text-slate-500">LOGO</h1>

        <form onSubmit={searchFormHandler} className="w-full flex flex-col gap-4">

          {/* Title */}
          <input
            className="h-12 px-3 rounded bg-[#1f2937] outline-none"
            type="text"
            value={input.title}
            name="title"
            onChange={eventhandler}
            placeholder="Enter the title"
          />

          {/* Description */}
          <textarea
            name="content"
            value={input.content}
            onChange={eventhandler}
            className="h-28 px-3 py-2 rounded bg-[#1f2937] outline-none"
            placeholder="Enter the description"
          ></textarea>

          {/* Hidden file input */}
          <input
            type="file"
            className="hidden"
            ref={imgRef}
            onChange={handleImageChange}
          />

          {/* Upload / Preview */}
          {!image ? (
            <button
              type="button"
              onClick={() => imgRef.current.click()}
              className="bg-blue-600 hover:bg-blue-700 py-2 rounded"
            >
              Upload Image
            </button>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <img
                src={image}
                alt="preview"
                className="h-40 w-full object-cover rounded"
              />
              <button
                type="button"
                onClick={() => imgRef.current.click()}
                className="text-sm text-blue-400"
              >
                Change Image
              </button>
            </div>
          )}

          {/* Get Location Button */}
          <button
            type="button"
            onClick={handleGetLocation}
            className="bg-purple-600 hover:bg-purple-700 py-2 rounded"
          >
            Get Location
          </button>

          {/* Show Location */}
          {location.lat && (
            <p className="text-sm text-green-400 text-center">
              📍 {location.lat}, {location.lng}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={!image || !location.lat}
            className="bg-green-600 hover:bg-green-700 py-2 rounded disabled:opacity-50"
          >
            Submit
          </button>

        </form>
      </div>
    </div>
  );
};

export default Found;