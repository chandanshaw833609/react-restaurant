import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getDecodedToken } from "../../Backend/config";

function Admin() {
  const navigate = useNavigate();

  useEffect(() => {
    const decoded_token = getDecodedToken();
    if (decoded_token?.role?.authority !== "ROLE_ADMIN") navigate("/");
  }, []);

  return (
    <div>
      <div className="flex justify-center gap-2 items-center my-2">
        <h1 className="text-xl font-bold text-center">Add menu title</h1>
        <Link className="px-4 py-1 rounded-lg bg-blue-400" to={"/add-title"}>
          Add
        </Link>
      </div>
      <div className="flex justify-center gap-2 items-center my-2">
        <h1 className="text-xl font-bold text-center">Add Menu Title</h1>
        <Link
          className="px-4 py-1 rounded-lg bg-blue-400"
          to={"/add-menu-item"}
        >
          Add
        </Link>
      </div>
    </div>
  );
}

export default Admin;
