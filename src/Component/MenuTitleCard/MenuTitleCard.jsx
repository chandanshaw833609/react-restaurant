import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getMenuTitles } from "../../Backend/config";
import { useQuery } from "react-query";
import Loading from "../Loading";

const MenuTitleCard = () => {

  const { isLoading, error, data} = useQuery('menuTitleData', getMenuTitles);

  const menuTitles = data?.data;
  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="my-10 grid grid-cols-2 md:grid-cols-4 place-items-center">
      {menuTitles?.map((menuTitle) => (
        <Link
          key={menuTitle.id}
          to={`/${menuTitle.id}/menu-items`}
          className="md:w-72 border bordder-2 rounded-xl w-40 h-60 md:h-96 shadow-md my-5 overflow-hidden"
        >
          <div className="h-4/6 overflow-hidden">
            <img
              src={menuTitle.imageUrl}
              className="object-cover w-full h-full w-fullntransform hover:scale-110 transition duration-300"
              alt={menuTitle.title}
            />
          </div>
          <div className="h-2/6 flex justify-center items-center">
            <p className="text-lg md:text-2xl font-bold text-center">
              {menuTitle.title}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MenuTitleCard;
