import React, { useEffect, useState } from "react";
import { addOrderItem, getCartItems, getMenuItems } from "../../Backend/config";
import { useParams } from "react-router-dom";
import Loading from "../Loading";
import { useQuery } from "react-query";
import { CircularProgress } from "@mui/material";

const MenuItemCard = () => {
  const { menutitle } = useParams();
  const [loadingItemId, setLoadingItemId] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);

  const { isLoading, data: itemsData } = useQuery(
    `menuItemData-${menutitle}`,
    () => getMenuItems(menutitle)
  );

  const { data: orderItemsData, refetch: refetchOrderItemsData } = useQuery(
    "cart",
    getCartItems
  );

  const addOrder = async (item) => {
    try {
      setLoadingItemId(item.id);
      await addOrderItem(item);
      setOrderItems((prev) => [...prev, item.id]);
      refetchOrderItemsData();
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingItemId(null);
    }
  };

  useEffect(() => {
    if (itemsData) {
      setMenuItems(itemsData.data);
    }
    if (orderItemsData) {
      const orderItemIdList = orderItemsData.data.map(
        (item) => item.menuItem.id
      );
      setOrderItems(orderItemIdList);
    }
  }, [itemsData, orderItemsData]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="my-10 grid  grid-cols-2 md:grid-cols-4 place-items-center">
      {menuItems?.map((menuItem) => {
        return (
          <div
            key={menuItem.id}
            className="md:w-72 border
                  bordder-2 rounded-xl
                  w-40 h-60 md:h-96
                  shadow-md my-5 overflow-hidden"
          >
            <div className="h-3/5 overflow-hidden">
              <img
                src={menuItem.imageUrl}
                className="object-cover w-full h-full w-fullntransform hover:scale-110 transition duration-300"
              />
            </div>
            <div className="h-2/5 flex flex-col justify-evenly px-4 items-center">
              <div className="text-sm md:text-xl text-center font-semibold">
                {menuItem.name}
              </div>
              <div className="flex flex-col justify-center ">
                <p className="text-sm  md:text-xl py-1 text-center font-semibold">
                  &#x20B9;{menuItem.price}
                </p>

                {orderItems?.includes(menuItem.id) ? (
                  <button
                    disabled // Disable button if loading for this item
                    className="bg-orange-400 cursor-pointer h-10 w-16 text-white my-1 rounded-md font-bold text-center"
                  >
                    Added
                  </button>
                ) : loadingItemId === menuItem.id ? (
                  <button
                    disabled // Disable button if loading for this item
                    className="bg-orange-400 cursor-pointer my-1 h-10 w-20 text-white rounded-md font-bold text-center"
                  >
                    <div>
                      <CircularProgress color="info" size={14} />
                    </div>
                  </button>
                ) : (
                  <button
                    onClick={() => addOrder(menuItem)}
                    className="bg-orange-600 cursor-pointer text-white my-1 h-10 w-20 rounded-md font-bold text-center"
                  >
                    <div>
                      Add+
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MenuItemCard;
