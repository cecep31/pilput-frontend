import { deleteCookie } from "cookies-next";
import Router from "next/router";

export const ErrorHandlerAPI = (error) => {
  if (
    error?.response?.data.message === "Invalid or expired JWT" ||
    error?.response?.data?.message === "jwt malformed" ||
    error?.response?.data?.message === "invalid token" ||
    error?.response?.data?.message === "invalid signature" ||
    error?.response?.data?.message === "Authentication invalid" ||
    error?.response?.data?.message === "invalid algorithm"
  ) {
    deleteCookie("token");
    Router.push("/login")
  }
  return error.response;
};
