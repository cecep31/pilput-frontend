import { getCookie } from "cookies-next";

export function gettoken() {
  let token = getCookie("token");
  console.log(token);
  return token;
}
