"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";

const HomePage = () => {
  const { register, handleSubmit, formState, reset } = useForm<FieldValues>();
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);

    setImages((prev) => [...prev, ...fileArray]);

    fileArray.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setImagePreviews((prev) => [...prev, reader.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      // formData.append("image", images[0]);
      images.forEach((image) => {
        formData.append("image", image);
      });

      const res = await fetch("http://localhost:5000/api/v1/img/upload", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      console.log(result);
      setImages([]);
      setImagePreviews([]);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 text-black">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-6 w-full max-w-sm bg-white rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-center mb-2">Sign Up</h2>

        <input
          type="text"
          placeholder="Name"
          {...register("name")}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {imagePreviews.length > 0 && (
          <div className="grid grid-cols-2 gap-2">
            {imagePreviews.map((img, index) => (
              <img
                src={img}
                alt={`preview-${index}`}
                key={index}
                className="w-full h-24 object-cover rounded-md"
              />
            ))}
          </div>
        )}

        <button
          type="submit"
          className="mt-2 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          {formState.isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default HomePage;
