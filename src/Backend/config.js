import axios from "axios";
import { jwtDecode } from "jwt-decode";

const baseUrl = "https://spring-render-8ssh.onrender.com";

export const getDecodedToken = () => {
  return jwtDecode(localStorage.getItem("token"));
};

export const getHeader = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

export async function signup(data) {
  try {
    return await axios.post(baseUrl+"/auth/signup", data);
  } catch (error) {
    console.log("Error while signup : ", error);
    throw error
  }
}
export async function login(data) {
  console.log(data);
  try {
    return await axios.post(baseUrl + "/auth/login", data);
  } catch (error) {
    console.log("Error while login", error);
  }
}

export function logout() {
  localStorage.setItem("token", "");
}

export async function getMenuTitles() {
  try {
    return await axios.get(baseUrl + "/menu-titles");
  } catch (error) {
    console.log("Error while getting menu titles", error);
  }
}

export async function addMenuTitle(data) {
  try {
    await axios.post(baseUrl + "/menu-titles", data, {
      headers: getHeader(),
    });
  } catch (error) {
    console.log("Error while adding menu title : ", error);
  }
}

export async function getMenuItems(menutitle) {
  console.log(menutitle);
  try {
    return await axios.get(baseUrl + `/${menutitle}/menu-items`);
  } catch (error) {
    console.log("Error while getting menu items : ", error);
  }
}

export async function addMenuItem(data) {
  console.log(data);
  try {
    await axios.post(baseUrl + "/menu-items", data, {
      headers: getHeader(),
    });
  } catch (error) {
    console.log("Error while adding menu title : ", error);
  }
}

export async function addOrderItem(orderItem) {
  
  try {
    return axios.post(baseUrl + `/order-item`, orderItem, {
      headers : getHeader()
    });
  } catch (error) {
    console.log("error while adding orderItem : ", error);
  }
}

export async function getCartItems() {
  
  try {
    return axios.get(baseUrl+"/order-items", {
      headers : getHeader()
    })
  } catch (error) {
    throw error
  }
}
export async function removeCartItem(orderItemId) {
  console.log("orderItemId : ", orderItemId);
  try {
    return axios.delete(baseUrl+`/order-items/${orderItemId}`, {
      headers : getHeader()
    })
  } catch (error) {
    throw error
  }
}


