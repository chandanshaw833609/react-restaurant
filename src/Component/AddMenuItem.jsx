import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addMenuItem, getDecodedToken, getMenuTitles } from "../Backend/config";

function AddMenuItem() {
  const navigate = useNavigate();
  
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('')
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    imageUrl: "",
    menuTitle: {
      id: "",
    },
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addMenuItem(formData)
    console.log();
    alert("Menu item added successfully")
    navigate("/")
  };

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue); // Update selected option state
    setFormData(prevState => ({
      ...prevState,
      menuTitle: { id: selectedValue } // Update menuTitle in formData
    }));
  }
  

  const fetchOptions = async () => {
    const response = await getMenuTitles();
    console.log(response);
    setOptions(response.data)
  };

  useEffect(() => {
    fetchOptions()
    const decodedToken = getDecodedToken()
    if (decodedToken.role.authority !== "ROLE_ADMIN") {
      navigate("/")
    }
  }, [])
  

  return (
    <div className="m-auto my-10 p-10 border shadow-md w-[350px]">
      <h1 className="text-center font-bold text-xl">Add Menu Title</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="border w-full block rounded-sm ring-gray-300 ring-inset p-1 ring-1"
          />
        </div>
        <div>
          <label htmlFor="name">Price</label>
          <input
            type="text"
            name="price"
            value={formData.price}
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
        <div>
        <label>Select an option:</label>
          <select value={selectedOption} onChange={handleSelectChange} className="border w-full block rounded-sm ring-gray-300 ring-inset p-1 ring-1">
          <option>Choose a title</option>
            {options.map((option) => (
                <option key={option.id} value={option.id}>{option.title}</option>
            ))}
            
          </select>
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

export default AddMenuItem;
