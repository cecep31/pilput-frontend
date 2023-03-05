import axios from "axios";
import { ErrorHandlerAPI } from "./ErrorHadler";
import { getCookie } from "cookies-next";
import { getToken } from "./Auth";


const baseurl = process.env.NEXT_PUBLIC_API_HOST;

export async function getDataExternal(url, params) {
  try {
    
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.log(error);
    return ErrorHandlerAPI(error);
  }
}

export async function getData(url, params) {
  try {
    const token = getToken()
    return await axios.get(`${baseurl}${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
    return ErrorHandlerAPI(error);
  }
}

export async function postData(url, payload, formData = false) {
  try {
    const token = getToken()
    return await axios.post(`${baseurl}${url}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": formData ? "multipart/form-data" : "application/json",
      },
    });
  } catch (error) {
    return ErrorHandlerAPI(error);
  }
}

export async function putData(url, payload, formData = false) {
  try {
    const token = getToken()
    return await axios.put(`${baseurl}${url}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": formData ? "multipart/form-data" : "application/json",
      },
    });
  } catch (error) {
    return ErrorHandlerAPI(error);
  }
}

export async function deleteData(url) {
  try {
    const token = getToken()
    return await axios.delete(`${baseurl}${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    return ErrorHandlerAPI(error);
  }
}

export function postDataRQ(url, payload, formData = false) {
  try {
    const token = getToken()
    return axios.post(`${baseurl}${url}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": formData ? "multipart/form-data" : "application/json",
      },
    });
  } catch (error) {
    return ErrorHandlerAPI(error);
  }
}
export function getDataRQ(url, params) {
  try {
    const token = getToken()
    return axios.get(`${baseurl}${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    return ErrorHandlerAPI(error);
  }
}
