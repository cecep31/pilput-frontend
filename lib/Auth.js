import localforage from "localforage"
import cookie from 'nookies'

export async function getUser() {
  let contacts = await localforage.getItem("user");
  if (!contacts) contacts = [];
  if (query) {
    contacts = matchSorter(contacts, query, { keys: ["first", "last"] });
  }
  return contacts.sort(sortBy("last", "createdAt"));
}



export function isLoggedIn() {
  let islogged = cookie.get("user")
  
  return islogged.json()
}

// export async function getContacts() {
//   let resutl; 
//   let contacts = await localforage.getItem("user").then((any) => {
//     resutl = any
//     // console.log(resutl);
//   });
//   console.log(resutl);
//   if (!contacts) contacts = [];
//   return contacts
// }

