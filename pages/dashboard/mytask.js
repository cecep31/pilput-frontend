import React, { useState, useEffect } from "react";
import Logged from "../../components/layouts/Logged";
import nookies from "nookies";
import axios from "axios";
import { getCookie } from "cookies-next";

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);
  const apihost = process.env.API_HOST;
  if (!cookies.token) {
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

function Mytask(props) {
  const [groups, setgroups] = useState([]);
  const token = getCookie("token");

  const gettasksgroup = async () => {
    var config = {
      method: "get",
      url: props.apihost + "/api/v1/mytaskgroups",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios(config);
      setgroups(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    gettasksgroup();
  }, []);

  return (
    <Logged>
      <div className="bg-white p-5 rounded-xl shadow-lg">
        <h1 className="text-2xl">My Tasks</h1>
      </div>
      <div className="flex p-5 rounded-xl shadow-lg mt-5 bg-slate-200 min-h-screen">
        {groups.map((data, key) => {
          return (
            <div key={key} className="w-64 bg-slate-200 p-2 h-full">
              <div className="text-green-800 bg-blue-200 rounded-t-lg px-2 py-2 text-4xl">
                {data.name}
              </div>
              <div className="space-y-3 mt-2">
                {data.Task.map((task) => (
                  <div key={task.id} className="bg-white rounded-md p-2">
                    <div>{task.title}</div>
                    <p>{task.desc}</p>
                  </div>
                ))}
                <button className="bg-blue-400 py-1 px-2 rounded-lg text-white hover:bg-blue-500 w-full">
                  Add Task
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </Logged>
  );
}

export default Mytask;
