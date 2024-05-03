import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Loading from "../Loading";
import { getCartItems, removeCartItem } from "../../Backend/config";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";

function Cart() {

  const {isLoading, data, refetch : fetchMenuItem } = useQuery('cart',getCartItems)
  const [removeItemId, setRemoveId] = useState(null)
  const [orderItems, setOrderItems] = useState([])
  const [subTotal, setSubtotal] = useState(0)


  
  
  
  useEffect(() => {
    if (data) {
        setOrderItems(data.data);
        let sum = 0;
        data?.data.forEach(item => {
            sum += parseFloat(item.menuItem.price);
        })
        setSubtotal(sum)
    }
  },[data])

  const removeOrder = async(orderItem) => {
    try {
      setRemoveId(orderItem.id)
      await removeCartItem(orderItem.id)
      const updatedOrderItems = orderItems.filter( item => item.id !== orderItem.id);
      setSubtotal(prev => prev-orderItem.menuItem.price)
      setOrderItems(updatedOrderItems);
      fetchMenuItem()
    } catch (error) {
      console.log(error);
    } finally {
        setRemoveId(null)
    }
  }

  if (isLoading) {
    return <Loading/>
  }

  return (
    <div className="md:w-[60%] px-8 m-auto shadow-md py-8 mt-8 flex flex-col md:flex-row justify-around">
      <div>
        <div className="flow-root">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            {orderItems?.map((product) => (
              <li key={product.id} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={product.menuItem.imageUrl}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        {product.menuItem.name}
                      </h3>
                      <p className="ml-4">{product.menuItem.price}</p>
                    </div>  
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-500">Qty {product.quantity}</p>

                    <div className="flex">
                      <button
                        type="button"
                        onClick={() => removeOrder(product)}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        {removeItemId === product.id  ? (<div><CircularProgress size={12}/> removing</div>) : 'remove'}
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-gray-200 px-4 py-6 sm:px-6">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p>&#x20B9;{subTotal}</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">
          Shipping and taxes calculated at checkout.
        </p>
        <div className="mt-6">
          <a
            href="#"
            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Checkout
          </a>
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            or{" "}
            <Link   
              type="button"
              to = {"/"}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Continue Ordering
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Cart;