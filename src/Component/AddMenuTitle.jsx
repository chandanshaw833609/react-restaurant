import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addMenuTitle, getDecodedToken } from "../Backend/config";

function AddMenuTitle() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
  });

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    await addMenuTitle(formData)
    alert("Menu item added successfully")
    navigate("/")
  }

  useEffect(() => {
    const decodedToken = getDecodedToken()
    if (decodedToken.role.authority !== "ROLE_ADMIN") {
      navigate("/")
    }
  },[])

  return (
    <div className="m-auto my-10 p-10 border shadow-md w-[350px]">
      <h1 className="text-center font-bold text-xl">Add Menu Title</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="border w-full block rounded-sm ring-gray-300 ring-inset p-1 ring-1"
          />
        </div>

        <div>
          <label htmlFor="imageUrl">ImageUrl</label>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
            className="border w-full block rounded-sm ring-gray-300 ring-inset p-1 ring-1"
          />
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link
            to="/admin"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddMenuTitle;
