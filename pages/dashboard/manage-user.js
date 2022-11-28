import React, { useState, useEffect, use } from "react";
import nookies from "nookies";
import Logged from "../../components/layouts/Logged";
import Image from "next/image";
import axios from "axios";

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);
  if (!cookies.token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  let token = cookies.token;

  var config = {
    method: "get",
    url: "http://127.0.0.1:8080/api/v1/users",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  var usersprops = await axios(config);
  usersprops = usersprops.data;
  return {
    props: { usersprops }, // will be passed to the page component as props
  };
}

function ManageUser({ usersprops }) {
  const [users, setusers] = useState(usersprops);

  function addUser() {
    console.log(users);
  }

  return (
    <Logged>
      <div className="bg-white p-5 rounded-xl shadow-lg">
        <h1>Manage user</h1>
        <div onClick={addUser}>Add user</div>
      </div>
      <div className="w-full  mx-auto bg-white shadow-lg border border-gray-200 mt-3 rounded-xl">
        <header className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">Users</h2>
        </header>
        <div className="p-3">
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                <tr>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Name</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Email</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Role</div>
                  </th>
                 
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-center">Action</div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100">
                {users.map((user, key) => {
                  return (
                    <tr key={key}>
                      <td className="p-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                            <Image
                              className="rounded-full"
                              src="https://placeimg.com/640/480/any"
                              width="40"
                              height="40"
                              alt="Philip Harbach"
                            />
                          </div>
                          <div className="font-medium text-gray-800">
                            {user.username}
                          </div>
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{user.email}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{user.role}</div>
                      </td>
                    
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-lg text-center">??</div>
                      </td>
                    </tr>
                  );
                })}

               
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Logged>
  );
}

export default ManageUser;
