import React, { useState, useEffect, use } from "react";
import nookies from "nookies";
import { getCookie } from "cookies-next";
import Logged from "../../components/layouts/Logged";
import Image from "next/image";
import axios from "axios";
import Modal from "../../components/user/Modal";

export async function getServerSideProps(ctx) {
  const token = getCookie("token");
  const apihost = process.env.API_HOST;
  if (token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { apihost }, // will be passed to the page component as props
  };
}

function ManageUser(props) {
  const [users, setusers] = useState([]);
  const [username, setusername] = useState();
  const [email, setemail] = useState();
  const [role, setrole] = useState();
  const [password, setpassword] = useState();
  const [repassword, setrepassword] = useState();
  const [modaluser, setmodaluser] = useState(false);
  const [token, settoken] = useState(getCookie("token"));

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    var config = {
      method: "get",
      url: props.apihost + "/api/v1/users",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    // axios(config)
    //   .then(function (response) {
    //     setusers(response.data);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    try {
      const response = await axios(config);
      setusers(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  function deleteUser(id) {
    var config = {
      method: "delete",
      url: props.apihost + `/api/v1/users/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        getUsers();
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function showModaluser() {
    setmodaluser(true);
  }

  function closeModaluser() {
    setmodaluser(false);
  }

  async function submitHandler(e) {
    e.preventDefault();
    if (password != repassword) {
      return;
    }

    var data = JSON.stringify({
      username: username,
      email: email,
      password: password,
      role: role,
      image: "asddasdas",
    });

    var config = {
      method: "post",
      url: props.apihost + "/api/v1/users",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };
    var usersprops = await axios(config);
    usersprops = usersprops.data;
    setmodaluser(false);
    getUsers();
  }

  return (
    <Logged>
      <div className="bg-white p-5 rounded-xl shadow-lg">
        <h1>Manage user</h1>
      </div>
      <div className="w-full  mx-auto bg-white shadow-lg border border-gray-200 mt-3 rounded-xl">
        <header className="px-5 py-4 border-b border-gray-100">
          <span className="font-semibold text-gray-800">Users</span>
          <button
            className="ml-3 bg-green-600 text-white py-2 px-4 rounded-xl hover:bg-green-700"
            onClick={showModaluser}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
              />
            </svg>
          </button>
        </header>
        <div className="p-3">
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                <tr>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Username</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Name</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Email</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Super admin</div>
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
                        <div className="text-left">{user.name}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{user.email}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap ">
                        <div className="text-left">
                          {user.issuperadmin ? (
                            <span>Yes</span>
                          ) : (
                            <span>No</span>
                          )}
                        </div>
                      </td>

                      <td className="p-2 whitespace-nowrap">
                        <div id={user.id} className="text-lg text-center">
                          <div className="tooltip" data-tip="Delete This User">
                            <button
                              className="bg-transparent text-red-400 hover:text-red-600"
                              onClick={() => {
                                deleteUser(user.id);
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-6 h-6"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {modaluser && (
        <Modal>
          <form onSubmit={submitHandler}>
            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                User Name
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setusername(e.target.value);
                }}
                placeholder="User Name"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                Email Address
              </label>
              <input
                type="email"
                onChange={(e) => {
                  setemail(e.target.value);
                }}
                required
                placeholder="example@domain.com"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                Email Address
              </label>

              <select
                onChange={(e) => {
                  setrole(e.target.value);
                }}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-3 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              >
                <option>Select role</option>
                <option value="admin">Admin</option>
                <option value="member">User</option>
              </select>
            </div>
            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                Password
              </label>
              <input
                type="password"
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
                placeholder="Password"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                Retype Password
              </label>
              <input
                required
                type="password"
                onChange={(e) => {
                  setrepassword(e.target.value);
                }}
                placeholder="Retype Password"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div>
              <button
                type="Submit"
                className="btn hover:shadow-form rounded-md bg-[#6A64F1] py-2 px-8 text-base font-semibold text-white outline-none"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={closeModaluser}
                className="btn hover:shadow-form ml-2 rounded-md bg-gray-500 py-2 px-8 text-base font-semibold text-white outline-none"
              >
                Close
              </button>
            </div>
          </form>
        </Modal>
      )}
    </Logged>
  );
}

export default ManageUser;
