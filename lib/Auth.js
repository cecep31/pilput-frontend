import localforage from "localforage"

export async function getUser() {
  let contacts = await localforage.getItem("user");
  if (!contacts) contacts = [];
  if (query) {
    contacts = matchSorter(contacts, query, { keys: ["first", "last"] });
  }
  return contacts.sort(sortBy("last", "createdAt"));
}

export async function isLoggedIn() {
    
}


